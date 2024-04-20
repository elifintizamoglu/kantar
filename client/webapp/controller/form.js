// App.controller.js

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("sap.ui.demo.db.controller.form", {
        onSaveData: function () {
            var formData = this.getView().getModel("formData").getData();
            console.log("Form data:", formData);

            // Burada formData içindeki verileri istediğiniz şekilde işleyebilirsiniz
            // Örneğin, bu verileri backend'e kaydetmek için bir AJAX isteği gönderebilirsiniz
        }
    });
});