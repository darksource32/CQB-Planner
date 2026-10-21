// Browser smoke checks for the unpublished Alpha 0.1.8 branch.
const { chromium, firefox } = require('playwright');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');

(async () => {
  const browserType = process.env.BROWSER === 'firefox' ? firefox : chromium;
  const browser = await browserType.launch({headless:true});
  const page = await browser.newPage({acceptDownloads:true});
  const errors=[];
  page.on('pageerror', err=>errors.push(String(err)));
  page.on('console', msg=>{if(msg.type()==='error') errors.push(msg.text());});
  try {
    await page.goto('file://' + path.resolve(__dirname,'../index.html'));
    await page.waitForFunction(()=>document.getElementById('tactical-canvas') && typeof state==='object' && state.mode==='build');
    let boot=await page.evaluate(()=>({mode:state.mode,tool:state.tool,walls:state.walls.length,units:state.units.length}));
    assert.deepEqual(boot,{mode:'build',tool:'select',walls:0,units:0});
    await page.keyboard.press('t');
    assert.equal(await page.evaluate(()=>state.mode),'play');
    await page.keyboard.press('b');
    assert.equal(await page.evaluate(()=>state.mode),'build');
    await page.evaluate(()=>{
      state.walls=[{id:1,x1:12.345,y1:17.7,x2:432.125,y2:18.2}];
      state.doors=[{id:2,x1:200,y1:18.2,x2:240,y2:18.2}];
      state.objects=[{id:3,x:20.125,y:40.75,w:41.25,h:20.5,blocksVision:false,kind:'low'}];
      state.units=[{id:4,x:50,y:50,team:'blue',angle:0,path:[],waypoints:[]}];
      state.nextId=5;
    });
    await page.locator('#btn-share-map').click();
    const downloadPromise=page.waitForEvent('download');
    await page.locator('#btn-copy-map-code').click();
    const download=await downloadPromise;
    assert.match(download.suggestedFilename(),/\.cqbmap$/);
    const exported=await download.path();
    assert.ok(fs.statSync(exported).size>0 && fs.statSync(exported).size<=3*1024*1024);
    page.once('dialog', d=>d.accept());
    await page.locator('#map-file-input').setInputFiles({name:'roundtrip.cqbmap',mimeType:'application/gzip',buffer:fs.readFileSync(exported)});
    await page.waitForFunction(()=>state.walls.length===1 && state.units.length===0);
    const layout=await page.evaluate(()=>makeLayoutLists());
    assert.deepEqual(layout.walls,[[12.345,17.7,432.125,18.2]]);
    assert.deepEqual(layout.objects,[[20.125,40.75,41.25,20.5,0]]);
    // Re-import the legacy string produced by 0.1.7 without changing coordinates.
    const legacy=await page.evaluate(()=>exportMapCode());
    assert.ok(legacy.startsWith('CQB3:'));
    await page.locator('#btn-share-map').click();
    page.once('dialog', d=>d.accept());
    await page.locator('#map-code-textarea').fill(legacy);
    await page.locator('#btn-load-map-code').click();
    assert.deepEqual((await page.evaluate(()=>makeLayoutLists())).walls,[[12.345,17.7,432.125,18.2]]);
    // Invalid gzip must fail atomically without deleting or replacing geometry.
    await page.locator('#btn-share-map').click();
    await page.locator('#map-file-input').setInputFiles({
      name:'broken.cqbmap',mimeType:'application/gzip',buffer:Buffer.from('not a valid gzip file')
    });
    await page.waitForFunction(()=>document.getElementById('map-code-feedback').textContent.startsWith('✕'));
    assert.equal(await page.evaluate(()=>state.walls.length),1);
    await page.locator('#btn-cancel-modal-code').click();
    assert.equal(await page.evaluate(()=>document.activeElement.id),'btn-share-map');
    // Store the map offline and verify persistence across a page reload.
    await page.locator('#btn-share-map').click();
    page.once('dialog',d=>d.accept('Mapa QA'));
    await page.locator('#btn-save-map-library').click();
    await page.waitForFunction(()=>localStorage.getItem('cqb-planner-maps-v1')?.includes('Mapa QA'));
    await page.locator('#btn-cancel-modal-code').click();
    await page.reload();
    await page.waitForFunction(()=>state.mode==='build');
    await page.locator('#btn-share-map').click();
    assert.ok(await page.locator('#map-library-list').innerText().then(t=>t.includes('Mapa QA')));
    await page.locator('#map-library-list .replay-entry button').first().click();
    assert.equal(await page.evaluate(()=>state.walls.length),1);
    await page.evaluate(()=>{
      state.walls=[];state.doors=[];state.objects=[];
      state.units=[{id:101,x:0,y:0,angle:0,team:'blue',routeIndex:1,
        path:[{x:0,y:0},{x:40,y:0},{x:80,y:0},{x:120,y:0}],
        waypoints:[{pathIndex:1,type:'look',angle:0},{pathIndex:3,type:'focus',targetPoint:{x:140,y:40}}],
        finalFacingAngle:0,speed:72}];
      state.selectedIds=[101];
      state.hasMissionSnapshot=true;setMode('play');
      const cut=findRouteCut(60,0);
      if(!cut)throw new Error('Route cut not found');
      beginRouteReplacement(cut);
      appendPointToPath(60,40);
      appendPointToPath(120,40);
      finishDrawingPath();
    });
    const after=await page.evaluate(()=>({
      path:state.units[0].path,
      commands:state.units[0].waypoints.map(w=>w.pathIndex)
    }));
    assert.deepEqual(after.path.slice(0,3),[{x:0,y:0},{x:40,y:0},{x:60,y:0}]);
    assert.deepEqual(after.commands,[1]);
    await page.keyboard.press('Control+z');
    assert.equal(await page.evaluate(()=>state.units[0].path.length),4);
    // Interrupting a build drag must preserve the modified geometry in Ctrl+Z.
    await page.evaluate(()=>{
      setMode('build');
      state.walls=[{id:900,x1:0,y1:0,x2:50,y2:0}];
      pointerBuildEdit=snapshotBuild();
      state.walls[0].x1=12;
      window.dispatchEvent(new Event('blur'));
    });
    assert.equal(await page.evaluate(()=>buildUndoHistory.length>0),true);
    await page.evaluate(()=>undoBuild());
    assert.equal(await page.evaluate(()=>state.walls[0].x1),0);
    // Tiny geometry is import-valid but not replay-quantizable; REC must stay inactive.
    const recording=await page.evaluate(()=>{
      state.walls=[{id:901,x1:0,y1:0,x2:0.0001,y2:0}];
      state.doors=[];state.objects=[];state.units=[];
      setMode('play');
      beginReplayRecording();
      return replay.recording;
    });
    assert.equal(recording,false);
    // Catch unexpected errors BEFORE injecting the deliberate synthetic exception.
    if(errors.length) throw new Error('Errors before recovery test: '+errors.join(' | '));
    // A render exception must stop playback and synchronize visible button state.
    const recovery=await page.evaluate(()=>{
      state.walls=[];state.isPlaying=true;
      document.getElementById('play-label').textContent='Pausar';
      const saved=render;
      render=function(){throw new Error('deliberate test render error')};
      try{gameLoop(performance.now());}
      finally{render=saved;}
      return {playing:state.isPlaying,label:document.getElementById('play-label').textContent};
    });
    assert.deepEqual(recovery,{playing:false,label:'Iniciar'});
    // Firefox truncates the deliberately logged Error object; avoid treating it as a product regression.
    if(errors.length!==1 || !errors[0].startsWith('CQB Planner: erro de execução recuperado'))
      throw new Error('Unexpected recovery logging: '+errors.join(' | '));
    console.log('PASS: boot, shortcuts, GZIP/legacy roundtrip, corrupt file guard, map library, route edit/undo, blur undo, replay preflight, recoverable render');
  } finally { await browser.close(); }
})().catch(e=>{console.error(e);process.exit(1);});
