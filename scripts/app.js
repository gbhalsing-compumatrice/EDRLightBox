
angular.module('EDRLightbox', ['ui.router.state', 'ngTable', 'ui.bootstrap', 'duScroll']);

angular.module('EDRLightbox').config([
  '$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {


      $urlRouterProvider.otherwise('/');
      $stateProvider.state('/', {

          'url': '/',
          'controller': 'DashboardController',
          'templateUrl': 'modules/dashboard/views/dashboard.html'

      }).state('xlslistview', {

          'url': '/xlslistview',
          'controller': '',
          'templateUrl': 'modules/signin/views/signin.html',

      }).state('pdfreports', {

          'url': '/pdfreports',
          'controller': '',
          'templateUrl': 'modules/signin/views/signin.html',

      }).state('exportfilter', {

          'url': '/exportfilter',
          'controller': '',
          'templateUrl': 'modules/signin/views/signin.html',

      }).state('draw', {

          'url': '/draw',
          'controller': '',
          'templateUrl': 'modules/signin/views/signin.html',

      }).state('propertydetails', {

          'url': '/propertydetails/:siteId',
          'controller': 'PropertydetailsController',
          'templateUrl': 'modules/dashboard/views/popoutdetails.html',

      }).state('database_descriptions', {

          'url': '/database_descriptions',
          'controller': 'DBDescriptionsController',
          'templateUrl': 'modules/navigation/about/views/databasedescriptions.html',

      }).state('detailsprint', {

          'url': '/detailsprint/:siteId',
          'controller': 'PropertydetailsController',
          'templateUrl': 'modules/dashboard/views/detailsprint.html',

      }).state('disclaimer', {

          'url': '/disclaimer',
          'controller': 'DisclaimerController',
          'templateUrl': 'modules/navigation/about/views/disclaimer.html',

      }).state('feedback', {

          'url': '/feedback',
          'controller': 'FeedbackController',
          'templateUrl': 'modules/navigation/about/views/feedback.html',

      }).state('maplegend', {

          'url': '/maplegend',
          'controller': 'MaplegendController',
          'templateUrl': 'modules/navigation/about/views/maplegend.html',

      }).state('sanbornkey', {

          'url': '/sanbornkey',
          'controller': 'SanbornkeyController',
          'templateUrl': 'modules/navigation/about/views/sanbornkey.html',

      })
  }


]);

angular.module('EDRLightbox').directive('numFilter', function () {

    return {
        restrict: 'A',
        replace: false,

        link: function (scope, elem, attr) {

            var sum = (isNaN(scope.user.firstVal) ? 0 : scope.user.firstVal) + (isNaN(scope.user.secondVal) ? 0 : scope.user.secondVal) + (isNaN(scope.user.thirdVal) ? 0 : scope.user.thirdVal) + (isNaN(scope.user.fourthVal) ? 0 : scope.user.fourthVal) + (isNaN(scope.user.fifthVal) ? 0 : scope.user.fifthVal);
            scope.user.sum = sum;

        }
    }

});
angular.module('EDRLightbox').directive('flipPanel', function () {

    return {
        restrict: 'A',
        replace: false,

        link: function (scope, elem, attr) {

            elem.on('click', function () {
               
                    $("#panel").toggle("slide");
                
            })

        }
    }

})


