// Should set up filters and values for searching
angular.module('Degree_Not_Required')
.controller('homeCtrl', function($scope,jobsService,$location,$httpParamSerializer) {
	
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
        let qs = $httpParamSerializer($scope.formData)
        $scope.formData.query = $scope.formData.query.toLowerCase();
        $location.url("/jobs");
    }


});