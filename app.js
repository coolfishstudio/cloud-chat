var express = require('express');
var app = express();
var port = 9203;
//静态文件存放位置
app.use(express.static(__dirname + '/public'));
//启动页面 路由存放在浏览器端
app.use(function(req, res){
	res.sendfile('./public/index.html');
});
//往服务器端添加socket
var io = require('socket.io').listen(app.listen(port));
//消息临时存放处
var messages = [];
//监听链接事件
io.sockets.on('connection', function(socket){
	//查询所有消息事件
	socket.on('getAllMessages', function(){
		//推送所有的消息
		console.log('-messages:',messages);
		socket.emit('allMessage', messages);
	});
	//添加新消息事件
	socket.on('createMessage', function(message){
		console.log('-message:',message);
		//添加新消息到临时存放处
		messages.push(message);
		//推送新消息
		io.sockets.emit('messageAdded', message);
	});
});


console.log('cloud-chat is on port ' + port + '!');