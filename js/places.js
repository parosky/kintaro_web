var station = null;
$(function(){
    $.getJSON(ajax_url("places_from_user"), {key: login_key}, function(data){
        var places = data;
        console.log(places);
        for (var i=0;i<places.length;i++) {
            var place = places[i];
            var price = price_int_to_str(place.price);
            var owner = "";
            var dom = $("<tr><td>"+place.station.company+"</td><td>"+place.station.line+"</td><td>"+place.station.name+"</td><td><img src=\""+place.icon+"\" class=\"place-icon\">"+place.name+"</td><td>"+price+"</td><td>"+place.margin+"%</td></tr>");
            $($("#places-table tbody")[0]).append(dom);
        }
        $("#places-table").show();
    });
});
