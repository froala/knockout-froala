/* global FroalaEditor */

/**
 * knockout binding for Froala Editor
 */
(function () {
  'use strict';

  /**
   * initiate froala editor, listen to its changes
   * and updates the underlying observable model
   *
   * @param {element} element
   * @param {object} value
   * @param {object} bindings
   * @api public
   */
  function init(element, value, bindings) {
    var model = value();
    var allBindings = ko.utils.unwrapObservable(bindings());
    var options = allBindings.froalaOptions ? ko.toJS(allBindings.froalaOptions) : {};

    // register events before initializing the editor
    for (var eventName in allBindings.froalaEvents) {
      options.events[eventName] = allBindings.froalaEvents[eventName];
    }

    // update underlying KO model whenever editor content changed
    var processUpdateEvent = function (editorInstance) {
      if (ko.isWriteableObservable(model)) {
        var editorValue = editorInstance.html.get();
        var current = model();
        if (current !== editorValue) {
          model(editorValue);
        }
      }
    };

    options.events = {
      contentChanged: function () {
        processUpdateEvent(this);
      },
      'paste.after': function () {
        processUpdateEvent(this);
      },
      'image.beforeUpload': function (files) {
        var editorInstance = this;
        if (files.length) {
          var reader = new FileReader();
          reader.onload = function (e) {
            var result = e.target.result;
            editorInstance.image.insert(result, null, null, editorInstance.image.get());
            processUpdateEvent(editorInstance);
          };
          reader.readAsDataURL(files[0]);
        }
        return false;
      },
    };

    // initialize the editor
    new FroalaEditor(element, options);

    // cleanup editor, when dom node is removed
    ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
      element['data-froala.editor'].destroy();
    });

    // do not handle child nodes (e.g. if user pasted KO laced content.)
    return {
      controlsDescendantBindings: true,
    };
  }

  /**
      * update froala editor whenever underlying observable model
      * is updated
      *
      * @param {element} element
      * @param {object} value
      * @api public
      */
  function update(element, value) {
    var modelValue = ko.utils.unwrapObservable(value());

    if (element) {
      var editorInstance = element['data-froala.editor'];
      if (editorInstance.html) {
        var editorValue = editorInstance.html.get();

        // avoid any un-necessary updates
        if (editorValue !== modelValue && (typeof modelValue === 'string' || modelValue === null)) {
          editorInstance.html.set(modelValue);
        }
      }
    }
  }

  /**
   * expose `froala` binding handler methods
  */
  ko.bindingHandlers.froala = {
    init: init,
    update: update,
  };
})();
