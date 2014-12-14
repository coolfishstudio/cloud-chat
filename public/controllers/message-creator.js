//定义MessageCreatorCtrl控制器 用于发送消息
angular.module('cloudChatApp').controller('MessageCreatorCtrl', function($scope, socket){
	$scope.newMessage = '';//定义这个控制器的数据模型 与ng-model绑定
	$scope.createMessage = function(){//与ctrl-enter-break-line="createMessage()" 做绑定
		if($scope.newMessage === ''){
			return ;
		}
		socket.emit('createMessage', $scope.newMessage);
		$scope.newMessage = '';//清空内容
	};
});