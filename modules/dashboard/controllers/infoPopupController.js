angular.module('EDRLightbox').controller('infoPopupController', ['$scope', '$state', '$location', '$document', '$timeout', '$http', '$filter', 'NgTableParams', 'DashboardService', '$stateParams', '$window', '$modal', function ($scope, $state, $location, $document, $timeout, $http, $filter, NgTableParams, DashboardService, $stateParams, $window,$modal) {
    var modalInstance;

    modalInstance = $modal.open({
        templateUrl: 'info.html',
        scope: $scope,
        //controller: infoPopupController,
        size: 'md'

    })

    $scope.cancel = function () {

       $modalInstance.close();

    }

}]);