$(function(){
            
    $.getJSON(ajax_url('ranking'), {section: "assets"}, function(data){
        for (var i=0;i<data.length;i++){
            dom = $("<tr><th>"+data[i].rank+"</th><td>"+data[i].user.name+"</td><td>"+price_int_to_str(data[i].comment)+"</td></tr>");
            $("#table-assets tbody").append(dom);
        }
        $("#table-assets").show();
    });

    $.getJSON(ajax_url('ranking'), {section: "money"}, function(data){
        for (var i=0;i<data.length;i++){
            dom = $("<tr><th>"+data[i].rank+"</th><td>"+data[i].user.name+"</td><td>"+price_int_to_str(data[i].comment)+"</td></tr>");
            $("#table-money tbody").append(dom);
        }
        $("#table-money").show();
    });

    $.getJSON(ajax_url('ranking'), {section: "highprice"}, function(data){
        for (var i=0;i<data.length;i++){
            dom = $("<tr><th>"+data[i].rank+"</th><td>"+data[i].place.name+"</td><td>"+data[i].station.name+"</td><td>"+price_int_to_str(data[i].comment)+"</td></tr>");
            $("#table-highprice tbody").append(dom);
        }
        $("#table-highprice").show();
    });

    $.getJSON(ajax_url('ranking'), {section: "highmargin"}, function(data){
        for (var i=0;i<data.length;i++){
            dom = $("<tr><th>"+data[i].rank+"</th><td>"+data[i].place.name+"</td><td>"+data[i].station.name+"</td><td>"+data[i].comment+"%</td></tr>");
            $("#table-highmargin tbody").append(dom);
        }
        $("#table-highmargin").show();
    });

});
