$(function(){
        
$.getJSON(ajax_url('get_from_board'), function(data){
    for (var i=0;i<data.length;i++){
        dom = $("<tr><td>"+data[i].id+"</td><td>"+data[i].user.name+"</td><td>"+data[i].date+"</td><td>"+data[i].message+"</td></tr>");
        $("#board-table tbody").append(dom);
    }
    $("#board-table").show();
});

$("#post-form").submit(function(){
    message = $("#post-form input")[0].value;
    $.getJSON(ajax_url('post_to_board'), {message: message, key: login_key}, function(data){
        if (data['status'] == "ok"){
            show_dialog("掲示板", "投稿しました。", "OK", 0, function(){location.href="";});
        }
    }, function(data){
    
    });
    return false; 
    
})


});
