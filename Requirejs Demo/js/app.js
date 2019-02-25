// Load the editor and the plugins we need.
define(["jquery","froala_editor", "fe_image", "fe_link"], function($,a,b,c) {

  (function(){
    var viewModel = {
      html: ko.observable( '' ),
      options: {
        // disable wrapping content with paragraphs
        // instead <br> will be used
        enter: $.FroalaEditor.ENTER_DIV,
        theme: 'gray'
      }
    }
  
    ko.applyBindings( viewModel, document.getElementById( 'app' ) );
  })();
    /**
 * knockout binding for Froala Editor
 */

})