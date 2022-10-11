function GetWiki(pagina){
    var Httpreq = new XMLHttpRequest();
    Httpreq.open("GET","https://wiki.hisgis.nl/api.php?action=parse&page="+pagina+"&prop=text&format=json",false);
    Httpreq.send(null);
    var r = JSON.parse(Httpreq.responseText)['parse']['text']['*'];
    var doc = new DOMParser().parseFromString(r, "text/html");
    var l = doc.documentElement.innerHTML;
    const re_edit = new RegExp(/<span class="mw-editsection">.*?\]<\/span><\/span>/, 'g');
    l = l.replaceAll(re_edit,'');
    const re_edit_chevron = new RegExp(/<span class="ChevronDown".*?<\/span>/, 'g');
    const re_edit_toc = new RegExp(/<div id=\\"toc\\" class=\\"toc\\".*?<h/, 'g');    
    l = l.replaceAll(re_edit_chevron,'<span class="ChevronDown"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg></span>');
    l = l.replaceAll(re_edit_toc,'<h');
    l = l.replaceAll('href="/wiki','href="https://wiki.hisgis.nl/wiki');
    l = l.replaceAll('src="/images','src="https://wiki.hisgis.nl/images');
    l = l.replaceAll('srcset="/images','src="https://wiki.hisgis.nl/images');
    return l
}

window.onload = (event) => {
    var paginas = ["Handleiding Digitalisering", "Basis", "Percelen", "Multipolygonen_in_iD", "Varianten"];
    var i = document.getElementById("inhoud");
    for (let p of paginas){
        i.innerHTML += GetWiki(p);
        }
        
    $("#inhoudsopgave").toc({content: ".mw-parser-output", headings: "h1,h2,h3,h4,h5,h6"});
    //Toc.init({$nav: $("#toc"), $scope: $("h2, h3, h4, h5")});//$scope: $("h1, h2, h3, h4, h5")//document.body
    //$("body").scrollspy({target: "#toc"});
    
    //$('[data-toggle="tooltip"]').tooltip()
    //$('[data-spy="scroll"]').each(function () {var $spy = $(this).scrollspy('refresh')})

  };
