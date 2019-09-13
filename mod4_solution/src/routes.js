(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider

  .state('home', {
    url: '/',
    template: `
    <div class="container">
      <div class="row justify-content-sm-center">
        <div class="welcome-block">
          <h1>Welcome to the Menu App</h1>
          <button 
            class="btn btn-danger" 
            ui-sref="categories"
          >
            Look through the menu
          </button>
        </div>
      </div>
    </div>
    `
  })

  .state('categories', {
    url: '/categories',
    template: `
      <div class="container">
        <h2>Categories</h2>
        <categories 
          class="row justify-content-md-center" 
          categories="categoriesCtrl.categories"
        >
        </categories>
      </div>
    `,
    controller: 'CategoriesController as categoriesCtrl',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService){
        return MenuDataService.getCategories();
      }]
    }
  })

  .state('items', {
    url: '/items/{short_name}',
    template: `
      <div class="container px-md-5">
        <h2>{{itemsCtrl.category_name}}</h2>
        <div class="row justify-content-md-center px-md-5">
          <items items="itemsCtrl.items" class="card-columns">
          </items>
        </div>
      </div>
    `,
    controller: 'ItemsController as itemsCtrl',
    resolve: {
      items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
        return MenuDataService.getItemsForCategory($stateParams.short_name);
      }],
      category_name: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
        return MenuDataService.getCategoryName($stateParams.short_name);
      }]
    }
  });
}

})();
