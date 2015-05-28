angular.module('EDRLightbox', ['ui.router.state', 'ngTable']);

angular.module('EDRLightbox').config([
  '$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {


      $urlRouterProvider.otherwise('/');
      $stateProvider.state('/', {

          'url': '/',
          'controller': 'dashboardController',
          'templateUrl': 'modules/dashboard/views/dashboard.html'

      }).state('XlsListView', {

          'url': '/XlsListView',
          'controller': '',
          'templateUrl': 'modules/signin/views/signIn.html',

      }).state('PdfReports', {

          'url': '/PdfReports',
          'controller': '',
          'templateUrl': 'modules/signin/views/signIn.html',

      }).state('ExportFilter', {

          'url': '/ExportFilter',
          'controller': '',
          'templateUrl': 'modules/signin/views/signIn.html',

      }).state('DBDiscriptions', {

          'url': '/DBDiscriptions',
          'controller': '',
          'templateUrl': 'modules/signin/views/signIn.html',

      }).state('Disclaimer', {

          'url': '/Disclaimer',
          'controller': '',
          'templateUrl': 'modules/signin/views/signIn.html',

      }).state('Draw', {

          'url': '/Draw',
          'controller': '',
          'templateUrl': 'modules/signin/views/signIn.html',

      })
      .state('popoutdetails', {

          'url': '/popoutdetails',
          'controller': 'dashboardController',
          'templateUrl': 'modules/dashboard/views/popoutdetails.html',

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

})


