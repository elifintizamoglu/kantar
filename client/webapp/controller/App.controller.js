sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Input",
    "sap/m/Label",
    "sap/m/DatePicker",
    "sap/m/TimePicker",
    "sap/ui/core/format/DateFormat",
    "sap/ui/model/json/JSONModel"
], function (Controller, Dialog, Button, Input, Label, DatePicker, TimePicker, DateFormat, JSONModel) {
    "use strict"
    return Controller.extend("sap.ui.demo.client.App", {

        onLoadData: function () {
            var oModel = new JSONModel();
            oModel.loadData("http://localhost:5000/api/getAllData"); // Node.js API endpoint'i
            oModel.attachRequestCompleted(function () {
                var data = oModel.getData();
                console.log(data);
            });
            sap.ui.getCore().setModel(oModel, "getAllData");
        },

        onAddData: function () {
            var that = this; 
            var oDialog = new Dialog({
                title: "Yeni Veri Ekle",
                contentWidth: "600px",
                content: [
                    new sap.ui.layout.form.SimpleForm({
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
                        var plate = sap.ui.getCore().byId("plateInput").getValue();
                        var entry_date = sap.ui.getCore().byId("entryDateInput").getValue();
                        var entry_time = sap.ui.getCore().byId("entryTimeInput").getValue();
                        var entry_weight = sap.ui.getCore().byId("entryWeightInput").getValue();
                        var exit_date = sap.ui.getCore().byId("exitDateInput").getValue();
                        var exit_time = sap.ui.getCore().byId("exitTimeInput").getValue();
                        var exit_weight = sap.ui.getCore().byId("exitWeightInput").getValue();

                        var postData = {
                            plate: plate,
                            entry_date: entry_date,
                            entry_time: entry_time,
                            entry_weight: entry_weight,
                            exit_date: exit_date,
                            exit_time: exit_time,
                            exit_weight: exit_weight
                        };

                        console.log("Plaka: " + postData.plate);
                        console.log("Giriş Tarihi: " + postData.entry_date);
                        console.log("Giriş Saati: " + postData.entry_time);
                        console.log("Giriş Ağırlığı: " + postData.entry_weight);
                        console.log("Çıkış Tarihi: " + postData.exit_date);
                        console.log("Çıkış Saati: " + postData.exit_time);
                        console.log("Çıkış Ağırlığı: " + postData.exit_weight);

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
            var timeFormat = TimeFormat.getTimeInstance({
                pattern: "HH:mm"
            });
            var timeObject = new Date(time);
            var formattedTime = timeFormat.format(timeObject);
            return formattedTime;
        }
    });
});