var tasksApp = angular.module('Tasks', []);

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
  
  controller.createTask = function() {
    if($scope.task !== {}) {
      $scope.task.createdTime = new Date();
      $scope.task.markedAsDone = false;
      TaskService.saveTask($scope.task);
      controller.updateTaskList();
    }
  };
  
}]);