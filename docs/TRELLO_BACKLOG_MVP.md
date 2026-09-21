# Backlog MVP derivado do Stitch

Ordem recomendada para as listas do Trello: **Fundação → Admin de dados → Loja → Compra → Operação → QA/Release**. Cada item abaixo vira um cartão, com o link do PR e os cenários de QA.

## Fundação

1. Definir entidades e relações: produto, variante, categoria, insumo, lote, receita, item de receita, pedido, item de pedido e movimento de estoque.
2. Implementar tokens e shell compartilhado conforme `DESIGN.md`.
3. Implementar autenticação e autorização de admin; decidir os papéis pendentes.
4. Configurar persistência, migrações, seed não produtivo e auditoria.

## Admin — catálogo, insumos e preço

1. CRUD de insumos/lotes com custo por unidade e limiares de estoque.
2. Listagem de insumos: busca, filtros, paginação e alertas de nível baixo/crítico.
3. CRUD de produto, mídia, categoria, publicação, destaque e modalidades de venda.
4. Editor de ficha técnica com insumos, consumo e horas de confecção.
5. Serviço de custo e precificação com testes de fórmula e trilha de recalculo.

## Loja pública

1. Home: hero, categorias, manifesto, destaques e rodapé.
2. Catálogo: categoria, fibra, cor, faixa de preço, modalidade, ordenação e paginação.
3. Produto: galeria, variação, tamanho, cuidados, transparência artesanal, CEP/frete e recomendados.
4. Favoritos, carrinho persistente e estados de disponibilidade.

## Compra e pós-venda

1. Checkout com endereço, frete, pagamento e revisão do prazo de encomenda.
2. Webhook idempotente de pagamento aprovado: baixa/reserva transacional de estoque e criação da fila.
3. Área do cliente: pedido, estado, prazo, rastreio e comunicação.

## Operação

1. Dashboard de faturamento, capacidade, fila e alertas.
2. Fila de produção com etapas, responsável, prazo e bloqueios.
3. Expedição, etiqueta, transportadora, rastreio e notificação.
4. Alertas automáticos de insumo e pausa controlada de encomenda.

## QA obrigatório por cartão

- autorização e isolamento de dados;
- validação de formulário e mensagens de erro;
- concorrência/estoque negativo e idempotência de webhook;
- estados vazio, carregando, erro e indisponível;
- responsividade, teclado, foco e contraste;
- teste unitário da regra e teste de integração do fluxo afetado.
