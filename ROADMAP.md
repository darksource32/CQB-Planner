# CQB Planner — Roadmap e registro de qualidade

**Versão de referência:** 0.1.6-alpha (Early Access) · **Estado:** planejamento e triagem, sem implementação nesta atualização.

Este documento reúne propostas do mantenedor e achados de revisão independente apresentados em **19/10/2026**. Ele é uma lista de trabalho para discussão e planejamento, **não uma promessa de lançamento nem uma declaração de que todos os itens já foram corrigidos**.

> O projeto é uma ferramenta 2D de simulação **fictícia** para jogos e instrução visual. Propostas de dinâmica de confronto, dispositivos e portas são descritas como **mecânicas abstratas de jogo**, não como orientação operacional para uso real.

## 1. Prioridade para estabilização pré-Beta

Um relatório externo descreveu **35 casos de observação no Microsoft Edge, incluindo falhas reproduzidas**. Não são 35 aprovações. Alguns resultados foram obtidos por simulação de densidade de pixels e por chamadas controladas ao código. Os achados abaixo são **relatados como confirmados pelo teste externo**, mas ainda precisam ser reproduzidos e triados pela manutenção na versão publicada.

| Prioridade | Área | Problema relatado | Critério de aceite proposto |
| --- | --- | --- | --- |
| **P0** | Coordenadas / DPI | Cliques, desenho e zoom deslocados em escalas de 125%, 150% e 200% | Transformações tela↔mundo consistentes em DPR 1, 1,25, 1,5 e 2 |
| **P0** | Replay malformado | Estruturas inválidas (por exemplo, parede `null`) podem ser aceitas e congelar a renderização | Validação completa antes de carregar; arquivo rejeitado sem danificar o estado ou interromper frames |
| **P0** | Imagem de replay | Um endereço remoto pode disparar uma requisição; imagem quebrada pode interromper o desenho | Restringir a formatos embutidos permitidos; validar limites e tolerar falha sem travar |
| **P0** | Segurança do trabalho | Abrir “Exemplo CQB” pode descartar alterações sem confirmação e sem desfazer | Confirmação e retorno recuperável do documento em qualquer modo |
| **P0** | Teclado / foco | Espaço pode reativar botão focado (inclusive ações destrutivas) e atalhos podem ser ignorados | Prioridade coerente de atalhos sem prejudicar acessibilidade; testes após clicar nos botões |
| **P0** | Persistência de projeto | Recarregar a página descarta o cenário em edição; código do mapa não salva a missão completa | Salvar/abrir projeto integral versionado; recuperação de sessão e aviso de alterações pendentes |
| **P1** | Importação de mapas | Valores ausentes, dimensões negativas e formatos desconhecidos podem passar pela validação | Verificar esquema, versão, números finitos, limites e importar de modo transacional |
| **P1** | Gravação de replay | Alterar a geometria durante a gravação mantém o cenário capturado antes da mudança | Bloquear alterações incompatíveis ou encerrar/segmentar gravação com aviso |
| **P1** | Layout | Controles podem ficar cortados em 1024 px e praticamente inacessíveis em 390 px | Definir largura mínima suportada, barra adaptável e acesso a todas as ações |
| **P1** | Modais | Tab alcança botões atrás do modal; Escape e retorno de foco incompletos | Diálogos acessíveis com foco contido, Escape, `aria-modal` e restauração |
| **P1** | Clipboard | Copiar código do mapa pode anunciar sucesso após falha de todas as APIs | Confirmar sucesso; senão, oferecer cópia manual sem falso positivo |
| **P1** | Portas | Apagar porta com borracha fecha vão; Delete em seleção apenas remove marcador | Definir e implementar regra uniforme, inclusive com Ctrl+Z |
| **P2** | Câmera | “Centralizar” volta a coordenada fixa em vez de enquadrar a planta | “Enquadrar mapa” calcula limites reais do cenário |
| **P2** | Replay / Reiniciar | Reiniciar global durante replay também reinicia a missão em segundo plano | Desabilitar ou esclarecer ações sobre estados não exibidos |
| **P2** | Consistência | Cronômetro pode exibir `00:60.00`; importador rejeita mapa vazio exportado pelo próprio app | Normalizar arredondamento e contratos de serialização; versão única no produto |

### Outros riscos relatados, ainda sem reprodução completa

- **Memória/armazenamento:** biblioteca inteira regravada em `localStorage`; replays e imagens embutidas podem exceder cotas; limitar duração/amostras e considerar IndexedDB.
- **Falha ao excluir replay:** retorno do armazenamento ignorado; exclusão pode parecer definitiva mesmo que não persista.
- **Gestos interrompidos:** revisar `pointercancel`, `lostpointercapture` e perda de foco para limpar estados de arrasto, desenho e tecla Espaço.
- **Histórico de edições:** Ctrl+Z limitado a snapshots no modo Construir, sem Refazer; documentar escopo e avaliar uso de memória.
- **Natureza do replay:** grava posições/orientações e visibilidade, não uma auditoria integral de ações e comandos da interface.
- **Estados globais:** padronizar transições entre Construir, Operação, Gravando, Pausado, Replay e Modal.

## 2. Arquitetura, manutenção e validação

1. **Fonte modular e HTML único:** separar interface, renderização, simulação, importação, persistência e controles no repositório; continuar distribuindo **um HTML único** por empacotamento automatizado na Beta. Não exige migração imediata.
2. **Visão e desempenho:** os raios são calculados por operador em cada quadro. Para cenários muito extensos, avaliar cache de segmentos, estruturas espaciais e testes de dezenas de salas/centenas de objetos.
3. **Importações defensivas:** ampliar verificações além da estrutura básica, incluindo versões, números finitos, geometrias inválidas, imagens, quantidade de objetos e limites de arquivo.
4. **Persistência:** replays locais podem desaparecer quando o navegador limpa seus dados; manter exportação JSON e criar backup de projeto completo.
5. **Fontes externas:** Google Fonts é opcional, mas altera tipografia e gera solicitação externa quando conectado; considerar fontes locais ou alternativas de sistema consistentes offline.
6. **Testes de campo:** validar mapas reais da comunidade, muitos operadores, diferentes navegadores, zoom/DPI, máquinas modestas e sessões longas. Edge automatizado não substitui Firefox/Safari nem hardware físico.
7. **Suíte de regressão:** automatizar reprodução de bugs de coordenadas, geometria, colisão, comandos de olhar, undo, importação, gravação e retorno de replay.
8. **Formatos versionados:** distinguir rigorosamente **código de mapa**, **projeto completo** e **replay**. Definir estratégia de compatibilidade/migração entre versões.

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
- **Código de mapa compacto:** reduzir o número de caracteres da exportação mantendo compatibilidade de importação e versões, sem sacrificar validação de dados.

## 4. Decisões de produto a preservar

- **O instrutor desenha a rota**; os operadores não inventam caminhos alternativos completos.
- A movimentação deve impedir atravessar paredes, objetos e obstáculos baixos, com tolerâncias para portas/passagens.
- O editor e a simulação principais devem permanecer **utilizáveis offline**.
- Atualizações não devem descartar mapas ou replays locais silenciosamente.
- Adições complexas devem passar por análise de impacto, testes automatizados e teste com instrutores antes de integração à `main`.

## 5. Fonte e nível de evidência

A base para os itens de estabilidade foi um **relatório externo de revisão do CQB Planner v0.1.6 apresentado em 19/10/2026**, com referências a linhas do HTML, testes automatizados no Edge e evidências locais. O relatório original declarou **35 casos de observação**, com reproduções de defeitos e algumas verificações que passaram; não fez auditoria completa de segurança, uso prolongado nem validação operacional.

Os itens de funcionalidades foram propostos pelo mantenedor para avaliação futura. Algumas constatações precisam ser reproduzidas pela manutenção antes de serem marcadas como issues confirmadas neste repositório.

**Sugestões da comunidade:** [abrir proposta](https://github.com/darksource32/CQB-Planner/issues/new/choose) · **Bugs:** [reportar](https://github.com/darksource32/CQB-Planner/issues/new/choose)
