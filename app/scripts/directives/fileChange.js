'use strict';
/*
 * Kwabi <kwabispace@gmail.com>
 * Created: 2013/12/01 13:26:52
 * Updated: 
 * Learning Angularjs.
 * implements the onChange event on the file input element which is not currently there in angularjs as of version 1.x or 2.x
 * */
angular.module('yoApp')
  .directive('fileChange', [function () {
    //2013/12/01 18:51:00 based on http://www.jsfiddle.net/vQzKJ/26/
    return {
      link: function(scope, element, attrs) {
        element[0].onchange = function() {
          scope[attrs['fileChange']](element[0]);
        }
      }
    };
  }]);

