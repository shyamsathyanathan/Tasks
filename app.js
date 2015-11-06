var tasksApp = angular.module('TasksApp', ['LocalStorageModule']);

tasksApp.config(function(localStorageServiceProvider) {
  localStorageServiceProvider
  .setPrefix('tasks-app')
  .setStorageType('localStorage')
  .setNotify(true, true);
});

tasksApp.factory('TaskService', ['localStorageService', function(localStorageService) {
  
  var service = {};
  
  service.getTasksList = function() {
    return localStorageService.get('tasks');
  };
  
  service.saveTask = function(task) {
    var existingTasks = service.getTasksList();
    if(existingTasks) {
      existingTasks.push(task);
      localStorageService.set('tasks', existingTasks);
    } else {
      var newTaskList = [];
      newTaskList.push(task);
      localStorageService.set('tasks', newTaskList);
    }
  };
  
  service.removeTask = function(taskPosition) {
    var tasksList = service.getTasksList();
    
    taskList = taskList.splice(taskPosition, 1);
    
    localStorageService.set('tasks', taskList);
  };
  
  return service;
  
}]);

tasksApp.controller('MainCtrl', ['$scope', 'TaskService', function($scope, TaskService) {
  
  var controller = this;
  
  $scope.task = {};
  
  controller.updateTaskList = function() {
    $scope.tasks = TaskService.getTasksList() || [];
  };
  
  $scope.createTask = function() {
    if($scope.task !== {}) {
      $scope.task.createdTime = new Date();
      $scope.task.markedAsDone = false;
      TaskService.saveTask($scope.task);
      controller.updateTaskList();
    }
  };
  
  controller.updateTaskList();
  
}]);