<div align="center">

# CQB Planner

**Planeje. Demonstre. Simule. Revise.**

Simulador tático **2D, top-down**, pensado para instruções, briefings e experimentação de movimentações em ambientes virtuais, com foco na comunidade de **Ready or Not**.

[![Versão](https://img.shields.io/badge/vers%C3%A3o-0.1.6%20Alpha-blue)](./CHANGELOG.md)
[![Estágio](https://img.shields.io/badge/est%C3%A1gio-Early%20Access-orange)](./CHANGELOG.md)
[![Plataforma](https://img.shields.io/badge/plataforma-Navegador-2ea44f)](./index.html)
[![Contribuições](https://img.shields.io/badge/PRs-bem--vindos-8250df)](./CONTRIBUTING.md)

[**Aplicativo**](./index.html) · [**Relatar bug**](https://github.com/darksource32/CQB-Planner/issues/new/choose) · [**Sugerir melhoria**](https://github.com/darksource32/CQB-Planner/issues/new/choose) · [**Roadmap**](./ROADMAP.md) · [**Contribuir**](./CONTRIBUTING.md)

</div>

> [!IMPORTANT]
> **Alpha Early Access v0.1.6.** Esta é uma versão experimental, já funcional, mas ainda em desenvolvimento e sujeita a mudanças. O CQB Planner é um recurso de visualização e instrução em **simulação fictícia**, não um substituto para treinamento, protocolos ou avaliação de segurança no mundo real.

## Sobre o projeto

O **CQB Planner** nasceu de uma necessidade simples: permitir que instrutores e participantes de uma comunidade de *Ready or Not* criem cenários rapidamente, posicionem personagens e demonstrem como uma movimentação **virtual** se desenvolve. Em vez de depender apenas de explicações verbais, o instrutor desenha a planta, programa os trajetos e acompanha a simulação em tempo real.

O foco é uma experiência **leve, visual, intuitiva e portátil**: hoje toda a aplicação cabe em **um único arquivo HTML** com CSS e JavaScript integrados. A versão atual não exige instalação, conta, backend ou engine de jogos.

## Comece a usar

1. Clique em **Code → Download ZIP** no GitHub e extraia os arquivos, ou baixe somente o [**index.html**](./index.html).
2. Abra **index.html** com um navegador moderno, de preferência Chromium, Chrome, Edge ou Firefox.
3. Escolha **Construir** para editar a planta e posicionar os elementos.
4. Vá para **Operação / Tático** para desenhar rotas, executar a simulação, pausar, demonstrar situações e gravar instruções.

**Funciona localmente e offline** para suas funcionalidades principais. As fontes externas opcionais podem ser substituídas automaticamente por fontes do sistema quando estiver sem internet.

## Funcionalidades da Alpha 0.1.6

| Área | Recursos disponíveis |
| --- | --- |
| **Editor de mapas** | Paredes, contornos retangulares, portas/vãos, obstáculos comuns e obstáculos baixos |
| **Unidades** | Posicionamento de operadores aliados (azul) e personagens adversários (vermelho) |
| **Planejamento** | Rotas desenhadas à mão, seleção individual/múltipla, deslocamento em equipe e comandos de direção do olhar |
| **Visibilidade** | Cones de visão com oclusão por paredes, obstáculos e personagens; revelação de adversários conforme contato visual |
| **Instrução** | Execução e pausa, reinício, controle de velocidade, visão do instrutor e demonstração de fatiamento/foco |
| **Construção** | Mover elementos, seleção em grupo, apagar seleção e desfazer alterações com **Ctrl+Z** |
| **Compartilhamento** | Importar/exportar **códigos de mapas** e carregar imagens de planta como referência |
| **Replay** | Gravar movimentações, reproduzir com controle de velocidade e linha do tempo, importar/exportar gravações contendo o cenário |

### Princípio da movimentação

**O instrutor define a rota.** O simulador não escolhe sozinho outro corredor nem traça um caminho alternativo completo. O motor executa a trajetória desenhada com suavização e pequenos ajustes locais para lidar com a geometria; paredes e obstáculos sólidos bloqueiam o deslocamento.

**Obstáculos baixos** bloqueiam a passagem de personagens, mas permitem a visão através da área representada.

## Fluxo sugerido para uma instrução

**Construir → posicionar → traçar rotas → executar → pausar/replanejar → gravar → reproduzir.**

A gravação de replay armazena a movimentação e as orientações dos personagens, **não um vídeo**. A reprodução permite observar a sequência da instrução e inclui os elementos do cenário para que os personagens não apareçam se movimentando num mapa vazio.

## Controles rápidos

| Controle | Ação |
| --- | --- |
| **1 / 2** | Construir / Operação |
| **V** | Selecionar no modo Construir |
| **W / F** | Parede / contorno retangular |
| **O / L** | Obstáculo comum / baixo |
| **D** | Porta ou vão em uma parede |
| **A / E** | Adicionar aliado / adversário |
| **Ctrl + Z** | Desfazer edição no modo Construir |
| **Delete** | Apagar seleção no editor ou limpar rotas no modo Operação |
| **Espaço** | Iniciar/pausar a simulação |
| **R** | Reiniciar a missão |
| **Ctrl + clique** | Seleção múltipla de operadores |
| **Botão direito sobre rota** | Definir direção temporária de olhar |
| **Shift + botão direito** | Definir fatiamento/foco durante a rota |
| **Roda do mouse** | Zoom da visualização |

Os botões da interface apresentam dicas contextuais. Alguns controles dependem do modo atual e do objeto selecionado.

## Replays, mapas e dados locais

- **Código do mapa:** compartilhamento da geometria do cenário (paredes, portas e obstáculos); não equivale a exportar toda a missão.
- **Replay:** registra a simulação e contém o cenário relacionado; pode ser compartilhado por arquivo JSON ou código de replay.
- **Biblioteca de replays:** utiliza armazenamento local do navegador. **Limpar os dados do navegador pode apagar as gravações**.
- **Backup:** exporte os replays importantes. A persistência entre dispositivos não é automática.
- **Imagem guia:** pode ser utilizada como referência na construção.

## Estado do desenvolvimento

**Versão atual:** `0.1.6-alpha` · **Estágio:** Early Access · **Distribuição:** HTML único local.

A Alpha oferece construção, execução e replay, mas **ainda existem riscos de estabilidade e perda de dados relatados numa revisão externa**, especialmente em importações, escalas de tela e ausência de salvamento integral do projeto. Exporte replays importantes e preserve cópias de seus cenários.

### Preparação da Beta

O planejamento completo, incluindo critérios de aceite, está no **[ROADMAP.md](./ROADMAP.md)**. Prioridades:

- Corrigir coordenadas de clique/zoom em DPI 125%–200%, importação de arquivos inválidos e imagens quebradas que podem interromper a animação.
- Implementar **salvar/abrir projeto completo** e recuperação, separando claramente projeto, código de mapa e replay.
- Proteger alterações contra ações destrutivas como carregar um exemplo; revisar conflitos de teclado, foco de botões e modais.
- Tornar a interface acessível em janelas menores; unificar exclusão de portas, cópia de código e reinício durante replay.
- Reforçar validações de mapas/replays, limites de arquivos e uso de memória; manter backups JSON.
- Separar arquivos-fonte no repositório **sem perder a versão distribuída em um único HTML**.
- Otimizar os cálculos de campo de visão para mapas extensos e testar em navegadores, escalas e máquinas diferentes.
- Reduzir o tamanho dos códigos compartilháveis de mapas, com compatibilidade e formatos versionados.

### Ideias para a simulação (ainda não implementadas)

- Biblioteca oficial de mapas didáticos e plantas de *Ready or Not*, mapas pessoais locais e possível catálogo online.
- Sistema de **vida e dano** dos aliados; patrulha virtual de adversários com preferência visual pelas portas; reação simulada de adversários com menor precisão e regras de balanceamento.
- Flashbangs **fictícias**, até duas por operador, com prévia visual de trajetória, rebotes, área de efeito e atordoamento de jogo com duração proposta de **3 segundos**.
- Portas fechadas bloqueando visão, com interações simuladas de abertura e arrombamento; versões abstratas de efeitos de chute e carga fictícia com confirmação.
- Correção de casos em que operadores ficam presos em obstáculos baixos; ajuste fino da seta de direção final da rota, inclusive fora de ângulos retos.

Os detalhes e prioridades técnicas dessas propostas estão no [roadmap](./ROADMAP.md). São **possibilidades em avaliação, não promessas de implementação**.

## Comunidade e contribuições

A comunidade pode registrar bugs e propor recursos, mesmo sem conhecer programação:

- **[Relatar bug](https://github.com/darksource32/CQB-Planner/issues/new/choose)**: formulário com versão, ambiente, passos, resultado esperado e observado.
- **[Sugerir atualização](https://github.com/darksource32/CQB-Planner/issues/new/choose)**: formulário para ideias e necessidades.
- **[Acompanhar issues](https://github.com/darksource32/CQB-Planner/issues)**: relatos da comunidade e status de avaliação.
- **[Enviar um fork / pull request](./CONTRIBUTING.md)**: contribuições de código passam por revisão da manutenção antes de entrar na `main`.

## Limitações e riscos conhecidos

Uma revisão externa de software realizada em 19/10/2026 registrou **35 casos de observação no Edge, inclusive falhas**, com testes de densidade de pixels emulada e chamadas controladas. **Não foram 35 aprovações.** Os achados ainda precisam ser reproduzidos e priorizados pela manutenção.

Os mais urgentes envolvem clique deslocado em certas escalas, replay malformado ou imagem inválida podendo interromper a renderização, perda de trabalho não salvo, importação permissiva, gravação e importação simultâneas, atalhos e telas estreitas. Confira os [achados detalhados e critérios de correção](./ROADMAP.md).

Replays são armazenados localmente no navegador e podem ser apagados ao limpar dados. Fontes externas são opcionais, mas podem mudar a tipografia offline. Ainda não há sincronização de mapas ou multiplayer.

## Tecnologias

**HTML5 · CSS3 · JavaScript · Canvas 2D**

Sem processo de compilação, servidor ou dependências de execução obrigatórias para usar a build atual.

## Autoria, créditos e licença

**Criador e mantenedor:** [@darksource32](https://github.com/darksource32).

**Assistência técnica ao desenvolvimento:** **OpenAI GPT-6 (ChatGPT)** e **Anthropic Claude**, com contribuições de implementação, ideias, diagnóstico e revisão. Esses créditos reconhecem o uso das ferramentas de IA, **não significam afiliação oficial, endosso das empresas ou contas GitHub de colaboradores com acesso**.

**Licença:** [**Source-Available · All Rights Reserved**](./LICENSE). Permite executar versões oficiais para uso pessoal/educacional/comunitário não comercial, estudar o código e trabalhar em forks e pull requests pelo fluxo do GitHub. **Redistribuição externa, republicação de cópias ou versões modificadas e uso comercial exigem autorização expressa**, ressalvados direitos previstos em lei. Esta não é uma licença open source OSI.

Leia os termos completos em [LICENSE](./LICENSE) e as condições de envio de contribuições em [CONTRIBUTING.md](./CONTRIBUTING.md).

Projeto independente para jogos e simulações fictícias, não afiliado ou endossado pelos desenvolvedores de *Ready or Not*.

---

<div align="center">

**CQB Planner · Alpha Early Access 0.1.6**

*Construído com a comunidade, aprimorado a cada teste.*

</div>
