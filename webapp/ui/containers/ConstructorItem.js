sap.ui.define(["sap/ui/core/Control", "sap/ui/core/library"], function(
  Control,
  coreLibrary
) {
  "use strict";

  // shortcut for sap.ui.core.ValueState
  let ValueState = coreLibrary.ValueState;

  return Control.extend("evola.ui.containers.ConstructorItem", {
    metadata: {
      properties: {
        name: {
          type: "string",
          group: "Misc",
          defaultValue: ""
        },
        label: {
          type: "string",
          group: "Misc",
          defaultValue: ""
        },
        type: {
          type: "string",
          group: "Misc",
          defaultValue: ""
        },
        value: {
          type: "string",
          group: "Data",
          defaultValue: null,
          bindable: "bindable"
        },
        enabled: {
          type: "boolean",
          group: "Behavior",
          defaultValue: true
        },
        editable: {
          type: "boolean",
          group: "Behavior",
          defaultValue: true
        },
        placeholder: {
          type: "string",
          group: "Misc",
          defaultValue: null
        },
        valueState: {
          type: "sap.ui.core.ValueState",
          group: "Data",
          defaultValue: ValueState.None
        },
        required: {
          type: "boolean",
          group: "Misc",
          defaultValue: false
        }
      },
      events: {
        change: {
          parameters: {
            value: { type: "string" }
          }
        },
        liveChange : {
          parameters : {
            value : {type : "string"},
            escPressed : {type : "boolean"},
            previousValue : {type : "string"}
          }
        },
      }
    },
    onChange: function(oEvent) {
      // check the control is editable or not
      if (!this.getEditable() || !this.getEnabled()) {
        return;
      }

      var sValue = oEvent.getParameter("value");

      if (sValue !== this._lastValue) {
        this._lastValue = sValue;
        this.fireChange(oEvent.getParameters());
        return true;
      }
    },
    oninput: function(oEvent) {
      this.fireLiveChange(oEvent.getParameters());
    },
    init: function() {},
    renderer: function(oRm, oControl) {
      let label = new sap.m.Label({
        text: oControl.getName()
      });
      oRm.renderControl(label);
      let input = new sap.m.Input({
        valueHelpOnly: true,
        value: oControl.getValue(),
        name: oControl.getName(),
        change: oControl.onChange.bind(oControl),
        liveChange: oControl.oninput.bind(oControl)
      });
      oRm.renderControl(input);

      // oRm.write("<div");
      // oRm.writeControlData(oControl);
      // oRm.addClass("ConstructorItem");
      // oRm.writeClasses();
      // oRm.write(">");
      //
      // oRm.write("<label");
      // oRm.writeAttributeEscaped("htmlFor", oControl.getName());
      // oRm.write(">");
      // oRm.write(oControl.getLabel());
      // oRm.write("</label>");
      //
      // oRm.write("<input");
      // oRm.writeAttributeEscaped("htmlFor", oControl.getName());
      // oRm.writeAttributeEscaped("type", "text");
      // oRm.writeAttributeEscaped("name", oControl.getName());
      // oRm.writeAttributeEscaped("value", oControl.getValue());
      // oRm.write("/>");
      //
      // oRm.write("</div>");
    },
    onAfterRendering: function() {
      //if I need to do any post render actions, it will happen here
      if (sap.ui.core.Control.prototype.onAfterRendering) {
        sap.ui.core.Control.prototype.onAfterRendering.apply(this, arguments); //run the super class's method first
      }
    }
  });
});
