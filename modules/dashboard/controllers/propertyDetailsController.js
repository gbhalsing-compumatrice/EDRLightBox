angular.module('EDRLightbox').controller('propertyDetailsController', ['$scope', '$state', '$location', '$document', '$timeout', '$http', '$filter', 'NgTableParams', 'DashboardService', '$stateParams', '$window', function ($scope, $state, $location, $document, $timeout, $http, $filter, NgTableParams, DashboardService, $stateParams, $window) {

    
    $scope.selectedTab = 1;
    console.log("pid " + $stateParams.siteId)
    var responseData;
    $scope.additionalInfo = [];
  
    bindSitesData();

    function bindSitesData() {

        DashboardService.getSitesData().then(function (result) {
            console.log("xxxxxxxxxxxxxxxx" + JSON.stringify(result))
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
        console.log("dsssssss " + JSON.stringify(data))
        console.log("path " + $location.path());
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

                //$scope.Region = $scope.additionalInfo[0].Region;
                //$scope.Global_Id = $scope.additionalInfo[0].Global_Id;
                //$scope.Latitude = $scope.additionalInfo[0].Latitude;
                //$scope.Longitude = $scope.additionalInfo[0].Longitude;
                //$scope.Case_Type = $scope.additionalInfo[0].Case_Type;
                //$scope.Status = $scope.additionalInfo[0].Status;
                //$scope.Status_Date = $scope.additionalInfo[0].Status_Date;
                //$scope.Lead_Agency = $scope.additionalInfo[0].Lead_Agency;
                //$scope.Local_Agency = $scope.additionalInfo[0].Local_Agency;
                //$scope.Case_Worker = $scope.additionalInfo[0].Case_Worker;
                //$scope.RB_Case_Number = $scope.additionalInfo[0].RB_Case_Number;
                //$scope.LOC_Case_Number = $scope.additionalInfo[0].LOC_Case_Number;
                //$scope.File_Location = $scope.additionalInfo[0].File_Location;
                //$scope.Potential_Media_Affect = $scope.additionalInfo[0].Potential_Media_Affect;
                //$scope.Potential_Contaminants_of_Concern = $scope.additionalInfo[0].Potential_Contaminants_of_Concern;
                //$scope.Site_History = $scope.additionalInfo[0].Site_History;
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