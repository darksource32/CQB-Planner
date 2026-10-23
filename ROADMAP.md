# CQB Planner — Roadmap e registro de qualidade

**Referência atual:** Alpha Early Access **0.1.9** · **Publicação inicial:** 22/10/2026 · **manutenção R4:** 23/10/2026 · **Estado:** Alpha experimental.

> A 0.1.9 introduziu prioridade contextual entre operadores e mapas oficiais embutidos. Pontos de sincronização e menu de loadout permanecem para evolução futura. A conclusão de rotas ainda pode falhar em arranjos com destinos fisicamente ocupados.

> A tabela de auditoria abaixo registra o **estado histórico da 0.1.7**. A 0.1.8 implementou as correções K-01 a K-05, importação/exportação `.cqbmap`, biblioteca pessoal e reedição parcial de rotas. Os algoritmos originais de suavização e movimentação foram preservados. A colisão de obstáculos baixos segue pendente. Consulte [CHANGELOG.md](./CHANGELOG.md) e [VERSIONS.md](./VERSIONS.md) para a versão atual.

O CQB Planner é uma **ferramenta de planejamento, visualização e instrução de cenários fictícios CQB**, não um jogo comercial nem substituto para protocolos reais. O uso de mecanismos simulados atende à finalidade didática.

Este documento cruza a auditoria externa inicial (19/10/2026), a auditoria da primeira 0.1.7 e a auditoria da candidata de estabilização (20/10/2026). A última registrou **90 casos de observação**, incluindo falhas e reproduções, não 90 aprovações. [Lista de problemas reproduzidos e limitações](./KNOWN_ISSUES.md).

## Direção atual após R4 — Alpha 0.1.9 (23/10/2026)

A build R4 **já está publicada na `main`**, sem alterar o número 0.1.9. A seção histórica de auditoria 0.1.7 mais abaixo permanece como registro, **não como diagnóstico vigente**.

### Imediato: estabilização

1. Validar os dez fluxos de navegador com mouse/teclado reais em Windows e recolher relatórios automáticos.
2. Corrigir **K-R4-01** (cancelamento de gesto remove formação) e **K-R4-02** (snapshot obsoleto no reset), mediante nova candidata e testes dedicados.
3. Auditar reprodução de replays anteriores com estados de HP e engajamento; avaliar persistência e reset de estados novos.
4. Testar desempenho real: FPS, p95 dos quadros, uso de memória e compatibilidade com mapas extensos, operadores numerosos e resoluções/DPI diferentes.

### Beta e ideias futuras — ainda não aprovadas como requisitos

- Sincronização por pontos/condições de chegada, aguardando integrantes antes de continuar rotas.
- Menu individual de loadout e mecânicas **ficcionais** de equipamentos, como flashbangs de jogo e portas interativas com animações abstratas.
- Patrulha e reação de adversários de jogo, indicadores de vida e balanceamento de dano para aliados.
- Formato **versionado de projeto completo** com geometria, unidades, rotas e configurações (distinto de `.cqbmap` e replay), recuperação e avisos antes de descartar trabalho.
- Arquitetura-fonte modular com empacotamento final em **um HTML único e offline**, com suíte contínua de regressão e publicação sob aprovação.
- Acessibilidade, layout móvel e enquadramento de câmera pela geometria.

### Política de regressão

Para cada bug: reproduzir, escrever teste que falha, implementar a correção em candidata, executar teste de motor e navegador, revisar diffs, anotar evidências e só publicar após aprovação. A suíte atual já cobre 46 testes de motor; dez cenários de navegador ainda requerem execução em ambiente compatível. [Auditoria R4](./AUDITORIA_R4.md).

## 1. Estado dos 15 grupos de achados anteriores

| Prioridade original | Área | Estado na 0.1.7 publicada | Próximo passo |
| --- | --- | --- | --- |
| P0 | Coordenadas / DPI | **Corrigido nos testes** em 100%, 125%, 150%, 200%; desenho e zoom ancorado | Manter regressão entre navegadores |
| P0 | Replay malformado | **Reproduções antigas corrigidas**; importação defensiva melhorada, gameLoop não paralisa após falha sintética | **K-05** sincronizar UI após erro; **K-01/K-02** contrato gravador-leitor |
| P0 | Imagem externa/inválida de replay | **Corrigido nos casos de importação**; HTTPS rejeitado, imagem quebrada não congela | **K-01** aplicar limites também ao upload local e à gravação |
| P0 | Perda ao carregar Exemplo CQB | **Corrigido nos testes** com confirmação, restauração e histórico independente | Cobrir transições e backups em regressão |
| P0 | Teclado / foco / Espaço | **Corrigido nos fluxos testados**; pan e pausa separados | **K-04** devolver foco corretamente no modal de código |
| P0 | Persistência de projeto completo | **Pendente (limitação de Alpha)** | Criar formato versionado de projeto, salvar/abrir/recuperar |
| P1 | Importação de mapas | **Reproduções antigas corrigidas**; validação antecipada e CQB1/CQB2/CQB3/JSON fracionário | Unificar contrato de precisão na captura de replay (**K-02**) |
| P1 | Modificação de cenário durante gravação | **Bloqueios confirmados nas entradas auditadas** (mapas/guia/exemplos) | Manter testes abrangentes de entradas assíncronas e novos controles |
| P1 | Layout estreito | **Pendente**; ferramentas inacessíveis em 1024/390 px | Barra responsiva e testes reais móveis |
| P1 | Modais | **Parcial**; contenção de Tab e Escape confirmados | **K-04** restaurar foco após fechar Código do Mapa |
| P1 | Clipboard | **Corrigido nos testes** (sem falso aviso de sucesso) | Manter testes de falhas de API |
| P1 | Portas | **Corrigido nos testes**; borracha e Delete preservam abertura coerentemente | Manter Ctrl+Z e cenários limítrofes |
| P2 | Centralizar / câmera | **Parcial**; novo pan funciona; Centralizar ainda usa posição fixa | Enquadrar geometria automaticamente |
| P2 | Reiniciar durante replay | **Corrigido nos testes**; reinicia replay sem alterar missão original | Manter testes de saída e retorno |
| P2 | Cronômetro, mapa vazio, versão | **Corrigido nos testes** | Manter contrato de exportação e regressão |

### Bloqueadores de integridade ainda não corrigidos após a última auditoria

1. **K-01 Alta:** gravações podem ser anunciadas como salvas mas posteriormente filtradas por invalidez (guia grande ou duração acima do limite); exigir validade no produtor e persistência verificável.
2. **K-02 Média:** falha ao iniciar gravação pode deixar flag ativa com cenário nulo; preparação e validação antes de modificar estado.
3. **K-03 Média:** cancelamento de arrasto por perda de foco pode conservar mutação sem Desfazer; reverter ou registrar transação.
4. **K-04 Baixa/média:** modal Código do Mapa fecha sem devolver foco ao acionador.
5. **K-05 Baixa/média:** recuperação após exceção de render deixa status visual incompatível com estado pausado.

Os casos e critérios de aceite detalhados estão em [KNOWN_ISSUES.md](./KNOWN_ISSUES.md). **Não marcar essas falhas como corrigidas até nova implementação e reprodução em testes.**

### Outros riscos acompanhados

- Armazenamento local, duração e cotas de replays, imagens embutidas, perda de dados após limpeza do navegador.
- Gestos interrompidos por blur, pointercancel ou perda de captura; **lostpointercapture foi corrigido para pan nos testes**, mas edição via arrasto ainda tem K-03.
- Histórico de edições ainda limitado a Desfazer, sem Refazer global; observar memória e escopo de undo.
- Replays registram posições/orientações e visibilidade; não são trilha completa de auditoria de cada comando.
- Estados globais e integração de Construção, Operação, Gravando, Pausado, Replay e Modal exigem manutenção cuidadosa.

## 2. Arquitetura, manutenção e validação

1. **Fonte modular e HTML único:** separar interface, renderização, simulação, importação, persistência e controles no repositório; continuar distribuindo **um HTML único** por empacotamento automatizado na Beta. Não exige migração imediata.
2. **Visão e desempenho:** os raios são calculados por operador em cada quadro. Para cenários muito extensos, avaliar cache de segmentos, estruturas espaciais e testes de dezenas de salas/centenas de objetos.
3. **Importações defensivas:** ampliar verificações além da estrutura básica, incluindo versões, números finitos, geometrias inválidas, imagens, quantidade de objetos e limites de arquivo.
4. **Persistência:** replays locais podem desaparecer quando o navegador limpa seus dados; manter exportação JSON e criar backup de projeto completo.
5. **Fontes externas:** Google Fonts é opcional, mas altera tipografia e gera solicitação externa quando conectado; considerar fontes locais ou alternativas de sistema consistentes offline.
6. **Testes de campo:** validar mapas reais da comunidade, muitos operadores, diferentes navegadores, zoom/DPI, máquinas modestas e sessões longas. Edge automatizado não substitui Firefox/Safari nem hardware físico.
7. **Suíte de regressão:** automatizar reprodução de bugs de coordenadas, geometria, colisão, comandos de olhar, undo, importação, gravação e retorno de replay.
8. **Formatos versionados:** CQB1/CQB2/CQB3 e JSON legados coexistem; distinguir rigorosamente **código de mapa**, **projeto completo** e **replay**. Precisão CQB3 decimal limitada a 0,001 unidade; ainda falta formato de projeto completo. Unificar contrato do gravador e leitor (K-01/K-02).

## 3. Funcionalidades propostas pela comunidade/mantenedor

As especificações abaixo representam **ideias de produto para simulação de jogo**, não requisitos aprovados nem funcionalidades da Alpha atual.

### Biblioteca e cenários

- Biblioteca de mapas didáticos criados e revisados pela equipe, com cenas demonstrativas e plantas de missões de *Ready or Not*.
- Biblioteca pessoal salva localmente, com exportação/importação e backups.
- Possível atualização do catálogo oficial pela internet, preservando o editor offline.

### Unidades e comportamento de adversários

- **Vida e dano para aliados**, compatíveis com as regras de neutralização dos adversários; indicadores visuais claros e possibilidade de configurar o cenário.
- **Patrulha de adversários em ambientes virtuais:** movimentação dentro da sala posicionada, com maior atenção visual às portas.
- **Reação de adversários:** mecânica abstrata de disparos com dispersão maior e menor precisão. Proposta de balanceamento: aliado que detecta primeiro teria vantagem; adversário poderia vencer após múltiplos acertos antes de ser percebido; múltiplos adversários poderiam neutralizar um aliado. Os valores exatos ainda precisam de design, balanceamento e testes.

### Equipamentos e portas (somente mecânicas fictícias)

- **Flashbang de jogo:** opção no equipamento do personagem, limite proposto de **duas unidades por operador**; prévia visual de lançamento, rebotes simulados em paredes/obstáculos, raio/área fictícia de efeito e reação de adversários. Duração proposta do estado de atordoamento: **3 segundos**, com efeito visual de desorientação e incapacidade temporária de reação.
- **Portas interativas:** portas fechadas bloqueiam visão; operadores próximos podem acionar animações de abertura ou arrombamento. Opções de jogo inspiradas em chute e carga fictícia C2, com efeitos de atordoamento distintos; a opção de carga exigiria preparação e confirmação de ativação por ícone na porta. **Parâmetros de efeito e implementação permanecem abstrações de gameplay**, não simulação de dispositivos reais.

### Rotas, colisão e compartilhamento

- **Obstáculo baixo:** corrigir casos em que personagens ficam presos ou aparecem sobre a geometria ao tentar atravessá-la.
- **Ângulo final do percurso:** seta menor, mais fácil de reposicionar e com ajuste angular fino, sem saltos para ângulos retos.
- **Código de mapa compacto:** **implementado em 0.1.7** para CQB2 (inteiros) e CQB3 (frações). Seguir mantendo compatibilidade de importação, limites e teste de roundtrip.

## 4. Decisões de produto a preservar

- **O instrutor desenha a rota**; os operadores não inventam caminhos alternativos completos.
- A movimentação deve impedir atravessar paredes, objetos e obstáculos baixos, com tolerâncias para portas/passagens.
- O editor e a simulação principais devem permanecer **utilizáveis offline**.
- Atualizações não devem descartar mapas ou replays locais silenciosamente.
- Adições complexas devem passar por análise de impacto, testes automatizados e teste com instrutores antes de integração à `main`.

## 5. Fonte e nível de evidência

A primeira auditoria (19/10/2026) avaliou a 0.1.6 no Edge em **35 observações**, inclusive falhas. A primeira revisão da 0.1.7 avaliou **69 observações**; a auditoria da candidata final (20/10/2026, SHA-256 `4fb6d2bc2afe6ef29240c0298b305af687f38df514845280649884e366ef838d`) registrou **90 observações** distribuídas em três conjuntos, incluindo falhas e reprodução dos cinco achados ainda abertos. Esses totais **não são contagens de aprovações** e não devem ser somados como testes independentes.

A auditoria confirma melhorias em DPI, pan, construção livre, históricos separados, CQB2/CQB3, importações defensivas e replay normal; não cobre Firefox/Safari, dispositivos móveis físicos, leitor de tela, longa duração real ou homologação tática.

O roadmap é um registro de trabalho, não compromisso com datas. [Versões](./CHANGELOG.md) · [Defeitos conhecidos](./KNOWN_ISSUES.md) · [Reportar](https://github.com/darksource32/CQB-Planner/issues/new/choose).
