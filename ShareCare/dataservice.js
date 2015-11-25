(function(angular){

	angular.module('ShareService',[])
		.factory('ShareFactory',['$rootScope','$window',function($rootScope,$window){

			var dataObj = {
				inputfilter:{
					numberOfNames:6
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
				getInputCount:  function(){
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
				setDummyDataNames: function(data){
					dataObj.dummydata.names = data;
				},
				dataObj: dataObj
      }

      return $window.sharingServices;   
		}])
		.factory('DataFactory',['$http','ShareFactory', function($http,ShareFactory){

			var inputfilter = ShareFactory.getInputCount();
			var countOfNames = inputfilter.numberOfNames;

			var getNames = function(count){
				$http.jsonp('http://www.filltext.com/?rows='+count+'&id={index}&fname={firstName}&callback=JSON_CALLBACK')
				.success(function(data){
					ShareFactory.setDummyDataNames(data);
					console.log('SUCCESS:: DataFactory.getNames service'+ JSON.stringify(data));
				}).error(function(err){
					console.log('FAIL:: DataFactory.getNames service'+ err);
				});
			};

			getNames(countOfNames);

			return{
				getNames:getNames
			};
		}])

})(window.angular);