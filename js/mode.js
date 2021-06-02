function changeMode() {
    changeCSS("css/dark.css", 1);
}

function changeCSS(cssFile, cssLinkIndex) {

    let ol = document.getElementsByTagName("link").item(cssLinkIndex);

    let nl = document.createElement("link");
    nl.setAttribute("rel", "stylesheet");
    nl.setAttribute("type", "text/css");

    if(ol.getAttribute("href") == "css/dark.css"){
        nl.setAttribute("href",  "css/light.css");
    }else{
        nl.setAttribute("href",  "css/dark.css");
    }


    console.log(nl);
    console.log(document.getElementsByTagName("head").item(0).replaceChild(nl, ol));
}