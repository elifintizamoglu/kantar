sap.ui.require([
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/XMLView",
    "sap/ui/model/resource/ResourceModel"
], function (JSONModel, XMLView, ResourceModel) {
    "use strict"

    sap.ui.getCore().attachInit(function () {

        var oResourceModel = new ResourceModel({
            bundleName: "sap.ui.demo.client.i18n.i18n",
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

        XMLView.create({
            viewName: "sap.ui.demo.client.view.App"
        }).then(function (oView) {
            oView.placeAt("content");
        });

    })
})