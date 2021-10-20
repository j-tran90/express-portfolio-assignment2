"use strict";
// Assignment 2 John Tran 301165631 Fall 2021
// IIFE
(function () {
    function Start() {
        console.log("App Started...");
        let deleteButtons = document.querySelectorAll('.btn-danger');
        for (const button of deleteButtons) {
            button.addEventListener('click', (event) => {
                if (!confirm("Confirm Delete")) {
                    event.preventDefault();
                    window.location.assign('/business-list');
                }
            });
        }
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=app.js.map