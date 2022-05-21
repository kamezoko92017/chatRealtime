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

    //Lang nghe su kien nguoi dung nhan dang ky
    socket.on("client-send-username",(data)=>{
        if(mangUsers.indexOf(data)>=0){
            //dang ky that bai
            socket.emit("server-send-dangky-thatbai")
        }else{
            //dang ky thanh cong
            mangUsers.push(data);

            //Tao them thuoc tinh Username cho moi socket
            socket.Username=data;

            socket.emit("server-send-dangky-thanhcong",data);

            //Server phat emit cho tat ca cac client cap nhat lai danh sach user dang online
            io.sockets.emit("server-send-danhsach-user",mangUsers);
        }
    })

    //Lang nghe su kien có client logout
    socket.on("logout",()=>{
        mangUsers.splice(
            mangUsers.indexOf(socket.Username),1
        );

        socket.broadcast.emit("server-send-danhsach-user",mangUsers);
    })

    //Lang nghe su kien có client send message
    socket.on("user-send-message",(data)=>{
        io.sockets.emit("server-send-message",{un:socket.Username, nd:data});
    })

    //Lang nghe su kien có client đang gõ chữ
    socket.on("toi-dang-go-chu",()=>{
        var s=socket.Username+ " dang go chu";
        io.sockets.emit("ai-do-dang-go-chu",s);
    })
})

app.get("/",(req,res)=>{
    res.render("trangchu");
})