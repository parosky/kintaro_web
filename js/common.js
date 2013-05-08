login_key_default = 'guest_login_key';
login_key = login_key_default;

$(function(){
    $("#menu-logout").click(click_logout);
});

function click_logout(){
    if (login_key == login_key_default){
        show_dialog("エラー", "ゲストユーザはログアウトできません。", "OK", 0);  
    }else{
        show_dialog('logout', 'yoroshi?', ['hai', 'iie'], 1);
    }
}

function price_int_to_str(price_int){
    if (price_int < 0) return "未計算";
    var price_str = "";
    var strs = ["万", "億", "兆", "京", "垓"];
    for (var i=strs.length-1;i>=0;i--){
        var base = Math.pow(10000, (i+1));
        console.log(base);
        if (price_int >= base){
            var p = Math.floor(price_int / base);
            console.log(p,strs[i]);
            if (price_str.length ==0){
                price_str = p + strs[i]
            }else{
                price_str += ("000" + p).slice(-4) + strs[i];
            }
            price_int -= base*p;
        }
    }
    price_str += "円";
    return price_str;
}

function ajax_url(func) {
    var hostname = location.hostname;
    if (hostname.length == 0) hostname = "localhost";
    return "http://"+hostname+":8765/"+func;
}

function show_dialog(title, message, buttons, primary_num, callbacks){
    var str = '<div class="modal hide fade" id="modal-ok"><div class="modal-header"><h3>{title}</h3></div><div class="modal-body"><p>{message}</p></div><div class="modal-footer"></div></div>';
    str = str.replace("{title}", title).replace("{message}", message);
    var dom = $(str);
    if (typeof(buttons) == "string"){
        var newbutton = $('<a href="#" class="btn" data-dismiss="modal"></a>');
        newbutton.text(buttons);
        if (primary_num == 0) newbutton.addClass('btn-primary');
        if (callbacks) newbutton.click(callbacks);
        $(dom).find(".modal-footer").append(newbutton)
    }else{
        for (var i=0;i<buttons.length;i++){
            var newbutton = $('<a href="#" class="btn" data-dismiss="modal"></a>');
            newbutton.text(buttons[i]);
            if (primary_num == i) newbutton.addClass('btn-primary');
            if (callbacks && callbacks[i]) newbutton.click(callbacks[i]);
            $(dom).find(".modal-footer").append(newbutton)
        }
    }
    dom.modal('show');
}
