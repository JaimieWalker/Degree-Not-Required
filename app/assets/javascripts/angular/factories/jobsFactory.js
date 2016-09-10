angular.module('Degree_Not_Required')
	.factory('jobsFactory', ['$http', function($http){
		return function jobsFactory(){
			this.getJobs = function(params){
				$http({
					method : "GET",
					url    : "api/jobs",
					params : params,
					cache  : true,
					responseType : "json",
					headers: {
							   'Content-Type': "json",
							   'accept'      : "application/json"
							 }
				}).then(function(response){
					debugger
				}, function error(response){
					debugger
				});
			}
		};
	}])