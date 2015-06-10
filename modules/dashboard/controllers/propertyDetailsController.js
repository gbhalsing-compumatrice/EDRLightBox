angular.module('EDRLightbox').controller('propertyDetailsController', ['$scope', '$state', '$location', '$document', '$timeout', '$http', '$filter', 'NgTableParams', 'DashboardService', '$stateParams', '$window', function ($scope, $state, $location, $document, $timeout, $http, $filter, NgTableParams, DashboardService, $stateParams, $window) {

    
    $scope.selectedTab = 1;
    
    var responseData;
    $scope.additionalInfo = [];
    $scope.nextProperty;
    $scope.previousProperty;
    bindSitesData();
    
    function bindSitesData() {

        DashboardService.getSitesData().then(function (result) {
           
            responseData = result;
            bindSiteData($stateParams.siteId);
            bindnextSite($stateParams.siteId);
            bindprevSite($stateParams.siteId);
        }, function (error) {

        });
    }

     function bindsitesAdditionalInfo() {
         DashboardService.getSitesAdditinalInfo().then(function (result) {
            
             $scope.additionalInfoData = result[0].additionalInfoDefult; 
             $scope.additionalInfoUSTData = result[0].additionalInfoUST;
           
            
        }, function (error) {

        });
    }

     $scope.hideFields = function() {

         $scope.hiddenFieldStatus = $scope.checkHideField;
        
         if ($scope.checkHideField == true) {
             localStorage.setItem("HideField", true);
         } else {
             localStorage.removeItem("HideField");
         }
     }

     function bindnextSite(siteid) {

         var id = parseInt(siteid) + 1;

         var nextData = findById(id);
        
         if (nextData != undefined) {
             $scope.nextAddress = nextData.address;
             $scope.nextDatabase = nextData.database;
             $scope.nextId = nextData.Id
         }
            
     }

     function bindprevSite(siteid) {
         var id = parseInt(siteid) - 1;
         var prevData = findById(id);
         if (prevData != undefined) {
             $scope.prevId = prevData.Id;
             $scope.prevAddress = prevData.address;
             $scope.prevDatabase = prevData.database;
         }
         
     }

    function bindSiteData(siteid) {
        
        var data = findById(siteid);
       
        var getpath = $location.path();
        var hiddenStatus = localStorage.getItem("HideField");
        if (hiddenStatus) {
            $scope.hiddenFieldStatus = true
        } else {
            $scope.hiddenFieldStatus = false
        }
            $scope.siteId = data.Id;
            $scope.siteDistance = data.distance;
            $scope.siteDirection = "North";
            $scope.siteElevation = data.rel;
            $scope.siteName = data.sitename;
            $scope.siteAddress = data.address;
            $scope.sitemapimg = data.mapImage;
            $scope.siteDatabase = data.database;
      
            bindsitesAdditionalInfo();
          
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
            if (responseData[i].Id == siteid) {
                                              
                return responseData[i];
            }
        }
        //throw "Couldn't find site with id: " + siteid;
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