angular.module("Degree_Not_Required")
    .directive("dnrSearchForm", function(){
    	
    	return{
    		restrict: "EA",
    		scope: false,
    		// Because javascripts is in the asset pipeline, it must be referenced by angular/directives/file
    		templateUrl: "angular/directives/dnrSearchForm.html"
    	};
    });