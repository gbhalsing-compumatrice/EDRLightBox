angular.module('EDRLightbox').controller('PropertydetailsController', ['$scope', '$state', '$location', '$document', '$timeout', '$http', '$filter', 'NgTableParams', 'DashboardService', '$stateParams', '$window', function ($scope, $state, $location, $document, $timeout, $http, $filter, NgTableParams, DashboardService, $stateParams, $window) {

    
    $scope.selectedTab = 1;
    
    var responseData, filterData;
    $scope.additionalInfo = [];
    $scope.nextProperty;
    $scope.previousProperty;
    bindSitesData();
    
    function bindSitesData() {

        bindSiteData($stateParams.siteId);
       // bindnextSite($stateParams.siteId);
        //bindprevSite($stateParams.siteId);
    }

     function bindsitesAdditionalInfo() {
         DashboardService.getSitesAdditinalInfo().then(function (result) {
            
             $scope.additionalInfoData = result[0].additionalInfoDefult; 
             $scope.additionalInfoUSTData = result[0].additionalInfoUST;
           
            
        }, function (error) {

        });
    }

    
    

    function bindSiteData(siteid) {
        
        //var data = findById(siteid);
        
        var callFrom = localStorage.getItem('dataFrom');
        console.log("call from " + callFrom)
        if (callFrom == "findings") {

            DashboardService.getSitesData().then(function (result) {
                responseData = result;
                
            }, function (error) {

            });

           
        } else if (callFrom == "physical") {
            
            DashboardService.getAquiFlowData().then(function (result) {
                responseData = result;
                
            }, function (error) {

            });
        } else if (callFrom == "other") {

            DashboardService.getBuildingPermitData().then(function (result) {
                responseData = result;

            }, function (error) {

            });
        }
      
            $timeout(function () {

                for (var i = 0; i < responseData.length; i++) {
                    if (responseData[i].Id == siteid) {

                        filterData = responseData[i];

                    }
                }
                console.log("filter " + filterData)
                $scope.siteId = filterData.Id;
                $scope.siteDistance = filterData.distance;
                $scope.siteDirection = filterData.direction;
                $scope.siteElevation = filterData.rel;
                $scope.siteActual = filterData.actual
                $scope.siteName = filterData.sitename;
                $scope.siteAddress = filterData.address;
                $scope.siteDatabase = filterData.database;

                
                //$scope.siteId = data.Id;
                //$scope.siteDistance = data.distance;
                //$scope.siteDirection = data.direction;
                //$scope.siteElevation = data.rel;
                //$scope.siteName = data.sitename;
                //$scope.siteAddress = data.address;
                //$scope.sitemapimg = data.mapImage;
                //$scope.siteDatabase = data.database;
                bindnextSite($stateParams.siteId);
                bindprevSite($stateParams.siteId);
                
            }, 300);
            bindsitesAdditionalInfo();
        
    }

    function bindnextSite(siteid) {

        var id = parseInt(siteid) + 1;

        var nextData = findById(id);
        console.log("next data " + nextData)
        if (nextData != undefined) {
            $scope.nextAddress = nextData.address;
            $scope.nextDatabase = nextData.database;
            $scope.nextId = nextData.Id
        }

    }

    function bindprevSite(siteid) {
        var id = parseInt(siteid) - 1;
        var prevData = findById(id);
        console.log("next data " + prevData)
        if (prevData != undefined) {
            $scope.prevId = prevData.Id;
            $scope.prevAddress = prevData.address;
            $scope.prevDatabase = prevData.database;
        }

    }

    function findById(id) {
        console.log("idddddd " + id)
        console.log("xxxxxxx " + JSON.stringify(responseData))
        for (var i = 0; i < responseData.length; i++) {
            if (responseData[i].Id == id) {
                console.log("match found")
                return responseData[i];

            }
        }
       
        //throw "Couldn't find site with id: " + siteid;
    }

    $scope.toTheTop = function () {
        $document.scrollTop(0, 500);
    }
    $scope.btnPrint = function () {
        console.log("print");
        var path = "#/detailsprint/" + $stateParams.siteId;
        $window.open(path);
        
    }

    $scope.btnDisable = function () {
        console.log("disable");
    }

    $scope.btnFlag = function () {
        console.log("flag");
    }

    $scope.btnClose = function () {
        $window.close();
    }

}]);