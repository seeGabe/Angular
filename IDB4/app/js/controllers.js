'use strict';

/* Controllers */

var myAppControllers = angular.module('myAppControllers', []);

myAppControllers.controller('MyCtrl1', ['$scope','bundleServices',function($scope,bundleServices) {
	
	$scope.masterNote={};
	$scope.reloadFlag=0;
	
	function getNotes(){
		bundleServices.getNotes().then(function(notes){
			$scope.notes = notes;
		});
	};
	
	$scope.$watch('reloadFlag',function(n,o){
		console.log('watching');
		if(n!=o){			
			console.log('reloading');
			getNotes();
		};
	});
	
	$scope.sync = function(){
		bundleServices.sync().then(function(reloadFlag){
			$scope.reloadFlag = reloadFlag;
		});
	};
	$scope.makeMaster = function(note){
		$scope.masterNote = angular.copy(note);
	};

	$scope.saveNote = function(){
		var note = {};
		note.id = $scope.key;
		note.name = $scope.name;
		note.body = $scope.body;
		bundleServices.saveNote(note).then(function(){
			getNotes();
		});
	};

	$scope.getOne = function(key){
		bundleServices.getNote(key).then(function(note){
			$scope.note = note;
		});
	};
	
	$scope.delNote = function(key){
		bundleServices.delNote(key).then(function(){
			getNotes();
		});
	};

	$scope.isUnchanged = function(note) {
		return angular.equals(note, $scope.master);
	};

  }]);