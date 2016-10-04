angular.module("Degree_Not_Required")
	.directive("dnrArrowPress", function($window){
		return{
			restrict: 'AE',
			scope: false,
			link: function(scope, element,attrs){
				angular.element($window).on("keydown", function(event){
					switch(event.which){
						case 37: // left
						break;

						case 38: //up
						break;

						case 39: //right
						let nextResults = (parseInt(scope.currentPage) + 1).toString();
								debugger
							if (scope.currentJob === scope.jobResults[scope.currentPage].length-1 && scope.jobResults[nextResults]) {
								scope.currentPage = nextResults;
							}
							else{
								scope.currentJob+=1;
								scope.$apply();
							}
						break;
						case 40: //down
						break;

						default: return;
					}
				});	
			}
		};
})