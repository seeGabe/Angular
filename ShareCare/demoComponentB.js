(function(angular){

	angular.module('membertaker',['ShareService'])
	
	.controller('MTComponent', ['$scope','ShareFactory','$timeout',
			function($scope,ShareFactory,$timeout){

				/*
				 * We can either wait for the service by predicting the return lag
				 */
				$timeout(function(){
					$scope.dataload = function(){ return window.sharingServices.getDummyData() };
				},400)

				/*
				 * Or we can initiate the digest loop by way of NG-CLICK
				 */
				$scope.check = function(){
							$scope.datataker = window.sharingServices.getDummyData();
              console.log(window.sharingServices);
				}
        /*
         * Lastly, we can initiate another digest loop using a $watch-er
         */
				$scope.$watch(function(){
					return window.sharingServices.getDummyData();
				}, function	(newValue, oldValue){
					console.log('ha');
					$scope.datawatcher = newValue;
				})

		}])

	.directive('membertaker',[function(){
		return {
			restrict: 'E',
			template: '	<div class="row">\
										<h2>Just Listening</h2>\
										<div class="col-md-12">dataload():{{dataload()}}</div>\
										<br />\
										<div class="col-md-12"><button ng-click="check();">Grab Data</button></div>\
										<br />\
										<div class="col-md-12">datataker:{{datataker}}</div>\
										<br />\
										<div class="col-md-12">datawatcher:{{datawatcher}}</div>\
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