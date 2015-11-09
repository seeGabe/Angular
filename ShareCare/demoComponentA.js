(function(angular){

	angular.module('membermaker',['ShareService'])
	
	.controller('MMComponent', ['$scope','ShareFactory','DataFactory',
			function($scope,ShareFactory,DataFactory){
<<<<<<< HEAD
				var inputfilter = ShareFactory.getInputCounts();
				// $scope.inputfilter = ShareFactory.inputfilter;
				// $scope.dummydata = ShareFactory.dummydata;
				var dump = function(){ return ShareFactory.getDummyData() };
				$scope.dummydata = dump();
				// console.log('CALL MADE -- current requests are for: '+ JSON.stringify($scope.inputfilter) +' data sets');

				// DataFactory.getMembers(inputfilter.primary);
				// DataFactory.getNames(inputfilter.supplemental);
	
=======
				var dump = function(){ return ShareFactory.getDummyData() };
				$scope.dummydata = dump();
>>>>>>> refs/remotes/origin/ShareCareSplit
			}])

	.directive('membermaker',[function(){
		return {
			restrict: 'E',
			template: '	<div class="row">\
							<h2>Calling and Listening</h2>\
							<h3>Names</h3>\
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

	
	$('membermaker') //element tag <componentX>
		.each(function(index, elem){
			//wraps the element up
			var wrapper = angular.element(elem).wrap('<div ng-controller="MMComponent"></div>').parent()

			//them bootstrap the app with the wrapper as the root
			angular.bootstrap(wrapper, ['membermaker'])
		})
})(window.angular);