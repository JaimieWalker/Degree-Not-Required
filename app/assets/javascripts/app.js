var app = angular.module("Degree_Not_Required", 
	['ngResource','ui.router','templates']);

app.config(function($stateProvider, $urlRouterProvider,$locationProvider){
	$locationProvider.html5Mode(true);
	
	$stateProvider
        .state('home', {
            url: '/',
            controller: 'homeCtrl'
        });
		
})