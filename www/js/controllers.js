angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('listsCtrl', function($scope, $state, $stateParams, ListFactory) {

  $scope.shouldShowDelete = false;

  $scope.showDelete = function() {
    $scope.shouldShowDelete = !$scope.shouldShowDelete;
  };

  $scope.update = function(data) {
    console.log(data);
    $state.go("app.module", {
      data: JSON.stringify(data)
    });

  };

  $scope.create = function() {
    $state.go("app.module", {
      data: '{}'
    });

  };

  $scope.delete = function(id) {
    console.log(id);
    ListFactory.getListModule().delete({
      id: id
    }, function(resp) {
      console.log(resp)
    });
  };

  $scope.findSub = function(id) {
    $state.go("app.submoduleList", {
      id: JSON.stringify(id)
    });
  };

  ListFactory.getListModule().query(
    function(response) {
      console.log(response);
      $scope.listModules = response
    },
    function(response) {
      console.log("Error: " + response.status + " " + response.statusText);
    });

})

.controller('moduleCtrl', function($scope, $state, $stateParams, ListFactory) {

  var state = angular.fromJson($stateParams.data);
  $scope.buttonSubmit = 'Guardar';
  $scope.modulo = {
    "nombre": '',
    "codmodulo": ''
  };

  if (angular.equals({}, state)) {
    $scope.buttonSubmit = 'Guardar';
  } else {
    $scope.modulo = state;
    $scope.buttonSubmit = 'Actualizar';
  }


  $scope.submitForm = function() {
    console.log($scope.modulo);
    if (angular.equals({}, state)) {
      ListFactory.getListModule().save($scope.modulo);
    } else {
      ListFactory.getListModule().update({}, $scope.modulo);
    }

    $state.go("app.moduleList");
  };


})

.controller('sublistsCtrl', function($scope, $state, $stateParams, SublistFactory) {
  console.log($stateParams);
  $scope.shouldShowDelete = false;

  $scope.showDelete = function() {
    $scope.shouldShowDelete = !$scope.shouldShowDelete;
  };

  $scope.update = function(data) {
    console.log(data);
    $state.go("app.submodule", {
      data: JSON.stringify(data)
    });

  };

  $scope.create = function() {
    $state.go("app.submodule", {
      data: '{}'
    });

  };

  $scope.delete = function(id) {
    console.log(id);
    SublistFactory.getListSubmodule().delete({
      idmodulo: id
    }, function(resp) {
      console.log(resp)
    });
  };

  SublistFactory.getListSubmodule().query({
      idmodulo: parseInt($stateParams.id)
    })
    .$promise.then(
      function(response) {
        console.log(response);
        $scope.listModules = response
      },
      function(response) {
        console.log("Error: " + response.status + " " + response.statusText);
      });

})

.controller('submoduleCtrl', function($scope, $state, $stateParams, SublistFactory, ListFactory) {

  ListFactory.getListModule().query(
  function(response) {
   $scope.optionSelect = response;
  },
  function(response) {
    $scope.optionSelect = '';
    console.log("Error: " + response.status + " " + response.statusText);
  });

  var state = angular.fromJson($stateParams.data);

  $scope.buttonSubmit = 'Guardar';
  $scope.submodulo = {
    "nombre": '',
    "idmodulo": ''
  };

  if (angular.equals({}, state)) {
    $scope.submodulo.idmodulo = state.idmodulo;
    $scope.buttonSubmit = 'Guardar';
    console.log($scope.submodulo);
  } else {
    state.idmodulo= state.idmodulo.toString();
    $scope.submodulo = state;
     console.log($scope.submodulo);
    $scope.buttonSubmit = 'Actualizar';
  }

   $scope.submitForm = function() {
    if (angular.equals({}, state)) {
      console.log($scope.submodulo);
      SublistFactory.getListSubmodule().save($scope.submodulo);
    } else {
      $scope.submodulo.idmodulo = parseInt($scope.submodulo.idmodulo);
      console.log($scope.submodulo);
      SublistFactory.getListSubmodule().update({
        id: $scope.submodulo.id
      }, $scope.submodulo);
    }

    $state.go("app.moduleList");
  };


})

.controller('PlaylistCtrl', function($scope, $stateParams) {});
