SimpleJSLoader
-------------------

This is a simple, one page script to load body content without freshing the page.

Written in pure Javascript

Supports internal and external scripts dynamically

#### Usage
- Include this script `<script type="text/javascript" src="/sjsloader.js"></script>`
- Format your anchors `<a class="autoLoad" href="/body/toload">Home</a>`
- Content to load and replace = `<body>`
<br /><br />
Done!

Your /body/toload HTML page may also contain a valid `<title>` to load.<br />
Your `<body>` may contain internal or external scripts aswell. <br />
Remember that autoloading uses the current `<head>`, use a normal `<a>` and autoload from there on, to get your new `<head>`.
<br /><br />

Here's a detailed usage example.
#### /site.js
```sh
console.log("Hello world, from external script");
```

#### /myglobal.css
```sh
* {
  color: green;
}
```

#### /mydifferent.css
```sh
* {
  color: red;
}
```

#### /index
```sh
<!DOCTYPE html>
<html>
<head>
  <title>Index - Welcome!</title>
  <!-- Initial css, this will be used for all autoloaded pages. -->
  <link rel="stylesheet" href="/myglobal.css">
</head>
<!-- Dynamic content below -->
<body>
  Hello, welcome to the index. <br />
  This is a link <b>without</b> autoload: <a href="/freshpage"> here</a><br/>
  This is a link <b>with</b> autoload: <a class="autoLoad" href="/autoloaded"> here</a>

  <!-- This is allowed -->
  <script type="text/javascript" src="/site.js"></script>

  <!-- And so is this -->
  <script>
    console.log("Hello, world.");
  </script>
</body>
</html>
```

#### /freshpage
```sh
<!DOCTYPE html>
<html>
<head>
  <title>Fresh page</title>
  <!-- Initial css, this will be used for all autoloaded pages. -->
  <link rel="stylesheet" href="/mydifferent.css">
</head>
<!-- Dynamic content below -->
<body>
  Hello, welcome to the index. <br />
  This is a link <b>without</b> autoload: <a href="/freshpage"> here</a><br/>
  This is a link <b>with</b> autoload: <a class="autoLoad" href="/autoloaded"> here</a>

  <!-- This is allowed -->
  <script type="text/javascript" src="/site.js"></script>

  <!-- And so is this -->
  <script>
    console.log("Hello, world.");
  </script>
</body>
</html>
```

#### /autoloaded
```sh
<!DOCTYPE html>
<html>
<head>
  <title>Autoloaded!</title>
  <!-- Initial css, this will be used for all autoloaded pages. -->
  <link rel="stylesheet" href="/myglobal.css">
</head>
<!-- Dynamic content below -->
<body>
  This is autoloaded, you should notice that the <head> is the same as the page that requested this.<br />
  This is a link <b>without</b> autoload: <a href="/freshpage"> here</a><br/>
  This is a link <b>with</b> autoload: <a class="autoLoad" href="/autoloaded"> here</a>

  <!-- This is allowed -->
  <script type="text/javascript" src="/site.js"></script>

  <!-- And so is this -->
  <script>
    console.log("Hello, world.");
  </script>
</body>
</html>
```


