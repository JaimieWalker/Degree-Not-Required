"use strict"
angular.module('Degree_Not_Required')
	.factory('jobsService', ['$http', function($http){
		let jobsService = {

		    getJobs : function(params){
				return $http({
					method : "GET",
					url    : "api/jobs",
					params : params,
					cache  : true,
					responseType : "json",
					headers: {
							   'Content-Type': "json",
							   'accept'      : "application/json"
							 }
				});
			}


		}
		return jobsService
	}])