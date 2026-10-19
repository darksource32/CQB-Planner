# Como contribuir com o CQB Planner

Obrigado por querer melhorar o projeto! O CQB Planner está em **Alpha Early Access**, e relatos objetivos, testes reproduzíveis e sugestões fundamentadas são especialmente valiosos.

## Antes de começar

- Confira as [issues](https://github.com/darksource32/CQB-Planner/issues) existentes para evitar propostas duplicadas.
- Para alterações grandes, abra primeiro uma issue descrevendo o problema e a solução desejada.
- **Preserve o fluxo do simulador:** edição da planta, planejamento manual de rotas, execução, gravação e replay.
- O projeto distribuído atualmente é **um HTML único** (`index.html`). Mantenha essa experiência simples de abrir no navegador. Uma refatoração em arquivos de desenvolvimento separados deve ser discutida antes de ser proposta.

## Enviando um pull request

1. Faça um **fork** do repositório.
2. Crie uma branch descritiva no seu fork, como `fix/cone-de-visao` ou `feat/exportacao-mapa`.
3. Implemente somente as alterações relacionadas à proposta, evitando refatorações paralelas sem necessidade.
4. Faça os testes e verifique se não surgiram regressões.
5. Abra um **pull request** direcionado à branch **`main`** do repositório original.

### O que incluir na descrição

- **Problema:** o que estava errado ou o que falta.
- **Mudança:** como sua alteração resolve a questão.
- **Como reproduzir:** passos claros no navegador.
- **Testes:** o que foi testado e em qual navegador/ambiente.
- **Imagens ou GIFs:** se a alteração for visual (opcional).
- **Compatibilidade:** se altera mapas, replays, atalhos ou arquivos importados/exportados.

## Checklist de qualidade

- [ ] A aplicação inicializa sem erros no console do navegador.
- [ ] Construir, Operação, Pausar, Reiniciar e seleção continuam funcionando.
- [ ] O movimento respeita rotas desenhadas e colisões do cenário.
- [ ] Os cones de visão continuam corretos perto de paredes, portas e outros personagens.
- [ ] Comandos de olhar/fatiamento não persistem indevidamente entre rotas.
- [ ] Gravações e replays antigos continuam sendo importados/reproduzidos, quando aplicável.
- [ ] **Ctrl+Z** e exclusão múltipla permanecem consistentes no editor.
- [ ] O HTML distribuído pode ser aberto localmente, sem exigir servidor.

## Diretrizes de desenvolvimento

O objetivo é um simulador **leve, estável e fácil de usar**. Priorizamos mudanças pequenas e verificáveis, documentação clara e revisão de regressões. Não transforme o projeto em uma aplicação dependente de cadastro, nuvem ou engine externa sem discussão prévia.

**Atenção:** ideias táticas aqui devem permanecer no âmbito de **simulações e jogos**; evite publicar dados pessoais, credenciais ou conteúdo de terceiros sem autorização.

## Bugs e sugestões

Use as [GitHub Issues](https://github.com/darksource32/CQB-Planner/issues) para bugs e ideias. Inclua versão do CQB Planner, navegador, passos para reproduzir, resultado esperado e resultado obtido.

## Avaliação e integração

As contribuições serão **avaliadas pelos mantenedores**. A abertura de um PR não garante que a alteração será aceita, nem define automaticamente direitos de uso ou relicenciamento do código de terceiros. Se sua contribuição reutilizar código ou recursos de outro projeto, informe a origem e as permissões aplicáveis.

O repositório ainda não tem uma licença de código explicitamente definida. Antes de redistribuir o projeto fora dos mecanismos normais do GitHub, consulte o mantenedor sobre permissões de uso.
