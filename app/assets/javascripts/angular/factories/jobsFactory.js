"use strict"
angular.module('Degree_Not_Required')
	.factory('jobsService', ['$http', function($http){
		let jsonResponse = {}

		let jobsService = {
			getJobs : function(){
				return jsonResponse;
			},
			setJobs : function(jobs){
				jsonResponse = jobs;
			},
		    requestJobs : function(params){
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
				}).then(function(response){
					setJobs(response.data);
					return response;
				},
				function(error){
					return error.data;
				})
			}


		}
		return jobsService
	}])