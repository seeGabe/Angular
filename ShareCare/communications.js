(function(angular){

	angular.module('membertaker',['ShareService'])
	
	.controller('MTComponent', ['$scope','ShareFactory','DataFactory',
			function($scope,ShareFactory,DataFactory){
	
				$scope.check = function(){
					$scope.datataker = ShareFactory.dummydata;
				}
			}])

	.directive('membertaker',[function(){
		return {
			restrict: 'E',
			template: '	<div class="row">\
							<h1>Just Listening</h1>\
							<button ng-click="check();">yaa</button>\
							{{datataker}}\
						</div>\
						<hr />',
			scope: true,
			link: function($scope, elem, attrs){
        		$scope = angular.extend($scope, attrs)
			}
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