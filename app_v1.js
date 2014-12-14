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
//监听链接事件
io.sockets.on('connection', function(socket){
	socket.emit('connected');
});

console.log('cloud-chat is on port ' + port + '!');