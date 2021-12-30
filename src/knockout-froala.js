/**
 * knockout binding for Froala Editor
 */

(function() { 'use strict';

  // locals
  var unwrap = ko.utils.unwrapObservable;
  var editorInstance =null;
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
   
    var model = value();
    var allBindings = unwrap( bindings() );
    var options = ko.toJS( allBindings.froalaOptions );

    // register events before initializing the editor
    for( var eventName in allBindings.froalaEvents ) {
      $el.on( 'froalaEditor.' + eventName, allBindings.froalaEvents[eventName] );
    }

    // initialize the editor
    //$el.froalaEditor( options || {} );

    // provide froala editor instance for flexibility
    if( allBindings.froalaInstance && ko.isWriteableObservable( allBindings.froalaInstance ) ) {
      allBindings.froalaInstance( $el.data( 'froala.editor' ) );
    }

    // update underlying model whenever editor content changed
    var processUpdateEvent = function (e) {
    
      if (ko.isWriteableObservable(model)) {
        //if froalaInstance defined, use that for the editor instance
        if(allBindings.froalaInstance && ko.isWriteableObservable( allBindings.froalaInstance ) ) {
          editorInstance = allBindings.froalaInstance();
        }
        
        if(editorInstance!=null)
        {
          var editorValue = editorInstance.html.get();
          var current = model();
          if (current !== editorValue) {
              model(editorValue);
          }
        }
        
      }
  }
options.events = {
  initialized: function() {
    editorInstance=this;
    // provide froala editor instance for flexibility
    if(allBindings.froalaInstance && ko.isWriteableObservable( allBindings.froalaInstance ) ) {
      allBindings.froalaInstance( editorInstance );
    }
  },
  'contentChanged': processUpdateEvent,
  'paste.after':processUpdateEvent
}
 new FroalaEditor(element,options||{});
 

    

    

    // cleanup editor, when dom node is removed
    ko.utils.domNodeDisposal.addDisposeCallback( element, destroy( element, bindings ) );

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

  function update( element, value, bindings ) {
  
    var modelValue = unwrap( value() );

    //if froalaInstance defined, use that for the editor instance
    var allBindings = unwrap( bindings() );
    if(allBindings.froalaInstance && ko.isWriteableObservable( allBindings.froalaInstance ) ) {
      editorInstance = allBindings.froalaInstance();
    }

 
    if( editorInstance == null  ) {
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

  function destroy( element, bindings ) {
    return function() {
      //if froalaInstance defined, use that for the editor instance
      var allBindings = unwrap( bindings() );
      if(allBindings.froalaInstance && ko.isWriteableObservable( allBindings.froalaInstance ) ) {
        editorInstance = allBindings.froalaInstance();
      }

      if( editorInstance!=null ) {
        editorInstance.destroy();
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
