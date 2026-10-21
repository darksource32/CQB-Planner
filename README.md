<div align="center">

# CQB Planner

**Planeje. Demonstre. Simule. Revise.**

Simulador tático **2D, top-down**, pensado para instruções, briefings e experimentação de movimentações em ambientes virtuais, com foco na comunidade de **Ready or Not**.

[![Versão](https://img.shields.io/badge/vers%C3%A3o-0.1.8%20Alpha-blue)](./CHANGELOG.md)
[![Estágio](https://img.shields.io/badge/est%C3%A1gio-Early%20Access-orange)](./CHANGELOG.md)
[![Plataforma](https://img.shields.io/badge/plataforma-Navegador-2ea44f)](./index.html)
[![Contribuições](https://img.shields.io/badge/PRs-bem--vindos-8250df)](./CONTRIBUTING.md)

[**Aplicativo**](./index.html) · [**Relatar bug**](https://github.com/darksource32/CQB-Planner/issues/new/choose) · [**Sugerir melhoria**](https://github.com/darksource32/CQB-Planner/issues/new/choose) · [**Roadmap**](./ROADMAP.md) · [**Contribuir**](./CONTRIBUTING.md)

</div>

> [!IMPORTANT]
> **Alpha Early Access v0.1.8.** Esta é uma versão experimental, já funcional, mas ainda em desenvolvimento e sujeita a mudanças. O CQB Planner é um recurso de visualização e instrução em **simulação fictícia**, não um substituto para treinamento, protocolos ou avaliação de segurança no mundo real.

## Sobre o projeto

O **CQB Planner** nasceu de uma necessidade simples: permitir que instrutores e participantes de uma comunidade de *Ready or Not* criem cenários rapidamente, posicionem personagens e demonstrem como uma movimentação **virtual** se desenvolve. Em vez de depender apenas de explicações verbais, o instrutor desenha a planta, programa os trajetos e acompanha a simulação em tempo real.

O foco é uma experiência **leve, visual, intuitiva e portátil**: hoje toda a aplicação cabe em **um único arquivo HTML** com CSS e JavaScript integrados. A versão atual não exige instalação, conta, backend ou engine de jogos.

## Comece a usar

1. Clique em **Code → Download ZIP** no GitHub e extraia os arquivos, ou baixe somente o [**index.html**](./index.html).
2. Abra **index.html** com um navegador moderno, de preferência Chromium, Chrome, Edge ou Firefox.
3. Escolha **Construir** para editar a planta e posicionar os elementos.
4. Vá para **Operação / Tático** para desenhar rotas, executar a simulação, pausar, demonstrar situações e gravar instruções.

**Funciona localmente e offline** para suas funcionalidades principais. As fontes externas opcionais podem ser substituídas automaticamente por fontes do sistema quando estiver sem internet.

## Funcionalidades da Alpha 0.1.8

| Área | Recursos disponíveis |
| --- | --- |
| **Editor de mapas** | Paredes, contornos retangulares, portas/vãos, obstáculos comuns e obstáculos baixos |
| **Unidades** | Posicionamento de operadores aliados (azul) e personagens adversários (vermelho) |
| **Planejamento** | Rotas desenhadas à mão, seleção individual/múltipla, deslocamento em equipe e comandos de direção do olhar |
| **Visibilidade** | Cones de visão com oclusão por paredes, obstáculos e personagens; revelação de adversários conforme contato visual |
| **Instrução** | Execução e pausa, reinício, controle de velocidade, visão do instrutor e demonstração de fatiamento/foco |
| **Construção** | Mover elementos, seleção em grupo, apagar seleção e desfazer alterações com **Ctrl+Z** |
| **Compartilhamento** | Importar códigos CQB1/CQB2/CQB3 e exportar plantas em arquivos `.cqbmap` compactados; carregar imagens guia |
| **Replay** | Gravar movimentações, reproduzir com controle de velocidade e linha do tempo, importar/exportar gravações contendo o cenário |
| **Biblioteca pessoal** | Salvar, carregar, excluir e exportar mapas no armazenamento local do navegador |
| **Rotas** | Reeditar trechos posteriores de uma rota e destacar a rota do operador selecionado acima dos demais |

### Princípio da movimentação

**O instrutor define a rota.** O simulador não escolhe sozinho outro corredor nem traça um caminho alternativo completo. O motor executa a trajetória desenhada com suavização e pequenos ajustes locais para lidar com a geometria; paredes e obstáculos sólidos bloqueiam o deslocamento.

**Obstáculos baixos** bloqueiam a passagem de personagens, mas permitem a visão através da área representada.

## Fluxo sugerido para uma instrução

**Construir → posicionar → traçar rotas → executar → pausar/replanejar → gravar → reproduzir.**

A gravação de replay armazena a movimentação e as orientações dos personagens, **não um vídeo**. A reprodução permite observar a sequência da instrução e inclui os elementos do cenário para que os personagens não apareçam se movimentando num mapa vazio.

## Controles rápidos

| Controle | Ação |
| --- | --- |
| **1 / B · 2 / T** | Construir · Operação (atalhos originais 1/2 preservados) |
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

- **Arquivo `.cqbmap`:** exporta somente a geometria (paredes, portas e obstáculos) em GZIP. Códigos CQB1/CQB2/CQB3 e JSON legados continuam aceitos **para importação**. Nenhum desses formatos salva operadores, rotas ou uma missão completa.
- **Biblioteca pessoal de mapas:** armazenamento local no navegador; faça backup dos mapas importantes exportando `.cqbmap`.
- **Replay:** registra a simulação e contém o cenário relacionado; pode ser compartilhado por arquivo JSON ou código de replay.
- **Biblioteca de replays:** utiliza armazenamento local do navegador. **Limpar os dados do navegador pode apagar as gravações**.
- **Backup:** exporte os replays importantes, **confirme que reabrem corretamente** e mantenha cópias. A persistência entre dispositivos não é automática.
- **Imagem guia:** pode ser utilizada como referência na construção.

## Estado do desenvolvimento

**Versão atual:** `0.1.8-alpha` · **Estágio:** Early Access experimental · **Distribuição:** arquivo HTML único local.

### O que mudou na 0.1.8

- Importação/exportação de mapas `.cqbmap` compactados, com leitura de códigos antigos.
- Biblioteca pessoal de mapas offline. O catálogo oficial está preparado; Brisa Cove pode ser importado pelo código CQB3 original e salvo como `.cqbmap`.
- Reedição parcial de rotas, preservando trecho e comandos anteriores ao corte; cancelamento e Desfazer.
- Rota do operador selecionado em camada superior, seleção direta no editor, abertura em Construção com mapa vazio.
- Novos atalhos **B/T** sem remover **1/2** e cones inimigos mais visíveis.
- Proteções e correções para os cinco achados K-01 a K-05 da auditoria anterior.

Os algoritmos de suavização, prévia de rota e navegação da 0.1.7 foram preservados. A orientação final já existente não foi alterada; a colisão com obstáculos baixos não recebeu correção.

### Versões anteriores e notas de atualização

**[Histórico de versões e downloads individuais](./VERSIONS.md)** · [Changelog completo](./CHANGELOG.md) · [Limitações conhecidas](./KNOWN_ISSUES.md) · [Roadmap](./ROADMAP.md).

A 0.1.8 passou em testes automatizados de navegação Chromium e Firefox, mas continua uma versão Alpha, não uma certificação de ausência de falhas. A interface em telas estreitas, sessões muito longas e mapas extensos ainda exigem avaliação.

### Comunidade

[Relatar bug](https://github.com/darksource32/CQB-Planner/issues/new/choose) · [Sugerir melhoria](https://github.com/darksource32/CQB-Planner/issues/new/choose) · [Contribuir](./CONTRIBUTING.md)

## Limitações e dados locais

- Mapas e replays armazenados no navegador podem ser perdidos se os dados locais forem apagados. Exporte backups importantes.
- Não existe salvamento automático de uma **operação completa**. O formato `.cqbmap` é estritamente geométrico.
- O catálogo oficial de mapas está preparado, mas ainda não inclui Brisa Cove embutido.
- Uso offline suportado; fontes externas opcionais podem variar conforme o navegador.
- Obstáculos baixos ainda podem provocar travamento de movimentação em alguns casos; nenhuma correção foi introduzida na 0.1.8.

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

**CQB Planner · Alpha Early Access 0.1.8**

*Construído com a comunidade, aprimorado a cada teste.*

</div>
