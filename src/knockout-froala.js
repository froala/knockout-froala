/**
 * knockout binding for Froala Editor
 */

(function( ko, $ ) { 'use strict';

  /**
   * binding definition
   */

	ko.binidingHandlers.froalaEditor = {
    init: function( element, value, bindings, viewModel, context ) {
      var $el = $( element );
      var options = ko.unwrapObservable( value() );

      $el.froalaEditor( options );
    },
    update: function( element, value, bindings, viewModel, context ) {

    }
  }

})( window.ko, window.jQuery );
