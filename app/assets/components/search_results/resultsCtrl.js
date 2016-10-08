angular.module('Degree_Not_Required')
.controller('resultCtrl', function(spinnerService,$scope,$rootScope,$location,jobsService,$sce,$httpParamSerializer,$state, Poller) {
 //    $scope.pageNumbers = [0,1,2,3,4,5,6,7,8,9,10];
 //    $scope.numsToDisplay = $scope.pageNumbers.slice($scope.currentPage,$scope.currentPage+5);
   
    // Need to refactor $scope.init and $scope.search to make it DRYER
    // Need to also move business logic into the factory, controller should only deal with the UI
    $scope.job_seekers = Poller.job_seekers;
    $scope.currentPage = 0; 
    $scope.differentSearch = function(){
        
        if (sessionStorage.prev_query === localStorage.query && (sessionStorage.prev_location !== localStorage.location)) {
            return true;
        }else if ((sessionStorage.prev_query !== localStorage.query) && (sessionStorage.prev_location === localStorage.location )) {
            return true
        }else if (sessionStorage.prev_query !== localStorage.query) {
            return true;
        }
        else if(sessionStorage.prev_location !== localStorage.location)
            return true
        else {
            return false
        }
    }

    $scope.init = function () {
            $scope.formData = {
                "query" : localStorage.getItem("query"),
                "location" : localStorage.getItem("location")
            }
        // If it is not a different search results and add more
            if (!$scope.differentSearch()) {
                $scope.jobResults = jobsService.getJobResults();
                $scope.pageNumbers = Object.keys($scope.jobResults); 
                $scope.search();                     
            }else{
                $scope.search();
            }
    };

// Need to abstract
        $scope.get_next_num_pages = function(num){
             var num = (typeof num !== 'undefined') ?  num : 5;
             $scope.disableButtons("hidden","none");
             spinnerService.show("results_spinner");
       var qs = $httpParamSerializer($scope.formData)
        while(num > 0){
            num-=1;
            if (Object.keys($scope.jobResults).length || Object.keys($scope.jobResults).length == 0 ) {
                jobsService.next_page($scope.jobResults,qs).
                    then(function success(res){
                        if (res.status == 500 || !res.data) {
                            return 
                        }else{
                          jobsService.setJobResults(jobsService.paginateJobs($scope.jobResults,res.data));
                          $scope.jobResults = jobsService.getJobResults();
                          $scope.pageNumbers = Object.keys($scope.jobResults);
                          if ($scope.pageNumbers.length <= 1 || $scope.jobResults[$scope.currentPage].length < 10) {
                            $scope.disableButtons("hidden","none");
                            spinnerService.show("results_spinner")
                            $scope.get_next_num_pages(1);
                          }
                        }
                        
                    },function error(res){
                    
                    }).finally(function(){
                        // Need to past total results to front end
                        if ($scope.pageNumbers.length > 1 ) {  
                            $scope.disableButtons("visible","initial");
                            spinnerService.hide("results_spinner");
                        }
                    })
            }
        }
    }

    // Helper method, keeps the array at a length of 5. Need to refactor for better UX 
    // function arrayOf5(){
    //     var val = $scope.pageNumbers.indexOf($scope.currentPage);
    //     var test = $scope.pageNumbers.slice($scope.currentPage,$scope.currentPage+5)
    //     if (test.length == 5) {
    //         $scope.numsToDisplay = test;
    //     } 
    // }
    $scope.disableButtons = function(visibility,display){
        var buttons = document.getElementsByTagName("button");
        for (var i = 0; i < buttons.length; i++) {
                buttons[i].style.visibility = visibility;
                buttons[i].style.display = display;  
        }

    }

    $scope.search = function(){
        if ($scope.pageNumbers && $scope.pageNumbers.length > 1) {
        }
        else{
            $scope.disableButtons("hidden","none");         
        }
        if ($scope.differentSearch()) {
            $scope.jobResults = {}
        }
    spinnerService.show('results_spinner');
        jobsService.requestJobs($scope.formData).
        then(function success(response){
            $scope.disableButtons("visible","initial");
            jobsService.setJobResults(jobsService.paginateJobs($scope.jobResults,response.data))
            $scope.jobResults = jobsService.getJobResults();
            $scope.get_next_num_pages(1);
            $scope.pageNumbers = Object.keys($scope.jobResults);
            // arrayOf5();
        },
            function error(response){

            }).finally(function(){
                $scope.disableButtons("visible","initial")
                 spinnerService.hide('results_spinner');
            })
        // .finally(function(){
        //         // var qs = $httpParamSerializer($scope.formData)
        //         // $location.path().replace()
        //         if (Object.keys($scope.jobResults).length <= 2) {

        //         }
        //             $scope.disableButtons("hidden","none");
        //             spinnerService.show('results_spinner');
        //     })
        
        // $scope.formData.query = $scope.formData.query.toLowerCase();
    }

     $scope.trustAsHtml = function(html) {
      return $sce.trustAsHtml(html);
    }

    $scope.saveSessionQuery = function(){
        sessionStorage.setItem("prev_query",localStorage.query);
        localStorage.setItem("query",$scope.formData.query);

    }
   
    $scope.saveLocalLocation = function(){
        sessionStorage.setItem("prev_location",localStorage.location);
        localStorage.setItem("location",$scope.formData.location);
    }


    $scope.pageChange = function(num,clickEvent){
        $scope.currentPage = num;
        // arrayOf5()
        document.getElementById("#SR").scrollIntoView();
    }
    
    

    $scope.prev = function(){ 
        if ($scope.currentPage != 0) {
            $scope.currentPage -= 1;
        }
        // arrayOf5()
    }

    $scope.next = function(){
        if ($scope.currentPage !== parseInt($scope.pageNumbers[$scope.pageNumbers.length-1])) {
            $scope.currentPage += 1;
        } else{
            $scope.get_next_num_pages(1);
        }
        // arrayOf5();
    }

    $scope.getJobResults = function(){
        return jobsService.getJobResults();
    }
// Need To refactor, ratchet code
    $scope.showJob = function($event,$index){
        localStorage.setItem("currentPage",$scope.currentPage);
        localStorage.setItem("currentJob",$index);
    } 
});