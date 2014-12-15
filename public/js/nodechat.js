//声明模块 与ng-app相绑定 声明依赖［路由］
angular.module('cloudChatApp',['ngRoute']);
run(function($window, $rootScope, $http, $location){//启动
	$http({
		url : '/api/validate',
		method : 'GET'
	}).success(function(user){
		$rootScope.me = user;
		$location.path('/');
	}).error(function(data){
		$location.path('/login');
	});
});
