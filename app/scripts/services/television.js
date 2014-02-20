'use strict';
/*
 * Kwabi <kwabispace@gmail.com>
 * Created: 2013/11/04 17:05:11
 * Updated: 2013/11/13 13:54:00
 * Learning Angularjs.
 * */
angular.module('yoApp')
  .service('Television', function Television() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var pTitle = '';
    var charz = [
          {
            "id": 1,
            "name": "Doctor Who"
          },
          {
            "id": 2,
            "name": "Palkaroo",
            "email": "palkaroo@loko.dev",
            "gender": "male",
            "agree": true,
            "agreeSign": "pk"
          },
          {
            "id": 3,
            "name": "NO one"
          },
          {
            "name": "Kwabi",
            "email": "kwabi@loko.dev",
            "gender": "male",
            "agree": false,
            "id": 5
          }
          ];

    return {
      /*title: function() {
        return pTitle;
      },*/
      title: function(t) {
        var tt = t || ''; tt = tt.trim();
        return pTitle =  tt.length ? tt : pTitle;
        //var p = 'debug';
      },
      characters: function() {
        //return charz;
        //2013/11/13 13:16:21 use browser local storage
        var localCharz = savedCharacters();
        return  charz = localCharz.length ? localCharz : charz;
      },
      localCharacters: function() {
        //2013/11/13 13:48:48 retrieve all characters saved to browser local storage
        return savedCharacters();
      },
      /*character: function(id) { //Kwabi: 2013/11/07 10:08:52 Retrieve favourite character
        return id ?
          charz.reduce(function(found, current) {
            return found || current.id == id && current;
          }, false) :
          {id: 4, name: 'New name'};
      }*/
      character: function(id) { //Kwabi: 2013/11/07 10:08:52 Retrieve favourite character
        return id ? getById(id) : {nu: true};
      },
      save: function(char) { //Kwabi: 2013/11/07 16:20:17 Save favourite character
        /*return char.nu ?
          function() {
            char.id = charz[(charz.length - 1)].id + 1;
            delete char.nu;
            charz.push(char);
            //2013/11/13 12:53:28 save to browser local storage
            saveCharacters(charz)
            return {'data':charz, 'lastId': char.id};
          }() :
          {'data':charz, 'lastId': false};*/
          
        //2013/11/13 15:07:00 refactored code to replace above commented out block
        var lastId = false;
        if (char.nu) {
            lastId = char.id = charz[(charz.length - 1)].id + 1;
            delete char.nu;
            charz.push(char);
            //2013/11/13 12:53:28 save to browser local storage
        }
        saveCharacters(charz)
        return {'data':charz, 'lastId': lastId};   
      },
    };

    function getById(id) {
      return charz.reduce(function(found, current) {
        return found || current.id == id && current;
      }, false);
      //var r = 1;
    }

    function savedCharacters() {
        return JSON.parse(window.localStorage.getItem("charactaz")) || [];
    }

    function saveCharacters(chz) {
        window.localStorage.setItem("charactaz", JSON.stringify(chz));
    }
    
  });
