# printax
Lib jQuery para impressão customizada de pagina HTML. Suporte a CSS e JS personalizado, incorporação de DOM e codigo HTML

#######################################################################
  PRINTAX POR VINICIUS F. DIAS {vinicius.nyx@gmail.com}
  
  Printax possui dependencia do jQuery para utilizar o metodo loadStyle com
  request em ajax sincrono. a classe foi originalmente escrita em jQuery
  porem foi necessario reescrevela em pure JS (com exceção do ajax).
  A classe possui um velocidade concideravel se comparada com outras escritas
  em jQuery, espero que lhe ajude, publique os creditos e propague esta classe
  para os amiguinhos :)
  
#######################################################################

# Exemplo

function print(){
				var toPrint = new printaxDoc();
				toPrint.addContent(jQuery("#myDiv"));
				toPrint.makeContent("<p>Hello Printax.js!</p>");
				toPrint.loadStyle("/site/css/exemplo.css");
				toPrint.makeStyle("#myDiv{ background-color: black; color: white} p{font-size: 18px;}");
				
				toPrint.print();
			}
