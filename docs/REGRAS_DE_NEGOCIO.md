# Regras de negócio extraídas do Stitch

Status: hipóteses de produto obtidas da especificação e telas do Stitch em 21/09/2026. Devem ser validadas pelo responsável do negócio antes de implementação definitiva, especialmente fórmulas, meios de pagamento, frete e prazos.

## Produtos e disponibilidade

1. Uma peça pode ser **Pronta Entrega**, **Sob Encomenda**, ambas ou **Pausada**.
2. Pronta Entrega exige estoque físico de peças acabadas e informa despacho imediato.
3. Sob Encomenda exige prazo de confecção em dias úteis e ficha técnica com insumos e horas estimadas.
4. Uma peça em vitrine precisa estar ativa e ter conteúdo editorial, categoria, fotos e modalidade de venda válidos.
5. Destaque na home é uma propriedade explícita, não derivada de preço ou estoque.

## Insumos, receita e precificação

1. Insumo possui tipo, lote, unidade/rendimento, custo unitário, quantidade disponível, consumo semanal e limiares de estoque.
2. Receita técnica define consumo exato de cada insumo por peça e o tempo estimado de confecção.
3. Custo direto = soma dos insumos consumidos + horas estimadas × valor/hora técnica.
4. Preço sugerido considera custo direto, margem desejada e custos/taxas comerciais. A fórmula exata e a incidência de taxas devem ser aprovadas pelo negócio antes de codificação.
5. Alteração de custo de lote deve recalcular fichas técnicas dependentes, com registro de auditoria.

## Estoque e pedido

1. Venda de Pronta Entrega baixa uma unidade do estoque de produto acabado após o evento de pagamento aprovado.
2. Pedido Sob Encomenda reserva/baixa os insumos da ficha técnica após pagamento aprovado; não no simples carrinho.
3. Se insumo ficar abaixo do mínimo, o sistema deve alertar; se não houver saldo para uma encomenda, novas encomendas do produto podem ser pausadas.
4. Todo movimento de estoque precisa registrar origem, data/hora, usuário/processo e saldo resultante.

## Fila de produção e pedidos

1. Estados iniciais mapeados: `aguardando_pagamento`, `em_confeccao`, `pronto_para_envio`, `enviado`, `concluido`; `bloqueado_por_insumo` deve ser um estado ou impedimento explícito.
2. Pedido Sob Encomenda entra na fila apenas após pagamento aprovado e reserva confirmada.
3. Etapas de produção são rastreáveis: estrutura, corpo, acabamento e bloqueio/embalagem; o produto pode ter variações futuras nessa receita.
4. Notificação de rastreio só é permitida após código de rastreio e transportadora válidos.

## Pendente de decisão

- política de cancelamento, troca e devolução;
- parcelamento, gateway e antifraude;
- cálculo de frete e regiões atendidas;
- reserva versus baixa definitiva de insumos;
- multi-moeda, impostos e emissão fiscal;
- papéis de acesso: proprietário, artesã, atendimento e cliente.
