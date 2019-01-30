sap.ui.define(["sap/ui/core/Control"], function(Control) {
  "use strict";
  
  return Control.extend("evola.ui.containers.Constructor", {
    metadata: {
      interfaces : ["sap.ui.core.IFormContent"],
      properties: {
        name: {
          type: "string",
          group: "Misc",
          defaultValue: ""
        },
        title: "Evola Form Constructor",
        width: {
          type: "sap.ui.core.CSSSize", //this is optional, but it helps prevent errors in your code by enforcing a type
          defaultValue: "100%" //this is also optional, but recommended, as it prevents your properties being null
        },
        height: {
          type: "sap.ui.core.CSSSize",
          defaultValue: "auto"
        }
      },
      aggregations: {
        items: {
          type: "evola.ui.containers.ConstructorItem",
          multiple: true,
          singularName: "item",
          bindable: "bindable"
        }
      },
      associations: {
        selectedItem: {
          type: "evola.ui.containers.ConstructorItem",
          multiple: false
        }
      },
      defaultAggregation: "items",
      events: {
        change: {
          parameters: {
            selectedItem: {
              type: "evola.ui.containers.ConstructorItem"
            }
          }
        }
      }
    },

    init: function() {
      if (sap.ui.core.Control.prototype.init) {
        // check whether superclass implements the method
        sap.ui.core.Control.prototype.init.apply(this, arguments); // call the method with the original arguments
      }

      //var libraryPath = jQuery.sap.getModulePath("evola.ui"); //get the server location of the ui library
      //jQuery.sap.includeStyleSheet(libraryPath + "/../css/dalrae.css"); //specify the css path relative from the ui folder
    },

    renderer: function(oRm, oControl) {
      //first up, render a div for the ShadowBox
      oRm.write("<div");
      //render width & height properties
      oRm.write(
        ' style="width: ' +
          oControl.getWidth() +
          "; height: " +
          oControl.getHeight() +
          ';"'
      );
      //next, render the control information, this handles your sId (you must do this for your control to be properly tracked by ui5).
      oRm.writeControlData(oControl);
      oRm.addClass("Constructor");
      oRm.writeClasses();
      oRm.write(">");

      var aItems = oControl.getItems();

      aItems.forEach(item => {
        oRm.renderControl(item);
      });

      //and obviously, close off our div
      oRm.write("</div>");
    },

    onAfterRendering: function() {
      //if I need to do any post render actions, it will happen here
      if (sap.ui.core.Control.prototype.onAfterRendering) {
        sap.ui.core.Control.prototype.onAfterRendering.apply(this, arguments); //run the super class's method first
      }
    },

    exit: function() {}
  });
});
