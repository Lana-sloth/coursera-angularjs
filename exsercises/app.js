(function(){
    'use strict';
    angular.module('AppMenu', [])
    .controller('MenuCtrl', MenuCtrl)
    .service('MenuService', MenuService)
    .constant('webAdress', 'http://davids-restaurant.herokuapp.com');

    MenuService.$inject = ['$http', 'webAdress'];
    function MenuService($http, webAdress) {
        var service = this;

        service.getCategories = function() {
            var response = $http ({
                url: (webAdress + '/categories.json')
            })
            return response;
        }
        service.getCategory = function (shortName) {
            var response = $http ({
                url: (webAdress + '/menu_items.json'),
                params: {
                    'category': shortName
                }
            })
            return response;
        }
    }

    MenuCtrl.$inject = ['MenuService'];
    function MenuCtrl(MenuService){
        var menu = this;
        var promise = MenuService.getCategories();
            
        promise.then(function (response) {
            menu.categories = response.data;
        })
        .catch(function(error) {
            console.warn('Error:', error);
        });

        menu.goToCategory = function(category) {
            var promise = MenuService.getCategory(category);
            promise.then( function (response) {
                console.log(response.data);
            })
            .catch(function(error){
                console.log(error);
            });
        }
    }
})();
// 'http://davids-restaurant.herokuapp.com/categories.json'