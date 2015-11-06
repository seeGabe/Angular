(function(angular){

	angular.module('membertaker',['ShareService'])
	
	.controller('MTComponent', ['$scope','ShareFactory','$timeout',
			function($scope,ShareFactory,$timeout){

				$timeout(function(){

					$scope.dataload = function(){ return ShareFactory.getDummyData() };

				},400)
	
	
				$scope.check = function(){
					
						$scope.datataker = ShareFactory.getDummyData();
				}

				// console.log('CALL MADE -- current requests are for: '+ JSON.stringify($scope.datataker()) +' data sets');

			}])

	.directive('membertaker',[function(){
		return {
			restrict: 'E',
			template: '	<div class="row">\
							<h2>Just Listening</h2>\
							{{dataload()}}\
							<button ng-click="check();">yaa</button>\
							{{datataker}}\
						</div>\
						<hr />',
			scope: true
		}
		}])

	
	$('membertaker') //element tag <componentX>
		.each(function(index, elem){
			//wraps the element up
			var wrapper = angular.element(elem).wrap('<div ng-controller="MTComponent"></div>').parent()

			//them bootstrap the app with the wrapper as the root
			angular.bootstrap(wrapper, ['membertaker'])
		})
})(window.angular);