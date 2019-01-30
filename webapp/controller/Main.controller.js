sap.ui.define(["./Base.controller", "sap/ui/export/Spreadsheet"], function(
  Controller,
  Spreadsheet
) {
  "use strict";

  return Controller.extend("evola.controller.Main", {
    MAIN_ID: "MainPageId",
    
    onInit: function() {
      jQuery.sap.log.debug("Init Main");

      var oInitModel = this.getModel("init_data");
      this.getView().setModel(oInitModel);


    },

    onChangeValue: function (oEvent) {
      console.log("Value changed");
    },

    onLiveChange: function (oEvent) {
      console.log("Value live changed");
    }

  });
});
