angular.module('Degree_Not_Required')
.factory('Poller', function($http, $timeout) {
  var job_seekers = { response: {}}
  var poller = function() {
    $http.get('/job_seekers',  { cache: false}).then(function(res) {
      job_seekers.response = res.data;
      $timeout(poller, 1000);
    });
    
  };
  poller();  
  return {
  	job_seekers: job_seekers
  };
});