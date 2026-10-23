# CQB Planner · Suíte de regressão R4

## Objetivo

Testar automaticamente comportamentos já acordados e evitar que uma correção devolva erros antigos. Há **duas camadas complementares**:

1. `regressao_core.js` roda 46 testes do motor real em um ambiente de DOM simulado, sem bibliotecas externas. Também observa **duas pendências conhecidas**, para que não desapareçam silenciosamente. Requer **Node.js 20 ou superior**.
2. `regressao_navegador.py` automatiza dez fluxos de interface no **Chromium**, com cliques, Ctrl, arrasto, zoom, renderização e Play. Requer Python 3.10+, Playwright e o navegador Chromium gerenciado pelo Playwright.

O HTML é servido somente no endereço local `127.0.0.1`, sem publicação na internet. O navegador é controlado por uma sessão isolada: os dados normais do seu perfil de Chrome/Edge não são alterados.

## Primeira utilização (Windows)

Extraia todo o ZIP em uma pasta. Instale [Node.js LTS](https://nodejs.org/) se necessário. Para os testes de navegador, com Python instalado, execute **uma única vez** no terminal:

```bat
py -m pip install playwright
py -m playwright install chromium
```

A partir daí, execute `testar_cqb.bat` por duplo clique. O arquivo roda as duas suítes e guarda os resultados na pasta `relatorios`, com formatos `.md` e `.json`. Erros no navegador recebem capturas `.png`.

> Se o Node.js ou Playwright não estiver instalado, o `.bat` avisa. **Não chama esses testes de aprovados se não chegaram a executar.**

## Execução manual

```bat
node regressao_core.js CQB_Planner_Alpha_0.1.9_CORRECOES_R4_COMBATE_ROTAS.html
py regressao_navegador.py CQB_Planner_Alpha_0.1.9_CORRECOES_R4_COMBATE_ROTAS.html
```

Para acompanhar o Chromium funcionando visivelmente:

```bat
py regressao_navegador.py CQB_Planner_Alpha_0.1.9_CORRECOES_R4_COMBATE_ROTAS.html --headed
```

## Interpretação dos resultados

- `PASSOU`: comportamento foi verificado pelo caso automatizado.
- `FALHOU`: foi detectada diferença frente ao comportamento esperado. Envie o `.md` e, quando existir, a captura de tela.
- `PENDENTE (reproduzido)`: bug já conhecido, ainda não corrigido. **Não é um sucesso**. Há dois casos dessa categoria na R4.
- `MÉTRICA`: medição informativa de desempenho, dependente do computador. Não é um teste de FPS garantido.

Cada relatório identifica **arquivo, hash SHA-256, horário e plataforma**. Testes de navegador podem levar mais tempo e são mais sensíveis à resolução, temporização e comportamento do sistema.

## Extensão da suíte

Ao corrigir uma nova falha, acrescente ao menos um teste que a reproduza, implemente a correção, execute as duas suítes e compare os relatórios. Também valide a nova versão manualmente antes de publicá-la.

### Limitações honestas

- Os **46 casos do motor** foram executados nesta sessão e passaram na candidata R4.
- **A suíte de navegador foi escrita e conferida sintaticamente, mas não pôde ser executada aqui**: o navegador Chromium deste ambiente recusou navegação até mesmo para URLs locais. Portanto, seus dez casos precisam de execução no seu computador e podem precisar de ajuste após o primeiro uso.
- Nenhuma suíte garante ausência de bugs, fidelidade tática, segurança absoluta contra arquivos maliciosos, funcionamento perfeito no celular ou compatibilidade com todos os navegadores.
- O teste com DOM simulado executa as funções reais de navegação, combate, editor e renderização, porém não é equivalente a renderizar pixels em um navegador real.

## Arquivos importantes

- `CQB_Planner_Alpha_0.1.9_CORRECOES_R4_COMBATE_ROTAS.html`: candidata local, não publicada na main.
- `regressao_core.js`: testes de motor e auditoria continuada.
- `regressao_navegador.py`: navegação real automatizada.
- `testar_cqb.bat`: execução no Windows.
- `AUDITORIA_R4.md`: causas, decisões, limitações e defeitos ainda pendentes.