angular.module('Degree_Not_Required')
.controller('resultCtrl', function($scope,$location,jobsService,$sce,$httpParamSerializer) {
    // Need to refactor $scope.init and $scope.search to make it DRYER
    // Need to also move business logic into the factory, controller should only deal with the UI
	$scope.currentPage = 0;   
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
      //           $scope.jobResults = response.data
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

    $scope.get_next_num_pages = function(num = 10){
        while(num > 0){
            num-=1;
            if (Object.keys($scope.jobResults).length) {

                jobsService.next_page($scope.jobResults,$location.search($scope.formData).search()).
                    then(function success(res){
                        if (res.status == 500 || !res.data) {
                            return 
                        }else{
                          jobsService.paginateJobs($scope.jobResults,res.data);
                          $scope.pageNumbers = Object.keys($scope.jobResults);
                        }
                        
                    },function error(res){
                    
                    })
            }
        }
    }


    $scope.search = function(){
// Remove search results for every new search
        $scope.jobResults = {}
        
        jobsService.requestJobs($location.search($scope.formData).search()).
        then(function success(response){
            $scope.jobResults = jobsService.paginateJobs($scope.jobResults,response.data)
            $scope.get_next_num_pages();
            $scope.pageNumbers = Object.keys($scope.jobResults);
        },
            function error(response){

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

    // $scope.$watchCollection('jobResults', function (newValue, oldValue,scope) {
    //     // if (newValue && newValue.length == 0) {
    //     //     newValue = oldValue;
    //     // }
    //     // else{
    //         
    //         scope.jobResults = jobsService.paginateJobs(newValue); 
    //     // }
    // });


    $scope.pageChange = function(num,clickEvent){
        $scope.currentPage = num;
        window.scrollTo(200,0);
    }
});