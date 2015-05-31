var politicalApp = angular.module('politicalApp', ['ngResource', 'ngRoute']);

politicalApp.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: '/templates/map'
    })
    .when('/templates/state/:id', {
      templateUrl: '/templates/state',
      controller: 'stateRepController'
    });
});

politicalApp.factory('stateReps', function($resource, $http, $q){
  var defer = $q.defer();
  var data = $resource('/templates/state/:id', {id: '@_id'});

  var getReps = function(stateId) {
    $http.get('/get_state_members/' + stateId)
      .success(function(data, status, headers, config){
        defer.resolve(data);
      })
      .error(function(data, status, headers, config){
        console.log('error from mainJS');
      });
    return defer.promise;
  };
  return {
    getReps: getReps
  };

});

politicalApp.controller('stateRepController', function($scope, stateReps, $routeParams){
  var stateId = $routeParams.id;
  console.log(stateId);

    stateReps.getReps(stateId).then(function(result){
      // res.send(results); //- this is the array of data from the API call
    });
});



politicalApp.directive('staterep', function(){
  return{
    restrict: 'E',
    templateUrl: '/templates/stateRep',
    scope: {
      info: '='
    }
  };
});

