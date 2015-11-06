(function(angular){

	angular.module('membermaker',['ShareService'])
	
	.controller('MMComponent', ['$scope','ShareFactory','DataFactory',
			function($scope,ShareFactory,DataFactory){

				console.log('CALL MADE -- current requests are for: '+ JSON.stringify(ShareFactory) +' data sets');

			}])

	.directive('membermaker',[function(){
		return {
			restrict: 'E',
			template: '	<div class="row">\
							<h1>Calling and Listening</h1>\
							<h2>Names</h2>\
							<table class="table">\
								<tbody>\
									<tr ng-repeat="name in dummydata.names">\
										<td>{{name.fname}}</td>\
									</tr>\
								</tbody>\
							</table>\
						</div>\
						<hr />',
			scope: true
		}
		}])

	.controller('MTComponent', ['$scope','ShareFactory','DataFactory',
			function($scope,ShareFactory,DataFactory){
	
				$scope.datataker = function(){ return ShareFactory.getDummyData() };
	
				// console.log('CALL MADE -- current requests are for: '+ JSON.stringify($scope.datataker()) +' data sets');

			}])

	.directive('membertaker',[function(){
		return {
			restrict: 'E',
			template: '	<div class="row">\
							<h1>Just Listening</h1>\
							{{datataker()}}\
						</div>\
						<hr />',
			scope: true
		}
		}])
	
	$('membermaker') //element tag <componentX>
		.each(function(index, elem){
			//wraps the element up
			var wrapper = angular.element(elem).wrap('<div ng-controller="MMComponent"></div>').parent()

			//them bootstrap the app with the wrapper as the root
			angular.bootstrap(wrapper, ['membermaker'])
		})

	// $('membertaker') //element tag <componentX>
	// 	.each(function(index, elem){
	// 		//wraps the element up
	// 		var wrapper = angular.element(elem).wrap('<div ng-controller="MTComponent"></div>').parent()

	// 		//them bootstrap the app with the wrapper as the root
	// 		angular.bootstrap(wrapper, ['membertaker'])
	// 	})

})(window.angular);