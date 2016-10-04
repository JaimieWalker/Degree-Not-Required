angular.module('Degree_Not_Required')
.controller('showCtrl', function($scope,$rootScope,$sce,jobsService) {
	$scope.jobResults = jobsService.getJobResults();
	$scope.currentPage = localStorage.getItem("currentPage");
	$scope.currentJob = parseInt(localStorage.getItem("currentJob"));
	$scope.job = $scope.jobResults[$scope.currentPage][$scope.currentJob];
	
	$scope.trustAsHtml = function(html) {
      return $sce.trustAsHtml(html);
    }
    

});