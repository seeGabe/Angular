(function(angular){

	angular.module('membertaker',['ShareService'])
	
	.controller('MTComponent', ['$scope','ShareFactory','$timeout',
			function($scope,ShareFactory,$timeout){

				/*
				 * We can either wait for the service by predicting the return lag
				 */
				$timeout(function(){
					$scope.dataload = function(){ return ShareFactory.getDummyData() };
				},400)

				/*
				 * Or we can initiate the digest loop by way of NG-CLICK (or ..?)
				 */
				$scope.check = function(){
							$scope.datataker = ShareFactory.getDummyData();
				}

			}])

	.directive('membertaker',[function(){
		return {
			restrict: 'E',
			template: '	<div class="row">\
										<h2>Just Listening</h2>\
										{{dataload()}}\
										<br />\
										<button ng-click="check();">Grab Data</button>\
										<br />\
										{{datataker}}\
									</div>',
			scope: true
		}
		}])

	
	$('membertaker') // finds element tag <componentX>
		.each(function(index, elem){
			// wraps the element with its controller
			var wrapper = angular.element(elem).wrap('<div ng-controller="MTComponent"></div>').parent()
			// then bootstraps the app with the wrapper as the root
			angular.bootstrap(wrapper, ['membertaker'])
		})
})(window.angular);