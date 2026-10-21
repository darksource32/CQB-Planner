# Validação da Alpha 0.1.8 — candidata em desenvolvimento

**Branch:** `feat/alpha-0.1.8` · **Main permanece na 0.1.7** até conclusão dos critérios de aceite.

## Escopo protegido

- Não modificar `smoothPath`, `appendPointToPath`, `drawInteractivePreviews`, `makeSafeRoute`, `drawDirectionalArrow` nem `updateWaypointIndices`.
- Nenhuma intervenção na seta de orientação final; nenhuma alteração na colisão de obstáculos baixos.
- `.cqbmap` contém somente geometria (paredes, portas, obstáculos) e metadados de identificação.

## Observações já executadas (ambiente sintético / análise estática)

| Teste | Resultado |
| --- | --- |
| Parsing integral do JavaScript atualizado | Passou |
| IDs de HTML duplicados | Nenhum encontrado |
| Referências constantes `getElementById` ausentes no HTML | Nenhuma encontrada |
| Seis funções protegidas, comparação textual com a `main` | Sem alterações |
| Inicialização com cena vazia e modo Construção (DOM simulado) | Passou |
| Carregar layout de teste e zerar operadores | Passou |
| Seleção automática de operador por clique, ferramenta Parede ativa | Passou com coordenadas corretas de câmera |
| Clicar no operador sem iniciar desenho de parede | Passou |
| Encontrar ponto de edição no meio de segmento | Passou |
| Prefixo de rota preservado / comandos anteriores preservados / posteriores descartados | Passou |
| Cancelamento sem novo trecho | Passou |
| Desfazer reedição e recuperar rota/comandos | Passou |
| Tentativa de iniciar gravação com segmento 0,0001 (quantização incompatível) | Recusada sem ativar flag de gravação |
| CompressionStream / DecompressionStream + roundtrip GZIP no Chromium local | Passou em página `about:blank` |

**Observação:** esses testes ajudam a detectar problemas, mas **não equivalem à execução integrada do arquivo atualizado** em navegadores reais.

## Matriz para homologação antes do merge

- [ ] Importar o **CQB3 integral original de Brisa Cove**, conferir posição/quantidade de paredes, portas e obstáculos, exportar `.cqbmap`, reimportar e comparar cada coordenada e `blocksVision`.
- [ ] Abrir o `.cqbmap` offline a partir de `file://`, sem serviço local, nos navegadores Chromium e Firefox.
- [ ] Confirmar arquivo corrompido, assinatura ausente, versão errada, tamanho maior que 3 MB e conteúdo descompactado maior que 8 MB; **nenhum erro pode alterar a cena**.
- [ ] Criar, carregar, excluir e exportar mapas pessoais. Simular `localStorage` indisponível/lotado. Confirmar que mapas oficiais são independentes de mapas pessoais.
- [ ] Garantir aviso antes de substituir trabalho atual e ausência de operadores/rotas/imagem guia após carregar nova planta.
- [ ] Editar rota em vértice e no interior de segmento, com comandos antes/no/depois do corte; verificar desenho vermelho, confirmação, cancelamento com Escape, Ctrl+Z e execução depois.
- [ ] Repetir rota com múltiplos operadores selecionados, formações, sobreposições e no meio de um replay/gravando/pausado.
- [ ] Validar sobreposição da rota selecionada e seus indicadores sobre terceiros, sem alterar espessura/suavidade/preview em relação à 0.1.7.
- [ ] Selecionar operador com Parede, Porta, Aliado, Inimigo, Obstáculo e Borracha ativos; verificar fluxo de apagar pela seleção/tecla Delete.
- [ ] Exercitar teclas B, P, 1, 2, V, W, F, O, L, D, A, E, X, R, C e Espaço, inclusive durante edição de texto/modal.
- [ ] K-01: guia de 16001×1 px rejeitada na carga; gravação ao atingir duração/quadros máximos; replay salvo permanece após recarregar página e pode ser reproduzido.
- [ ] K-02: injetar erro durante preparação inicial; confirmar flag `recording=false` e estado intacto.
- [ ] K-03: mover parede e disparar `blur`/`pointercancel`; desfazer retorna estado anterior.
- [ ] K-04: abrir Importar/Exportar por botões diferentes; fechar por Escape ou X; foco retorna ao botão de origem.
- [ ] K-05: injetar falha única de `render` durante Play; interface muda para Pausado e pode retomar.
- [ ] Performance em mapa grande e checagem de estabilidade em sessão prolongada.
- [ ] Publicação do catálogo oficial **somente depois de receber e validar a planta original aprovada**.

## Investigação sem mudança de colisão: obstáculos baixos

`pointBlockedForNavigation` trata obstáculos sólidos e baixos igualmente como barreiras ao deslocamento; `canNavigateSegment` rejeita destinos ocupados e segmentos que cruzam caixas expandidas pelo raio de navegação. Isso é consistente com a regra atual de obstáculos baixos **bloquearem passagem, mas não visão**.

**Hipótese a investigar, ainda não reproduzida:** quando um operador já está sobre ou dentro do raio expandido de um obstáculo (por colocação, arrasto ou algum estado anterior), pequenos destinos podem continuar bloqueados, impedindo sua saída. Reproduzir com sequência de coordenadas e gravar vídeo antes de cogitar mudança. **Não corrigir nesta versão**.

## Bloqueadores atuais de publicação

1. Código/planta completa original de Brisa Cove não foi recuperado; catálogo oficial ainda não tem entrada real.
2. Ainda não houve teste integrado, visual, manual ou automatizado com o HTML alterado em navegador real. A matriz acima permanece pendente.
3. Revisão de integração e possíveis regressões remanescentes devem ocorrer antes de promover para `main`.

