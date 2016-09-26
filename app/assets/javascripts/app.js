var app = angular.module("Degree_Not_Required", 
	['ngResource','ui.router','templates']);
app.config(function($stateProvider, $urlRouterProvider,$locationProvider){
	$locationProvider.html5Mode(true);
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'home/home.html',
            controller: 'homeCtrl'
        })
        .state('results',{
            url: '/jobs',
            templateUrl: 'search_results/results.html',
            controller: 'resultCtrl'

        })
	 $urlRouterProvider.otherwise('/');
		
})