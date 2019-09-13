(function () {
  'use strict';

  angular.module('Data')
  .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['items', 'category_name'];
  function ItemsController(items, category_name) {
    var itemsCtrl = this;
    itemsCtrl.items = items;
    itemsCtrl.category_name = category_name;
  }

})();
