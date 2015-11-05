(function(angular){

	angular.module('membermaker',['ShareService'])
	
	.controller('MMComponent', ['$scope','ShareFactory','DataFactory',
			function($scope,ShareFactory,DataFactory){
	
				$scope.inputfilter = ShareFactory.inputfilter;
				$scope.dummydata = ShareFactory.dummydata;
	
				console.log('CALL MADE -- current requests are for: '+ JSON.stringify($scope.inputfilter) +' data sets');

				DataFactory.getMembers(ShareFactory.inputfilter.primary);
				DataFactory.getNames(ShareFactory.inputfilter.supplemental);
	
			}])

	.directive('membermaker',[function(){
		return {
			restrict: 'E',
			template: '	<div class="row">\
							<h1>Calling and Listening</h1>\
							<h2>Primary Members</h2>\
							<table class="table">\
								<thead>\
									<tr><th>Last Name</th><th>First Name</th><th>Address</th><th>ZIP</th></tr>\
								</thead>\
								<tbody>\
									<tr ng-repeat="person in dummydata.members">\
										<td>{{person.lname}}</td>\
										<td>{{person.fname}}</td>\
										<td>{{person.address.streetAddress}}</td>\
										<td>{{person.address.zip}}</td>\
									</tr>\
								</tbody>\
							</table>\
							<h2>More Names</h2>\
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

	
	$('membermaker') //tag <app4>
		.each(function(index, elem){
			//wraps the element up
			var wrapper = angular.element(elem).wrap('<div ng-controller="MMComponent"></div>').parent()

			//them bootstrap the app with the wrapper as the root
			angular.bootstrap(wrapper, ['membermaker'])
		})
})(window.angular);