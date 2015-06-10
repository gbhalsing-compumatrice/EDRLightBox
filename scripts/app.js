﻿/// <reference path="C:\EDR\EDRLightBox\EDRLightBox\modules/Navigation/about/contollers/dbDescriptionsController.js" />
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
      .state('propertyDetails', {

          'url': '/propertyDetails/:siteId',
          'controller': 'propertyDetailsController',
          'templateUrl': 'modules/dashboard/views/popoutdetails.html',

      })
      .state('database_descriptions', {

          'url': '/database_descriptions',
          'controller': 'dbDescriptionsController',
          'templateUrl': 'modules/navigation/about/views/databaseDescriptions.html',

      })
      .state('detailsPrint', {

          'url': '/detailsPrint/:siteId',
          'controller': 'propertyDetailsController',
          'templateUrl': 'modules/dashboard/views/detailsPrint.html',

      })
      .state('disclaimer', {

          'url': '/disclaimer',
          'controller': 'disclaimerController',
          'templateUrl': 'modules/navigation/about/views/disclaimer.html',

      })
      .state('feedback', {

          'url': '/feedback',
          'controller': 'feedbackController',
          'templateUrl': 'modules/navigation/about/views/feedback.html',

      })
      .state('mapLegend', {

          'url': '/mapLegend',
          'controller': 'mapLegendController',
          'templateUrl': 'modules/navigation/about/views/mapLegend.html',

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

