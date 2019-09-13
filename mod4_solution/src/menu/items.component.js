(function () {
    'use strict';
    
    angular.module('MenuApp')
    .component('items', {
        template: `
            <div ng-repeat="item in $ctrl.items" class="card">
                <h5 class="card-header">
                    {{item.name}}
                </h5>
                <div class="card-body clearfix">
                    <p class="card-text">{{item.description}}</p>
                    <div class="badge badge-pill badge-warning float-right">
                        \$\{{item.price_large}}
                    </div>
                </div>
            </div>
        `,
        bindings: {
            items: '<',
            category_name: '<'
        }
    });
    
})();