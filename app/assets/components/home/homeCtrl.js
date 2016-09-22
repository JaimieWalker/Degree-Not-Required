// Should set up filters and values for searching
angular.module('Degree_Not_Required')
.controller('homeCtrl', function($scope,jobsService,$location,$httpParamSerializer) {
	
	$scope.formData = {
		"query" : sessionStorage.getItem("query") == "undefined"?"":sessionStorage.getItem("query"),
         "location" : localStorage.getItem("location")?localStorage.getItem("location"):""
	}   
// Need to refactor and abstract
    $scope.saveSessionQuery = function(){  
        if (sessionStorage.getItem("undefined") === "undefined") {
    	   sessionStorage.query = "";
        }
        else{
            sessionStorage.setItem("query",$scope.formData.query);
        }
    }
    $scope.saveLocalLocation = function(){
        localStorage.setItem("location",$scope.formData.location);
    }
    
    $scope.search = function(){
        let qs = $httpParamSerializer($scope.formData)
        $scope.formData.query = $scope.formData.query.toLowerCase();
        $location.url("/jobs?" + qs);
    }


});