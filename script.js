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
    l.replace('src="/images','src="http://wiki.hisgis.nl/wiki/images')
    l.replace('src="<span class="mw-editsection"><span class="mw-editsection-bracket">[</span><a href="/index.php?title=Basis&amp;veaction=edit&amp;section=1" class="mw-editsection-visualeditor" title="Deelpagina bewerken: Basis">bewerken</a><span class="mw-editsection-divider"> | </span><a href="/index.php?title=Basis&amp;action=edit&amp;section=1" title="Deelpagina bewerken: Basis">brontekst bewerken</a><span class="mw-editsection-bracket">]</span></span>','');
    document.body.innerHTML = document.body.innerHTML + l;
  };