"use strict"
angular.module('Degree_Not_Required')
	.factory('jobsService', function(spinnerService,$http,$httpParamSerializer){
		var jobsService = {
			getJobResults : function(){
				return JSON.parse(localStorage.getItem("jobResults"))
			},
			setJobResults : function(jobs){
				var json_jobs = JSON.stringify(jobs);
				localStorage.setItem("jobResults",json_jobs);
			},
			 requestJobs : function(params){
				return $http({
					method : "GET",
					url    : "api/jobs",
					params : params,
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
			},
// Takes an array and turns it into an object
// New Jobs is an array, and old Jobs is an object. We need to add the array to the objects
			paginateJobs : function(oldJobs,newJobs,numOfResults){
				  var numOfResults = (typeof numOfResults !== 'undefined') ?  numOfResults : 15;

				var count = 0
				if (!oldJobs) {
					oldJobs = [];
				}
				if (Object.keys(oldJobs).length === 0 && newJobs) {
					while(newJobs.length){
						oldJobs[count] = newJobs.splice(0,numOfResults)
						count+=1;
					}	
				}else{
					this.addJobsToObject(oldJobs,newJobs,numOfResults)
				}

				// Need to refactor, O(n^2)

				// var count = 0
				// if (newJobs) {
				// 	while(newJobs.length){
				// 		oldJobs[count] = newJobs.splice(0,numOfResults)
				// 		count+=1;
				// 	}	
				// }
				return oldJobs;
			},
// Makes sure each new page has at least 15 results
			addJobsToObject : function(page,newJobs,numOfResults){
				var numOfResults = (typeof numOfResults !== 'undefined') ?  numOfResults : 15;
				var count = 0;
				if (newJobs) {
					while(newJobs.length){
// If there is a page of results and its length is less than the number of results, fill the page up
						if (page[count] && page[count].length < numOfResults) {
							Array.prototype.push.apply(page[count],
								newJobs.splice(0,numOfResults-page[count].length));
						}else if (!page[count]) {
							page[count]= newJobs.splice(0,numOfResults);
						}
						count+=1;
					}
				}
				return page;
			}
		}
		return jobsService
	})