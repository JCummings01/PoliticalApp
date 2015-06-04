var politicalApp = angular.module('politicalApp', ['ngResource', 'ngRoute', 'nvd3']);

politicalApp.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: '/templates/map2'
    })
    .when('/templates/state/:id', {
      templateUrl: '/templates/state',
      controller: 'stateRepController'
    })
    .when('/member/:candidateId', {
      templateUrl: '/templates/member',
      controller: 'summaryController'
    });
});

politicalApp.factory('stateReps', function($resource, $http, $q){
  // var repList = {};
  var defer = $q.defer();
  // var data = $resource('/templates/state/:id', {id: '@_id'});
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
        defer.reject(data);
      });
    return defer.promise;
    }
});

politicalApp.controller('stateRepController', function($scope, stateReps, $routeParams){
  var stateId = $routeParams.id;
  var lowercaseStateName = stateId.toLowerCase();
  $scope.reps = {};
  $scope.state = $routeParams.id;
  $scope.lowercase = lowercaseStateName;
  $scope.message;
  console.log($scope.lowercase);
  // console.log(stateId);

  var getRepresentatives = function(){
    stateReps.getReps(stateId)
      .then(function(results){
        // console.log(results);
        $scope.reps = results;
      })
      .catch(function(results){
        $scope.message="Daily API Call Limit has been exceeded.";
      });
    };
  getRepresentatives();
});

// politicalApp.directive('staterep', function(){
//   return{
//     restrict: 'E',
//     templateUrl: '/templates/stateRep',
//     scope: {
//       info: '='
//     }
//   };
// });

politicalApp.controller('summaryController', function($scope, osBio, osMoney, vsVotes, $routeParams){
  $scope.bio = {};
  $scope.bills = {};
  $scope.moneys = {};
  $scope.bioguide = {};
  $scope.chartdata = chartData;
  $scope.candidateId = $routeParams.candidateId;
  var candidateId = $routeParams.candidateId;
  var chartData = [];

  var getBios = function(){
    osBio.getBio(candidateId)
      .then(function(results){
        $scope.bio = results;
        $scope.bioguide = results.uniqueId;
        getVotingRecord(results.uniqueId);
        // console.log(results.uniqueId);
        // console.log(results);
      });
    };
  getBios();

  var getContributions = function(){
    osMoney.getMoney(candidateId)
      .then(function(results){
        $scope.moneys = results;
        makeChartData(results);
        // console.log(results);
      });
    };
  getContributions();

  var makeChartData = function(results){
    for (var i = 0; i < results.length; i++) {
      chartData.push({
      key: results[i].industry_name,
      y: parseInt(results[i].total)
      });
    }
    // console.log(chartData);
  };

  var getVotingRecord = function(uniqueId){
    vsVotes.getVotes(uniqueId)
      .then(function(results){
        $scope.bills = results;
      });
    };

  $scope.options = {
          chart: {
              type: 'pieChart',
              height: 550,
              donut: true,
              x: function(d){return d.key;},
              y: function(d){return d.y;},
              showLabels: false,

              pie: {
                  startAngle: function(d) { return d.startAngle/2 -Math.PI/2 },
                  endAngle: function(d) { return d.endAngle/2 -Math.PI/2 }
              },
              transitionDuration: 500,
              legend: {
                  margin: {
                      top: 5,
                      right: 70,
                      bottom: 5,
                      left: 0
                  }
              }
          }
      };

        $scope.data = chartData;

});

politicalApp.factory('osBio', function($resource, $http, $q){
  // var candBio = {};
  var defer = $q.defer();
  // var data = $resource('#/member/:candidateId', {id: '@_id'});
  return ({
    getBio: getBio
  });

  function getBio(candidateId) {
    $http.get('/get_member_bio/' + candidateId)
      .success(function(data, status, headers, config){
        defer.resolve(data);
        // console.log(data);
      })
      .error(function(data, status, headers, config){
        console.log('error from biograbber on mainJS!');
      });
    return defer.promise;
    }
});

politicalApp.factory('osMoney', function($resource, $http, $q){
  var defer = $q.defer();
  return ({
    getMoney: getMoney
  });

  function getMoney(candidateId) {
    $http.get('/get_member_money/' + candidateId)
      .success(function(data, status, headers, config){
        defer.resolve(data);
        // console.log(data);
      })
      .error(function(data, status, headers, config){
        console.log('error from moneygrab on mainJS!');
      });
    return defer.promise;
    }
});

politicalApp.factory('vsVotes', function($resource, $http, $q){
    var defer = $q.defer();
    return ({
      getVotes: getVotes
    });

    function getVotes(uniqueId) {
      $http.get('/get_member_votes/' + uniqueId)
        .success(function(data, status, headers, config){
          defer.resolve(data);
          console.log(data);
        })
        .error(function(data, status, headers, config){
          console.log('error from votegrab on mainJS!');
        });
      return defer.promise;
    }
});