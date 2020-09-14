/**
 */


  var viewModel = {
    html: ko.observable( '' ),
    options: {
      // disable wrapping content with paragraphs
      // instead <br> will be used
      enter: FroalaEditor.ENTER_BR,
      theme: 'gray',
      
      
  }
  }
  ko.applyBindings( viewModel, document.getElementById( 'app' ) );
