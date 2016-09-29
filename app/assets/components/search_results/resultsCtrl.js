angular.module('Degree_Not_Required')
.controller('resultCtrl', function($scope,$location,jobsService,$sce,$httpParamSerializer) {
    // Need to refactor $scope.init and $scope.search to make it DRYER
    // Need to also move business logic into the factory, controller should only deal with the UI
	$scope.init = function () {
		// If it is not empty, request jobs
        if (!(Object.keys($location.search()).length === 0)) {
            $scope.formData = {
                "query" : sessionStorage.getItem("query"),
                "location" : localStorage.getItem("location")
            }
            $scope.search()
      //       jobsService.requestJobs($location.search()).
      //       then(function success(response){
      //           $scope.job_results = response.data
      //           $scope.get_next_num_pages()
    		// },
    		// 	function error(response){

    		// 	});
    	}
        else{
            $scope.formData = {
                "query" : sessionStorage.getItem("query") == "undefined" || sessionStorage.getItem("query") == "null" ?"":sessionStorage.getItem("query"),
                "location" : localStorage.getItem("location")
             }
        }
	};

    $scope.get_next_num_pages = function(num = 5){
        while(num > 0){
            num-=1;
            if ($scope.job_results.length) {
                        debugger
                jobsService.next_page($scope.job_results,$location.search($scope.formData).search()).
                    then(function success(res){
                        Array.prototype.push.apply($scope.job_results,res.data);
                        
                    },function error(){
                    
                    })
            }
        }
    }



	$scope.search = function(){
		jobsService.requestJobs($location.search($scope.formData).search()).
		then(function success(response){
			$scope.job_results = response.data;
            $scope.get_next_num_pages();
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