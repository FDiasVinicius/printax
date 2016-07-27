/*/#######################################################################
  PRINTAX POR VINICIUS F. DIAS {vinicius.nyx@gmail.com}
  
  Printax possui dependencia do jQuery para utilizar o metodo loadStyle com
  request em ajax sincrono. a classe foi originalmente escrita em jQuery
  porem foi necessario reescrevela em pure JS (com exceção do ajax).
  A classe possui um velocidade concideravel se comparada com outras escritas
  em jQuery, espero que lhe ajude, publique os creditos e propague esta classe
  para os amiguinhos :)
  
//#######################################################################*/

/*INICIALIZA A CLASSE*/
function printaxDoc() {
    this.content = Array();
    this.estilo = Array();
  }
 
/* ADICIONA CONTEUDO AO DOCUMENTO DE IMPRESSÃO, PASSE COMO PARAMETRO UM OBJETO JQUERY CONTENDO UM ELEMENTO HTML*/
  printaxDoc.prototype.addContent = function(JqueryElement) {
    this.content.push(JqueryElement.prop('outerHTML'));
  }
/* MONTA CONTEUDO, PASSE COMO PARAMENTO O CONTEUDO ESCRITO EM HTML, E NÃO SE ESQUEÇA DE ABRIR E FECHAR AS TAGS*/
  printaxDoc.prototype.makeContent = function(stringContent) {
    this.content.push(stringContent);
  }
/* CARREGA UMA FOLHA DE ESTILOS A PARTIR DO LINK DELA, CONSIDERE O DIRETORIO A PARTIR DO ARQUIVO DA PAGINA E NÃO DESTE JS, 
   A REQUISIÇÃO É FEITA EM AJAX VIA JQUERY DE FORMA SINCRONA, O PARAMETRO DEVE SER O LINK DA FOLHA DE ESTILOS*/
  printaxDoc.prototype.loadStyle = function(CSSLink) {
	  var resposta = "";
    jQuery.ajax({method: "GET", url: CSSLink, dataType: "text", async: false, success: function (resp){
		resposta = "<style>"+resp+"</style>";
	}
});
	this.estilo.push(resposta);
  }
/* MONTA UMA FOLHA DE ESTILO NUMA TAG <STYLE>, NÃO É NECESSARIO PASSAR A TAG NA STRIG DE PARAMETRO, APENAS O CORPO DO CSS*/
  printaxDoc.prototype.makeStyle = function(stringStyle) {
    this.estilo.push("<style>"+stringStyle+"</style>");
  }
/* APLICA A FOLHA DE ESTILOS, NÃO É NECESSARIO CHAMAR ESTE METODO */
  printaxDoc.prototype.applyStyle = function() {
    var retorno = "";
	var i;
	for(i = 0; i < this.estilo.length; i++){
		retorno += this.estilo[i];
	}
	return retorno;
  }
/* APLICA O CONTEUDO, NÃO É NECESSARIO CHAMAR ESTE METODO */
  printaxDoc.prototype.applyContent = function() {
    var retorno = "";
	var i;
	for(i = 0; i < this.content.length; i++){
		retorno += this.content[i];
	}
	return retorno;
  }
/* EXECUTA A IMPRESSÃO APOS O ARQUIVO MONTADO, NOTE QUE VOCÊ NÃO DEVE POSSUIR QUALQUER ELEMENTO COM ID printaxFrame POIS 
   ESTA CLASSE IRA IMPRIR A PARTIR DE UM ELEMENTO COM ESTE NOME, O ELEMENTO IRA SURGIR E DESAPARECER EM SEGUIDA MANTENDO APENAS
    ALGUMAS MEDIAS QUERYS NA PAGINA*/
  printaxDoc.prototype.print = function(){
	  var printaxFrame = document.createElement("iframe");
	  printaxFrame.id = "printaxFrame";
	  printaxFrame.name = "printaxFrame";
	  jQuery('body').append(printaxFrame);
	  document.querySelector('style').textContent = "@media screen{ #printaxFrame{ display: none;}} @media print{ #printaxFrame{ display: initial;}}";
	  
	var ifrm = document.getElementById('printaxFrame');
	ifrm = (ifrm.contentWindow) ? ifrm.contentWindow : (ifrm.contentDocument.document) ? ifrm.contentDocument.document : ifrm.contentDocument;
	ifrm.document.open();
	ifrm.document.write(this.applyStyle());
	ifrm.document.write(this.applyContent());
	ifrm.document.close();
	/*window.frames["printaxFrame"].focus();
	window.frames["printaxFrame"].frameElement.contentWindow.print();*/
	var iframe = document.getElementById('printaxFrame');
    iframe.contentWindow.document.execCommand('print', false, null);
	ifrm = document.getElementById('printaxFrame');
	ifrm.parentNode.removeChild(ifrm);
  }