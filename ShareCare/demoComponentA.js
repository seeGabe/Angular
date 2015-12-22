(function(angular){

	angular.module('membermaker',['ShareService'])
	
	.controller('MMComponent', ['$scope','ShareFactory','DataFactory',
			function($scope,ShareFactory,DataFactory){
				/*
				 * when this controller gets intialized
				 * the code from "DATAFACTORY" is run
				 * this loads the model in "SHAREFACTORY"
				 * allowing us to then consume it globally
				 */
				var inputfilter = window.sharingServices.getInputCount();
				var dump = function(){ return window.sharingServices.getDummyData() };
				$scope.dummydata = dump();

				$scope.load = function(){
					DataFactory.getNames(inputfilter.numberOfNames);
				}
			}])

	.directive('membermaker',[function(){
		return {
			restrict: 'E',
			template: '	<div class="row">\
										<h2>Calling and Listening</h2>\
										<button ng-click="load();">Make New Names</button>\
										<table class="table">\
											<tbody>\
												<tr ng-repeat="name in dummydata.names">\
													<td>{{name.fname}}</td>\
												</tr>\
											</tbody>\
										</table>\
									</div>',
			scope: true
		}
		}])

	
	$('membermaker') // finds element tag <componentX>
		.each(function(index, elem){
			// wraps the element with its controller
			var wrapper = angular.element(elem).wrap('<div ng-controller="MMComponent"></div>').parent()
			// then bootstrap the app with the wrapper as the root
			angular.bootstrap(wrapper, ['membermaker'])
		})
})(window.angular);