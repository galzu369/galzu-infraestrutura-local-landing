# Proposta de captação Galzu — restaurantes

A landing atual apresenta infraestrutura estratégica para negócios locais. Esta alteração acrescenta uma página específica em `/restaurantes/` para testar a oferta de análise de relatórios a restaurantes, preservando a página principal.

A nova página mantém o preto e dourado Galzu, apresenta uma demonstração identificada como fictícia, explica o serviço e permite preparar a captação de pedidos. O formulário está em modo de revisão: não transmite dados. O handler para o serviço já usado pela página atual está preparado, mas não está associado ao envio nesta versão.

O kit `REDES_SOCIAIS.txt` inclui posicionamento, bio, descrição Facebook, três publicações fixadas, stories e plano inicial de 14 dias. São propostas: nenhum perfil foi alterado e nenhuma publicação foi feita.

Antes do lançamento:

- Perfis indicados por Filipe: [Instagram @galzugal](https://www.instagram.com/galzugal/) e [Facebook Galzu Services](https://www.facebook.com/galzuservices). Filipe já indicou a caixa comercial de destino. Falta validar que a chave Web3Forms entrega nessa caixa. Confirmar com uma submissão de teste identificável e verificar a sua receção antes de ativar o formulário.
- Confirmar a oferta, disponibilidade e âmbito/preço do piloto.
- Verificar o destinatário associado à chave pública Web3Forms existente, configurar assunto/origem se necessário e testar receção de forma autorizada.
- Completar a informação de privacidade com contacto direto, conservação e restantes informações aplicáveis.
- Associar `sendLead` ao evento de envio, retirar o aviso de revisão e alterar o estado de indexação apenas quando a página estiver pronta para divulgação.
- Rever o destino de produção e usar os links UTM correspondentes.

Não foram instalados pixels de publicidade, cookies de análise ou integrações com redes sociais. As UTM são apenas incluídas no pedido, sem medição de visitas/cliques. O exemplo não usa dados comerciais de terceiros.
