var app = angular.module("Degree_Not_Required", 
	['ngResource','ui.router','templates','angularSpinners']);


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
            controller: "resultCtrl"
        })
        .state('show',{
            url: '/jobs/:job',
            controller: "showCtrl",
            templateUrl: 'show/showResult.html'

        })
	 $urlRouterProvider.otherwise('/');


     // $window.addEventListener('load', function(){
     //     $http({
     //             method : "POST",
     //             url    : "api/increment_seeker",
     //             responseType : "json",
     //             headers: {
     //                        "Content-Type": "json",
     //                        "accept"      : "application/json"
     //                      }
     //            });
        
     // })

     // $window.addEventListener('unload', function() {
     //     $http({
     //             method : "POST",
     //             url    : "api/decrement_seeker",
     //             responseType : "json",
     //             headers: {
     //                        "Content-Type": "json",
     //                        "accept"      : "application/json"
     //                      }
     //            });
        
     // });


    // angular.element(document).ready(function () {
    //     debugger
    //     $http({
    //              method : "POST",
    //              url    : "api/increment_seeker",
    //              responseType : "json",
    //              headers: {
    //                         "Content-Type": "json",
    //                         "accept"      : "application/json"
    //                       }
    //             });
    // });        
})

app.run(["$http","$window","Poller", function($http,$window,Poller) {
    $window.addEventListener('visibilitychange', function(){
        if ($window.document.visibilityState === "visible") {
         $http({
                 method : "POST",
                 url    : "/increment_seeker",
                 responseType : "json",
                 headers: {
                            "Content-Type": "json",
                            "accept"      : "application/json"
                          }
                });
        }
        
     });
// Need to insert a check for mobile, because mobile browsers don't decrement
     $window.addEventListener('visibilitychange', function() {
        debugger
        if ($window.document.visibilityState === "hidden" || $window.document.visibilityState === "unloaded") {

         $http({
                 method : "POST",
                 url    : "/decrement_seeker",
                 responseType : "json",
                 headers: {
                            "Content-Type": "json",
                            "accept"      : "application/json"
                          }
                });
        }
        
     });
}]);






