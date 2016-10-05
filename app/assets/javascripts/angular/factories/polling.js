angular.module('Degree_Not_Required')
.factory('Poller', function($http, $timeout) {
  let job_seekers = { response: {}}
  let poller = function() {
    $http.get('/job_seekers',  { cache: false}).then(function(res) {
    	debugger
      job_seekers.response = res.data;
      $timeout(poller, 1000);
    });
    
  };
  poller();  
  return {
  	job_seekers: job_seekers
  };
});