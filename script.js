function GetWiki(pagina){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET","https://wiki.hisgis.nl/api.php?action=parse&page="+pagina+"&prop=text&format=json",false);
    Httpreq.send(null);
    return JSON.parse(Httpreq.responseText)['parse']['text']['*'];
}

window.onload = (event) => {
    var t = GetWiki("Basis");
    var doc = new DOMParser().parseFromString(t, "text/html");
    var l = doc.documentElement.innerHTML;
    const re = new RegExp(/<span class="mw-editsection">.*?\]<\/span><\/span>/, 'g');
    l = l.replaceAll(re,'');
    l = l.replaceAll('href="/wiki','href="https://wiki.hisgis.nl/wiki');
    l = l.replaceAll('src="/images','src="https://wiki.hisgis.nl/images')
    document.body.innerHTML = document.body.innerHTML + l;
  };