(function(){
    'use strict';
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http){
        var service = this;
        var found = [];
        service.getMatchedMenuItems = function(searchTerm){
            return $http({
                url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
            })
            .then(function(result){
                found = result.data.menu_items.filter((item) => {
                    searchTerm = searchTerm ? searchTerm.toLowerCase() : searchTerm;
                    var description = item.description.toLowerCase();
                    return description.indexOf(searchTerm)< 0 || !searchTerm ? false : true;
                });
                return found;
            })
            .catch(function(error) {
                console.warn('Error:', error);
            });
        }
        service.removeItem= function(index) {
            found.splice(index, 1);
        }
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService){
        var list = this;
        
        list.warning = "Nothing found. Please try another search term.";
        list.displayWarning = false;
        list.handleWarning = function() {
            list.displayWarning = list.found.length ? false : true;
        }

        list.findItem = function() {
            MenuSearchService.getMatchedMenuItems(list.search)
            .then(function(result){
                list.found = result;
                list.handleWarning();
            })
            .catch(function(error) {
                console.warn('Error:', error);
            });
        }

        list.removeItem = function(index) {
            MenuSearchService.removeItem(index);
            list.handleWarning();
        }
    }
    // FoundItemsDirective.$inject = ['foundItems'];
    function FoundItemsDirective(){
        return {
            template: `
                <div ng-transclude></div>
                <div class="row">
                    <div class="col-md-4 card" ng-repeat="item in list.found" style="width: 18rem;">
                        <div class="card-body">
                            <h4 class="card-title">
                                {{item.name}}
                                <span class="badge badge-secondary">{{item.short_name}}</span>
                            </h4>
                            <p class="card-text">{{item.description}}</p>
                            <button 
                            type="button"
                            ng-click="list.onRemove({index: $index})" 
                            class="btn btn-outline-danger btn-sm border border-danger"
                            >
                                Don't want this one!
                            </button>
                        </div>
                    </div>
                </div>
            `,
            scope: {
                found: '<',
                onRemove: '&'
            },
            controller: NarrowItDownController,
            controllerAs: 'list',
            bindToController: true,
            transclude: true
        }
    }

})();
