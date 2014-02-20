(function () {
'use strict';
/*
 * Kwabi <kwabispace@gmail.com>
 * Created: 2013/11/13 16:21:57
 * Updated: 
 * Learning Angularjs. 
 * */
  var navbarController = function ($scope, $location) {
      $scope.appTitle =  'Customer Management & Billing';
      $scope.highlight = function (path) {
          //return $location.path().substr(0, path.length) == path;
          return $location.path() == path;
      }
  };
  angular.module('yoApp').controller('NavbarController', ['$scope', '$location', navbarController]);
}());
