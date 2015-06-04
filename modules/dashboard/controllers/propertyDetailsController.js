angular.module('EDRLightbox').controller('propertyDetailsController', ['$scope', '$state', '$location', '$document', '$timeout', '$http', '$filter', 'NgTableParams', 'DashboardService', '$stateParams', '$window', function ($scope, $state, $location, $document, $timeout, $http, $filter, NgTableParams, DashboardService, $stateParams, $window) {

    
    $scope.selectedTab = 1;
    console.log("pid " + $stateParams.siteId)
    var responseData;
    $scope.additionalInfo = [];
    $scope.nextProperty;
    $scope.previousProperty;
    bindSitesData();

    function bindSitesData() {

        DashboardService.getSitesData().then(function (result) {
           
            responseData = result;
            bindSiteData($stateParams.siteId);
        }, function (error) {

        });
    }

     function bindsitesAdditionalInfo() {
        DashboardService.getSitesAdditinalInfodefault().then(function (result) {
            
            $scope.additionalInfoData = result;
            bindsiteAdditionalUST();
        }, function (error) {

        });
    }

     function bindsiteAdditionalUST() {
        DashboardService.getSitesAdditinalInfoUST().then(function (result) {
          
            $scope.additionalInfoUSTData = result;
           
        }, function (error) {

        });

    }

    function bindSiteData(siteid) {

        var data = findById(siteid);
        
        var getpath = $location.path();
     
            $scope.siteId = data.Id;
            $scope.siteDistance = data.distance;
            $scope.siteDirection = "North";
            $scope.siteElevation = data.rel;
            $scope.siteName = data.sitename;
            $scope.siteAddress = data.address;
            $scope.sitemapimg = data.mapImage;
            $scope.siteDatabase = data.database;
      
            bindsitesAdditionalInfo();
            //bindsitesAdditionalInfo();
            $timeout(function () {

                $scope.siteId = data.Id;
                $scope.siteDistance = data.distance;
                $scope.siteDirection = "North";
                $scope.siteElevation = data.rel;
                $scope.siteName = data.sitename;
                $scope.siteAddress = data.address;
                $scope.sitemapimg = data.mapImage;
                $scope.siteDatabase = data.database;

                
            }, 500);

        
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
        var path = "#/detailsPrint/" + $stateParams.siteId;
        $window.open(path);
          
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