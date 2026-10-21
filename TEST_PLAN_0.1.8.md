# Alpha 0.1.8 — plano de validação (branch de desenvolvimento)

**Estado:** implementação experimental. Não homologada. Não publicar na `main` sem concluir testes no navegador.

## Preservação obrigatória
- Nenhuma alteração no algoritmo `smoothPath`, desenho do preview, geometria desenhada e motor de navegação (exceto conexões explicitamente aprovadas).
- Reedição apenas recorta dados e acrescenta novo trecho; prefixo original preservado numericamente.
- Formato `.cqbmap` contém **somente** geometria e metadados de formato. Nenhum operador, rota ou replay.

## Matriz de aceite para teste manual em Chrome/Edge e Firefox
1. Abrir `index.html` offline: cenário vazio, modo Construção, seleção ativa, sem erros no console.
2. Teclas 1/2 continuam alternando; novas B/T funcionam; atalhos V/W/F/O/L/D/A/E/X/C/R/Space continuam funcionando, inclusive digitando em inputs.
3. Criar paredes, portas e obstáculos; clicar num operador com ferramenta Parede ativa seleciona o operador e não cria estrutura.
4. Desenhar rotas com mouse lentamente/rapidamente; comparar suavidade, preview e visual da 0.1.7 com captura lado a lado.
5. Selecionar aliado com rota cruzando outro operador; linha e marcadores continuam acima do operador. Desselecionar restaura camadas.
6. RMB sobre marcador da rota selecionada sob outro operador: orientação/fatiamento atua sobre a rota selecionada; RMB no próprio operador continua girando.
7. Clique e arraste em ponto intermediário da rota, solte: trecho anterior idêntico; posterior substituído; comandos anteriores preservados, posteriores removidos.
8. Reedição iniciada e interrompida por Escape, saída de foco ou gesto curto: percurso original não muda.
9. Ctrl+Z após reedição em Operação restaura trajeto, comandos e orientação. Ctrl+Z em Construção continua próprio do editor.
10. Reedição próxima a paredes/obstáculos não modifica a rota original quando novo trecho é inválido.
11. Exportar planta com paredes diagonais e frações: baixar `.cqbmap` gzip, tamanho abaixo de 3 MB, importar em página nova e comparar coordenadas.
12. Importar código CQB1/CQB2/CQB3/JSON legados; confirmar somente geometria e operadores zerados.
13. Arquivos vazios, truncados, gzip malformado, JSON inválido, formato ou versão desconhecida, coordenadas não finitas e payload excessivo: rejeição sem mudar mapa.
14. Biblioteca pessoal: salvar, recarregar página, carregar, exportar e excluir; validar tratamento de localStorage indisponível/cheio.
15. Fechar modal via X, Fechar, Escape, importar e reabrir: foco retorna ao botão de origem.
16. Importar mapa durante replay/gravação: bloqueio, sem substituir estado.
17. Iniciar gravação com segmento de comprimento 0,0001: erro tratado e REC inativo.
18. Finalizar gravação com guia 16.001x1 ou duração sintética acima do limite: não indicar falsamente que salvou.
19. Deslocar parede e disparar blur/pointercancel: alteração registrada no histórico Ctrl+Z.
20. Injetar exceção única em render durante execução: Play, rótulos e status mudam para pausado; requestAnimationFrame permanece.
21. Cenário grande real Brisa Cove: importar CQB3 original, exportar `.cqbmap`, medir tamanho, comparar contagens/precisão e testar FPS.
22. Investigar operador preso sobre obstáculo baixo: capturar rota, dimensões, navClearance e posição, **sem alterar colisão**.

## Bloqueadores conhecidos da branch
- Brisa Cove ainda não pode integrar catálogo oficial: código íntegro da planta desenhada pelo autor ainda não foi disponibilizado neste contexto técnico.
- **Smoke automatizado executado no GitHub Actions com sucesso em Chromium e Firefox**: boot, atalhos, .cqbmap e CQB3, biblioteca offline, arquivo inválido, reedição/undo, blur, bloqueio de gravação e recuperação de render. **Os 22 testes manuais acima ainda precisam ser realizados em interação real e mapa completo.**
- O catálogo oficial fica preparado para incorporar mapas aprovados, mas não contém geometria fictícia de Brisa Cove.
