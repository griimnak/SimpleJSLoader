/*
    SimpleJSLoader

    Source : https://github.com/griimnak
    Usage  :

        Include this script                     <script type="text/javascript" src="/sjsloader.js"></script>
        Content to load = your body tag         <body>
        Format your anchors to use this script  <a class="autoLoad" href="/your/path">Home</a>

        Done!
*/

var autoLoad = function(e) {
    // prevent browser to load link
    e.preventDefault();

    // exit if target is undefined
    if(typeof(e.target) == 'undefined' ) {return;}

    // exit if clicked element is not a link
    if (e.target.tagName !== 'A') {
        return console.log("autoLoad class must be used on an <a> tag.");
    }

    // get href from clicked element
    var source = e.target.getAttribute("href");

    // instantiate a new request
    var request;
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    }
    else {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // bind a function to handle request status
    request.onreadystatechange = function() {
        if(request.readyState < 4) {
            // handle preload
            return;
        }
        if(request.status !== 200) {
            // handle error
            return;
        }
        if(request.readyState === 4) {
            // handle successful request
            successCallback();
        }
    };

    // open the request to the specified source
    request.open('GET', source, true);
    // execute the request
    request.send('');

    successCallback = function() {
        // on success place response content in the specified container
        var parser;
        if (window.DOMParser) {
            parser = new DOMParser();
            var parsed = parser.parseFromString(request.responseText, "text/html");
        }
        else {
            parser = new ActiveXObject("Microsoft.XMLDOM");
            parser.async="false";
            var parsed = parser.load(request.responseText);
        }

        var content = parsed.body;
        var title = parsed.title;

        document.body = content;
        updateClick();

        // Execute scripts in eval since innerHTML disallows execution.
        var allScripts = document.body.getElementsByTagName('script');

        for (var n = 0; n < allScripts .length; n++) {
            if (allScripts[n].src) {
                // if script is external
                function loadJS(url,onDone,onError){
                    if(!onDone)onDone=function(){};
                    if(!onError)onError=function(){};
                    var request;
                    if (window.XMLHttpRequest) {
                        xhr = new XMLHttpRequest();
                    }
                    else {
                        xhr = new ActiveXObject("Microsoft.XMLHTTP");
                    }
                    xhr.onreadystatechange= function() {
                        if(xhr.readyState==4){
                            if(xhr.status==200||xhr.status==0){
                                try{ eval(xhr.responseText); }
                                catch(e) { onError(e); return; }
                                onDone();
                            }else{ onError(xhr.status); }
                        }
                    }.bind(this);
                    try{
                        xhr.open("GET",url,true);
                        xhr.send();
                    }catch(e){
                        onError(e);
                  }  
                }
                loadJS(allScripts[n].src)
            } else {
                // if script is internal
                eval(allScripts[n].innerHTML);
            }
        }

        // scroll back to top, minor annoyance
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

        // change url in the address bar  and title and save it in the history
        document.title = title;
        history.pushState('',title,source);
    }
};

function updateClick() {
    var a = document.getElementsByClassName("autoLoad");
    for(var i=0;i<a.length;i++){
        a[i].addEventListener('click', autoLoad, false);
    }
}

window.onload = function() {
    updateClick();
};
