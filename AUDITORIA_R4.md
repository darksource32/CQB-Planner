# CQB Planner · Relatório de implementação e auditoria · R4

**Base:** candidata local R3 fornecida na conversa (`CQB_Planner_Alpha_0.1.9_CORRECOES_R3_COMBATE.html`). **GitHub:** este relatório foi produzido antes da aprovação; a R4 foi publicada posteriormente na `main` em 23/10/2026. **Artefato:** `CQB_Planner_Alpha_0.1.9_CORRECOES_R4_COMBATE_ROTAS.html`.

## 1. Falhas e soluções implementadas

### Múltiplos aliados travando no mesmo alvo

**Causa:** o rastreamento visual de cada aliado priorizava o primeiro inimigo visível, enquanto a escolha de alvo para tiro dependia dessa mesma preferência; dois aliados tendiam a acompanhar o mesmo primeiro inimigo, sem qualquer distribuição cooperativa. O alinhamento de visão do aliado continuava apontando para esse alvo mesmo quando outro estava disponível.

**Solução:** alocação colaborativa determinística por quadro: cada aliado obtém candidatos com linha de visão, os operadores com menos alternativas escolhem primeiro, e alvos ainda não designados têm preferência; entre os de mesma ocupação, contam eixo de mira, distância e continuidade de alvo. É permitido concentrar fogo quando faltam alvos distintos. O rastreamento do olhar utiliza o alvo atribuído. Cada aliado tem mira e cadência próprias. Isso não cria telepatia ou navegação automática: o alvo precisa permanecer no campo de detecção e na linha de visão física.

### Ctrl + rota desenhada do Bravo

**Causa:** `startDrawingPath()` escolhia o primeiro aliado do array como âncora, sem considerar qual operador recebeu o clique. Isso produzia um deslocamento incorreto se o desenho partisse de Bravo.

**Solução:** passar o ID do aliado efetivamente clicado, usar esse operador como líder e calcular os deslocamentos relativos dos outros. Ctrl + clique só alterna seleção; não inicia uma rota acidental. Testada a formação iniciada do Alfa e do Bravo, inclusive o deslocamento na execução integrada.

### A-01: corpos bloqueiam disparos

**Política escolhida:** outros corpos aliados ou inimigos conhecidos devem bloquear a linha ao centro do alvo. Isso respeita a oclusão corporal desenhada e impede tiros atravessando um companheiro. Inimigos não revelados continuam fora do desenho da sombra, respeitando a política preexistente de neblina de guerra, o que é uma limitação deliberada. Aliados paralelos, sem bloqueio geométrico mútuo, podem atirar ao mesmo tempo.

### A-02: objetos girados

**Política escolhida:** o detector usa os mesmos quatro cantos transformados do objeto que o renderizador. Um retângulo rotacionado deve bloquear a detecção conforme sua geometria efetiva, não o antigo retângulo sem rotação. Obstáculos baixos (`blocksVision:false`) continuam transparentes à visão.

### A-03: parede próxima ao alvo

**Política escolhida:** o raio até o centro do inimigo termina a 0,001 px desse centro, em vez de cortar 6 px antes. Paredes quase encostadas ao inimigo não podem se tornar transparentes. **Limitação:** a detecção utiliza o centro do alvo, não o contorno parcialmente exposto; um inimigo só parcialmente visível por uma quina pode permanecer oculto.

### A-04: morte por temporizador sem tiros

**Política escolhida:** neutralização requer **6 acertos reais simulados**; detecção e tempo de mira não causam dano. O dano recebido permanece enquanto o alvo existir na missão. Para cada inimigo: 100 HP, 6 disparos acertados, cada um com aproximadamente **16,6667 HP de dano** (1/6 da vida). Não há probabilidade de erro de tiro no modelo atual, apenas dispersão visual do traçante.

## 2. Parâmetros finais de combate

| Parâmetro | R4 |
|---|---:|
| Campo de detecção aliado | 70° |
| Janela para disparar | ±15° do centro |
| Reação antes do primeiro tiro | 0,38 s de mira contínua |
| Intervalo de disparo | 0,12 s |
| Vida do inimigo | 100 HP |
| Tiros para neutralizar | 6 acertos |
| Dano médio/exato por acerto neste modelo | 16,6667 HP |
| Mínimo de engajamento até neutralização | 1,15 s |

**Conta:** o sexto disparo ocorre aos `0,38 + 5 × 0,12 = 0,98 s` de mira contínua. Como o usuário pediu também 1,15 s para neutralização, a morte só é aplicada após o **mínimo de 1,15 s de engajamento válido** e os **seis acertos**. Depois de atingidos os seis acertos, cessam tiros adicionais nesse inimigo até a conclusão da neutralização. Se ele sair da mira antes disso, não morre por visão/tempo isoladamente; os acertos anteriores permanecem.

## 3. Desempenho

- Reuso de segmentos estáticos de paredes e obstáculos por quadro nas consultas LOS.
- Filtro geométrico para remover segmentos fora da área de alcance da visão.
- Deduplicação de raios de mesmo ângulo, sem retirar os pequenos desvios destinados a evitar vazamentos por quinas.
- Para silhuetas poligonais, disparo de raios especiais só nas duas extremidades angulares; todas as arestas permanecem no teste físico de interseção.
- Filtro angular por segmento antes de invocar a função cara de interseção raio/segmento. Intervalos angulares com ambiguidade de continuidade são preservados integralmente por segurança.

**Benchmark sintético (Node.js, Canvas simulado, 2 aliados e 36 inimigos; 5 quadros medidos após aquecimento):** R3 aproximadamente 1,9 segundo/quadro; R4 aproximadamente 0,19 segundo/quadro, redução aproximada de 90%. **Esse benchmark não mede FPS real do Chromium nem garante a mesma melhora no dispositivo do mantenedor.** A suíte de navegador inclui um cenário de 36 inimigos para obter uma medida local.

## 4. Revisões e evidências

- Sintaxe do JavaScript validada com `node --check`.
- A suíte autônoma do motor completou **46 de 46 testes**, com 0 falhas, cobrindo combate, seleção/distribuição, corpo e parede, rotação, disparos e HP, reinício, sincronização, integração com `updateSimulation()`, renderização em DOM simulado, geometria e códigos CQB2/CQB3.
- Duas comparações adicionais de raycasting conferiram distâncias de interseção contra o cálculo direto inclusive na quebra de ângulos -π/+π.
- O teste de navegador de cliques reais tem dez cenários, **não executados aqui** devido à restrição do navegador desta sessão. O script está incluído para validação no PC do mantenedor; não atribuir a ele status de aprovado até rodar.
- A comparação de código R3/R4 confirmou mudanças nas rotinas de visão, combate, cache de geometria, renderização e âncora de rota. Importação/exportação e armazenamento não foram intencionalmente reescritos.

## 5. Novos defeitos reproduzidos durante a auditoria, NÃO corrigidos

### K-R4-01 (alta): clique curto destrói rota sincronizada existente

**Reprodução:** criar formação válida de Alfa e Bravo, traçar rota sincronizada, e então clicar e soltar sobre um deles sem arrastar a nova rota. O aplicativo chama `releaseFormationForUnits(..., true)` no início da tentativa de edição; se a rota tem menos de dois pontos, `finishDrawingPath()` descarta o backup e não restaura a formação. **Observação testada:** antes do clique, 1 formação e dois caminhos com 18 pontos; depois, 0 formações e ambos os caminhos vazios. **Sugestão:** só efetivar a substituição ao concluir uma rota válida, ou restaurar o snapshot transacional quando o gesto for cancelado.

### K-R4-02 (média/alta): snapshot de missão fica desatualizado após edição posterior

**Reprodução:** criar uma unidade, entrar em Operação para salvar o snapshot, voltar à Construção, adicionar outra unidade e retornar a Operação; dependendo do fluxo de edição, `hasMissionSnapshot` continua verdadeiro. Ao reiniciar, `resetSimulation()` carrega o snapshot anterior e pode descartar a nova unidade. **Reprodução em motor isolado:** após salvar snapshot com ID 1, acrescentar ID 2 e reiniciar, só o ID 1 permanece. **Sugestão:** invalidar de forma abrangente o snapshot ao modificar entidades da cena no editor; preservar intenção do Reset e decidir explicitamente quando criar um novo ponto de partida.

Os dois achados aparecem em cada relatório do teste autônomo como **`PENDENTE (reproduzido)`**. Não fazem o total de aprovações parecer melhor e permanecem aguardando autorização para correção.

## 6. Lacunas que exigem validação de campo

- Efeitos de centenas de objetos e dezenas de operadores no renderizador de navegador real, com zoom, diferentes DPI e sessões longas.
- Replay de sessões com muitos inimigos neutralizados e arquivos anteriores à nova mecânica de vida, em especial versões antigas de replay que não preservam os novos campos.
- Casos de visão parcial em paredes tangentes ao corpo e oclusão por inimigos ocultos, devido à diferença deliberada de fog-of-war.
- Formações em corredores estreitos com início muito próximo, passagem já ocupada e longos trajetos em grupo.
- Segurança defensiva de arquivos de mapa/replay especialmente grandes e estados importados em limites extremos.

## 7. Procedimento para próximas versões

1. Reproduzir bug e criar teste vermelho ou caso `PENDENTE`.
2. Planejar mudança mínima, sobretudo nas interações entre visão, dano, navegação e replay.
3. Implementar em arquivo candidato local, nunca diretamente na `main` sem aprovação.
4. Reexecutar `regressao_core.js`, depois `regressao_navegador.py` no Chromium do mantenedor; corrigir regressões.
5. Registrar resultados e deixar bugs de escopo novo aguardando decisão.