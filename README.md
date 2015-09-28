## knockout-froala

Knockout.js binding for Froala WYSIWYG HTML Rich Text Editor

## Usage

to enable Froala binding on a textarea, you need to provide the following binding handlers 

* `froalaEditor`: the model observable behind the editor
* `froalaEditorOptions`: a plain object or an observable that will hold all the options to initalize the editor

```js
// view model
this.comments = ko.observable();
this.editorOptions = {
  // disable wrapping content with paragraphs
  // instead <br> will be used
  enter: $.FroalaEditor.ENTER_DIV,

  // we like gray!
  theme: 'gray',
  toolbarButtons: [ 'bold', 'italic', 'underline' ]
}
```

```html
<textarea data-bind="value: comments, froalaEditor: comments, froalaEditorOptions: editorOptions"></textarea>
```

## License

The `knockout-froala` project is under MIT license.

Froala Editor has [3 different licenses](http://froala.com/wysiwyg-editor/pricing) for commercial use.
For details please see [License Agreement](http://froala.com/wysiwyg-editor/terms).
