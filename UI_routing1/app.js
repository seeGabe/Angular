var routesApp = angular.module('routesApp', ['ui.router','ui.bootstrap']);

routesApp.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise("/home");
  $stateProvider
      // home state and nested view 
  .state('home', {
    url: '/home',
    templateUrl: 'partial-home.html'
  })
      // about page and named view
  .state('home.list', {
    url:'/list',
    templateUrl:'partial-home-list.html',
    controller:function($scope){
      $scope.dogs=['Bernese','Pitbull','Husky'];
    }
  })

  .state('home.paragraph',{
    url:'/paragraph',
    template:'Jelly-o brownie chocolate candy canes. Cheesecake jelly-o sugar plum lollipop candy canes sweet cupcake croissant marzipan. Sweet roll marzipan topping donut.'
  })

  .state('about',{
    url:'/about',
    views:{
      // main template (name is relative)
      '':{templateUrl:'partial-about.html'},
      // child view (name is absolute)
      'columnOne@about':{template:'Here is Col 1.<br />Can also be markup.'},
      // another child view with a separate controller
      'columnTwo@about':{
        templateUrl:'table-data.html',
        controller:'scotchCtrl'
      }
    }
  });
}]);  // closes app.config()

routesApp.controller('scotchCtrl',function($scope){
  $scope.message='test';
  $scope.scotches=[
    {
      name:'Macallan 15',
      price:75
    },
    {
      name:'Glenfiddich 1937',
      price:20000
    },
    {
      name:'Chivas Regal Royal Salute',
      price:10000
    }
  ];
});

routesApp.controller('ModalDemoCtrl',function($scope,$modal,$log){

  $scope.items=['X','Y','Z'];
  $scope.open=function(){

    var modalInstance=$modal.open({
      templateUrl:'myModalContent.html',
      controller:ModalInstanceCtrl,
      resolve:{
        items:function(){
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function(selectedItem){
      $scope.selected=selectedItem;
    },function(){
      $log.info('modal dismissed at: '+new Date());
    });
  };
});

// $modalInstance repepresents the modal window dependency
// this is not the same as the $modal service above
// Strange...does this not work because of some sort of $scoping issue?
// ... or is it something with type of factory/service/provider mismatch? 

// routesApp.controller('ModalInstanceCtrl',function($scope,$modalInstance,items){
//   $scope.items=items;
//   $scope.selected={
//     item:$scope.items[0]
//   };
//   $scope.ok=function(){
//     $modalInstance.close($scope.selected.item);
//   };
//   $scope.cancel=function(){
//     $modalInstance.dismiss('cancel');
//   };
// });

var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};