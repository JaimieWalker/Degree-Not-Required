angular.module('Degree_Not_Required')
.controller('resultCtrl', function(spinnerService,$scope,$rootScope,$location,jobsService,$sce,$httpParamSerializer,$state, Poller) {
 //    $scope.pageNumbers = [0,1,2,3,4,5,6,7,8,9,10];
 //    $scope.numsToDisplay = $scope.pageNumbers.slice($scope.currentPage,$scope.currentPage+5);
   
    // Need to refactor $scope.init and $scope.search to make it DRYER
    // Need to also move business logic into the factory, controller should only deal with the UI
    $scope.job_seekers = Poller.job_seekers;
    $scope.currentPage = 0; 

    $scope.init = function () {
            $scope.formData = {
                "query" : localStorage.getItem("query"),
                "location" : localStorage.getItem("location")
            }
        // If it is not empty, request jobs
            if (localStorage.getItem("query") === $scope.formData.query && localStorage.getItem("location") === $scope.formData.location) {
                $scope.jobResults = jobsService.getJobResults(); 
                $scope.search();        
        }
        else{
            $scope.formData = {
                "query" : localStorage.getItem("query") == "undefined" || localStorage.getItem("query") == "null" ?"":localStorage.getItem("query"),
                "location" : localStorage.getItem("location")
             }
        }
    };

// Need to abstract
    $scope.get_next_num_pages = function(num = 5){
             $scope.disableButtons("hidden","none");
             spinnerService.show("results_spinner");
       let qs = $httpParamSerializer($scope.formData)
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
                          if ($scope.pageNumbers.length <= 2) {
                            $scope.disableButtons("hidden","none");
                            spinnerService.show("results_spinner")
                            $scope.get_next_num_pages(1);
                          }
                        }
                        
                    },function error(res){
                    
                    }).finally(function(){
                        $scope.disableButtons("visible","initial");
                        spinnerService.hide("results_spinner");
                    })
            }
        }
    }

    // Helper method, keeps the array at a length of 5. Need to refactor for better UX 
    // function arrayOf5(){
    //     let val = $scope.pageNumbers.indexOf($scope.currentPage);
    //     let test = $scope.pageNumbers.slice($scope.currentPage,$scope.currentPage+5)
    //     if (test.length == 5) {
    //         $scope.numsToDisplay = test;
    //     } 
    // }
    $scope.disableButtons = function(visibility,display){
        let buttons = document.getElementsByTagName("button");
        for (let i = 0; i < buttons.length; i++) {
                buttons[i].style.visibility = visibility;
                buttons[i].style.display = display;  
        }

    }

    $scope.search = function(){
        $scope.disableButtons("hidden","none");
// Remove search results for every new search
    if ((localStorage.getItem("query") != $scope.formData.query && localStorage.getItem("location") != $scope.formData.location)) {
            $scope.jobResults = {}  
    }
    spinnerService.show('results_spinner');
        jobsService.requestJobs($scope.formData).
        then(function success(response){
            jobsService.setJobResults(jobsService.paginateJobs({},response.data))
            $scope.jobResults = jobsService.getJobResults();
            $scope.get_next_num_pages(1);
            $scope.pageNumbers = Object.keys($scope.jobResults);
            // arrayOf5();
        },
            function error(response){
                alert("something broke");
            }).finally(function(){
                // let qs = $httpParamSerializer($scope.formData)
                // $location.path().replace()
                if (Object.keys($scope.jobResults).length <= 2) {}
                    $scope.disableButtons("hidden","none");
                    spinnerService.show('results_spinner');
            })
        ;
        // $scope.formData.query = $scope.formData.query.toLowerCase();
    }

     $scope.trustAsHtml = function(html) {
      return $sce.trustAsHtml(html);
    }

    $scope.saveSessionQuery = function(){
        localStorage.setItem("query",$scope.formData.query);
    }
   
    $scope.saveLocalLocation = function(){
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