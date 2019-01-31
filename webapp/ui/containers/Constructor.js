sap.ui.define(
  ["sap/ui/core/Control", "jquery.sap.global", "sap/ui/layout/library"],
  function(Control, jQuery, library) {
    "use strict";
    // shortcut for sap.ui.layout.BackgroundDesign
    var BackgroundDesign = library.BackgroundDesign;

    // shortcut for sap.ui.layout.form.SimpleFormLayout
    var SimpleFormLayout = library.form.SimpleFormLayout;

    var ResponsiveLayout;
    var ResponsiveFlowLayoutData;
    var ResponsiveGridLayout;
    var GridLayout;
    var GridContainerData;
    var GridElementData;
    var ColumnLayout;

    return Control.extend("evola.ui.containers.Constructor", {
      metadata: {
        interfaces: ["sap.ui.core.IFormContent"],
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
          },
          layout: {
            type: "sap.ui.layout.form.SimpleFormLayout",
            group: "Misc",
            defaultValue: SimpleFormLayout.ResponsiveLayout
          },
          editable: {
            type: "boolean",
            group: "Behavior",
            defaultValue: true
          },
          labelSpanXL: { type: "int", group: "Misc", defaultValue: -1 },
          /**
           * Default span for labels in large size.
           *
           * <b>Note:</b> If <code>adjustLabelSpanThis</code> is set, this property is only used if more than 1 <code>FormContainer</code> is in one line.
           * If only 1 <code>FormContainer</code> is in the line, then the <code>labelSpanM</code> value is used.
           *
           * <b>Note:</b> This property is only used if <code>ResponsiveGridLayout</code> or <code>ColumnLayout</code> is used as a layout.
           * If a <code>ColumnLayout</code> is used, this property defines the label size for large columns.
           * @since 1.16.3
           */
          labelSpanL: { type: "int", group: "Misc", defaultValue: 4 },

          /**
           * Default span for labels in medium size.
           *
           * <b>Note:</b> If <code>adjustLabelSpanThis</code> is set, this property is used for full-size <code>FormContainers</code>.
           * If more than one <code>FormContainer</code> is in one line, <code>labelSpanL</code> is used.
           *
           * <b>Note:</b> This property is only used if a <code>ResponsiveGridLayout</code> is used as a layout.
           * @since 1.16.3
           */
          labelSpanM: { type: "int", group: "Misc", defaultValue: 2 },

          /**
           * Default span for labels in small size.
           *
           * <b>Note:</b> This property is only used if a <code>ResponsiveGridLayout</code> is used as a layout.
           * @since 1.16.3
           */
          labelSpanS: { type: "int", group: "Misc", defaultValue: 12 },

          /**
           * If set, the usage of <code>labelSpanL</code> and <code>labelSpanM</code> are dependent on the number of <code>FormContainers</code> in one row.
           * If only one <code>FormContainer</code> is displayed in one row, <code>labelSpanM</code> is used to define the size of the label.
           * This is the same for medium and large <code>Forms</code>.
           * This is done to align the labels on forms where full-size <code>FormContainers</code> and multiple-column rows are used in the same <code>Form</code>
           * (because every <code>FormContainer</code> has its own grid inside).
           *
           * If not set, the usage of <code>labelSpanL</code> and <code>labelSpanM</code> are dependent on the <code>Form</code> size.
           * The number of <code>FormContainers</code> doesn't matter in this case.
           *
           * <b>Note:</b> This property is only used if a <code>ResponsiveGridLayout</code> is used as a layout.
           * @since 1.34.0
           */
          adjustLabelSpan: {
            type: "boolean",
            group: "Misc",
            defaultValue: true
          },

          /**
           * Number of grid cells that are empty at the end of each line on extra large size.
           *
           * <b>Note:</b> This property is only used if a <code>ResponsiveGridLayout</code> is used as a layout.
           * If the default value -1 is not overwritten with the meaningful one then the <code>emptySpanL</code> value is used (from the backward compatibility reasons).
           * @since 1.34.0
           */
          emptySpanXL: { type: "int", group: "Misc", defaultValue: -1 },

          /**
           * Number of grid cells that are empty at the end of each line on large size.
           *
           * <b>Note:</b> This property is only used if a <code>ResponsiveGridLayout</code> or a <code>ColumnLayout</code> is used as a layout.
           * If a <code>ColumnLayout</code> is used, this property defines the empty cells for large columns.
           * @since 1.16.3
           */
          emptySpanL: { type: "int", group: "Misc", defaultValue: 0 },

          /**
           * Number of grid cells that are empty at the end of each line on medium size.
           *
           * <b>Note:</b> This property is only used if a <code>ResponsiveGridLayout</code> is used as a layout.
           * @since 1.16.3
           */
          emptySpanM: { type: "int", group: "Misc", defaultValue: 0 },

          /**
           * Number of grid cells that are empty at the end of each line on small size.
           *
           * <b>Note:</b> This property is only used if a <code>ResponsiveGridLayout</code> is used as a layout.
           * @since 1.16.3
           */
          emptySpanS: { type: "int", group: "Misc", defaultValue: 0 },

          /**
           * Form columns for extra large size.
           * The number of columns for extra large size must not be smaller than the number of columns for large size.
           *
           * <b>Note:</b> This property is only used if a <code>ResponsiveGridLayout</code> or a <code>ColumnLayout</code> is used as a layout.
           * If the default value -1 is not overwritten with the meaningful one then the <code>columnsL</code> value is used (from the backward compatibility reasons).
           * @since 1.34.0
           */
          columnsXL: { type: "int", group: "Misc", defaultValue: -1 },

          /**
           * Form columns for large size.
           * The number of columns for large size must not be smaller than the number of columns for medium size.
           *
           * <b>Note:</b> This property is only used if a <code>ResponsiveGridLayout</code> or a <code>ColumnLayout</code> is used as a layout.
           * @since 1.16.3
           */
          columnsL: { type: "int", group: "Misc", defaultValue: 2 },

          /**
           * Form columns for medium size.
           *
           * <b>Note:</b> This property is only used if a <code>ResponsiveGridLayout</code> or a <code>ColumnLayout</code> is used as a layout.
           * @since 1.16.3
           */
          columnsM: { type: "int", group: "Misc", defaultValue: 1 },

          /**
           * If the <code>Form</code> contains only one single <code>FormContainer</code> and this property is set,
           * the <code>FormContainer</code> is displayed using the full size of the <code>Form</code>.
           * In this case the properties <code>columnsL</code> and <code>columnsM</code> are ignored.
           *
           * In all other cases the <code>FormContainer</code> is displayed in the size of one column.
           *
           * <b>Note:</b> This property is only used if a <code>ResponsiveGridLayout</code> is used as a layout.
           * @since 1.34.0
           */
          singleContainerFullSize: {
            type: "boolean",
            group: "Misc",
            defaultValue: true
          },

          /**
           * Breakpoint between Medium size and Large size.
           *
           * <b>Note:</b> This property is only used if a <code>ResponsiveGridLayout</code> is used as a layout.
           * @since 1.34.0
           */
          breakpointXL: { type: "int", group: "Misc", defaultValue: 1440 },

          /**
           * Breakpoint between Medium size and Large size.
           *
           * <b>Note:</b> This property is only used if a <code>ResponsiveGridLayout</code> is used as a layout.
           * @since 1.16.3
           */
          breakpointL: { type: "int", group: "Misc", defaultValue: 1024 },

          /**
           * Breakpoint between Small size and Medium size.
           *
           * <b>Note:</b> This property is only used if a <code>ResponsiveGridLayout</code> is used as a layout.
           * @since 1.16.3
           */
          breakpointM: { type: "int", group: "Misc", defaultValue: 600 },
          backgroundDesign: {
            type: "sap.ui.layout.BackgroundDesign",
            group: "Appearance",
            defaultValue: BackgroundDesign.Translucent
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

      onBeforeRendering: function() {
        // var oItems = this.getAggregation("items");
        if (
          !this._bResponsiveLayoutRequested &&
          !this._bGridLayoutRequested &&
          !this._bResponsiveGridLayoutRequested &&
          !this._bColumnLayoutRequested
        ) {
          // if Layout is still loaded do it after it is loaded
          var bLayout = _setLayout.call(this);

          if (bLayout) {
            _updateLayout.call(this);
          }
        }
      },

      renderer: function(oRm, oControl) {
        var oLayout = oControl.getLayout();

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
        oRm.addClass("sapUiSimpleForm");
        if (oControl.getEditable()) {
          oRm.addClass("sapUiFormEdit");
          oRm.addClass("sapUiFormEdit-CTX");
        }
        oRm.writeStyles();
        oRm.writeClasses();
        oRm.write(">");

        var aItems = oControl.getItems();

        // if (oLayout) {
        //   // render the layout with the content of this form control
        //   oRm.renderControl(oLayout);
        // } else {
        //   jQuery.sap.log.warning(
        //     'Form "' + oControl.getId() + '" - Layout missing!',
        //     "Renderer",
        //     "Constructor"
        //   );
        // }

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

    function _setLayout() {
      var oItems = this.getAggregation("items");
      // if (oItems.getLayout()) {
      //   this._bChangedByMe = true;
      //   oItems.destroyLayout();
      //   // _removeResize.call(this);
      //   this._bChangedByMe = false;
      // }

      var oLayout;

      switch (this.getLayout()) {
        case SimpleFormLayout.ResponsiveLayout:
          if (
            (!ResponsiveLayout || !ResponsiveFlowLayoutData) &&
            !this._bResponsiveLayoutRequested
          ) {
            ResponsiveLayout = sap.ui.require(
              "sap/ui/layout/form/ResponsiveLayout"
            );
            ResponsiveFlowLayoutData = sap.ui.require(
              "sap/ui/layout/ResponsiveFlowLayoutData"
            );
            if (!ResponsiveLayout || !ResponsiveFlowLayoutData) {
              sap.ui.require(
                [
                  "sap/ui/layout/form/ResponsiveLayout",
                  "sap/ui/layout/ResponsiveFlowLayoutData"
                ],
                _ResponsiveLayoutLoaded.bind(this)
              );
              this._bResponsiveLayoutRequested = true;
            }
          }
          if (ResponsiveLayout && ResponsiveFlowLayoutData) {
            oLayout = new ResponsiveLayout(this.getId() + "--Layout");
          }
          break;
        case SimpleFormLayout.GridLayout:
          if (
            (!GridLayout || !GridContainerData || !GridElementData) &&
            !this._bGridLayoutRequested
          ) {
            GridLayout = sap.ui.require("sap/ui/layout/form/GridLayout");
            GridContainerData = sap.ui.require(
              "sap/ui/layout/form/GridContainerData"
            );
            GridElementData = sap.ui.require(
              "sap/ui/layout/form/GridElementData"
            );
            if (!GridLayout || !GridContainerData || !GridElementData) {
              sap.ui.require(
                [
                  "sap/ui/layout/form/GridLayout",
                  "sap/ui/layout/form/GridContainerData",
                  "sap/ui/layout/form/GridElementData"
                ],
                _GridLayoutLoaded.bind(this)
              );
              this._bGridLayoutRequested = true;
            }
          }
          if (GridLayout && GridContainerData && GridElementData) {
            oLayout = new GridLayout(this.getId() + "--Layout");
          }
          break;
        case SimpleFormLayout.ResponsiveGridLayout:
          if (!ResponsiveGridLayout && !this._bResponsiveGridLayoutRequested) {
            ResponsiveGridLayout = sap.ui.require(
              "sap/ui/layout/form/ResponsiveGridLayout"
            );
            if (!ResponsiveGridLayout) {
              sap.ui.require(
                ["sap/ui/layout/form/ResponsiveGridLayout"],
                _ResponsiveGridLayoutLoaded.bind(this)
              );
              this._bResponsiveGridLayoutRequested = true;
            }
          }
          if (ResponsiveGridLayout) {
            oLayout = new ResponsiveGridLayout(this.getId() + "--Layout");
          }
          break;
        case SimpleFormLayout.ColumnLayout:
          if (!ColumnLayout && !this._bColumnLayoutRequested) {
            ColumnLayout = sap.ui.require("sap/ui/layout/form/ColumnLayout");
            if (!ColumnLayout) {
              sap.ui.require(
                ["sap/ui/layout/form/ColumnLayout"],
                _ColumnLayoutLoaded.bind(this)
              );
              this._bColumnLayoutRequested = true;
            }
          }
          if (ColumnLayout) {
            oLayout = new ColumnLayout(this.getId() + "--Layout");
          }
          break;
        // no default
      }

      if (oLayout) {
        this._bChangedByMe = true;
        oItems.forEach(item => {
          if (!item.getLayout()) {
            item.setLayout(oLayout);
          }
        });

        this._bChangedByMe = false;
        return true; // layout set
      }

      return false; // no layout set
    }

    /*
     * Updates the Layout and corresponding layoutData.
     */
    function _updateLayout() {
      this._bChangedByMe = true;
      this._changedFormContainers = [];

      var sLayout = this.getLayout();
      this.getAggregation("items").forEach(item => {
        var oLayout = item.getLayout();
        if (!oLayout) {
          return;
        }
        oLayout.setBackgroundDesign(this.getBackgroundDesign());

        switch (sLayout) {
          case SimpleFormLayout.ResponsiveLayout:
            // // set the default values for linebreakes to avoid flickering for default case
            // this._applyLinebreaks();
            //
            // for ( var i = 0; i < this._changedFormElements.length; i++) {
            //   var oFormElement = this._changedFormElements[i];
            //   _applyFieldWeight.call(this, oFormElement);
            // }
            break;
          case SimpleFormLayout.GridLayout:
            // _applyContainerSize.call(this);
            break;
          case SimpleFormLayout.ResponsiveGridLayout:
            oLayout.setLabelSpanXL(this.getLabelSpanXL());
            oLayout.setLabelSpanL(this.getLabelSpanL());
            oLayout.setLabelSpanM(this.getLabelSpanM());
            oLayout.setLabelSpanS(this.getLabelSpanS());
            oLayout.setAdjustLabelSpan(this.getAdjustLabelSpan());
            oLayout.setEmptySpanXL(this.getEmptySpanXL());
            oLayout.setEmptySpanL(this.getEmptySpanL());
            oLayout.setEmptySpanM(this.getEmptySpanM());
            oLayout.setEmptySpanS(this.getEmptySpanS());
            oLayout.setColumnsXL(this.getColumnsXL());
            oLayout.setColumnsL(this.getColumnsL());
            oLayout.setColumnsM(this.getColumnsM());
            oLayout.setSingleContainerFullSize(
              this.getSingleContainerFullSize()
            );
            oLayout.setBreakpointXL(this.getBreakpointXL());
            oLayout.setBreakpointL(this.getBreakpointL());
            oLayout.setBreakpointM(this.getBreakpointM());
            break;
          case SimpleFormLayout.ColumnLayout:
            oLayout.setColumnsXL(
              this.getColumnsXL() > 0 ? this.getColumnsXL() : this.getColumnsL()
            );
            oLayout.setColumnsL(this.getColumnsL());
            oLayout.setColumnsM(this.getColumnsM());
            oLayout.setLabelCellsLarge(this.getLabelSpanL());
            oLayout.setEmptyCellsLarge(this.getEmptySpanL());
            break;
          // no default
        }
      });

      this._changedFormElements = [];
      this._bChangedByMe = false;
    }

    function _ResponsiveLayoutLoaded(
      fnResponsiveLayout,
      fnResponsiveFlowLayoutData
    ) {
      ResponsiveLayout = fnResponsiveLayout;
      ResponsiveFlowLayoutData = fnResponsiveFlowLayoutData;
      this._bResponsiveLayoutRequested = false;

      if (this.getLayout() == SimpleFormLayout.ResponsiveLayout) {
        // as layout might changed
        _updateLayoutAfterLoaded.call(this);
      }
    }

    function _GridLayoutLoaded(
      fnGridLayout,
      fnGridContainerData,
      fnGridElementData
    ) {
      GridLayout = fnGridLayout;
      GridContainerData = fnGridContainerData;
      GridElementData = fnGridElementData;
      this._bGridLayoutRequested = false;

      if (this.getLayout() == SimpleFormLayout.GridLayout) {
        // as layout might changed
        _updateLayoutAfterLoaded.call(this);
      }
    }

    function _ResponsiveGridLayoutLoaded(fnResponsiveGridLayout) {
      ResponsiveGridLayout = fnResponsiveGridLayout;
      this._bResponsiveGridLayoutRequested = false;

      if (this.getLayout() == SimpleFormLayout.ResponsiveGridLayout) {
        // as layout might changed
        _updateLayoutAfterLoaded.call(this);
      }
    }

    function _ColumnLayoutLoaded(fnColumnLayout) {
      ColumnLayout = fnColumnLayout;
      this._bColumnLayoutRequested = false;

      if (this.getLayout() == SimpleFormLayout.ColumnLayout) {
        // as layout might changed
        _updateLayoutAfterLoaded.call(this);
      }
    }

    function _updateLayoutAfterLoaded() {
      if (!this._bIsBeingDestroyed) {
        _setLayout.call(this);
        // _addLayoutData.call(this);
        if (this.getDomRef()) {
          _updateLayout.call(this);
        }
      }
    }
  }
);
