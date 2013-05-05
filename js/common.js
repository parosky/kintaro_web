login_key = 'guest_login_key';

function price_int_to_str(price_int){
    var price_str = "";
    if (price_int > 100000000) {
        price_str = Math.floor(price_int / 100000000) + "億";
        price_str += ("0" + price_int % 100000000 / 10000).slice(-4) + "万円";
    }else if (price_int < 0){
        price_str = "未計算";
    }else{
        price_str = price_int % 100000000 / 10000 + "万円";
    }
    return price_str;
}

function ajax_url(func) {
    var hostname = location.hostname;
    if (hostname.length == 0) hostname = "localhost";
    return "http://"+hostname+":8765/"+func;
}

function show_ok_dialog(title, message, callback) {
    $('#modal-ok-title').text(title);
    $('#modal-ok-message').html(message);
    if (callback) $('#modal-ok').on('hidden', callback);
    $('#modal-ok').modal('show');
}
