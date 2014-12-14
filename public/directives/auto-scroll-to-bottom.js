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