(function () {
'use strict';
/*
 * Kwabi <kwabispace@gmail.com>
 * Created: 2013/11/13 19:56:12
 * Updated: 2013/12/02 10:01:52
 * Learning Angularjs. 
 * */

  var ClientsCtrl = function ($scope, $window, dataService) {
    /*$scope.clients = [
      {name: 'Doctor Who'},
      {name: 'Palkaroo'},
      {name: 'NO one'},
    ];*/
    $scope.clients = dataService.clients();
    $scope.localClients = dataService.localClients();
    $scope.importedData = {};
    $scope.cSort = 'id';
    $scope.cDate = new Date();
    
    $scope.tSortCol = 'name';
    $scope.tSortReverse = false;
    
    $scope.tSort = function(col) {
      if ($scope.tSortCol === col) {
        $scope.tSortReverse = !$scope.tSortReverse;
      } else {
        $scope.tSortReverse = false;
      }
      $scope.tSortCol = col;
    };

    $scope.exportCSV = function(ev) { //2013/12/02 09:57:11
      $scope.cDate = new Date();
      document.querySelector('#exportCSV').href = csvDataURL;
      return false;
    };


    $scope.initImportCSV = function(el) { //2013/12/01 20:59:13
      document.querySelector('#importCSVfile').click();
      return false;
    }
    
    $scope.importCSV = function(el) { //2013/12/01 19:38:11
      if (d3 !== 'undefined') {
        if (el.files.length === 0) { return; }
        var csvFile = el.files[0];
        var filter = /^(?:text\/csv)$/i;
        if (!filter.test(csvFile.type)) { alert("You must select a valid CSV file!"); return; }
        importOp = true;
        csvReader.readAsBinaryString(csvFile);
      }
    }
    
    var csvReader = new FileReader()
    var alink, csvDataURL = '#', importOp = false;
    
    csvReader.onload = function(ev) {
      if(!importOp) { //export
        csvDataURL = ev.target.result;
      } else if (importOp && (d3 !== 'undefined')) { //import
        $scope.$apply(function() {
          var csv = d3.csv.parse(ev.target.result);
          //var csv = $scope.importedData = d3.csv.parse(ev.target.result);
          //csv = $scope.clients.concat(csv);//2013/12/02 16:16:09 concatenate the current array with the imported
          csv.import = true;//2013/12/02 16:44:24 set import flag for imported data to be added to db;
          var cState = dataService.save(csv);

          prepCSV();//2014/02/01 23:59:42 update the export csv dataURL
          $scope.clients = $scope.clients.concat(csv);//2014/02/01 23:43:46 update ui with imported. will need consolidation
        })
        //console.dir($scope.importedData);//debug
        //console.log($scope.importedData);//debug
      }
    }

    function prepCSV(ev) { //2013/11/20 15:22:05 preload csv dataURL
      var favz = dataService.clients();
      if (d3 !== 'undefined') {
        var csv = [d3.csv.format(favz)];
        var blob1 = new Blob(csv, {type : 'text/csv'});
        importOp = false;
        csvReader.readAsDataURL(blob1);
      }
    }
    prepCSV();
    
    //2013/11/11 15:25:23 set page title;
    dataService.title('Clients');
  };
  
  angular.module('yoApp').controller('ClientsCtrl', ['$scope', '$window', 'dataService', ClientsCtrl]);
})();
  
