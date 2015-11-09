(function(angular){

	angular.module('ShareService',[])
		.factory('ShareFactory',['$rootScope','$window',function($rootScope,$window){

			var dataObj = {
				inputfilter:{
					primary:3,
					supplemental:6
				},
				dummydata:{
					names:{}
				}
			};

			$window.rootScopes = $window.rootScopes || [];
			$window.rootScopes.push($rootScope);

			if(!!$window.sharingServices){
				return $window.sharingServices;
			}

			$window.sharingServices = {
				getInputCounts:  function(){
					// console.log(JSON.stringify(dataObj.inputfilter));
					return dataObj.inputfilter;
				},
				getDummyData: function(){
					// console.log(JSON.stringify(dataObj.dummydata));
					return dataObj.dummydata;
				},
				getAllData: function(){
					// console.log(JSON.stringify(dataObj));
					return dataObj;
				},
				setDummyDataMembers: function(data){
					dataObj.dummydata.members = data;

				},
				setDummyDataNames: function(data){
					dataObj.dummydata.names = data;
				}
	        }

	        return $window.sharingServices;   
		}])
		.factory('DataFactory',['$http','$q','ShareFactory', function($http,$q,ShareFactory){

			var inputfilter = ShareFactory.getInputCounts();
			var prime = inputfilter.primary;
			var supple = inputfilter.supplemental;

			var getNames = function(count){
				$http.jsonp('http://www.filltext.com/?rows='+count+'&id={index}&fname={firstName}&callback=JSON_CALLBACK')
				.success(function(data){
					ShareFactory.setDummyDataNames(data);
					// console.log('Supplementals'+ JSON.stringify(data));
				});
			};

			getNames(supple);

		}])

})(window.angular);