# CQB Planner · Alpha 0.1.9 · R7 seletiva

**Escopo:** corrigir a precedência temporal da orientação durante rotas, **sem alterar** o motor físico de navegação da R4. Esta análise foi elaborada antes da aprovação. **A R7 foi aprovada e publicada na `main` em 25/10/2026, mantendo a Alpha 0.1.9.**

## Fonte de comparação

- Referência oficial: `darksource32/CQB-Planner`, branch `main`, `index.html` Alpha 0.1.9 R4 (confirmada via integração GitHub).
- A cópia local correspondente foi confrontada com a candidata R6 e R7 por trechos e hashes de conteúdo.
- Trechos **idênticos entre R4/R5/R6/R7**:
  - geometria de ocupação, colisão, tráfego, desvio local e prioridade de passagem;
  - `updateSimulation(dt)` completo, incluindo movimento individual e formações;
  - `currentGazeCommand()` e `applyPathLookBehavior()` originais.
- A R7 altera **somente** o tratamento do rastreamento automático, dos contatos temporariamente suprimidos por novas orientações e a filtragem de alvos para combate. O núcleo de navegação não foi reescrito.

## Regra restaurada: uma linha do tempo, não um bloqueio permanente

1. Orientação inicial (manual, foco ou fatia da rota) é a referência do operador, **mas não bloqueia futuras aquisições**.
2. Inimigo **recém-detectado** dentro do cone amplo de 70° passa à frente da orientação anterior: o operador gira para centralizá-lo e somente dispara dentro de ±15°.
3. Uma **orientação nova executada após o contato** passa à frente do alvo já visto. O operador executa a nova ordem; o contato antigo não pode sequestrar a mira no quadro seguinte.
4. Se surgir outro inimigo ou o anterior sair do campo de visão e entrar novamente, é uma **nova detecção**, podendo retomar o rastreamento.
5. O comando temporário `look` deixa de suprimir contatos quando expira; o `focus` permanece enquanto válido. Nova rota cancela supressões antigas.

A supressão é individual por operador e identificador do contato. Não exige sincronização entre Alfa e Bravo. O sistema de disparo, cadência individual, HP e replay v3 implementados na R5/R6 continuam presentes.

## Testes realizados

- **98/98 casos de motor passaram no Node.js com DOM simulado**: 87 anteriores, oito novos da cronologia de orientação e três testes que verificam hashes dos blocos de navegação contra R4.
- Os cenários novos incluem orientação inicial com inimigo na borda, ordem posterior que interrompe a mira, proteção contra reacquisição em cada quadro, inimigo novo após a ordem, supressão real de tiros, mudança manual de direção e retorno do contato após oclusão.
- **21 testes de navegador preparados** na suíte Playwright, incluindo dois cenários novos para orientação na rota. Não foram executados aqui: o Chromium retornou `ERR_BLOCKED_BY_ADMINISTRATOR` inclusive em `127.0.0.1`. Precisam ser validados no Windows do mantenedor.
- A verificação de sintaxe do JavaScript do aplicativo e do Python da suíte passou.

### Comparação de tráfego R4 × R7 (mesmo cenário e motor)

| Cenário sintético | R4 | R7 |
|---|---|---|
| 3 operadores cruzando um ponto | Conclui | Conclui |
| 4 operadores cruzando o centro em simultâneo | Bloqueia | Bloqueia |
| 5 operadores cruzando um ponto | Conclui | Conclui |
| 6 operadores cruzando o centro em simultâneo | Bloqueia | Bloqueia |
| 8 operadores cruzando um ponto | Conclui | Conclui |
| 4 operadores em duas faixas paralelas | Conclui | Conclui |
| Troca de lados dentro de corredor estreito (~30 px de largura) | Não conclui | Não conclui |

Esses ensaios são reproduções **sintéticas**. Eles demonstram paridade de comportamento, mas **não significam que o deadlock foi corrigido**. O corredor muito estreito pode ser fisicamente impossível para duas silhuetas passarem; os cruzamentos de 4/6 no espaço aberto continuam um defeito antigo da política de passagem.

## Limitações e pendências

- **Deadlock físico entre operadores:** reproduzido também na R4, **ainda não corrigido** nesta R7 por solicitação de preservar o motor antigo. Exige trabalho dedicado, reproduções com os mapas do mantenedor e novo protocolo de aprovação, separado da correção de orientação.
- **Testes end-to-end no navegador:** não homologados nesta sessão. Executar `testar_cqb.bat` e enviar os relatórios `.md`/`.json` se algum teste falhar.
- A paridade de código não exclui problemas de entrada, configurações ou trajetórias que só apareçam no navegador ou em uma planta específica.
- Não foi feita revisão de novas funcionalidades Beta. A publicação no GitHub ocorreu posteriormente, em 25/10/2026.

## Teste manual recomendado

1. Crie uma rota do Bravo apontando para uma direção. Coloque um inimigo na periferia do cone de 70°. O operador deve abandonar a orientação antiga, girar e só disparar ao alcançar ±15°.
2. Durante o rastreamento, faça o operador **alcançar** uma orientação posterior da rota, apontada em outra direção. Deve obedecer à nova orientação sem retornar imediatamente ao mesmo alvo antigo.
3. Faça aparecer um **novo inimigo** no cone durante a nova orientação. O contato novo deve voltar a ter prioridade.
4. Programe uma movimentação simples de dois operadores em faixas paralelas e confirme que continuam avançando. Para travamentos em cruzamentos específicos, salve a planta, posições e trajetórias antes de editar.

**Status:** R7 aprovada pelo mantenedor e publicada na `main` em 25/10/2026.