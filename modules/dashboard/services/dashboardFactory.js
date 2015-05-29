angular.module('EDRLightbox').factory('DashboardService', ['$http',  function ($http) {

    var dashboardService = {};
    
    dashboardService.getSitesData = function () {

      return  $http.get('json/SitesDataTbl.js').then(
                function (results) {

                    return results.data;

                });
    }

    dashboardService.getAquiFlowData = function () {
       
        return $http.get('json/AquiflowDataTbl.js').then(
            function (results) {
                return results.data;
            })
    }
   
    dashboardService.getWaterWellData = function () {

        return $http.get('json/WaterWellsDataTbl.js').then(
            function (results) {
                return results.data;
            })
    }

    dashboardService.getSoilData = function () {

        return $http.get('json/SoilDataTbl.js').then(
            function (results) {
                return results.data;
            })
    }

    dashboardService.getBuildingPermitData = function () {

        return $http.get('json/BuildingPermitDataTbl.js').then(
            function (results) {
                return results.data;
            })
    }
    
    dashboardService.getNotesData = function () {

        return $http.get('json/NotesDataTbl.js').then(
            function (results) {
                return results.data;
            })
    }
    
    dashboardService.getSummaryData = function () {

        return $http.get('json/SummaryData.js').then(
            function (results) {
                return results.data;
            })
    }


    return dashboardService;


}]);