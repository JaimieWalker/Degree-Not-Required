// Should set up filters and values for searching
angular.module('Degree_Not_Required')
.controller('homeCtrl', function($http,$scope,jobsService,$location,$httpParamSerializer,Poller) {
   debugger
    $scope.job_seekers = Poller.job_seekers;
	$scope.formData = {
		"query" : localStorage.getItem("query") == "undefined" || localStorage.getItem("query") == "null" ?"":localStorage.getItem("query"),
         "location" : localStorage.getItem("location")?localStorage.getItem("location"):""
	}   
// Need to refactor and abstract
    $scope.saveSessionQuery = function(){  
        if (localStorage.getItem("query") === "undefined") {
    	   localStorage.query = "";
        }
        else{
            localStorage.setItem("query",$scope.formData.query);
        }
    }
    $scope.saveLocalLocation = function(){
        localStorage.setItem("location",$scope.formData.location);
    }
    
    $scope.search = function(){
        // let qs = $httpParamSerializer($scope.formData)
        $scope.formData.query = $scope.formData.query.toLowerCase();
        $location.url("/jobs");
    }


});