# Problemas conhecidos — Alpha Early Access 0.1.7

**Publicado:** 20/10/2026 · **Estado:** Alpha experimental, não homologada como estável.

Este registro distingue defeitos **reproduzidos** na auditoria independente da Astra (Edge/Playwright, 90 casos de observação em três suítes) de limitações planejadas. A build publicada é a candidata de estabilização de SHA-256 `4fb6d2bc2afe6ef29240c0298b305af687f38df514845280649884e366ef838d`; nenhuma das correções abaixo foi aplicada depois dessa auditoria.

> **Aviso para instrutores:** não confie apenas no aviso “Replay salvo” para gravações importantes. Teste a reprodução e mantenha backup exportado. O documento completo de edição **não** é salvo automaticamente ao recarregar a página.

## Achados reproduzidos que precisam de correção

| ID | Severidade | Problema | Reprodução / evidência | Critério de aceite |
| --- | --- | --- | --- | --- |
| **[K-01](https://github.com/darksource32/CQB-Planner/issues/2)** | **Alta** | Gravador aceita dados que o leitor rejeita; replay “salvo” pode desaparecer da biblioteca após recarga. | PNG guia válido 16.001 × 1 px (arquivo abaixo de 12 MB) é aceito no editor, mas excede limite do validador (16.000 px por dimensão). Gravação acima de 21.600 s forçada sinteticamente também é rejeitada. A biblioteca filtra o item inválido. | Uma gravação só recebe confirmação de salvamento após validação equivalente à de leitura, persistência efetiva e possibilidade de reabertura após recarga. Unificar limites de dimensões, duração, quadros e unidades. Tratar explicitamente limites atingidos. |
| **[K-02](https://github.com/darksource32/CQB-Planner/issues/3)** | **Média** | Início de gravação deixa estado parcial quando a captura falha. | Importar segmento de comprimento 0,0001, aceito numericamente; iniciar gravação leva a erro de quantização, mas `recording=true`, `scenario=null` e botão Finalizar indisponível. | Preparar e validar cenário e primeiro quadro antes de ativar a gravação. Em falha, manter estado anterior, controles consistentes e nenhuma entrada inválida. |
| **[K-03](https://github.com/darksource32/CQB-Planner/issues/4)** | **Média** | Cancelamento de arrasto pode conservar movimento sem histórico de Desfazer. | Arrastar parede selecionada; disparar perda de foco antes de soltar; a parede muda, mas o histórico permanece sem entrada. Blur foi sintético no ensaio. | Interrupção deve reverter a edição ou confirmá-la com uma entrada válida de histórico; testar drag e redimensionamentos. |
| **[K-04](https://github.com/darksource32/CQB-Planner/issues/5)** | **Baixa/média** | Modal de Código do Mapa pode não devolver o foco ao botão que o abriu. | Abrir Código do Mapa → Tab → Escape: `document.activeElement` fica no botão interno oculto `btn-copy-map-code`. | Registrar sincronamente o acionador, antes de abrir/focar o diálogo. Escape, Fechar, seleção de texto e tentativa de cópia devem restaurar foco ao controle de origem. |
| **[K-05](https://github.com/darksource32/CQB-Planner/issues/6)** | **Baixa/média** | Erro recuperado deixa status de pausa incoerente na UI. | Após exceção sintética única em `render()` durante execução: `state.isPlaying=false`, mas botão mostra “Pausar” e status “EXECUTANDO”. Ciclo de quadros prossegue. | Transição de pausa sincroniza estado, rótulos, classes e atributos acessíveis; usuário pode retomar sem perder o documento. |

### Detalhes e medidas provisórias

- **K-01:** cargas e durações comuns passaram em testes; o defeito ocorre em limites incompatíveis entre editor, produtor e validador. É importante manter exportações externas de replays de valor e verificar reabertura. Não atribuir ao teste sintético de seis horas a equivalência com seis horas reais de gravação.
- **K-02:** o erro de quantização está correto; a transição parcial de estado é o defeito. A escolha entre rejeitar geometria minúscula no importador e aceitar para edição deve ser explicitada.
- **K-03:** a reprodução usou mouse real e blur injetado; não implica que todo Alt+Tab reproduza o problema em qualquer SO.
- **K-04:** contenção de Tab/Shift+Tab dentro dos quatro modais foi confirmada. Apenas a recuperação do foco do Código do Mapa ficou pendente na auditoria.
- **K-05:** falha do renderizador foi artificialmente injetada, não espontânea durante operação normal.

## Limitações conhecidas para a Beta

| Área | Estado na 0.1.7 | Planejamento |
| --- | --- | --- |
| **Projeto editável** | Não existe salvar/abrir/autorecuperar projeto integral; recarregar página perde sessão atual, mesmo que códigos de mapa e replays possam ser exportados separadamente. | Formato versionado e persistência de projeto completo; recuperação e aviso antes de descartar trabalho. |
| **Layout estreito** | Barra de ferramentas pode cortar ações em 1024 px; em 390 px, também os comandos principais. | Layout adaptável e testes móveis reais. |
| **Centralizar** | Reposiciona visualização em coordenadas fixas, não enquadra toda geometria. | Calcular limites reais de objetos e ajustar câmera. |
| **Desempenho** | Visão com raycasting em tempo real e estados globais; ainda sem ensaios prolongados de cenas muito grandes. | Cache/otimização espacial, medições de FPS/memória e testes de carga. |
| **Armazenamento** | Biblioteca usa armazenamento local e pode atingir cotas ou desaparecer ao limpar dados do navegador. | Limites de captura, tratamento de quota, backups/IndexedDB quando justificado. |
| **Portabilidade** | Fontes externas opcionais podem fazer solicitações e variar em modo offline. | Fontes locais ou fallback visual consistente. |
| **Cobertura** | Testado principalmente Edge/Chromium; sem teste físico de dispositivos móveis, Firefox/Safari, leitor de tela ou sessão contínua real de seis horas. | Matriz ampliada de regressão e compatibilidade. |
| **Evoluções didáticas** | Catálogo possui apenas exemplo genérico funcional; outros nomes são espaços reservados. | Publicar cenários didáticos revisados pelo instrutor, biblioteca pessoal e eventual catálogo online. |

## Melhorias confirmadas nesta Alpha

- Conversão de coordenadas DPI e zoom, câmera via Espaço+arrasto/botão central, construção com Alt, prévia suave de rotas, destaque das estruturas.
- Desfazer original preservado ao carregar e restaurar exemplos; recuperação temporária do cenário.
- Importação defensiva de mapas, JSON fracionário legado, CQB2 inteiro e CQB3 decimal (erro máximo de quantização perto de 0,0005).
- Validação de vários tipos de replay corrompido e bloqueio de imagens HTTPS; imagem quebrada não parou os quadros nos cenários ensaiados.
- Bloqueio de alterações estruturais verificadas durante gravação, exclusão de portas consistente, reinício dentro de replay, foco modal contido na navegação Tab/Shift+Tab.
- Clipboard, virada de minuto do cronômetro e exportação/importação de mapa vazio corrigidos.

**Escopo da evidência:** 90 observações de auditoria incluem falhas, não 90 testes aprovados. Nenhuma auditoria comprova ausência total de bugs, robustez absoluta contra arquivos hostis ou fidelidade operacional.

## Como reportar

Abra um [relato de bug](https://github.com/darksource32/CQB-Planner/issues/new/choose), indicando versão, navegador, passos exatos, resultado esperado/obtido, captura quando possível e se o arquivo contém dados sensíveis. Veja [ROADMAP.md](./ROADMAP.md) para os trabalhos futuros e [CHANGELOG.md](./CHANGELOG.md) para histórico.
