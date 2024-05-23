sap.ui.require([
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/XMLView",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/core/UIComponent"
], function (JSONModel, XMLView, ResourceModel, UIComponent) {
    "use strict"

    sap.ui.getCore().attachInit(function () {

        var oResourceModel = new ResourceModel({
            bundleName: "sap.ui.demo.client.i18n.i18n",
            supportedLocales: [""],
            fallbackLocale: ""
        });
        sap.ui.getCore().setModel(oResourceModel, "i18n");

        XMLView.create({
            viewName: "sap.ui.demo.client.view.Login"
        }).then(function (oView) {
            oView.placeAt("content");

            var oController = oView.getController();
            //oController.onLoadData();
        });
    });
});
