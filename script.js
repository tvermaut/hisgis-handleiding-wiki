function GetWiki(pagina){
    var Httpreq = new XMLHttpRequest();
    Httpreq.open("GET","https://wiki.hisgis.nl/api.php?action=parse&page="+pagina+"&prop=text&format=json",false);
    Httpreq.send(null);
    var r = JSON.parse(Httpreq.responseText)['parse']['text']['*'];
    var doc = new DOMParser().parseFromString(r, "text/html");
    var l = doc.documentElement.innerHTML;
    const re_edit = new RegExp(/<span class="mw-editsection">.*?\]<\/span><\/span>/, 'g');
    l = l.replaceAll(re_edit,'');
    l = l.replaceAll('href="/wiki','href="https://wiki.hisgis.nl/wiki');
    l = l.replaceAll('src="/images','src="https://wiki.hisgis.nl/images');
    l = l.replaceAll('srcset="/images','src="https://wiki.hisgis.nl/images');
    return l
}

window.onload = (event) => {
    var paginas = ["Basis", "Percelen", "Multipolygonen_in_iD"];
    var i = document.getElementById("inhoud");
    for (let p of paginas){
        i.innerHTML += GetWiki(p);
        }
        
    Toc.init({$nav: $("#toc"), $scope: $("h2, h3, h4, h5")});//$scope: $("h1, h2, h3, h4, h5")//document.body
    //$("body").scrollspy({target: "#toc"});
    
    //$('[data-toggle="tooltip"]').tooltip()
    //$('[data-spy="scroll"]').each(function () {var $spy = $(this).scrollspy('refresh')})

  };
