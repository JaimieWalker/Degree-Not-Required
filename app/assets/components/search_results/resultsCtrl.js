angular.module('Degree_Not_Required')
.controller('resultCtrl', function($scope,$location,jobsService) {
	$scope.job_results = [];
    $scope.formData = {
		"query" : sessionStorage.getItem("query")
	}   
});