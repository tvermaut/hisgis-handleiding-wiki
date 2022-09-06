function GetWiki(pagina){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET","https://wiki.hisgis.nl/api.php?action=parse&page="+pagina+"&prop=text&format=json",false);
    Httpreq.send(null);
    return JSON.parse(Httpreq.responseText);
}

window.onload = (event) => {
    var t = GetWiki("Basis");
    document.body.innerHTML = document.body.innerHTML + t;
  };