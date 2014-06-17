'use strict';

/* Services */

var myAppServices = angular.module('myAppServices', []);

myAppServices.factory('bundleServices',['$q',function($q){

	var setUp=false;
	var reloadFlag=0;
	var db;
		
	function init(){
		var deferred = $q.defer();

		if(setUp){
			deferred.resolve(true);
			return deferred.promise;
		}
		console.log("Opening IDB")
		var openRequest = window.indexedDB.open("indexeddb_angular",4);
	
		openRequest.onerror = function(e) {
			console.log("Error opening db");
			console.dir(e);
			deferred.reject(e.toString());
		};

		openRequest.onupgradeneeded = function(e){
			var thisDb = e.target.result;
			var store;
			console.log("Checking ObjStore...");
			//Create Note OS
			if(!thisDb.objectStoreNames.contains("note")){
				store = thisDb.createObjectStore("note", {keyPath:"id", autoIncrement:true});
				console.log("New ObjStore created.");
			}
		};

		openRequest.onsuccess = function(e) {
			console.log("IDB ready.");
			db = e.target.result;
			
			db.onerror = function(event) {
				// Generic error handler for all errors targeted at this database's
				// requests!
				deferred.reject("Database error: " + event.target.errorCode);
			};
	
			setUp=true;
			deferred.resolve(true);
		};
		return deferred.promise;
	}
	
	function saveNote(masterNote){
		//Should this call init() too? maybe
		var deferred = $q.defer();
		// check if this is an existing record
		if(!note.id) note.id = "";
		var tx = db.transaction(["note"], "readwrite");
		// add NEW record or put new data in EXISTING record
        if(note.id === ""){
            tx.objectStore("note")
                            .add({name:note.name,body:note.body,updated:new Date()});
        } else {
            tx.objectStore("note")
                            .put({name:note.name,body:note.body,updated:new Date(),id:Number(note.id)});
        }
		tx.oncomplete = function(event){
			console.log(note.name+" was written.");
			deferred.resolve();
		};

		return deferred.promise;
	};
	
	function getNote(key){
		var deferred = $q.defer();
		init().then(function(){
			// start the transaction process
			var tx = db.transaction(["note"]);  
			var store = tx.objectStore("note");  
			var request = store.get(key);  
			
			console.log("getting note.");
			request.onsuccess = function() {  
				var note = request.result;
				console.log("binding the data.");
				deferred.resolve(note);
			}; 
		});
		return deferred.promise;
	};
	
	function getNotes(){
		var deferred = $q.defer();
		
		init().then(function(){
			var notes = [];
			var grabNotes  = function(e){
				var cursor = e.target.result;
		
				if(cursor){
					notes.push(cursor.value);
					cursor.continue();
				}
			};
			// start the transaction process
			var tx = db.transaction(["note"],"readonly");
			var store = tx.objectStore("note");
			
			store.openCursor().onsuccess = grabNotes;
			// when completed pass the info along
			tx.oncomplete = function(e){
				console.log("Currently: "+ notes);
				deferred.resolve(notes);
			};
		});
		return deferred.promise;
	};
	
	function delNote(key){
		var deferred = $q.defer();
		init().then(function(){
			console.log("attempting to delete");
			// start the transaction process
			var tx = db.transaction(["note"],"readwrite");  
			var store = tx.objectStore("note");  
			var request = store.delete(key);  
			
			tx.oncomplete = function(e){
				console.log("deleted record #"+key+".");
				deferred.resolve();
			};
		});
		return deferred.promise;
	};
	
	function sync(){
		var deferred = $q.defer();
		reloadFlag++;
		deferred.resolve(reloadFlag);
		return deferred.promise;
	};
	
	return{
		getNote:getNote,
		getNotes:getNotes,
		saveNote:saveNote,
		delNote:delNote,
		sync:sync,
	};
}]);