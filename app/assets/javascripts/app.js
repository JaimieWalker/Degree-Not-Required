var app = angular.module("Degree_Not_Required", 
	['ngResource','ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.
		otherwise("/",{
			templateUrl: "../templates/home.html",
			controller: "homeCtrl"
		})
})