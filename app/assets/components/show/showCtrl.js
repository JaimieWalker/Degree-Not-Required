angular.module('Degree_Not_Required')
.controller('showCtrl', function($scope,$rootScope) {
	$scope.jobResults = $rootScope.jobResults;
	$scope.currentPage = $rootScope.currentPage;
	$scope.currentJob = $rootScope.currentJob;
	
	$scope.job = $scope.jobResults[$scope.currentPage][$scope.currentJob];

});