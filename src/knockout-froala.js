/**
 * knockout binding for Froala Editor
 */

ko.bindingHandlers.froalaEditor = (function() { 'use strict';

  // locals
  var unwrap = ko.utils.unwrapObservable;

  /**
   * initiate froala editor, listen to its changes
   * and updates the underlying observable model
   *
   * @param {element} element
   * @param {object} value
   * @param {object} bindings
   * @api public
   */

  function init( element, value, bindings ) {
    var $el = $( element );
    var model = value();
    var options = unwrap( bindings() ).froalaEditorOptions || {};

    // initialize the editor
    $el.froalaEditor( options );

    // update underlying model whenever editor content changed
    $el.on('froalaEditor.contentChanged', function (e, editor) {
      if( ko.isWriteableObservable( model ) ) {
        var editorValue = editor.html.get();
        var current = model();
        if(current !== editorValue) {
          model( editorValue );
        }
      }
    });

    // cleanup editor, when dom node is removed
    ko.utils.domNodeDisposal.addDisposeCallback( element, destroy( element ) )
  }

  /**
   * update froala editor whenever underlying observable model
   * is updated
   *
   * @param {element} element
   * @param {object} value
   * @api public
   */

  function update( element, value ) {
    var $el = $( element );
    var modelValue = unwrap( value() );
    var editorInstance = $el.data( 'froala.editor' );
    var editorValue = editorInstance.html.get();

    // avoid any un-necessary updates
    if( editorValue !== modelValue ) {
      editorInstance.html.set( modelValue );
    }
  }

  /**
   * destroy froala editor instance
   *
   * @param {dom} element
   * @return {function} handler
   * @api private
   */

  function destroy( element ) {
    var $el = $( element );
    return function() {
      if( $el.data( 'froala.editor' ) ) {
        $el.froalaEditor( 'destroy' );
      }
    }
  }

  /**
   * expose `froala` binding handler methods
   */

  return {
    init: init,
    update: update
  }

})();
