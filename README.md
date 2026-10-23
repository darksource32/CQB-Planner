# CQB Planner

**Planeje. Demonstre. Simule. Revise.**

Simulador 2D top-down para instruções e cenários **fictícios** de Ready or Not. A aplicação roda offline em um único arquivo HTML, sem backend nem instalação.

**Versão oficial:** Alpha Early Access **0.1.9**. Em **23/10/2026**, foi publicada uma **correção de manutenção R4 sem alteração de versão**, substituindo a build anterior em `index.html`.

[Abrir o aplicativo](./index.html) · [Histórico de mudanças](./CHANGELOG.md) · [Roadmap](./ROADMAP.md) · [Bugs conhecidos](./KNOWN_ISSUES.md) · [Versões históricas](./VERSIONS.md) · [Auditoria R4](./AUDITORIA_R4.md)

## Como usar

Baixe [index.html](./index.html), abra-o em um navegador moderno e escolha **Construir** para criar o cenário ou **Operação / Tático** para planejar, executar, pausar e reiniciar. O HTML inclui os mapas oficiais Brisa Cove/Idos de Março e The Spider/A Aranha.

- **Construção:** paredes, portas e vãos, obstáculos sólidos e baixos, unidades azuis/vermelhas, seleção, rotação e desfazer.
- **Planejamento:** rotas manuais, seleção individual ou em grupo, comandos temporários de olhar e fatiamento, rotas editáveis.
- **Simulação:** movimentos guiados pelas rotas do instrutor, colisão, visibilidade com oclusão geométrica, câmera e controle de velocidade.
- **Persistência:** mapa `.cqbmap` comprimido contém **apenas geometria**, não a missão completa; biblioteca de mapas e replays são locais ao navegador. Exporte backups. Códigos CQB1/CQB2/CQB3 continuam importáveis.
- **Replay:** guarda estados da execução, não vídeo; gravações podem ser exportadas e importadas.

## Manutenção R4 dentro da Alpha 0.1.9

A R4 corrige disparos simultâneos de vários aliados, distribuição de alvos, formação iniciada de qualquer operador (inclusive Bravo), bloqueios de visão por corpos, paredes próximas ao alvo e objetos rotacionados. Também otimiza o cálculo dos cones de visão.

**Modelo de combate:** campo de detecção aliado 70°; tiro somente ±15° do eixo; 0,38 s antes do primeiro disparo; intervalo de 0,12 s; 100 HP por inimigo; seis acertos de 16,6667 HP e tempo mínimo de 1,15 s de engajamento válido para neutralização. Ver um alvo não causa dano por si só.

**Desempenho:** em benchmark sintético com dois aliados e 36 inimigos, ~1,9 s por quadro na R3 e ~0,19 s na R4. Isso **não é medição de FPS em navegador real**.

**Testes conhecidos:** 46/46 testes de motor passaram em DOM simulado. Dez casos de teste de interface foram escritos, mas ainda exigem execução em um computador com Chromium. Consulte [metodologia de testes](./LEIA_ME_TESTES.md).

## Problemas conhecidos (não corrigidos)

- **K-R4-01, alta:** clique curto sem arrasto pode apagar uma formação sincronizada existente.
- **K-R4-02, média/alta:** reinício pode recuperar snapshot anterior e descartar unidades inseridas em algumas sequências de edição.

Ver [KNOWN_ISSUES.md](./KNOWN_ISSUES.md) e [AUDITORIA_R4.md](./AUDITORIA_R4.md). Ainda exigem validação: replays antigos com novos estados de dano, cenários grandes, compatibilidade entre navegadores e telas estreitas.

## Próximos passos

Estabilizar bugs K-R4-01/K-R4-02 e testes reais; investigar replays legados e desempenho sob carga; evoluir pontos de sincronização, loadouts, portas e equipamentos fictícios, patrulha de inimigos e persistência de **projeto completo**. Ideias futuras ainda não equivalem a requisitos aprovados. Veja [ROADMAP.md](./ROADMAP.md).

## Histórico do projeto

A 0.1.6 iniciou a linha de Early Access; a 0.1.7 consolidou interações, câmera e códigos compactos; a 0.1.8 introduziu biblioteca e exportação `.cqbmap`, reedição parcial de rotas e correções de regressão; a 0.1.9 trouxe prioridades de passagem, identidade de operadores e mapas oficiais; as candidatas locais R2/R3/R4 aperfeiçoaram combate, visibilidade, rotas e desempenho até a manutenção R4 aprovada em 23/10/2026. Histórico técnico preservado em [CHANGELOG.md](./CHANGELOG.md).

## Créditos e licença

**Criador e mantenedor:** [darksource32](https://github.com/darksource32). Assistência ao desenvolvimento e auditorias com OpenAI ChatGPT e Anthropic Claude; sem afiliação ou endosso oficial.

Licença **Source-Available · All Rights Reserved**. Consulte [LICENSE](./LICENSE) e [CONTRIBUTING.md](./CONTRIBUTING.md). Projeto independente e fictício, não afiliado aos criadores de Ready or Not.
