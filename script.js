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
    l.replace('href="/wiki','href="http://wiki.hisgis.nl/wiki');
    console.log(l);
    document.body.innerHTML = document.body.innerHTML + l;
  };