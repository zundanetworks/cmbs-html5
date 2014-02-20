'use strict';

angular.module('yoApp')
  .controller('TitleCtrl', function ($scope, Television) {
    //$scope.pageTitle = Television.title('set here');
    $scope.pageTitle = Television.title();
    $scope.fvz = Television.characters();
    $scope.Page = Television;
    var t = 1;
    
  });
