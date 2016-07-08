angular.module('app').service('graphSvc', function($http) {

  this.getData = function() {
    return $http({
      method: 'GET',
      url: 'http://fews.avantar.us/graphtest.php'
    })
  }

});
