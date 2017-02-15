/**
 * knockout binding for Froala Editor
 */

(function() { 'use strict';

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
    var allBindings = unwrap( bindings() );
    var options = ko.toJS( allBindings.froalaOptions );

    // initialize the editor
    $el.froalaEditor( options || {} );

    // provide froala editor instance for flexibility
    if( allBindings.froalaInstance && ko.isWriteableObservable( allBindings.froalaInstance ) ) {
      allBindings.froalaInstance( $el.data( 'froala.editor' ) );
    }

    // update underlying model whenever editor content changed
    var processUpdateEvent = function (e, editor) {
        if (ko.isWriteableObservable(model)) {
            var editorValue = editor.html.get();
            var current = model();
            if (current !== editorValue) {
                model(editorValue);
            }
        }
    }

    $el.on('froalaEditor.contentChanged', processUpdateEvent);
    $el.on('froalaEditor.paste.after', processUpdateEvent);

    // cleanup editor, when dom node is removed
    ko.utils.domNodeDisposal.addDisposeCallback( element, destroy( element ) );

    // do not handle child nodes
    return { controlsDescendantBindings: true };
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

    if( editorInstance == null ) {
      return;
    }

    var editorValue = editorInstance.html.get();

    // avoid any un-necessary updates
    if( editorValue !== modelValue && (typeof modelValue === 'string'  || modelValue === null)) {
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

  ko.bindingHandlers.froala = {
    init: init,
    update: update
  }

})();
