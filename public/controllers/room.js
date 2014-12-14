//定义RoomCtrl控制器 用于显示消息
angular.module('cloudChatApp').controller('RoomCtrl', function($scope, socket){
	$scope.messages = [];//定义这个控制器的数据模型 与ng-model绑定
	socket.emit('getAllMessages');
	//监听查询全部消息
	socket.on('allMessage', function(messages){
		$scope.messages = messages;
	});
	//监听添加消息
	socket.on('messageAdded',function(message){
		$scope.messages.push(message);//添加到数据模型里面
	});
});