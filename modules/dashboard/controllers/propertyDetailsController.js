angular.module('EDRLightbox').controller('propertyDetailsController', ['$scope', '$state', '$location', '$document', '$timeout', '$http', '$filter', 'NgTableParams', 'DashboardService', '$stateParams', function ($scope, $state, $location, $document, $timeout, $http, $filter, NgTableParams, DashboardService, $stateParams) {

    
    $scope.selectedTab = 1;
    console.log("pid " + $stateParams.siteId)
    var responseData;

    bindSitesData();

    function bindSitesData() {

        DashboardService.getSitesData().then(function (result) {
            console.log("xxxxxxxxxxxxxxxx" + JSON.stringify(result))
            responseData = result;
            bindSiteData($stateParams.siteId);
        }, function (error) {

        });
    }

    function bindSiteData(siteid) {

        var data = findById(siteid);
        console.log("dsssssss " + JSON.stringify(data))

        $scope.siteId = data.Id;
        $scope.siteDistance = data.distance;
        $scope.siteDirection = "North";
        $scope.siteElevation = data.rel;
        $scope.siteName = data.sitename;
        $scope.siteAddress = data.address;
        $scope.sitemapimg = data.mapImage;
        $scope.siteDatabase = data.database;
    }

    function findById(siteid) {
        for (var i = 0; i < responseData.length; i++) {
            if (responseData[i].Id === siteid) {
                return responseData[i];
            }
        }
        throw "Couldn't find site with id: " + siteid;
    }

    $scope.btnPrint = function () {
        console.log("print");
    }

    $scope.btnDisable = function () {
        console.log("disable");
    }

    $scope.btnFlag = function () {
        console.log("flag");
    }

    $scope.btnClose = function () {
        console.log("close");
    }

}]);