(function () {
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$http']
function MenuDataService($http) {
  var service = this;

  var categories = [];

  service.getCategories = function () {
    return $http({
      url: 'https://davids-restaurant.herokuapp.com/categories.json'
    })
    .then(function(result){
        return result.data;
    })
    .catch(function(error) {
        console.warn('Error:', error);
    });
  };

  service.getItemsForCategory = function(categoryShortName) {
    return $http({
      url: 'https://davids-restaurant.herokuapp.com/menu_items.json?category=' + categoryShortName
    })
    .then(function(result){
        return result.data.menu_items;
    })
    .catch(function(error) {
        console.warn('Error:', error);
    });
  };

  service.getCategoryName = function(categoryShortName) {
    return $http({
      url: 'https://davids-restaurant.herokuapp.com/menu_items.json?category=' + categoryShortName
    })
    .then(function(result){
        return result.data.category.name;
    })
    .catch(function(error) {
        console.warn('Error:', error);
    });
  }
}

})();
