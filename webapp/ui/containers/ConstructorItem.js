sap.ui.define(
  [
    "sap/ui/core/Control",
    "sap/ui/core/library",
    "sap/ui/layout/library",
    "sap/ui/layout/form/ColumnLayout",
    "sap/ui/layout/form/ColumnLayout"
  ],
  function(Control, coreLibrary, library, ColumnLayout, ColumnLayoutRenderer) {
    "use strict";

    // shortcut for sap.ui.core.ValueState
    let ValueState = coreLibrary.ValueState;
    var SimpleFormLayout = library.form.SimpleFormLayout;

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
        //TODO: Need implement something like this https://github.com/SAP/openui5/blob/7672ca39cd0fdaf9e822172dd52e5d861aa0bd12/src/sap.ui.layout/src/sap/ui/layout/form/ColumnLayoutRenderer.js
        // oRm.write("<div");
        // oRm.writeElementData(oControl);
        // oRm.addClass("sapUiFormElement");
        // if (oControl.getLabel()) {
        //   oRm.addClass("sapUiFormElementLbl");
        // }
        // oRm.writeClasses();
        // oRm.write(">");
        let input = new sap.m.Input({
          valueHelpOnly: true,
          // value: oControl.getValue(),
          // name: oControl.getName(),
          change: oControl.onChange.bind(oControl),
          liveChange: oControl.oninput.bind(oControl)
        });
        input.setBindingContext(oControl.getBindingContext());
        input.bindValue(oControl.getBindingInfo("value"));

        let oElement = new sap.ui.layout.form.FormElement();
        oElement.addField(input);
        if (oControl.getLabel()) {
          let label = new sap.m.Label({
            text: oControl.getLabel()
          });
          label.setLabelFor(input);
          oElement.setLabel(label);
          // oRm.renderControl(label);
        }

        let oContainer = new sap.ui.layout.form.FormContainer(
          oControl.getId() + "--Container"
        );
        oContainer.addFormElement(oElement);
        let oLayout = oControl.getLayout();
        oLayout.setParent(oContainer, null, true);

        let renderer = oLayout.getRenderer();
        renderer.renderElement(oRm, oLayout, oElement);

        // oRm.renderControl(input);
        // oRm.write("</div>");
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
