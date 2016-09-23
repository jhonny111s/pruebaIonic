angular.module('starter.services', ['ngResource'])
.constant("myConfig",
  { "url": "http://localhost:3000/"}
)

.service('ListFactory', function($resource, myConfig) {

 this.getListModule = function() {
  return $resource(myConfig.url + "modulo/:id", null, {
   'update': {
    method: 'PUT'
   }
  });
 };

 this.getListSubmodule = function() {
  return $resource(myConfig.url + "submodulos/:id", null, {
   'update': {
    method: 'PUT'
   }
  });
 };


})
