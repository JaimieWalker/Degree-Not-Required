var app = angular.module("Degree_Not_Required", 
	['ngResource','ui.router']);

app.config(function($stateProvider, $urlRouterProvider,$locationProvider){
	$locationProvider.html5Mode(true);
	$urlRouterProvider.
		otherwise("/",{
			controller: "homeCtrl"
		})
		
})