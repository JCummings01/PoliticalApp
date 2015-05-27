var politicalApp = angular.module('politicalApp', ['ngResource', 'ngRoute']);

politicalApp.config(function($routeProvider){
  $routeProvider
    .when('/d', {
      templateUrl: '/d',
      controller: ''
    })
    .when('/state/:id', {
      templateUrl: '/templates/state',
      controller: 'stateController'
    });
});

politicalApp.controller('stateController', function($scope, newsItems, $routeParams){
  console.log($routeParams.id);
  var postId = $routeParams.id;

  $scope.news = newsItems.model.get({_id: postId});
});