var express = require("express");

var app=express();
//Khai bao de quy dinh khach hang truy cap duoc vao public
app.use(express.static("./public"));
app.set("view engine","ejs");
app.set("views","./views");

var server=require("http").Server(app);
var io=require("socket.io")(server);
server.listen(3000);

//Khai bao bien luu danh sach users
var mangUsers=['aaa'];

io.on("connection",(socket)=>{
    console.log("Co nguoi ket noi "+socket.id);

    //Show ra cac room đang có trên server
    // console.log (socket.adapter.rooms);

    //server lắng nghe sự kiện khi user phát ra emit: tao-room
    socket.on("tao-room",(data)=>{
        //Tạo ra room mới có tên là data và cho socket join vào room mới này
        socket.join(data);
        //Tạo thêm thuộc tính Phong cho socket (để sau này biết user đang thuộc room nào)
        socket.Phong=data;
        console.log('danh sach cac room:');
        // console.log(socket.adapter.rooms);

        // //Tạo mảng danh sách các room đang có trên server
        var mang=[];
        // console.log(typeof(socket.adapter.rooms));
        console.log(typeof(mang));
        socket.adapter.rooms.forEach((value,key,map)=>{
            mang.push(key);
        }); 
        
        //server phát emit gửi danh sách các room đang có trên server
        io.sockets.emit("server-send-rooms",mang);

        //server phát emit gửi room hiện có cho socket (user)
        socket.emit("server-send-room-socket",data);
    });

    //server lắng nghe khi user phát ra emit: user-chat
    socket.on("user-chat",data=>{
        io.sockets.in(socket.Phong).emit("server-chat",{un:socket.id, nd:data});
    });
});

app.get("/",(req,res)=>{
    res.render("trangchu");
})