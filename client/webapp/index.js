sap.ui.require([
    "sap/m/Text",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/XMLView",
    "sap/ui/model/BindingMode",
    "sap/ui/model/resource/ResourceModel"
], function (Text, JSONModel, XMLView, BindingMode, ResourceModel) {
    "use strict"

    // Attach an anonymous function to the SAPUI5 'init' event
    sap.ui.getCore().attachInit(function () {

        var oDataModel = new JSONModel();
        oDataModel.loadData("./model/Data.json");
        sap.ui.getCore().setModel(oDataModel, "datas");


        // Create a JSON model from an object literal
        var oModel = new JSONModel({
            firstName: "Elif",
            lastName: "İntizamoğlu",
            enabled: true,
            panelHeaderText: "Data Binding Basics"
        });

        var oResourceModel = new ResourceModel({
            bundleName: "sap.ui.demo.db.i18n.i18n",
            supportedLocales: ["", "tr"],
            fallbackLocale: ""
        })

        sap.ui.getCore().setModel(oResourceModel, "i18n");

        // Assign the model object to the SAPUI5 core



        // JSONModel kullanarak veri çekme
        var oModel = new sap.ui.model.json.JSONModel();
        oModel.loadData("/api/getAllData"); // Node.js API endpoint'i

        oModel.attachRequestCompleted(function () {
            // Veri başarıyla yüklendikten sonra yapılacak işlemler
            var data = oModel.getData();
            console.log(data); // Alınan verileri konsola yazdır
        });
        sap.ui.getCore().setModel(oModel);




        // Display the XML view called "App"
        new XMLView({
            viewName: "sap.ui.demo.db.view.App"
        }).placeAt("content");
    })
})