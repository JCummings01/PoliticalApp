var politicalApp = angular.module('politicalApp', ['ngResource', 'ngRoute']);

politicalApp.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: '/templates/map'
    })
    .when('/state/:id', {
      templateUrl: '/templates/state',
      controller: 'stateRepController'
    });
});

politicalApp.factory('stateReps', function(){
  var data = [
  {name: 'John Doe', state: 'Ohio'},
  {name: 'Jane Doe', state: 'Florida'}
  ];
  return {
    items: data
  };
});

politicalApp.controller('stateRepController', function($scope, stateReps){
  $scope.items = stateReps.items;
});

politicalApp.directive('staterep', function(){
  return{
    restrict: 'E',
    templateUrl: '/templates/state',
    scope: {
      info: '='
    }
  };
});
