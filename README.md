<div align="center">

# CQB Planner

**Planeje. Demonstre. Simule. Revise.**

Simulador tático **2D, top-down**, pensado para instruções, briefings e experimentação de movimentações em ambientes virtuais, com foco na comunidade de **Ready or Not**.

[![Versão](https://img.shields.io/badge/vers%C3%A3o-0.1.7%20Alpha-blue)](./CHANGELOG.md)
[![Estágio](https://img.shields.io/badge/est%C3%A1gio-Early%20Access-orange)](./CHANGELOG.md)
[![Plataforma](https://img.shields.io/badge/plataforma-Navegador-2ea44f)](./index.html)
[![Contribuições](https://img.shields.io/badge/PRs-bem--vindos-8250df)](./CONTRIBUTING.md)

[**Aplicativo**](./index.html) · [**Relatar bug**](https://github.com/darksource32/CQB-Planner/issues/new/choose) · [**Sugerir melhoria**](https://github.com/darksource32/CQB-Planner/issues/new/choose) · [**Roadmap**](./ROADMAP.md) · [**Contribuir**](./CONTRIBUTING.md)

</div>

> [!IMPORTANT]
> **Alpha Early Access v0.1.7.** Esta é uma versão experimental, já funcional, mas ainda em desenvolvimento e sujeita a mudanças. O CQB Planner é um recurso de visualização e instrução em **simulação fictícia**, não um substituto para treinamento, protocolos ou avaliação de segurança no mundo real.

> [!NOTE]
> **Candidata Alpha 0.1.8 nesta branch de desenvolvimento.** O menu Importar / Exportar recebe `.cqbmap` (arquivo GZIP até 3 MB, somente geometria) e códigos legados; a biblioteca pessoal de mapas funciona offline; há reedição parcial e destaque da rota selecionada, seleção automática de operadores na Construção, abertura limpa e atalhos adicionais **B / P** sem remover **1 / 2**. As correções de replay/interface estão sob revisão. A biblioteca oficial ainda aguarda a planta aprovada de Brisa Cove. **Não é uma build publicada/homologada.** Veja [o plano de testes](./QA_0.1.8.md) e [o changelog](./CHANGELOG.md).

## Sobre o projeto

O **CQB Planner** nasceu de uma necessidade simples: permitir que instrutores e participantes de uma comunidade de *Ready or Not* criem cenários rapidamente, posicionem personagens e demonstrem como uma movimentação **virtual** se desenvolve. Em vez de depender apenas de explicações verbais, o instrutor desenha a planta, programa os trajetos e acompanha a simulação em tempo real.

O foco é uma experiência **leve, visual, intuitiva e portátil**: hoje toda a aplicação cabe em **um único arquivo HTML** com CSS e JavaScript integrados. A versão atual não exige instalação, conta, backend ou engine de jogos.

## Comece a usar

1. Clique em **Code → Download ZIP** no GitHub e extraia os arquivos, ou baixe somente o [**index.html**](./index.html).
2. Abra **index.html** com um navegador moderno, de preferência Chromium, Chrome, Edge ou Firefox.
3. Escolha **Construir** para editar a planta e posicionar os elementos.
4. Vá para **Operação / Tático** para desenhar rotas, executar a simulação, pausar, demonstrar situações e gravar instruções.

**Funciona localmente e offline** para suas funcionalidades principais. As fontes externas opcionais podem ser substituídas automaticamente por fontes do sistema quando estiver sem internet.

## Funcionalidades da Alpha 0.1.7

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

- **Código do mapa:** compartilhamento da geometria do cenário (paredes, portas e obstáculos). CQB2 suporta coordenadas inteiras; CQB3 suporta frações. Nenhum equivale a exportar toda a missão.
- **Replay:** registra a simulação e contém o cenário relacionado; pode ser compartilhado por arquivo JSON ou código de replay.
- **Biblioteca de replays:** utiliza armazenamento local do navegador. **Limpar os dados do navegador pode apagar as gravações**.
- **Backup:** exporte os replays importantes, **confirme que reabrem corretamente** e mantenha cópias. A persistência entre dispositivos não é automática.
- **Imagem guia:** pode ser utilizada como referência na construção.

## Estado do desenvolvimento

**Versão atual:** `0.1.7-alpha` · **Estágio:** Early Access experimental · **Distribuição:** HTML único local.

A Alpha oferece construção, execução e replay, mas **ainda existem riscos de integridade de dados**, particularmente em gravações com dados acima dos limites e na ausência de salvamento integral do projeto. Exporte replays importantes e preserve cópias de seus cenários.

### Preparação da Beta

O planejamento completo, incluindo critérios de aceite, está no **[ROADMAP.md](./ROADMAP.md)**. Prioridades:

- **Fechar K-01/K-02:** compatibilizar captura, validação, limites e persistência de replays; garantir início transacional.
- Implementar **salvar/abrir projeto completo** e recuperação, separando claramente projeto, código de mapa e replay.
- **Fechar K-03/K-04/K-05:** cancelar arrastos com undo coerente, devolver foco em todos os modais e sincronizar UI após recuperação de erro.
- Tornar a interface acessível em janelas menores e criar enquadramento automático de mapa; preservar correções já feitas de portas, clipboard e replay.
- Reforçar validações de mapas/replays, limites de arquivos e uso de memória; manter backups JSON.
- Separar arquivos-fonte no repositório **sem perder a versão distribuída em um único HTML**.
- Otimizar os cálculos de campo de visão para mapas extensos e testar em navegadores, escalas e máquinas diferentes.
- Manter CQB2/CQB3 e testar compatibilidade, precisão e arquivos antigos.

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

## Aviso importante sobre a 0.1.7

> [!WARNING]
> **Alpha Early Access, não estável/homologada.** A última auditoria independente identificou **cinco defeitos ainda abertos**. Em particular, gravações com imagens guia acima de limites do validador ou duração excessiva podem ser anunciadas como salvas, mas desaparecer da biblioteca após recarregar. **Confirme que replays importantes podem ser reabertos e mantenha backups.** O cenário completo de edição ainda não possui salvamento ou recuperação automática.

**[Ver problemas conhecidos, reproduções e limitações da versão](./KNOWN_ISSUES.md)** · **[Ver histórico completo da 0.1.7](./CHANGELOG.md)**

### Novidades desta Alpha

- Pan com **Espaço + arrastar** ou **botão central** tanto em Construção quanto em Operação/replay; toque breve em Espaço segue iniciando/pausando.
- Construção livre com **Alt** sem snap obrigatório e prévia suave da rota durante desenho.
- Destaque de seleção em paredes, portas e obstáculos, mantendo anel dourado de aliados/inimigos.
- Ao concluir rota com fatiamento, operador conserva a direção focalizada sem prender a próxima rota à instrução anterior.
- Catálogo de exemplos com confirmação e restauração temporária do documento e seu histórico; novos modelos didáticos preparados, mas indisponíveis.
- **CQB2** compacto para mapas inteiros, **CQB3** para frações com precisão de 0,001 unidade; mantém leitura de formatos anteriores. Teste do cenário padrão: CQB1 229 caracteres → CQB2 85.
- Reforço de validação de mapas/replays, rejeição de fontes remotas de imagem em replay, controles de modais, clipboard, cronômetro, mapa vazio, exclusão de portas e reinício de replay.

### Ainda exige atenção

A auditoria registrou cinco defeitos específicos: **K-01** replay anunciado como salvo pode ser inválido para reabertura; **K-02** início de gravação pode ficar em estado parcial após erro de exportação; **K-03** edição interrompida pode perder o registro de Desfazer; **K-04** foco do modal Código do Mapa pode não ser restaurado; **K-05** status visual pode não acompanhar pausa após erro de renderização. Consulte [KNOWN_ISSUES.md](./KNOWN_ISSUES.md).

## Limitações e riscos conhecidos

Auditorias no Edge/Playwright realizadas em 19–20/10/2026 identificaram e testaram vários defeitos. A última registrou **90 casos de observação** (incluindo reproduções de falhas, não 90 aprovações). Diversos defeitos da 0.1.6 foram corrigidos na 0.1.7, mas **cinco achados de integridade e foco ainda estão abertos**.

Os riscos atuais mais urgentes envolvem **consistência entre gravação e reabertura de replay**, início transacional da captura, interrupção de arrastos sem histórico e consistência de foco/status após erros. Permanecem limitações de **projeto não salvo integralmente** e **telas estreitas**. Consulte [problemas reproduzidos](./KNOWN_ISSUES.md) e [roadmap](./ROADMAP.md).

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

**CQB Planner · Alpha Early Access 0.1.7**

*Construído com a comunidade, aprimorado a cada teste.*

</div>
