# CQB Planner — Roadmap e limitações

**Atual:** Alpha 0.1.9 · manutenção R7 aprovada em 25/10/2026. **Próximo estágio planejado:** 0.2.0 Beta, ainda não implementado.

Este arquivo registra **o que falta** e **o que pode vir depois**. Mudanças concluídas e versões históricas ficam no [CHANGELOG](./CHANGELOG.md); funcionamento e testes, no [README](./README.md).

## Pendências e riscos atuais

| Prioridade | Estado | Assunto | Próximo passo |
| --- | --- | --- | --- |
| Alta | **Aberto; reproduzido também na R4** | Aliados podem travar ao cruzar rotas simultaneamente com 4–6 unidades; espaço insuficiente também pode tornar a passagem fisicamente inviável | Investigar prioridade, progresso e bloqueios sem alterar a navegação estável às cegas; adicionar cenários reais de corredor e cruzamento |
| Média | A validar | 21 cenários da suíte Playwright preparados; o mantenedor confirmou sucesso em 15 executados no Windows | Executar conjunto atualizado integral, guardar relatório e cobrir interações manuais |
| Média | A validar | Fluidez e memória com muitos inimigos, mapas extensos e sessões longas | Medir FPS, percentis de duração dos quadros e memória em navegador real |
| Média | A validar | Replays legados, séries longas de combate e diferenças entre navegadores | Testes de compatibilidade, importação, reprodução e retorno à missão |
| Média | Evolução planejada | Salvamento da **missão inteira** | Especificar formato versionado, backups e recuperação de estado |

### Defeitos corrigidos, não pendências abertas

- **K-R4-01**: clicar brevemente no integrante de uma formação já desenhada podia apagar a rota. Correção implementada nas candidatas posteriores e mantida na R7; conservar teste de regressão.
- **K-R4-02**: snapshot de reinício capturado antes da preparação da missão. Correção implementada: restaurar o estado imediatamente anterior ao primeiro Play, incluindo rotas e formações; conservar teste.
- Detecção visual do modo instrutor afetava a física e inimigos podiam aparecer atrás de outros; correções das candidatas R5–R7.
- Prioridade de mira durante comandos da rota foi restabelecida na R7: orientação anterior < contato inimigo < nova orientação executada.

## Beta 0.2.0: propostas para especificação e aprovação

Estas são **ideias de produto**, não funcionalidades já implementadas nem requisitos automaticamente aprovados.

1. **Pontos de sincronização de rotas:** unidades aguardam condições de chegada ou sinal de sequência e prosseguem sem perder as rotas originais.
2. **Equipamento individual (*loadout*):** seleção por operador, limites e indicadores visuais. Mecânicas abstratas de jogo, sem parâmetros de dispositivos reais.
3. **Portas interativas:** fechada/aberta, bloqueio de visão e passagem, animações e ações fictícias.
4. **Granadas fictícias de luz e som:** prévia visual, colisão/rebotes simplificados e estados temporários de atordoamento exclusivamente para o gameplay.
5. **Comportamento inimigo:** patrulhas simples e reações de jogo, vida/dano de aliados e balanceamento da detecção.
6. **Projeto completo:** arquivo que guarda geometria, unidades, equipamentos, rotas, orientações e configurações; distinto de `.cqbmap` e replay.
7. **Organização do código:** modularizar fontes sem abandonar a distribuição final offline em um HTML único.
8. **Usabilidade:** layout móvel, acessibilidade, enquadramento automático do mapa e melhor tratamento de cenários grandes.

## Critérios de qualidade antes de publicar

- Definir comportamento esperado e reproduzir o defeito antes de alterar o motor.
- Criar teste que falha no cenário antigo, corrigir e repetir regressões.
- Preservar funcionamento de rotas, visão, combate, biblioteca, replay e arquivos legados.
- Rodar testes de motor e navegador; distinguir **aprovado**, **não executado** e **limitação conhecida**.
- Medir desempenho real antes de declarar otimização.
- Publicar alterações relevantes na `main` apenas após aprovação do mantenedor.

## Arquitetura e princípios

- O instrutor desenha a rota; a simulação não substitui automaticamente por um trajeto global alternativo.
- Paredes, obstáculos e corpos interferem em movimento e/ou visão conforme a geometria. A visão do instrutor modifica somente o que é exibido.
- Manter experiência local e offline, com importações defensivas e formatos versionados.
- Não confundir `.cqbmap` (somente geometria), replay (sequência de estados/eventos) e futuro projeto completo.
- Não apagar dados de mapas/replays locais silenciosamente durante atualizações.

Para relatar um bug, use [Issues do GitHub](https://github.com/darksource32/CQB-Planner/issues), incluindo versão, navegador, passos, resultado esperado e obtido, e arquivo de teste quando possível.
