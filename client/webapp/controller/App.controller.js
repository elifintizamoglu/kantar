sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Input",
    "sap/m/Label",
    "sap/m/DatePicker",
    "sap/m/TimePicker",
    "sap/ui/core/format/DateFormat",
    "sap/ui/model/json/JSONModel",
    "sap/ui/layout/form/SimpleForm"
], function (Controller, Dialog, Button, Input, Label, DatePicker, TimePicker, DateFormat, JSONModel, SimpleForm) {
    "use strict"
    return Controller.extend("sap.ui.demo.client.App", {

        onLoadData: function () {
            var oModel = new JSONModel();
            oModel.loadData("http://localhost:5000/api/getAllData");
            sap.ui.getCore().setModel(oModel, "getAllData");

            oModel.attachRequestCompleted(function () {
                var data = oModel.getData();
                console.log(data);
            });
        },

        onTableItemPress: function (oEvent) {
            console.log("a");
            var oSelectedItem = oEvent.getParameter("listItem");
            console.log(oSelectedItem);
            if (oSelectedItem) {
                console.log("c");
                // Seçilen öğenin bağlamını al
                var oContext = oSelectedItem.getBindingContext(sap.ui.getCore().getModel("getAllData"));

                if (oContext) {
                    // Öğenin bağlamı varsa, bağlamdaki veriyi al
                    var sItemId = oContext.getProperty("id");

                    if (sItemId) {
                        // ID'yi saklama
                        this.selectedItemId = sItemId;
                        console.log("Tıklanan ID: " + sItemId);
                    } else {
                        console.error("ID bulunamadı.");
                    }
                } else {
                    console.error("Bağlam bulunamadı veya geçersiz.");
                }
            } else {
                console.error("Seçili öğe bulunamadı veya geçersiz.");
            }
        },

        onAddData: function () {
            var that = this;
            var oDialog = new Dialog({
                title: "Yeni Veri Ekle",
                contentWidth: "600px",
                content: [
                    new SimpleForm({
                        layout: "ResponsiveGridLayout",
                        content: [
                            new Label({ text: "Plaka" }),
                            new Input({ id: "plateInput" }),

                            new Label({ text: "Giriş Tarihi" }),
                            new DatePicker({ id: "entryDateInput", displayFormat: "dd.MM.yyyy", valueFormat: "yyyy-MM-dd" }),

                            new Label({ text: "Giriş Saati" }),
                            new TimePicker({ id: "entryTimeInput", displayFormat: "HH:mm" }),

                            new Label({ text: "Giriş Ağırlığı (kg)" }),
                            new Input({ id: "entryWeightInput" }),

                            new Label({ text: "Çıkış Tarihi" }),
                            new DatePicker({ id: "exitDateInput", displayFormat: "dd.MM.yyyy", valueFormat: "yyyy-MM-dd" }),

                            new Label({ text: "Çıkış Saati" }),
                            new TimePicker({ id: "exitTimeInput", displayFormat: "HH:mm" }),

                            new Label({ text: "Çıkış Ağırlığı (kg)" }),
                            new Input({ id: "exitWeightInput" }),
                        ]
                    })
                ],
                beginButton: new Button({
                    text: "Kaydet",
                    press: function () {

                        var postData = {
                            plate: sap.ui.getCore().byId("plateInput").getValue(),
                            entry_date: sap.ui.getCore().byId("entryDateInput").getValue(),
                            entry_time: sap.ui.getCore().byId("entryTimeInput").getValue(),
                            entry_weight: sap.ui.getCore().byId("entryWeightInput").getValue(),
                            exit_date: sap.ui.getCore().byId("exitDateInput").getValue(),
                            exit_time: sap.ui.getCore().byId("exitTimeInput").getValue(),
                            exit_weight: sap.ui.getCore().byId("exitWeightInput").getValue()
                        };

                        var xhr = new XMLHttpRequest();
                        xhr.open('POST', 'http://localhost:5000/api/addData');
                        xhr.setRequestHeader('Content-Type', 'application/json');
                        xhr.onload = function () {
                            if (xhr.status === 200) {
                                console.log('Veri başarıyla eklendi:', xhr.responseText);
                                that.onLoadData();
                            } else {
                                console.error('Veri eklenirken hata oluştu:', xhr.statusText);
                            }
                        };
                        xhr.send(JSON.stringify(postData));

                        oDialog.close();
                        oDialog.destroy();
                    }
                }),
                endButton: new Button({
                    text: "İptal",
                    press: function () {
                        oDialog.close();
                        oDialog.destroy();
                    }
                })
            });
            oDialog.open();
        },

        formatDate: function (date) {
            var dateFormat = DateFormat.getDateInstance({
                pattern: "dd.MM.yyyy"
            });
            var dateObject = new Date(date);
            var formattedDate = dateFormat.format(dateObject);
            return formattedDate;
        },

        formatTime: function (time) {
            var timeFormat = DateFormat.getTimeInstance({
                pattern: "HH:mm"
            });
            var timeObject = new time(time);
            var formattedTime = timeFormat.format(timeObject);
            return formattedTime;

        }
    });
});