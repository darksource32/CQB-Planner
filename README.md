# CQB Planner

**Planeje. Demonstre. Simule. Revise.**

Ferramenta 2D *top-down* para construir ambientes, planejar rotas e demonstrar simulações fictícias de **Ready or Not**. Funciona **offline**, com HTML, CSS e JavaScript em um único arquivo, sem conta, backend ou instalação.

**Versão atual:** **0.1.9 Alpha · Early Access** (manutenção R7, 25/10/2026). As manutenções R4–R7 não mudaram a numeração da versão.

[**Abrir aplicativo**](./index.html) · [Histórico e versões anteriores](./CHANGELOG.md) · [Roadmap e problemas conhecidos](./ROADMAP.md) · [Como contribuir](./CONTRIBUTING.md)

## Funcionalidades

- **Construir:** paredes, portas/vãos, obstáculos comuns e baixos, planta guia, seleção múltipla, rotação e desfazer.
- **Operação:** unidades aliadas (azuis) e inimigas (vermelhas), rotas manuais, planejamento em equipe, orientação de olhar e fatiamento, pausa, velocidade e reinício.
- **Visão e combate:** campo de detecção aliado de 70° e disparo somente a ±15°; rastreamento automático e prioridades temporais das orientações, oclusão por paredes, obstáculos e corpos. Perfis independentes e determinísticos por operador.
- **Biblioteca:** mapas oficiais Brisa Cove/Idos de Março e The Spider/A Aranha, mapas pessoais e exportação `.cqbmap` (somente geometria; não inclui unidades nem rotas).
- **Replay:** gravação de estados e eventos de combate, reprodução e exportação de arquivos. Replay não é gravação de vídeo.
- **Offline:** abra `index.html` diretamente no navegador. Dados da biblioteca local podem ser perdidos ao limpar o armazenamento; exporte backups.

### Regras de combate atuais

| Parâmetro | Valor |
| --- | --- |
| Reação até o primeiro disparo | variável entre 0,30 e 0,40 s |
| Intervalo instantâneo entre disparos | 0,07–0,14 s |
| Cadência média individual | 500–600 RPM |
| Acertos para neutralização | 5–7 |
| Dano por acerto | ajustado para 100 HP / acertos necessários |
| Vida do inimigo | 100 HP |
| Engajamento mínimo | 1,05–1,20 s |
| Ângulo de disparo | ±15° |
| Detecção visual aliada | 70° |

**Precedência de orientação na R7:** orientação anterior < inimigo detectado < nova orientação executada. O operador pode detectar fora da janela de tiro, girar para alinhar e só então disparar.

## Começar a usar

1. Baixe [index.html](./index.html) e abra no Chrome, Edge ou Firefox.
2. Entre em **Construir**, desenhe o ambiente e posicione os personagens.
3. Use **Operação / Tático** para traçar rotas e adicionar comandos de orientação.
4. Aperte **Play** para executar; pause, replaneje e reinicie quando necessário.
5. Exporte mapas ou replays importantes para não depender apenas do armazenamento local.

## Testes de regressão

A equipe mantém uma suíte com duas camadas: **testes de motor em Node.js** e **testes de interface automatizados no Chromium usando Python/Playwright**. Na avaliação da R7, **98/98 testes do motor passaram em simulação**; havia **21 testes de navegador preparados**, e o mantenedor confirmou a aprovação dos 15 casos que executou em seu Windows. Esses números **não são homologação de todos os navegadores nem garantia de ausência de bugs**.

Os scripts executáveis foram entregues separadamente no pacote de testes R7; **não estão atualmente versionados neste repositório**. No Windows, com o pacote extraído, instale Node.js 20+, Python 3.10+ e, para os testes de navegador, execute uma vez:

```bat
py -m pip install playwright
py -m playwright install chromium
```

Depois execute `testar_cqb.bat` dentro do pacote de testes. Ele gera relatórios na pasta `relatorios/`; quando falhar, envie os relatórios e capturas de tela para diagnóstico. A cada bug corrigido, devemos acrescentar um caso de regressão e repetir as duas camadas antes de publicar. O arquivo distribuído precisa corresponder à versão do HTML em teste.

## Estado do projeto e limitações

A **R7 é a build oficial da Alpha 0.1.9**. Foram corrigidos na evolução R4–R7: disparos independentes, distribuição de alvos, oclusão geométrica e de corpos, formação iniciada por Bravo, tempos individuais, restauração ao primeiro Play, clique curto sobre formações, eventos de combate no replay e precedência da mira.

**Problema conhecido:** cruzamentos simultâneos complexos com 4–6 aliados ainda podem bloquear a movimentação, inclusive na lógica da R4, preservada na R7. Outros itens ainda precisam de testes reais de carga, sessão longa e compatibilidade. Consulte [ROADMAP.md](./ROADMAP.md).

## História e versões

O [CHANGELOG.md](./CHANGELOG.md) reúne os marcos 0.1.6 → 0.1.9, manutenções R4/R7, referências das versões antigas e decisões técnicas. Relatórios de auditoria avulsos foram consolidados ou arquivados no histórico Git para manter a raiz organizada.

## Autoria e licença

**Criador e mantenedor:** [@darksource32](https://github.com/darksource32). Assistência de desenvolvimento com OpenAI ChatGPT e Anthropic Claude, sem afiliação oficial.

**Source-Available · All Rights Reserved**: consulte [LICENSE](./LICENSE) e [CONTRIBUTING.md](./CONTRIBUTING.md). Projeto independente para simulações fictícias, sem afiliação aos desenvolvedores de Ready or Not.
