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
            bindnextSite($stateParams.siteId);
            bindprevSite($stateParams.siteId);
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

     $scope.hideFields = function() {

         $scope.hiddenFieldStatus = $scope.checkHideField;
         console.log("hide value " + $scope.hiddenFieldStatus)
         
         if ($scope.checkHideField == true) {
             localStorage.setItem("HideField", true);
         } else {
             localStorage.removeItem("HideField");
         }
     }

     function bindnextSite(siteid) {

         var id = parseInt(siteid) + 1;

         var nextData = findById(id);
         //console.log("length " + nextData.length)
         if (nextData != undefined) {
             $scope.nextAddress = nextData.address;
             $scope.nextDatabase = nextData.database;
             $scope.nextId = nextData.Id
         }
             console.log("next data " + JSON.stringify(nextData))
     }

     function bindprevSite(siteid) {
         var id = parseInt(siteid) - 1;
         var prevData = findById(id);
         if (prevData != undefined) {
             $scope.prevId = prevData.Id;
             $scope.prevAddress = prevData.address;
             $scope.prevDatabase = prevData.database;
         }
         console.log("prev data " + JSON.stringify(prevData))
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