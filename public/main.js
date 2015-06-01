var politicalApp = angular.module('politicalApp', ['ngResource', 'ngRoute']);

politicalApp.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: '/templates/map'
    })
    .when('/templates/state/:id', {
      templateUrl: '/templates/state',
      controller: 'stateRepController'
    })
    .when('#/member/:candidateId', {
      templateUrl: '/templates/member',
      controller: 'summaryController'
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
  $scope.state = $routeParams.id;
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

politicalApp.controller('summaryController', function($scope, osBio, vsVotes, osMoney, $routeParams){
  $scope.bio = {};
  $scope.votes = {};
  $scope.money = {};

});

politicalApp.factory('osBio', function($resource, $http, $q){
var candBio = {};
  var defer = $q.defer();
  // var data = $resource('/templates/state/:id', {id: '@_id'});
  // return ({
  //   getReps: getReps
  // });

  // function getReps(stateId) {
  //   $http.get('/get_state_members/' + stateId)
  //     .success(function(data, status, headers, config){
  //       defer.resolve(data);
  //       console.log(data);
  //     })
  //     .error(function(data, status, headers, config){
  //       console.log('error from mainJS');
  //     });
  //   return defer.promise;
  //   }
});
politicalApp.factory('vsVotes', function($resource, $http, $q){

});
politicalApp.factory('osMoney', function($resource, $http, $q){

});