//声明模块 与ng-app相绑定
angular.module('cloudChatApp',[]);
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
/* 自定义angular指令 */
//auto-scroll-to-bottom 当消息过多的时候 出现滚动条 并且自动滚到底部
angular.module('cloudChatApp').directive('autoScrollToBottom', function(){
	return {
		link : function(scope, element, attrs){
			scope.$watch(function(){
				return element.children().length;
			},function(){
				element.animate({
					scrollTop : element.prop('scrollHeight')
				}, 1000);
			});
		}
	};
});
//ctrl-enter-break-line ctrl+enter换行 enter发送
angular.module('cloudChatApp').directive('ctrlEnterBreakLine', function(){
	return function(scope, element, attrs){
		var ctrlDown = false;
		element.bind('keydown', function(evt){
			if(evt.which === 17){
				ctrlDown = true;
				setTimeout(function(){
					ctrlDown = false;
				},1000);
			}
			if(evt.which === 13){
				if(ctrlDown){
					element.val(element.val()+'\n');
				}else{
					scope.$apply(function(){
						scope.$eval(attrs.ctrlEnterBreakLine);
					});
					evt.preventDefault();
				}
			}
		});
	};
});
