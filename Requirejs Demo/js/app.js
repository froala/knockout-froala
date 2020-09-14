

requirejs(["knockout"],function(ko)
{
window.ko=ko;
requirejs(["FroalaEditor"],function(FroalaEditor)
{
 window.FroalaEditor = FroalaEditor;
requirejs(["knockout-froala"],function()
{


requirejs(function() {


  (function(){
    var viewModel = {
      html: ko.observable( '' ),
      options: {

        enter: FroalaEditor.ENTER_DIV,
        theme: 'gray',
        charCounterMax:150

      }
    }
  
    ko.applyBindings( viewModel, document.getElementById( 'app' ) );
  })();

   

})
})
})

})