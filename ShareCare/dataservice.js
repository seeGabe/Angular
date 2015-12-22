(function(angular){

	angular.module('ShareService',[])
		.factory('ShareFactory',['$rootScope',function($rootScope){

			var dataObj = {
				inputfilter:{
					numberOfNames:6
				},
				dummydata:{
					names:{}
				}
			};

			// window.rootScopes = window.rootScopes || [];
			// window.rootScopes.push($rootScope);

			if(!!window.sharingServices){
				return window.sharingServices;
			}

			window.sharingServices = {
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

      return window.sharingServices;   
		}])

		.service('DataService',['$http','$q', function($http,$q){

			var baseUrl = 'http://www.filltext.com/?rows=';
			var endUrl = '&fname={firstName}&callback=JSON_CALLBACK';

			this.getNames = function(count){
        var defferred = $q.defer();
				$http
        .jsonp( baseUrl + count + endUrl )
				.success(function(data){
					defferred.resolve(data);
				}).error(function(err){
					deferred.reject('I am Error');
				});
        return defferred.promise;
			};
		}]);

})(window.angular);