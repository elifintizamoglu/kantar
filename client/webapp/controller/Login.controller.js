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
            var flag = false;

            $.ajax({
                url: "http://localhost:5000/auth/login",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify({ username: sUsername, password: sPassword }),
                success: function (data) {
                    MessageToast.show("Login successful!");
                    // Navigate to the home view
                    flag = true;
                }.bind(this), // Ensure the context (this) is correct
                error: function () {
                    MessageToast.show("Login failed!");
                }
            });
            if(flag){
                var oRouter = UIComponent.getRouterFor(this);
                    oRouter.navTo("home");
            }
        },
        onRegister: function () {
            var oView = this.getView();
            var sUsername = oView.byId("username").getValue();
            var sPassword = oView.byId("password").getValue();

            $.ajax({
                url: "http://localhost:5000/auth/register",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify({ username: sUsername, password: sPassword }),
                success: function () {
                    MessageToast.show("User registered!");
                },
                error: function () {
                    MessageToast.show("Registration failed!");
                }
            });
        }
    });
});


// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/m/MessageToast",
//     "sap/ui/core/UIComponent"
// ], function (Controller, MessageToast, UIComponent) {
//     "use strict";

//     return Controller.extend("sap.ui.demo.client.controller.Login", {
//         onLogin: function () {
//             var oView = this.getView();
//             var sUsername = oView.byId("username").getValue();
//             var sPassword = oView.byId("password").getValue();

//             $.ajax({
//                 url: "http://localhost:5000/auth/login",
//                 method: "POST",
//                 contentType: "application/json",
//                 data: JSON.stringify({ username: sUsername, password: sPassword }),
//                 success: function (data) {
//                     MessageToast.show("Login successful!");
//                     var oRouter = UIComponent.getRouterFor(this);
//                     oRouter.navTo("app",{});
//                 }.bind(this),
//                 error: function () {
//                     MessageToast.show("Login failed!");
//                 }
//             });
//         },
//         onRegister: function () {
//             var oView = this.getView();
//             var sUsername = oView.byId("username").getValue();
//             var sPassword = oView.byId("password").getValue();

//             $.ajax({
//                 url: "http://localhost:5000/auth/register",
//                 method: "POST",
//                 contentType: "application/json",
//                 data: JSON.stringify({ username: sUsername, password: sPassword }),
//                 success: function () {
//                     MessageToast.show("User registered!");
//                 },
//                 error: function () {
//                     MessageToast.show("Registration failed!");
//                 }
//             });
//         }
//     });
// });


// // sap.ui.define([
// //     "sap/ui/core/mvc/Controller",
// //     "sap/m/MessageToast"
// // ], function (Controller, MessageToast) {
// //     "use strict";

// //     return Controller.extend("myapp.controller.View1", {
// //         onLogin: function () {
// //             var oView = this.getView();
// //             var sUsername = oView.byId("username").getValue();
// //             var sPassword = oView.byId("password").getValue();

// //             $.ajax({
// //                 url: "http://localhost:5000/auth/login",
// //                 method: "POST",
// //                 contentType: "application/json",
// //                 data: JSON.stringify({ username: sUsername, password: sPassword }),
// //                 success: function (data) {
// //                     MessageToast.show("Login successful!");
// //                     var oRouter = UIComponent.getRouterFor(this);
// //                     oRouter.navTo("home");
// //                 },
// //                 error: function () {
// //                     MessageToast.show("Login failed!");
// //                 }
// //             });
// //         },
// //         onRegister: function () {
// //             var oView = this.getView();
// //             var sUsername = oView.byId("username").getValue();
// //             var sPassword = oView.byId("password").getValue();

// //             $.ajax({
// //                 url: "http://localhost:5000/auth/register",
// //                 method: "POST",
// //                 contentType: "application/json",
// //                 data: JSON.stringify({ username: sUsername, password: sPassword }),
// //                 success: function () {
// //                     MessageToast.show("User registered!");
// //                 },
// //                 error: function () {
// //                     MessageToast.show("Registration failed!");
// //                 }
// //             });
// //         }
// //     });
// // });
