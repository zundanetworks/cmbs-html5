(function () {
'use strict';
/*
 * Kwabi <kwabispace@gmail.com>
 * Created: 2013/11/04 17:05:11
 * Updated: 2013/11/13 13:54:00
 * Learning Angularjs.
 * */
  var dataService = function() {
      var db = {
        name: 'cmbsDB',
        version: 1.0
      };
      
    /*{
      // Service logic
      // ...

      var meaningOfLife = 42;

      // Public API here
      return {
        someMethod: function () {
          return meaningOfLife;
        }
      };
    }*/

    // AngularJS will instantiate a singleton by calling "new" on this function
    var pTitle = '';
    var charz = [];

    return {
      /*title: function() {
        return pTitle;
      },*/
      title: function(t) {
        var tt = t || ''; tt = tt.trim();
        return pTitle =  tt.length ? tt : pTitle;
        //var p = 'debug';
      },
      clients: function() {
        //return charz;
        //2013/11/13 13:16:21 use browser local storage
        var localCharz = savedData();
        return  charz = localCharz.length ? localCharz : charz;
      },
      localClients: function() {
        //2013/11/13 13:48:48 retrieve all clients saved to browser local storage
        return savedData();
      },
      /*client: function(id) { //Kwabi: 2013/11/07 10:08:52 Retrieve favourite client
        return id ?
          charz.reduce(function(found, current) {
            return found || current.id == id && current;
          }, false) :
          {id: 4, name: 'New name'};
      }*/
      client: function(id) { //Kwabi: 2013/11/07 10:08:52 Retrieve favourite client
        return id ? getById(id) : {nu: true};
      },
      save: function(char) { //Kwabi: 2013/11/07 16:20:17 Save favourite client
        /*return char.nu ?
          function() {
            char.id = charz[(charz.length - 1)].id + 1;
            delete char.nu;
            charz.push(char);
            //2013/11/13 12:53:28 save to browser local storage or indexedDB
            saveData(charz)
            return {'data':charz, 'lastId': char.id};
          }() :
          {'data':charz, 'lastId': false};*/
          
        //2013/11/13 15:07:00 refactored code to replace above commented out block
        var lastId = false;
        if (char.nu) {
            lastId = char.id = charz.length ? parseInt(charz[(charz.length - 1)].id) + 1: 1;
            delete char.nu;
            charz.push(char);
            //2013/11/13 12:53:28 save to browser local storage or indexedDB
        } else if (char.import) {
            delete char.import;
            charz = charz.concat(char);
        }
        saveData(charz)
        return {'data':charz, 'lastId': lastId};   
      },
    };

    function getById(id) {
      return charz.reduce(function(found, current) {
        return found || current.id == id && current;
      }, false);
      //var r = 1;
    }

    function savedData() {
        return JSON.parse(window.localStorage.getItem(db.name)) || [];
    }

    function saveData(chz) {
        window.localStorage.setItem(db.name, JSON.stringify(chz));
    }
    
  };
  angular.module('yoApp').factory('dataService', [dataService]);

}());
