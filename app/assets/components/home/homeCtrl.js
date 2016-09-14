// Should set up filters and values for searching
angular.module('Degree_Not_Required')
.controller('homeCtrl',["$scope","jobsService", function($scope,jobsService) {
	$scope.formData = {}
	$scope.job_results = [1,2,3] 
   
    $scope.search = function(){
    	jobsService.getJobs($scope.formData).
    	then(function success(response){
    		$scope.job_results = response.data
            console.log(response.data);
    	},function error(response){
    		console.log("Sorry, got a + " + response.status + " error.");
    	}); 	
    }

}]);