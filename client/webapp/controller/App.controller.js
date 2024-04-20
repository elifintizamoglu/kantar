sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/format/DateFormat"
], function (Controller, MessageToast, DateFormat) {
    "use strict"
    return Controller.extend("sap.ui.demo.client.App", {
        onShowHello: function () {
            // Show a native or vanailla JS alert
            alert("Hello there!");
        },
        onSaveData: function () {
            var plate = this.getView().byId("plateInput").getValue();
            var entry_date = this.getView().byId("entryDateInput").getValue();
            var entry_time = this.getView().byId("entryTimeInput").getValue();
            var entry_weight = this.getView().byId("entryWeightInput").getValue();
            var exit_date = this.getView().byId("exitDateInput").getValue();
            var exit_time = this.getView().byId("exitTimeInput").getValue();
            var exit_weight = this.getView().byId("exitWeightInput").getValue();

            var postData = {
                plate: plate,
                entry_date: entry_date,
                entry_time: entry_time,
                entry_weight: entry_weight,
                exit_date: exit_date,
                exit_time: exit_time,
                exit_weight: exit_weight
            };

            // Şimdi bu verileri kullanabilir veya başka bir işlem yapabilirsiniz
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
                    // Başarılı ekleme durumunda gerekli işlemleri yapabilirsiniz
                } else {
                    console.error('Veri eklenirken hata oluştu:', xhr.statusText);
                    // Hata durumunda gerekli işlemleri yapabilirsiniz
                }
            };
            xhr.send(JSON.stringify(postData));
        },
        formatDate: function (date) {
            // DateFormat sınıfını kullanarak tarih formatlama
            var dateFormat = DateFormat.getDateInstance({
                pattern: "dd.MM.yyyy" // İstenilen tarih formatı
            });

            // ISO 8601 formatındaki tarih string'ini JavaScript Date nesnesine dönüştürme
            var dateObject = new Date(date);

            // SAPUI5 DateFormat kullanarak tarihi istenilen formata dönüştürme
            var formattedDate = dateFormat.format(dateObject);
            return formattedDate;
        },

        formatTime: function (time) {
            
            var timeFormat = TimeFormat.getTimeInstance({
                pattern: "HH:mm" // İstenilen tarih formatı
            });

            // ISO 8601 formatındaki tarih string'ini JavaScript Date nesnesine dönüştürme
            var timeObject = new Date(time);

            // SAPUI5 DateFormat kullanarak tarihi istenilen formata dönüştürme
            var formattedTime = timeFormat.format(timeObject);
            return formattedTime;
        }
    });
});





/*sap.ui.require([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
    "use strict";

    return Controller.extend("webapp.controller.Controller.js", {
        onInit: function() {
            var oModel = new JSONModel();
            oModel.loadData("http://localhost:5000/api/getAllData");
            sap.ui.getCore().setModel(oModel, "getAllData");
            console.log(oModel.getData());

            new XMLView({
                viewName: "sap.ui.demo.db.view.App"
            }).placeAt("content");
        },

        onButtonPress: function() {
            var oModel = this.getView().getModel("modelName");
            var data = oModel.getData();
            // Veri işlemleri yapılabilir
        }

        
    });
});*/









/*sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
    "use strict";

    return Controller.extend("myController", {
        onInit: function() {
            // Controller başlatıldığında yapılacak işlemler buraya yazılabilir
        },

        onGetData: function() {
            // Backend URL
            var backendUrl = 'http://localhost:5000/api/data'; // Backend API endpoint'i

            // Fetch ile GET isteği
            fetch(backendUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Received data from backend:', data);
                    // Verileri kullanmak için model oluşturabilirsiniz
                    var oModel = new JSONModel(data);
                    this.getView().setModel(oModel, "backendData");
                })
                .catch(error => {
                    console.error('Error fetching data from backend:', error);
                });
        }
    });
});*/