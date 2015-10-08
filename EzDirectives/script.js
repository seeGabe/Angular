var app = angular.module('app',[]);
app.directive('messages', function(){

   function MessagesController() {
      var self = this;
        self.list = [
            {text : 'Greetings'},
            {text : 'yaarrr'},
            {text : '$#!8801337'}
          ];
    
          self.clear = function() {
            self.list = [];
          };

          self.add = function() {
            self.list = [
              {text : 'Greetings'},
              {text : 'yaarrr'},
              {text : '$#!8801337'}
            ]; 
          };
        }

  return {
    scope : {}, // {} = isolate, true = child, false/undefined = no change
    controller : MessagesController,
    controllerAs : 'messages',
    template : [
      '<ul>',
        '<li ng-repeat="message in messages.list">',
          '{{ message.text }}',
        '</li>',
        '<button ng-click="messages.clear()">Clear</button>',
        '<button ng-click="messages.add()">Make</button>',
      '</ul>'
    ].join(''),
    bindToController : true
  };
});