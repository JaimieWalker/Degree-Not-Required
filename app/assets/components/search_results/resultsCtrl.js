angular.module('Degree_Not_Required')
.controller('resultCtrl', function($scope,$location,jobsService,$sce) {
    $scope.formData = {
		"query" : sessionStorage.getItem("query")?"":sessionStorage.getItem("query")
	}   

	jobsService.requestJobs($location.search()).
		then(function success(response){
			$scope.job_results = response.data;
			jobsService.postJobs(response.data,$location.search())
		},
			function error(){

			});

	 $scope.trustAsHtml = function(html) {
      return $sce.trustAsHtml(html);
    }

    $scope.saveSession = function(){
    	sessionStorage.setItem("query",$scope.formData.query);
    }
});