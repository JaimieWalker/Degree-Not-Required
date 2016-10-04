angular.module("Degree_Not_Required")
	.directive("dnrArrowPress", function($window,$location){
		return{
			restrict: 'AE',
			link: function(scope, element,attrs){				
				angular.element($window).bind("keydown", function(event){
					switch(event.which){
						case 37: // left
						 let previousResult = (parseInt(scope.currentPage) - 1).toString();
							if (scope.currentJob === scope.jobResults[scope.currentPage][0] && scope.jobResults[previousResult]) {
									scope.currentPage = previousResult;
									scope.job = scope.jobResults[scope.currentPage][0];
								}
							else if(scope.currentJob === 0 && scope.currentPage === "0"){
								// Do nothing
							}
							else{
								scope.currentJob-=1
								scope.job = scope.jobResults[scope.currentPage][scope.currentJob];
							}
								scope.$apply();
						break;

						case 38: //up
						break;

						case 39: //right
						let nextPage = (parseInt(scope.currentPage) + 1).toString();
							if (scope.currentJob === scope.jobResults[scope.currentPage].length-1 && scope.jobResults[nextPage]) {
								scope.currentPage = nextPage;
								scope.job = scope.jobResults[scope.currentPage][0];
							} //If the current job is the last in the list, and there are no more results get the next 2 pages
							else if(scope.currentJob === scope.jobResults[scope.currentPage].length-1 && !scope.jobResults[nextPage]){
								scope.get_next_num_pages(2);
								//Do nothing
							}//If there is no next page and there are no more results, because a page can have maybe 4 or 12 results, get the next results
							else if(!scope.jobResults[nextPage] && !scope.jobResults[scope.currentPage][scope.currentJob+1]){
								scope.get_next_num_pages(2);
							}
							else{
								scope.currentJob+=1
								scope.job = scope.jobResults[scope.currentPage][scope.currentJob];
							}
								scope.$apply();
						break;

						case 40: //down
						break;

						default: return;
					}
				});	
			}
		};
})