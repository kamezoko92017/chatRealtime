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

$(document).ready(()=>{
    $("#loginForm").show();
    $("#chatForm").hide();

    //Khách hàng nhấn nút đăng ký
    $("#btnRegister").click(()=>{
        socket.emit("client-send-username",$("#txtUsername").val())
    });

    //Khách hàng nhấn nút logout
    $("#btnLogout").click(()=>{
        socket.emit("logout");
        $("#chatForm").hide(2);
        $("#loginForm").show(1);
    });

    //Khách hàng nhấn nút Send Message
    $("#btnSendMessage").click(()=>{
        socket.emit("user-send-message",$("#txtMessage").val());
    });

    //Khách hàng đang nhập vào ô chat
    $("#txtMessage").focusin(()=>{
        socket.emit("toi-dang-go-chu");
    });

    //Khách hàng STOP nhập vào ô chat
    $("#txtMessage").focusout(()=>{
        socket.emit("toi-stop-go-chu");
    });
});