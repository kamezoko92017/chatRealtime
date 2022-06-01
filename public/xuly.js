var socket=io("http://localhost:3000");

//Khach hang nhan phan hoi tu server khi dang ky that bai
socket.on("server-send-dangky-thatbai",()=>{
    alert('co nguoi dang ky roi');
})

//Khach hang lang nghe server phat emit khi dang ky thanh cong
socket.on("server-send-dangky-thanhcong",(data)=>{
    $("#currentUser").html(data);

    //Show form chat va hide form login
    $("#loginForm").hide(2000);
    $("#chatForm").show(1000);
})

//Khach hang lang nghe server phat emit de cap nhat lai danh sach user dang online
socket.on("server-send-danhsach-user",(data)=>{
    $("#boxContent").html("");
    data.forEach((i)=>{
        $("#boxContent").append("<div class='user'>" + i + "</div>");
    })
})

//Client lang nghe server phat emit: server-send-message
socket.on("server-send-message",(data)=>{
    $("#listMessages").append("<div class='ms'>"+data.un+": "+data.nd+"</div>");
})

//Client lang nghe server phat emit: ai-do-dang-go-chu
socket.on("ai-do-dang-go-chu",(data)=>{
    $("#thongbao").html("<img width='20px' src='typing-icon.png'>"+data);
})

//Client lắng nghe khi server phát emit: server-send-rooms
socket.on("server-send-rooms",(data)=>{
    $("#dsRoom").html("");
    
    data.map((r)=>{
        $("#dsRoom").append("<h4 class='room' >"+r+"</h4>");
    });
    
})

//Client lắng nghe khi server phát emit: server-send-room-socket
socket.on("server-send-room-socket",(data)=>{
    $("#tenRoom").html(data);
    
})

//Client lắng nghe khi server phát emit: server-chat
socket.on("server-chat",(data)=>{
    $("#txtContentChat").append("<div class='ms'>"+data.un+": "+data.nd+"</div>");
    
})

$(document).ready(()=>{

    //Tạo chat room
    $("#btnTaoRoom").click(()=>{
        socket.emit("tao-room",$("#txtRoom").val());
    });

    //User chat
    $("#btnChat").click(()=>{
        socket.emit("user-chat",$("#txtMessage").val());
    });
});