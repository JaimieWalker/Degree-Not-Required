angular.module('Degree_Not_Required')
.controller('showCtrl', function($scope,$rootScope,$sce,jobsService,$location,$window, spinnerService,Poller) {
	$scope.jobResults = jobsService.getJobResults();
	$scope.currentPage = localStorage.getItem("currentPage");
	$scope.currentJob = parseInt(localStorage.getItem("currentJob"));
	$scope.job = $scope.jobResults[$scope.currentPage][$scope.currentJob];
	$scope.job_seekers = Poller.job_seekers;

	$scope.trustAsHtml = function(html) {
      return $sce.trustAsHtml(html);
    }

    $scope.prev = function(){ 
		if ($scope.currentJob === $scope.jobResults[$scope.currentPage][0] && $scope.jobResults[previousResult]) {
			$scope.currentPage = previousResult;
			$scope.job = $scope.jobResults[$scope.currentPage][0];
		}
		else if($scope.currentJob === 0 && $scope.currentPage === "0"){
			// Do nothing
		}
		else{
			$scope.currentJob-=1
			$scope.job = $scope.jobResults[$scope.currentPage][$scope.currentJob];
		}
    }

    $scope.next = function(){
        var nextPage = (parseInt($scope.currentPage) + 1).toString();
            if ($scope.currentJob === $scope.jobResults[$scope.currentPage].length-1 && $scope.jobResults[nextPage]) {
                $scope.currentPage = nextPage;
                $scope.currentJob = 0;
                $scope.job = $scope.jobResults[$scope.currentPage][$scope.currentJob];
             } //If the current job is the last in the list, and there are no more results get the next 2 pages
            else if($scope.currentJob === $scope.jobResults[$scope.currentPage].length-1 && (!$scope.jobResults[nextPage] || !$scope.jobResults[$scope.currentJob+1])){
                $scope.get_next_num_pages(1);
              //Do nothing
            }//If I am on the current page and there are no more results, because a page can have maybe 4 or 12 results, get the next results
            else{
                $scope.currentJob+=1
                $scope.job = $scope.jobResults[$scope.currentPage][$scope.currentJob];
            }
            
    }

$scope.get_next_num_pages = function(num){
    var num = (typeof num !== 'undefined') ?  num : 1;

    spinnerService.show('show_spinner');
       var params = {"query":localStorage.getItem("query"),"location":localStorage.getItem("location")}
        while(num > 0){
            num-=1;
            if (Object.keys($scope.jobResults).length) {

                jobsService.next_page($scope.jobResults,params).
                    then(function success(res){
                        if (res.status == 500 || !res.data) {
                            return 
                        }else{
                          jobsService.setJobResults(jobsService.paginateJobs($scope.jobResults,res.data));
                          $scope.jobResults = jobsService.getJobResults();
                          $scope.pageNumbers = Object.keys($scope.jobResults);
                        }
                        
                    },function error(res){
                    
                    }).finally(function(){
                        spinnerService.hide('show_spinner');
                    })
            }
        }
    }

    // $scope.changeUrl = function(){
    // 	
    // 	$location.path("jobs/"+ $scope.job.jobkey).replace();
    // 	$window.history.pushState(null,$scope.job.jobtitle,$location.absUrl());
    // }


});