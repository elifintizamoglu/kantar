sap.ui.require([
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/XMLView",
    "sap/ui/model/resource/ResourceModel"
], function ( JSONModel, XMLView, ResourceModel) {
    "use strict"

    // Attach an anonymous function to the SAPUI5 'init' event
    sap.ui.getCore().attachInit(function () {
        
        var oResourceModel = new ResourceModel({
            bundleName: "sap.ui.demo.db.i18n.i18n",
            supportedLocales: [""],
            fallbackLocale: ""
        })
        sap.ui.getCore().setModel(oResourceModel, "i18n");
        

        var oModel = new JSONModel();
        oModel.loadData("http://localhost:5000/api/getAllData"); // Node.js API endpoint'i
        oModel.attachRequestCompleted(function () {
            var data = oModel.getData();
            console.log(data); 
        });
        sap.ui.getCore().setModel(oModel, "getAllData");

        new XMLView({
            viewName: "sap.ui.demo.db.view.App"
        }).placeAt("content");
    })
})