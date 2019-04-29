(function(){
    'use strict';
    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    function ShoppingListCheckOffService() {
        var service = this;
        var toBuyItems = [
            {
                name: "Chocolate bar",
                quantity: 1
            },
            {
                name: "Coffee Drinks",
                quantity: 5
            },
            {
                name: "Bananas",
                quantity: 3
            },
            {
                name: "Eggs",
                quantity: 10
            },
            {
                name: "Orange",
                quantity: 1
            }
        ];

        var boughtItems = [];

        service.getToBuyItems = function() {
            return toBuyItems;
        }

        service.getBoughtItems = function() {
            return boughtItems;
        }

        service.buyThisItem = function(itemIndex) {
            let item = toBuyItems[itemIndex];
            boughtItems.push(item);
            toBuyItems.splice(itemIndex, 1);
        }
    }

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var toBuyList = this;
        toBuyList.items = ShoppingListCheckOffService.getToBuyItems();
        toBuyList.buyThisItem = function(item){
            ShoppingListCheckOffService.buyThisItem(item)
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var boughtList = this;
        boughtList.items = ShoppingListCheckOffService.getBoughtItems();
    }
})();