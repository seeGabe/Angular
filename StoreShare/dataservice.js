(function(angular){

	angular.module('ShareService',[])
		.factory('ShareFactory',['$rootScope','$window','$q',function($rootScope,$window,$q){

      var setUp = false;
      var reloadFlag = 0;
      var db;

      function init(){

        var deferred = $q.defer();

        if(setUp){
          deferred.resolve(true);
          return deffered.promise;
        }
        // ELSE -- Make a new one!
        console.log('opening IDB');
        var openRequest = window.indexedDB.open('MyTestDB',2);

        openRequest.onerror = function(event){
          console.log('Error opening DB');
          console.dir(event);
          console.log(event);
          deferred.reject(event.toString());
        };

        openRequest.onupgradeneeded = function(event){
          var thisDB = event.target.result;
          var store;
          console.log('Checking Object Store...');
          // Build an Object Store
          if(!thisDB.objectStoreNames.contains('tableOne')){
            store = thisDB.createObjectStore('tableOne', {keyPath:'id',autoIncrement:true});
            console.log('New Object Store Created')
          }
        };

        openRequest.onsuccess = function(event){
          console.log('IDB ready');
          db = event.target.result;

          db.onerror = function(event){
            deferre.reject('database error: ' + event.target.errorCode)
          };

          setUp = true;
          deferred.resolve(true);
        };

        return deferred.promise;
      }

      function saveData(note){
        var deffered = $q.defer();

        if(!note.id) note.id = '';

        var tx = db.transaction(['tableOne'],'readwrite');

        if(note.id === ''){
          tx.objectStore('tableOne')
            .add({name:note.name, body:note.body, updated:new Date()});
        } else {
          tx.objectStore('tableOne')
            .put({name:note.name, body:note.body, updated:new Date(), id:Number(note.id)});
        }

      };

      function getData(key){};

      init().then(function(){
        console.log('woop');
      });







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