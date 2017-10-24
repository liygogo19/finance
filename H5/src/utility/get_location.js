/**
 * Created by liyang on 2017/5/2.
 */
import widgets_tools from 'utility/widgets_tools.js'

function Rad(d){
    return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
}

function GetDistance(lat1,lng1,lat2,lng2){

    var radLat1 = Rad(lat1);
    var radLat2 = Rad(lat2);
    var a = radLat1 - radLat2;
    var  b = Rad(lng1) - Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
            Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s *6378.137 ;// EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000; //输出为公里
    //s=s.toFixed(4);
    return s;
}


var get_location = function ($vue) {
    var longitude,latitude;
    console.log('sds');
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            function (position) {
                console.log(11);
                longitude = position.coords.longitude;
                latitude = position.coords.latitude;
                if(localStorage.longitude&&localStorage.latitude){
                    var long1 = localStorage.longitude;
                    var lat1 = localStorage.latitude;

                    var s = GetDistance(Number(lat1),Number(long1),latitude,longitude);
                    var time = localStorage.surrounding_community_time ;
                    var t = widgets_tools.result_isvalid(time,24);
                    if(Math.round(s)<5 && t){
                        $vue.refresh_token = false;
                    }
                    else {
                        $vue.refresh_token = true;
                        $vue.longitude = longitude;
                        $vue.latitude = latitude;
                    }

                    return;
                }
                else {
                    $vue.refresh_token = true;
                    localStorage.longitude = longitude;
                    localStorage.latitude = latitude;
                    $vue.longitude = longitude;
                    $vue.latitude = latitude;
                    return;
                }
            },
            function (e) {
                console.log(e,'can not get')
            },
            {
                timeout:60000,
                maximumAge:600000,
            });
    }
}

module.exports=get_location;