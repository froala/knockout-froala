# Knockout Froala WYSIWYG HTML Editor

[![npm](https://img.shields.io/npm/v/knockout-froala.svg)](https://www.npmjs.com/package/knockout-froala)
[![npm](https://img.shields.io/npm/dm/knockout-froala.svg)](https://www.npmjs.com/package/knockout-froala)
[![npm](https://img.shields.io/npm/l/knockout-froala.svg)](https://www.npmjs.com/package/knockout-froala)

>Knockout.js binding for Froala WYSIWYG HTML Rich Text Editor ( Version 2 )

## Install

using Bower

```bash
bower install knockout-froala
```

using npm

```bash
npm install knockout-froala
```

## Usage

to enable Froala binding on a textarea, you need to provide the following binding handlers

* `froala`: the model observable behind the editor
* `froalaOptions`: a plain object or an observable that will hold all the options to initalize the editor
* `froalaInstance`: [ optional ] if provided, froala instance will be stored in this observable once initialized ( should be observable )

```js
var viewModel = {
  comments: ko.observable(),
  options: {
    // disable wrapping content with paragraphs
    // instead <br> will be used
    enter: $.FroalaEditor.ENTER_DIV,

    // we like gray!
    theme: 'gray',
    toolbarButtons: [ 'bold', 'italic', 'underline' ]
  }
}

ko.applyBindings( viewModel );
```

Using a `<textarea>`

```html
<textarea data-bind="value: comments, froala: comments, froalaOptions: options"></textarea>
```

or a `<div>`

```html
<div data-bind="froala: comments, froalaOptions: options"></div>
```


## How to use with require js
In order to use knockout-froala with require js, you require code snippet similar to following:

// Froala Editor plugins list.
    var fe_plugins = ['align', 'char_counter', 'code_view', 'colors', 'draggable', 'emoticons',
                      'entities', 'file', 'font_family', 'font_size', 'fullscreen',
                      'image_manager', 'image', 'inline_style', 'line_breaker',
                      'link', 'lists', 'paragraph_format', 'paragraph_style', 'quote',
                      'save', 'table', 'url', 'video']
    // Define paths.
    var paths = {
      'app': '../app',
      'jquery': 'https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.0/jquery.min',
      'froala_editor': '../../../bower_components/froala-wysiwyg-editor/js/froala_editor.min',
      'knockout':'../../../bower_components/knockout/dist/knockout.debug',
      'knockout-froala':'../../../src/knockout-froala'
    };
    // Add Froala Editor plugins to path.
    for (var i = 0; i < fe_plugins.length; i++) {
      paths['fe_' + fe_plugins[i]] = '../../../bower_components/froala-wysiwyg-editor/js/plugins/' + fe_plugins[i] + '.min';
    }
    var shim = {
      'froala_editor': {deps: ['jquery']}
    };
    for (var i = 0; i < fe_plugins.length; i++) {
      shim['fe_' + fe_plugins[i]] = {
        deps: ['froala_editor']
      }
    }
    // Init RequireJS.
    requirejs.config({
      'baseUrl': 'js/lib',
      'paths': paths,
      shim: shim
    });

    // Load the main app module to start the app
    requirejs(["knockout"],function(ko)
    {
    window.ko=ko;
    requirejs(["knockout-froala"],function(knockout_froala)
    {
    requirejs(["app"]);
    })
  })

Where:
1.fe_plugins denote list of froala plugins.
2.paths variable defines the path of all resources.
3.shim variable defines dependencies among  js files.
4.knockout.debug.js is loaded first because it returns a object(ko) required for accessing knockout variables and methods.
This variable is made global.
5.knockout-froala is loaded next because it defines the froala bindings required by main app.
6.Finally app.js is loaded which contains the logic of your app.

A Requirejs demo app is included in the repository. You can refer it for more details.
 
## License

The `knockout-froala` project is under MIT license. However, in order to use Froala WYSIWYG HTML Editor plugin you should purchase a license for it.

Froala Editor has [3 different licenses](http://froala.com/wysiwyg-editor/pricing) for commercial use.
For details please see [License Agreement](http://froala.com/wysiwyg-editor/terms).
