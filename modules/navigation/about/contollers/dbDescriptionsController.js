angular.module('EDRLightbox').controller('dbDescriptionsController', ['$scope', '$state', '$location', '$document', '$timeout', '$http', '$filter', 'NavigationService', '$stateParams', function ($scope, $state, $location, $document, $timeout, $http, $filter, NavigationService, $stateParams) {


    bindDBData();


    function bindDBData() {

        NavigationService.getDBDescriptionsData().then(function (result){
            console.log("result " + JSON.stringify(result));
            $scope.DBDescriptionData = result;
        }, function(error){

        });
    }

    $scope.searchDatabase = function () {

        console.log("searchText " + $scope.SearchText.$);
        //var data = findRecord($scope.SearchText.$);
        console.log("data " + JSON.stringify(data));
        
           
    }

    //function findRecord(searchtext) {
    //    for (var i = 1; i < $scope.DBDescriptionData.length; i++) {
    //        console.log("find data " + JSON.stringify($scope.DBDescriptionData[i]);
    //        if ($scope.DBDescriptionData[i] == searchtext) {
    //            return $scope.DBDescriptionData[i];
    //        }
    //    }
    //}


}]);