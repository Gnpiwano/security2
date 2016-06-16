var app = angular.module('myApp', ['ngMaterial', 'mdo-angular-cryptography']);
app.controller('myCtrl', function($scope, $crypto, $mdDialog) {

    var self = this;
    this.name = "";
    this.email = "";
    this.text = "";
    this.password = "";
    this.currentItem = {};

    this.allItems = [];

    this.init = function () {
        getData();
    }

    this.encryptData = function () {
        $crypto.setCrypteKey(self.password);
        var row = {
            name: self.name,
            email: self.email,
            text: $crypto.encrypt(self.text)
        }
        saveData(row);
        getData();
        console.log(self.allItems);
    }
    
    this.decryptData = function(event) {
        if(self.currentItem !== undefined && self.currentItem == null) {
            $mdDialog.show(
                $mdDialog.alert()
                    .title('Decrypted Message')
                    .textContent($crypto.decrypt(self.currentItem.text, self.password))
                    .ok('Awesome!')
                    .targetEvent(event)
            );
        }
    }

    this.setCurrentItem = function(message) {
        self.currentItem = message;
    }
    
    var getData = function () {
        console.log("getData");
        var allItems = JSON.parse(localStorage.getItem("items"));
        self.allItems = allItems;
    }
    
    var saveData = function (data) {
        console.log("saveData");
        var allItems = JSON.parse(localStorage.getItem("items"));
        if(allItems == null || allItems === undefined) {
            allItems = [];
        }
        allItems.push(data);
        localStorage.setItem('items', JSON.stringify(allItems));
    }

    $scope.doSecondaryAction = function(event, message) {
        $mdDialog.show(
            $mdDialog.alert()
                .title('Encrypted Message')
                .textContent(message.text)
                .ok('Awesome!')
                .targetEvent(event)
        );
    };
});
