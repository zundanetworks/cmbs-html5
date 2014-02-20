'use strict';

angular.module('yoApp', [])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        //templateUrl: 'views/clients.html',
        //controller: 'ClientsCtrl'
        redirectTo: '/clients'
      })
      .when('/favourites', {
        templateUrl: 'views/favourites.html',
        controller: 'FavouritesCtrl'
      })
      .when('/favs', {
        templateUrl: 'views/favourites.html',
        controller: 'FavouritesCtrl'
      })
      .when('/kuform', {
        templateUrl: 'views/kuform.html',
        controller: 'KuformCtrl'
      })
      .when('/kuform2', {
        templateUrl: 'views/kuform2.html',
        controller: 'Kuform2Ctrl'
      })
      .when('/favourite/:id', {
        templateUrl: 'views/favourite.html',
        controller: 'FavouriteCtrl'
      })
      .when('/fav/:id', {
        templateUrl: 'views/favourite.html',
        controller: 'FavouriteCtrl'
      })
      .when('/fav', {
        templateUrl: 'views/favourite.html',
        controller: 'FavouriteCtrl'
      })
      .when('/clients', {
        templateUrl: 'views/clients.html',
        controller: 'ClientsCtrl'
      })
      .when('/clientedit', {
        templateUrl: 'views/client.edit.html',
        controller: 'ClientEditCtrl'
      })
      .when('/clientedit/:id', {
        templateUrl: 'views/client.edit.html',
        controller: 'ClientEditCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      //$locationProvider.html5Mode( true );
  });
