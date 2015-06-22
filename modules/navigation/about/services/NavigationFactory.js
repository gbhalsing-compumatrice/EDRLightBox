angular.module('EDRLightbox').factory('NavigationService', ['$http',  function ($http) {

    var navigationService = {};
    
    navigationService.getDBDescriptionsData = function () {

        return $http.get('json/dbDescriptions.js').then(
                function (results) {

                    return results.data;

                });
    }

    

    return navigationService;


}]);