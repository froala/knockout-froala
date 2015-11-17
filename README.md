## knockout-froala

Knockout.js binding for Froala WYSIWYG HTML Rich Text Editor ( Version 2 )

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
<textarea data-bind="value: comments, froala: comments, froalaOptions: editorOptions"></textarea>
```

or a `<div>`

```html
<div data-bind="froala: comments, froalaOptions: editorOptions"></div>
```

## License

The `knockout-froala` project is under MIT license. However, in order to use Froala WYSIWYG HTML Editor plugin you should purchase a license for it.

Froala Editor has [3 different licenses](http://froala.com/wysiwyg-editor/pricing) for commercial use.
For details please see [License Agreement](http://froala.com/wysiwyg-editor/terms).
