var station = null;
$(function(){

    function click_place_name(event){
        /* show purchase dialog if place_name is clicked */
        var pindex = Math.floor($(event.target).parent().parent().attr('data-place-index'));
        var place = station.places[pindex];
        if (place.price<0){
            show_ok_dialog("エラー", "価格未計算のため購入できません。");
        }else{
            $('#modal-buy-title').text(place.name);
            var price = place.price;
            if (place.owner_id == -1) {
                $('#modal-buy-message').text(price_int_to_str(price)+"で購入が可能です。");
            }else{
                price *= 5;
                $('#modal-buy-message').text(place.owner_name+"さんから"+price_int_to_str(price)+"で購入できます。");
            }
            $('#modal-buy-button-buy').click(function(pid){return function(){click_buy_button(pid)}}(place.id));
            $('#modal-buy-place').modal('show');
        }
    }

    function click_buy_button(pid){
        /* buy a place if "buy" button is clicked */
        $.getJSON(ajax_url("buy"), {pid: pid}, function(data){
            show_ok_dialog("購入完了", data.place.name+'を'+price_int_to_str(data.price)+"で購入しました。", function(){location.href="";});
        });
    }

    function show_places(lat, lng){
        $.getJSON(ajax_url("station_from_location"), {lat: lat, lng: lng}, function(data){
            station = data;
            $($("#h1")[0]).text(data.name+'駅');
            $($("#table-caption")[0]).text(data.company+' '+data.line);
            for (var i=0;i<data.places.length;i++) {
                var place = data.places[i];
                var price = price_int_to_str(place.price);
                var owner = "";
                if (place.owner_name) owner = place.owner_name;
                var dom = $("<tr><td><a class=\"place-row-buy\" href=\"#\"><img src=\""+place.icon+"\" class=\"place-icon\">"+place.name+"</a></td><td>"+price+"</td><td>"+place.margin+"%</td><td>"+owner+"</td></tr>");
                dom.attr('class', "place-row");
                dom.attr("data-place-index", i);
                $($("#station-table tbody")[0]).append(dom);
            }
            $(".place-row-buy").click(click_place_name);
            $($("#station-table")[0]).show();
        });
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(data){    
            var lat = data.coords.latitude;
            var lng = data.coords.longitude;
            show_places(lat, lng);
        }, function(data){
            var lat = 35.630512;
            var lng = 139.778924;
            // "35.657296,140.83374", 34.795762,132.121582
            var lat = 34.795762;
            var lng = 132.121582;
            lat += Math.random()*(35.657296-34.795762);
            lng += Math.random()*(140.83374-132.121582);
            show_ok_dialog("エラー", "位置情報を取得できません: "+data.message + "<br>代わりに ("+lat+", "+lng+") を使用します");
            show_places(lat, lng);
        });
    }else{
        var lat = 35.630512;
        var lng = 139.778924;
        show_ok_dialog("エラー", "位置情報を取得できません: "+data.message + "<br>代わりに ("+lat+", "+lng+") を使用します");
        show_places(lat, lng);
    }
});
