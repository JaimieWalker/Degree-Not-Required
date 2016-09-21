angular.module('Degree_Not_Required')
.controller('resultCtrl', function($scope,$location,jobsService,$sce,$httpParamSerializer) {
	$scope.init = function () {
		// If it is not empty, request jobs
        if (!(Object.keys($location.search()).length === 0)) {
            $scope.formData = {
                "query" : sessionStorage.getItem("query"),
                "location" : localStorage.getItem("location")
            }
            jobsService.requestJobs($location.search()).
            then(function success(response){
                $scope.job_results = response.data
                if (response.data.length) {
                    jobsService.postJobs(response.data,$location.search($scope.formData).search())
                }
    		},
    			function error(response){

    			});
    	}
        else{
            $scope.formData = {
                "query" : sessionStorage.getItem("query"),
                "location" : localStorage.getItem("location")
             }
        }
	};



	$scope.search = function(){
		jobsService.requestJobs($location.search($scope.formData).search()).
		then(function success(response){
			$scope.job_results = response.data;
			jobsService.postJobs(response.data,$location.search($scope.formData).search())
		},
			function error(){

			});
		// let qs = $httpParamSerializer($scope.formData)
		// $scope.formData.query = $scope.formData.query.toLowerCase();
	}

	 $scope.trustAsHtml = function(html) {
      return $sce.trustAsHtml(html);
    }

    $scope.saveSessionQuery = function(){
        sessionStorage.setItem("query",$scope.formData.query);
    }
   
    $scope.saveLocalLocation = function(){
        localStorage.setItem("location",$scope.formData.location);
    }
    
    
});