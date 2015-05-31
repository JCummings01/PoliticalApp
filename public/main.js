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
  var repList = {};
  var defer = $q.defer();
  var data = $resource('/templates/state/:id', {id: '@_id'});
  return ({
    getReps: getReps
  });

  function getReps(stateId) {
    $http.get('/get_state_members/' + stateId)
      .success(function(data, status, headers, config){
        defer.resolve(data);
        console.log(data);
      })
      .error(function(data, status, headers, config){
        console.log('error from mainJS');
      });
    return defer.promise;
    }
});


politicalApp.controller('stateRepController', function($scope, stateReps, $routeParams){
  $scope.reps = {};
  var stateId = $routeParams.id;
  console.log(stateId);

  var getRepresentatives = function(){
    stateReps.getReps(stateId)
      .then(function(results){
        console.log(results);
        $scope.reps = results;
      });
    };
  getRepresentatives();
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

