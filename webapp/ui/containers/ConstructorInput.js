sap.ui.define(
  [
    "sap/m/InputBase",
    "sap/ui/core/library",
    "sap/ui/layout/library",
    "sap/ui/layout/form/ColumnLayout",
    "sap/ui/layout/form/ColumnLayout"
  ],
  function(InputBase, coreLibrary, library, ColumnLayout, ColumnLayoutRenderer) {
    "use strict";

    // shortcut for sap.ui.core.ValueState
    let ValueState = coreLibrary.ValueState;
    var SimpleFormLayout = library.form.SimpleFormLayout;

    return InputBase.extend("evola.ui.containers.ConstructorInput", {
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
            defaultValue: null
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
          liveChange: {
            parameters: {
              value: { type: "string" },
              escPressed: { type: "boolean" },
              previousValue: { type: "string" }
            }
          }
        }
      },
      setLayout: function(oLayout) {
        this._layout = oLayout;
      },
      getLayout: function() {
        return this._layout;
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
        let input = new sap.m.Input({
          valueHelpOnly: true,
          value: oControl.getValue(),
          name: oControl.getName(),
          change: oControl.onChange.bind(oControl),
          liveChange: oControl.oninput.bind(oControl)
        });
        input.setBindingContext(oControl.getBindingContext());
        if (oControl.getBindingInfo("name")) {
          input.bindProperty("name", oControl.getBindingInfo("name"));
        }

        if (oControl.getBindingInfo("value")) {
          input.bindValue(oControl.getBindingInfo("value"));
        }

        oRm.renderControl(input);

      },
      onAfterRendering: function() {
        //if I need to do any post render actions, it will happen here
        if (sap.ui.core.Control.prototype.onAfterRendering) {
          sap.ui.core.Control.prototype.onAfterRendering.apply(this, arguments); //run the super class's method first
        }
      }
    });
  }
);
