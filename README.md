<div align="center">

# CQB Planner

**Planeje. Demonstre. Simule. Revise.**

Simulador tático **2D, top-down**, pensado para instruções, briefings e experimentação de movimentações em ambientes virtuais, com foco na comunidade de **Ready or Not**.

[![Versão](https://img.shields.io/badge/vers%C3%A3o-0.1.6%20Alpha-blue)](./CHANGELOG.md)
[![Estágio](https://img.shields.io/badge/est%C3%A1gio-Early%20Access-orange)](./CHANGELOG.md)
[![Plataforma](https://img.shields.io/badge/plataforma-Navegador-2ea44f)](./index.html)
[![Contribuições](https://img.shields.io/badge/PRs-bem--vindos-8250df)](./CONTRIBUTING.md)

[**Abrir código do aplicativo**](./index.html) · [**Reportar problema**](https://github.com/darksource32/CQB-Planner/issues) · [**Contribuir**](./CONTRIBUTING.md) · [**Histórico**](./CHANGELOG.md)

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

**Versão atual:** `0.1.6-alpha` · **Estágio:** Early Access

Esta versão prioriza uma base funcional para testes com instrutores. A arquitetura atual em arquivo único facilita a distribuição. Uma possível evolução futura é manter fontes de desenvolvimento separadas e gerar a mesma versão portátil em HTML na etapa de distribuição.

**Ideias para o futuro, ainda não implementadas:** biblioteca oficial de mapas didáticos, mapas locais do usuário, catálogo de cenários para briefings e aperfeiçoamentos do modo de instrução. São possibilidades em avaliação, **não funcionalidades prometidas**.

Veja o [CHANGELOG](./CHANGELOG.md) para acompanhar a versão publicada.

## Comunidade e contribuições

**Sugestões, relatórios de bugs, forks e pull requests são bem-vindos.** Você pode experimentar melhorias em uma cópia própria e enviar a proposta para avaliação dos mantenedores.

1. Veja as [issues](https://github.com/darksource32/CQB-Planner/issues) para descobrir problemas conhecidos e propostas.
2. Faça um **fork**, implemente a alteração em uma branch própria e teste.
3. Abra um **pull request** para `main`, descrevendo o problema, a solução, os testes e, quando aplicável, anexando imagens.
4. Os mantenedores revisam a alteração antes de decidir pela integração. Um PR enviado não implica aprovação automática.

Instruções detalhadas: [CONTRIBUTING.md](./CONTRIBUTING.md). Para erros reproduzíveis, envie uma [issue](https://github.com/darksource32/CQB-Planner/issues/new).

## Limitações conhecidas

- O projeto está em Alpha: comportamentos extremos e combinações incomuns de geometria ainda podem revelar falhas.
- Cenas muito complexas podem exigir otimizações de renderização e cálculos de campo de visão.
- A importação de mapas e replays deve ser utilizada com arquivos de origem confiável; o formato ainda está evoluindo.
- O armazenamento local não substitui um backup exportado.
- Não existe sincronização de biblioteca online, multiplayer ou simulador com tomada autônoma de decisões nesta versão.

## Tecnologias

**HTML5 · CSS3 · JavaScript · Canvas 2D**

Sem processo de compilação, servidor ou dependências de execução obrigatórias para usar a build atual.

## Autoria, uso e avisos

Desenvolvimento e manutenção do projeto: **[@darksource32](https://github.com/darksource32)**.

Este repositório é público para consulta, feedback e propostas de contribuição. **A presença do código no GitHub não concede, por si só, uma licença irrestrita para copiar, redistribuir ou utilizar comercialmente.** Os termos de licenciamento do projeto ainda precisam ser definidos pelo mantenedor. Em caso de dúvida sobre reutilização fora das funcionalidades normais do GitHub, entre em contato antes.

**CQB Planner** é um projeto independente, feito para simulações virtuais e instruções de jogos. Não é afiliado, patrocinado ou endossado pelos desenvolvedores de *Ready or Not*.

---

<div align="center">

**CQB Planner · Alpha Early Access 0.1.6**

*Construído com a comunidade, aprimorado a cada teste.*

</div>
