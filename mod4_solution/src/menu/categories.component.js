(function () {
  'use strict';

  angular.module('MenuApp')
  .component('categories', {
      template: `
        <div class="card" 
          style="width: 15rem; margin: 5px;" 
          ng-repeat="category in $ctrl.categories"
        >
          <div class="card-body">
            <img ng-src="src/img/{{category.short_name}}.jpg" class="card-img-top">
            <button 
              class="btn btn-danger" 
              ui-sref="items({short_name: category.short_name})"
            >
              {{ category.name }}
            </button>
          </div>
        </div>
      `,
      bindings: {
        categories: '<'
      }
  });

})();