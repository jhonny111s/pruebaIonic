angular.module('starter.services', ['ngResource'])
  .constant("myConfig", {
    "url": "http://localhost:3000/"
  })

.service('ListFactory', function($resource, myConfig) {

  this.getListModule = function() {
    return $resource(myConfig.url + "modulo/:id", null, {
      'update': {
        method: 'PUT'
      }
    });
  };

})

.service('SublistFactory', function($resource, myConfig) {

  this.getListSubmodule = function() {
    return $resource(myConfig.url + "submodulo/", null, {
      'update': {
        method: 'PUT'
      },
      'query': {
        method: 'GET',
        isArray: true
      }
    });
  };
})
