// Should set up filters and values for searching
angular.module('Degree_Not_Required')
.controller('homeCtrl',["$scope","jobsFactory", function($scope,jobsFactory) {
	jobsFactory = new jobsFactory();
	$scope.formData = {}
    $scope.search = function(){
    	jobsFactory.getJobs($scope.formData)
    }
    
}]);