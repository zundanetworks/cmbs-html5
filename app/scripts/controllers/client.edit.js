(function () {
'use strict';
/*
 * Kwabi <kwabispace@gmail.com>
 * Created: 2013/11/13 18:14:18
 * Updated: 
 * Learning Angularjs. 
 * */
  var ClientEditOldCtrl = function ($scope, $location, $routeParams, dataService) {
    var customerID = ($routeParams.id) ? parseInt($routeParams.id) : 0,
    timer,
    onRouteChangeOff;

    $scope.customer;
    $scope.states = [];
    $scope.title = (customerID > 0) ? 'Edit' : 'Add';
    $scope.buttonText = (customerID > 0) ? 'Update' : 'Add';
    $scope.updateStatus = false;
    $scope.errorMessage = '';

    $scope.favourites = dataService.clients();
    $scope.rtParams = $routeParams;
    $scope.rtPath = $location.path();
      
    $scope.client = $routeParams.id ?
      dataService.client($routeParams.id) :
      dataService.client();
      
//    $scope.fav = $filter('filter')($scope.favourites, {id:2});//[0];

    $scope.save = function(fv) {
      //console.dir(fv);
      var cState = dataService.save(fv);
      $location.path('/clients');
      //$location.path(($location.path()) + '/' + cState.lastId)
      /*$http.post('/clients', function() {
        alert('it worked');
      })*/
    }

    //2013/11/11 15:25:23 set page title;
    var ptitle = $scope.client.nu ? 'Add Character' : $scope.client.name;
    dataService.title(ptitle);
  };
  var ClientEditCtrl = function ($scope, $location, $routeParams, dataService) {

      var customerID = ($routeParams.id) ? parseInt($routeParams.id) : 0,
          timer,
          onRouteChangeOff;

      $scope.customer;
      $scope.states = [];
      $scope.title = (customerID > 0) ? 'Edit' : 'Add';
      $scope.buttonText = (customerID > 0) ? 'Update' : 'Add';
      $scope.updateStatus = false;
      $scope.errorMessage = '';

      init();

      $scope.isStateSelected = function (customerStateId, stateId) {
          return customerStateId === stateId;
      };

      $scope.saveCustomer = function () {
          if ($scope.editForm.$valid) {
              if (!$scope.customer.id) {
                  dataService.insertCustomer($scope.customer).then(processSuccess, processError);
              }
              else {
                  dataService.updateCustomer($scope.customer).then(processSuccess, processError);
              }
          }
      };

      $scope.deleteCustomer = function () {
          var custName = $scope.customer.firstName + ' ' + $scope.customer.lastName;
          var modalOptions = {
              closeButtonText: 'Cancel',
              actionButtonText: 'Delete Customer',
              headerText: 'Delete ' + custName + '?',
              bodyText: 'Are you sure you want to delete this customer?'
          };

          modalService.showModal({}, modalOptions).then(function (result) {
              if (result === 'ok') {
                  dataService.deleteCustomer($scope.customer.id).then(function () {
                      onRouteChangeOff(); //Stop listening for location changes
                      $location.path('/customers');
                  }, processError);
              }
          });
      };

      function init() {
          /*if (customerID > 0) {
              dataService.getCustomer(customerID).then(function (customer) {
                  $scope.customer = customer;
              }, processError);
          } else {
              dataService.newCustomer().then(function (customer) {
                  $scope.customer = customer;
              });

          }
          getStates();*/

          //Make sure they're warned if they made a change but didn't save it
          //Call to $on returns a "deregistration" function that can be called to
          //remove the listener (see routeChange() for an example of using it)

          ////onRouteChangeOff = $rootScope.$on('$locationChangeStart', routeChange);
      }

      function routeChange(event, newView) {
          //Navigate to newView if the form isn't dirty
          if (!$scope.editForm.$dirty) return;

          var modalOptions = {
              closeButtonText: 'Cancel',
              actionButtonText: 'Ignore Changes',
              headerText: 'Unsaved Changes',
              bodyText: 'You have unsaved changes. Leave the page?'
          };

          modalService.showModal({}, modalOptions).then(function (result) {
              if (result === 'ok') {
                  onRouteChangeOff(); //Stop listening for location changes
                  $location.path(newView); //Go to page they're interested in
              }
          });

          //prevent navigation by default since we'll handle it
          //once the user selects a dialog option
          event.preventDefault();
          return;
      }

      function getStates() {
          dataService.getStates().then(function (states) {
              $scope.states = states;
          }, processError);
      }

      function processSuccess() {
          $scope.editForm.$dirty = false;
          $scope.updateStatus = true;
          $scope.title = 'Edit';
          $scope.buttonText = 'Update';
          startTimer();
      }

      function processError(error) {
          $scope.errorMessage = error.message;
          startTimer();
      }

      function startTimer() {
          timer = $timeout(function () {
              $timeout.cancel(timer);
              $scope.errorMessage = '';
              $scope.updateStatus = false;
          }, 3000);
      }
  };
  
  angular.module('yoApp').controller('ClientEditCtrl', ['$scope', '$location', '$routeParams', 'dataService', ClientEditOldCtrl]);
}());
