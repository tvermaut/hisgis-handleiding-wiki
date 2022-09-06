function GetWiki(pagina){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET","https://wiki.hisgis.nl/api.php?action=parse&page="+pagina+"&prop=text&format=json",false);
    Httpreq.send(null);
    var r = JSON.parse(Httpreq.responseText)['parse']['text']['*'];
    var doc = new DOMParser().parseFromString(r, "text/html");
    var l = doc.documentElement.innerHTML;
    const re_edit = new RegExp(/<span class="mw-editsection">.*?\]<\/span><\/span>/, 'g');
    l = l.replaceAll(re_edit,'');
    l = l.replaceAll('href="/wiki','href="https://wiki.hisgis.nl/wiki');
    l = l.replaceAll('src="/images','src="https://wiki.hisgis.nl/images')
    return l
}

window.onload = (event) => {
    var basis = GetWiki("Basis");
    document.getElementById("inhoud").innerHTML = document.getElementById("inhoud").innerHTML + basis;
  };