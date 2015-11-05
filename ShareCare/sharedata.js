(function(angular){

	angular.module('ShareService',[])
		.factory('ShareFactory',[function(){

			var dataObj = {
				inputfilter:{
					primary:3,
					supplemental:6
				},
				dummydata:{
					members:{},
					names:{}
				}
			};

			return dataObj;
	           
		}])
		.factory('DataFactory',['$http','ShareFactory', function($http,ShareFactory){

			// var inputfilter = ShareFactory.getInputCounts();
			// var prime = inputfilter.primary;
			// var supple = inputfilter.supplemental;

			var getMembers = function(count){
				$http.jsonp('http://www.filltext.com/?rows='+count+'&id={index}&fname={firstName}&lname={lastName}&address={addressObject}&callback=JSON_CALLBACK')
				.success(function(data){
					ShareFactory.dummydata.members = data;
					// console.log('Primaries'+ JSON.stringify(data));
				});
			};

			// getMembers(prime);

			var getNames = function(count){
				$http.jsonp('http://www.filltext.com/?rows='+count+'&id={index}&fname={firstName}&callback=JSON_CALLBACK')
				.success(function(data){
					ShareFactory.dummydata.names = data;
					// console.log('Supplementals'+ JSON.stringify(data));
				});
			};

			// getNames(supple);

			return{
				getMembers:getMembers,
				getNames:getNames
			};
		}])
		
})(window.angular);