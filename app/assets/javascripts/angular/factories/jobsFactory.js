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

			postJobs : function(data,params){
				return $http({
					method : "POST",
					url    : "api/jobs",
					data   : JSON.stringify({ "formData":params ,"jobs":data }),
					headers : {
						"Content-Type" : "application/json",
						"accept"       : "application/json"
					}
				})
			}


		}
		return jobsService
	})