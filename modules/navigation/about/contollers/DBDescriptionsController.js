angular.module('EDRLightbox').controller('DBDescriptionsController', ['$scope', '$state', '$location', '$document', '$timeout', '$http', '$filter', 'NavigationService', '$stateParams', function ($scope, $state, $location, $document, $timeout, $http, $filter, NavigationService, $stateParams) {


    bindDBData();


    function bindDBData() {

        NavigationService.getDBDescriptionsData().then(function (result) {
            
            $scope.DBDescriptionData = result;
        }, function (error) {

        });
    }

    $scope.searchDatabase = function () {

        
        var data = findRecord($scope.SearchText.$);
        


    }

    function findRecord(searchtext) {
        console.log("find text " + searchtext)
        for (var i = 1; i < $scope.DBDescriptionData.length; i++) {
           
            if ($scope.DBDescriptionData[i].dbName == searchtext) {
                console.log("find data " + $scope.DBDescriptionData[i].descriptions)
                return $scope.DBDescriptionData[i];
            }
        }
    }


}]);