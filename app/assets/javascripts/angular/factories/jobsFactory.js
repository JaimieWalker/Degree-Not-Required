"use strict"
angular.module('Degree_Not_Required')
	.factory('jobsService', function($http,$httpParamSerializer){

		let jobsService = {
			 requestJobs : function(params){
				return $http({
					method : "GET",
					url    : "api/jobs",
					params : params,
					cache  : true,
					responseType : "json",
					headers: {
							   "Content-Type": "json",
							   "accept"      : "application/json"
							 }
				}).then(function(response){
					return response;
				},
				function(error){
					return error;
				})
			},

			next_page : function(current_page,params){
				return $http({
					method : "POST",
					url    : "api/jobs/next_page",
					data   : JSON.stringify({ "formData":params ,"jobs":current_page }),
					headers : {
						"Content-Type" : "application/json",
						"accept"       : "application/json"
					}
				}).then(function(response){
					return response
				},
				function(error){
					return error
				})
			}


		}
		return jobsService
	})