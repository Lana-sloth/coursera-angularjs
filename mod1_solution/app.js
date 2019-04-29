(function(){
    'use strict';
    angular.module('hunger', [])
    .controller('hungerCtrl', hungerCtrl);

    function hungerCtrl($scope) {
        $scope.food = '';
        $scope.count = 0;
        $scope.message = '';
        $scope.border = {
            'border-radius': '3px',
            'border-style': 'solid',
            'border-width': '1px',
            'border-color': '#cccccc'
        }

        $scope.countItems = function(){
            let filtered = this.food.split(',').filter(item => {
                return item.trim() != '';
            });
            this.count = filtered.length;
        }
        $scope.handleInputStyle = function(){
            this.border['border-color'] = !this.count ? '#FF7F96' : '#cccccc';
        }
        $scope.checkIfTooMuch = function(){
            this.countItems();
            this.handleInputStyle();

            if (!this.count){
                this.message = 'Please enter data first';
            }
            else if (this.count > 3) {
                this.message = 'Too much!';
            }
            else {
                this.message = 'Enjoy!';
            }
        }
    }

})();