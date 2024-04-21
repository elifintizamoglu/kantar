sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Input",
    "sap/m/Label",
    "sap/m/Text",
    "sap/m/DatePicker",
    "sap/m/TimePicker",
    "sap/ui/core/format/DateFormat",
    "sap/ui/model/json/JSONModel",
    "sap/ui/layout/form/SimpleForm"
], function (Controller, Dialog, Button, Input, Label, Text, DatePicker, TimePicker, DateFormat, JSONModel, SimpleForm) {
    "use strict"

    return Controller.extend("sap.ui.demo.client.App", {

        selectedItemId: null,

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
            var oSelectedItem = oEvent.getParameter("listItem");
            if (oSelectedItem) {
                var oContext = oSelectedItem.getBindingContext("getAllData");
                if (oContext) {
                    var sItemId = oContext.getProperty("id");
                    if (sItemId) {
                        this.selectedItemId = sItemId;
                        console.log("Seçilen ID: " + sItemId);
                    } else {
                        console.error("ID bulunamadı.");
                    }
                } else {
                    console.error("Bağlam bulunamadı veya geçersiz.");
                }
            } else {
                console.error("Seçilen öğe bulunamadı veya geçersiz.");
            }
        },

        onDeleteData: function () {
            var that = this;
            if (this.selectedItemId) {
                var dialog = new Dialog({
                    title: "Veri Silme Onayı",
                    type: "Message",
                    content: [
                        new Text({ text: "Bu veriyi silmek istediğinize emin misiniz?" })
                    ],
                    beginButton: new Button({
                        text: "Evet",
                        press: function () {
                            that.onConfirmDelete();
                            dialog.close();
                        }
                    }),
                    endButton: new Button({
                        text: "Hayır",
                        press: function () {
                            dialog.close();
                        }
                    }),
                    afterClose: function () {
                        dialog.destroy();
                    }
                });
                dialog.open();
            } else { alert("Silinecek veri seçiniz."); }
        },

        onConfirmDelete: function () {
            var sUrl = "http://localhost:5000/api/delete/" + this.selectedItemId;
            fetch(sUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    console.log('Veri başarıyla silindi.');
                    this.onLoadData();
                } else {
                    console.error('Veri silinirken hata oluştu:', response.statusText);
                }
            }).catch(error => {
                console.error('İstek sırasında hata oluştu:', error);
            });
            this.selectedItemId = null;
            console.log("Veri silme işlemi gerçekleştirildi.");
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