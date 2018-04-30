SimpleJSLoader
-------------------

This is a simple, one page script to load content into a container without freshing the page.
Coded in PURE Javascript

#### Usage
- Include this script `<script type="text/javascript" src="/sjsloader.js"></script>`
- Assign an ID to your body tag `<body id="mainContent">`
- Format your anchors `<a href="index?mainContent=index">Home</a>`

Notice how the `<body>` ID and `<a>` format match, this is required. Name them whatever you like.
Variable after "="" is the URI to request, variable before "?" is fallback
