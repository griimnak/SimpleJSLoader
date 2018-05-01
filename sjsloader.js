/*
    SimpleJSLoader
    Usage:
        Include this script      <script type="text/javascript" src="/sjsloader.js"></script>
        ID your body tag         <body id="mainContent">
        Format your anchors      <a href="index?mainContent=index">Home</a>

        Notice how the <body> ID and anchor format match, this is required. Name them whatever you like.
        Variable after "="" is the URI to request
        Thank you to everyone who contributed to the source
*/
window.onload = function() {
    var load = function(e) {
        // prevent browser to load link
        e.preventDefault();

        // exit if target is undefined
        if(typeof(e.target) == 'undefined' ) {return;}

        // exit if clicked element is not a link
        if (e.target.tagName !== 'A') {return;}

        // get href from clicked element
        var href = e.target.getAttribute("href");

        // retrieve container and source
        var href_parts = href.split('=');
        var container = href_parts[0].substr(1);
        var source = href_parts[1];

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
            document.getElementById(container).innerHTML = request.responseText;

            // Execute scripts in eval since innerHTML disallows execution.
            var allScripts = document.getElementById(container).getElementsByTagName('script');
            for (var n = 0; n < allScripts .length; n++) {
                eval(allScripts [n].innerHTML)
            }

            // scroll back to top, minor annoyance
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

            // change url in the address bar and save it in the history
            history.pushState('','',source);
        }
    };

    // listen
    document.addEventListener('click', load, false);
};
