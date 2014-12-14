//将socket封装成angular的服务 每次与服务端通信后 根据数据变化 更新视图
angular.module('cloudChatApp').factory('socket',function($rootScope){
	var socket = io.connect('/');
	return {
		//监听
		on : function(eventName, callback){
			socket.on(eventName, function(){
				var args = arguments;
				$rootScope.$apply(function(){
					callback.apply(socket, args);
				});
			});
		},
		//推送
		emit : function(eventName, data, callback){
			socket.emit(eventName, data, function(){
				var args = arguments;
				$rootScope.$apply(function(){
					if(callback){
						callback.apply(socket, args);
					}
				});
			});
		}
	};
});