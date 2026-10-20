# Histórico de versões

Todas as alterações de maior relevância serão registradas aqui. A numeração abaixo identifica o estado do **Early Access**, não uma promessa de estabilidade definitiva.

## [0.1.7-alpha] — 2026-10-20

**Alpha Early Access publicada para teste comunitário.** Esta não é uma versão estável homologada. A implementação reflete a candidata RC de estabilização verificada em auditorias independentes, **sem correções posteriores aos cinco achados finais**. Consulte [problemas conhecidos](./KNOWN_ISSUES.md) e [roadmap](./ROADMAP.md).

### Adicionado

- **Navegação de câmera:** segurar Espaço e arrastar para mover a visualização em Construção e Operação; arrastar com botão central como alternativa, também durante execução e replay. Pressão breve de Espaço preserva Play/Pause.
- **Construção livre com Alt:** desenhar paredes, contornos retangulares, obstáculos e obstáculos baixos sem alinhamento obrigatório à grade, mantendo snap padrão sem Alt.
- **Prévia suavizada da rota** durante o desenho, em consonância com a apresentação da trajetória concluída, sem modificar o motor de movimento.
- **Seleção de estruturas com destaque** azul em paredes, portas e obstáculos; personagens mantêm exclusivamente seu indicador de seleção dourado.
- **Catálogo preparado para exemplos didáticos:** exemplo genérico permanece funcional; entradas futuras de Run the Rabbit, Gancho, Cruzado, Double Stack e Single Stack continuam indisponíveis até elaboração dos cenários.
- **Códigos compactos:** CQB2 para geometrias inteiras e CQB3 para coordenadas fracionárias (precisão decimal de três casas); leitura de códigos CQB1 e JSON legados suportados. No mapa padrão, CQB2 tem 85 caracteres contra 229 do CQB1 (redução aproximada de 63%).

### Corrigido — edição, interação e fluxo do instrutor

- Conversões Canvas/tela/mundo e zoom ancorado no cursor nas escalas DPR 1, 1,25, 1,5 e 2.
- Conflitos de atalhos com foco em botões, inclusive Play/Pause indevido ao terminar o gesto Espaço+arrasto; encerramento do pan por perda de captura do ponteiro.
- **Fatiamento ao terminar a rota:** operador conserva a orientação final do foco, sem prender a próxima rota ao foco anterior.
- Abrir exemplo requer confirmação e disponibiliza restauração temporária; histórico de Desfazer separado por documento/exemplo, preservado ao restaurar o cenário original.
- Validação de mapas antes da mutação: rejeição de formatos, versões, geometrias e valores inválidos, mantendo documento/IDs em erros testados.
- Importação de JSON com coordenadas fracionárias recuperada; CQB3 reduz o erro da exportação livre a no máximo aproximadamente 0,0005 unidade.
- Cópia de código deixa de declarar sucesso quando todas as tentativas falham; disponibiliza cópia manual.
- Virada de minuto do cronômetro; ida e volta de mapas vazios; título e selo da versão.
- Portas: exclusão via borracha e seleção mantém regra equivalente para o vão.
- Reiniciar durante replay retorna o próprio replay ao início, sem reiniciar a missão guardada.
- Modais: melhor contenção do foco com Tab/Shift+Tab e Escape, com ressalva no **retorno de foco do modal Código do Mapa** descrita nos problemas conhecidos.

### Corrigido — importação e reprodução

- Replay malformado é rejeitado nas reproduções conhecidas: dados nulos, durações e quadros inválidos, IDs de unidades e estruturas inconsistentes e tipos indevidos.
- Replays com URL de imagem externa são rejeitados; imagem incorporada não decodificável não interrompe a reprodução nos cenários testados.
- Erros inesperados no renderizador não encerram permanentemente o agendamento de quadros; **a interface ainda pode ficar visualmente incoerente após a recuperação**.
- Importar mapa, carregar exemplos e editar propriedades estruturais da imagem guia durante gravação/replay tem bloqueios nas entradas testadas.
- Início/reprodução/finalização de replay normal, preservação das unidades e restauração após sair de replay passaram nos cenários de auditoria.

### Verificação independente

- Auditoria da Astra no Edge com **90 casos de observação registrados** (35 de regressão, 34 da candidata anterior e 21 da estabilização), incluindo defeitos reproduzidos, não 90 aprovações.
- Confirmadas as correções de precisão, pan, Ctrl+Z entre exemplos, CQB2/CQB3, bloqueios de alterações, tratamento de imagens de replay, exclusão de portas e reinício de replay.
- Não houve homologação tática, teste físico de celular, Firefox/Safari, leitor de tela ou sessão real prolongada. Nenhum número de casos garante ausência de regressão.

### Problemas conhecidos ainda abertos nesta versão

1. **Gravação aparentemente salva pode sumir da biblioteca** após recarregar: guia PNG de 16.001 × 1 pixel ou duração sintética acima de 21.600 segundos são aceitas pelo gravador, mas rejeitadas pelo leitor.
2. **Início de gravação não transacional:** geometria válida na importação porém inferior à precisão de exportação (por exemplo, segmento de 0,0001) pode deixar a gravação parcialmente iniciada após erro.
3. **Arrasto interrompido:** perda de foco durante movimentação de estrutura pode manter a alteração sem entrada no histórico Desfazer.
4. **Foco do modal Código do Mapa:** após Escape/Fechar, o foco pode permanecer num botão oculto em vez de retornar ao controle de origem.
5. **Recuperação de erro de renderização:** estado é pausado, mas rótulo do botão e status podem continuar indicando execução.
6. **Projetos não são salvos integralmente** entre recargas; mapas exportados não contêm missão completa. Recomenda-se exportar códigos e replays importantes e conservar cópias.
7. **Interface estreita:** controles podem ficar inacessíveis em 1024 px e particularmente em 390 px; Centralizar usa posição fixa, não enquadra o mapa inteiro.
8. Limites de armazenamento local, gravações extensas, sessões prolongadas e desempenho em mapas muito grandes ainda não foram certificados.

Detalhes, passos de reprodução, gravidade e critérios de aceite: [KNOWN_ISSUES.md](./KNOWN_ISSUES.md). As correções acima **não** foram implementadas depois da última auditoria.

## [0.1.6-alpha] — 2026-10-19

**Primeira versão publicada no repositório público.**

### Disponível nesta build

- Editor de plantas táticas em 2D: paredes, portas, obstáculos sólidos e baixos.
- Posicionamento, seleção e movimentação de aliados e adversários.
- Rotas desenhadas pelo instrutor, execução/pausa/reinício e controles de velocidade.
- Campo de visão com obstrução geométrica e contatos visíveis, inclusive visão do instrutor.
- Controles de orientação temporária, fatiamento/foco e múltiplos comandos por rota.
- Colisão com paredes e objetos, preservando a rota definida manualmente.
- Seleção e exclusão múltipla no editor, com histórico de desfazer.
- Exportação e importação de códigos de mapas.
- Gravação de instruções e replays com cenário, velocidade e linha do tempo.
- Compartilhamento de replays por arquivo e código.

### Estabilização da V6

- Corrigida a ordenação dos raios nos cones de visão durante rotação e deslocamento, com tratamento numérico de interseções em quinas.
- Ajustada a velocidade nominal dos personagens para **72 px/s**.
- Corrigida a persistência de comandos de fatiamento entre rotas.
- Corrigida a antecipação da rotação ao preparar fatiamento durante a pausa.
- Ajustada a visibilidade dos inimigos ao alternar a visão do instrutor.
- Revisadas mensagens e removido código sem uso identificado na auditoria.

### Observações

- **Alpha / Early Access:** use em cenários de teste e reporte defeitos pelas [issues](https://github.com/darksource32/CQB-Planner/issues).
- A build segue em **arquivo HTML único**, executável localmente no navegador.
- Os dados do navegador podem ser perdidos ao limpar armazenamento local: exporte replays importantes.

## Próximas etapas (ideias, sem compromisso)

- Consolidar testes e coletar feedback dos instrutores.
- Explorar biblioteca de mapas e persistência local para cenários pessoais.
- Considerar separação do código-fonte em módulos mantendo uma build HTML portátil.
- Estudar formas opcionais de distribuir mapas oficiais sem comprometer o uso offline.

As ideias acima ainda não integram a versão atual.
