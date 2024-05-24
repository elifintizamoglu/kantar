sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent"
], function (Controller, MessageToast, UIComponent) {
    "use strict";

    return Controller.extend("sap.ui.demo.client.controller.Login", {
        onLogin: function () {
            var oView = this.getView();
            var sUsername = oView.byId("username").getValue();
            var sPassword = oView.byId("password").getValue();
            
            fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: sUsername, password: sPassword })
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Login failed!");
            })
            .then(data => {
                MessageToast.show("Login successful!");
                // var oRouter = UIComponent.getRouterFor(this);
                // oRouter.navTo("home");
            })
            .catch(error => {
                MessageToast.show(error.message);
            });
        },
        onRegister: function () {
            var oView = this.getView();
            var sUsername = oView.byId("username").getValue();
            var sPassword = oView.byId("password").getValue();
            
            fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: sUsername, password: sPassword })
            })
            .then(response => {
                if (response.ok) {
                    MessageToast.show("User registered!");
                } else {
                    throw new Error("Registration failed!");
                }
            })
            .catch(error => {
                MessageToast.show(error.message);
            });
        }
    });
});
