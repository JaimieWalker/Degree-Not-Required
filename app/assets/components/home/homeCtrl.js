// Should set up filters and values for searching
angular.module('Degree_Not_Required')
.controller('homeCtrl', function($scope,jobsService,$location,$httpParamSerializer) {
	
	$scope.formData = {
		"query" : sessionStorage.getItem("query")?"":sessionStorage.getItem("query")
	}   

    $scope.search = function(){
    	let qs = $httpParamSerializer($scope.formData)
    	$scope.formData.query = $scope.formData.query.toLowerCase();
        jobsService.requestJobs($scope.formData);
        $location.url("/jobs?" + qs);
    }

    $scope.saveSession = function(){
    	sessionStorage.setItem("query",$scope.formData.query);
    }

});