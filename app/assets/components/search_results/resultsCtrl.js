angular.module('Degree_Not_Required')
.controller('resultCtrl', function($scope,$rootScope,$location,jobsService,$sce,$httpParamSerializer,$state) {
 //    $scope.pageNumbers = [0,1,2,3,4,5,6,7,8,9,10];
 //    $scope.numsToDisplay = $scope.pageNumbers.slice($scope.currentPage,$scope.currentPage+5);
   
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
            $scope.search();
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
                          jobsService.setJobResults(jobsService.paginateJobs($scope.jobResults,res.data));
                          $scope.jobResults = jobsService.getJobResults();
                          $scope.pageNumbers = Object.keys($scope.jobResults);
                        }
                        
                    },function error(res){
                    
                    })
            }
        }
    }


    $scope.search = function(){
// Remove search results for every new search        
        jobsService.requestJobs($location.search($scope.formData).search()).
        then(function success(response){
            jobsService.setJobResults(jobsService.paginateJobs({},response.data))
            $scope.jobResults = jobsService.getJobResults();
            // $scope.get_next_num_pages();
            $scope.pageNumbers = Object.keys($scope.jobResults);
            arrayOf5();
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


    $scope.pageChange = function(num,clickEvent){
        $scope.currentPage = num;
        arrayOf5()
        document.getElementById("#SR").scrollIntoView();
    }
    
    // Helper method, keeps the array at a length of 5. Need to refactor for better UX 
    function arrayOf5(){
        let val = $scope.pageNumbers.indexOf($scope.currentPage);
        let test = $scope.pageNumbers.slice($scope.currentPage,$scope.currentPage+5)
        if (test.length == 5) {
            $scope.numsToDisplay = test;
        } 
    }

    $scope.prev = function(){ 
        if ($scope.currentPage != 0) {
            $scope.currentPage -= 1;
        }
        arrayOf5()
    }

    $scope.next = function(){
        if ($scope.currentPage != $scope.pageNumbers[$scope.pageNumbers.length-1]) {
            $scope.currentPage += 1;
        } else{
            $scope.get_next_num_pages(5);
        }
        arrayOf5();
    }

    $scope.getJobResults = function(){
        return jobsService.getJobResults();
    }
// Need To refactor, ratchet code
    $scope.showJob = function($event,$index){

        $rootScope.currentPage = $scope.currentPage
        $rootScope.jobResults = jobsService.getJobResults();
        $rootScope.currentJob = $index;
    } 
});