# Histórico de versões

Todas as alterações de maior relevância serão registradas aqui. A numeração abaixo identifica o estado do **Early Access**, não uma promessa de estabilidade definitiva.

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
