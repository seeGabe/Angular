(function(angular){

	angular.module('membertaker',['ShareService'])
	
	.controller('MTComponent', ['$scope','ShareFactory','DataFactory',
			function($scope,ShareFactory,DataFactory){
	
				$scope.datataker = ShareFactory.dummydata;
	
				console.log('CALL MADE -- current requests are for: '+ JSON.stringify($scope.datataker) +' data sets');

			}])

	.directive('membertaker',[function(){
		return {
			restrict: 'E',
			template: '	<div class="row">\
							<h1>Just Listening</h1>\
							{{datataker}}\
						</div>\
						<hr />',
			scope: true
		}
		}])

	
	$('membertaker') //tag <app4>
		.each(function(index, elem){
			//wraps the element up
			var wrapper = angular.element(elem).wrap('<div ng-controller="MTComponent"></div>').parent()

			//them bootstrap the app with the wrapper as the root
			angular.bootstrap(wrapper, ['membertaker'])
		})
})(window.angular);