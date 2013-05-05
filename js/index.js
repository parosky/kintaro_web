$(function(){
    $.getJSON(ajax_url("user"), {key: login_key}, function(data){
        $("h2").text("ユーザ名: "+data.name);
        $("h3").text("所持金: "+data.money+"円");
    });
});
