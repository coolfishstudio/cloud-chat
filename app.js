var express = require('express');
var app = express();
var port = 9203;

//静态文件存放位置
app.use(express.static(__dirname + '/client'));

//启动页面 路由存放在浏览器端
app.use(function(req, res){
	res.sendfile('./client/index2.html');
});

//往服务器端添加socket
var io = require('socket.io').listen(app.listen(port));

var users = {};

//监听链接事件
io.sockets.on('connection', function(socket){
	//有人上线
	socket.on('online', function(obj){
		//将上线的用户名存储为 socket 对象的属性，以区分每个 socket 对象，方便后面使用
		socket.name = obj.user;
		//users 对象中不存在该用户名则插入该用户名
		if(!users[obj.user]){
			users[obj.user] = obj.user;
		}
		//向所有用户广播该用户上线信息
		io.sockets.emit('online', {users: users, user: obj.user});
	});
	//有人下线
	socket.on('disconnect', function(){
		//若 users 对象中保存了该用户名
		if(users[socket.name]){
			//从 users 对象中删除该用户名
			delete users[socket.name];
			//向其他所有用户广播该用户下线信息
			socket.broadcast.emit('offline', {users: users, user: socket.name});
		}
	});
	//有人说话

});


console.log('cloud-chat is on port ' + port + '!');