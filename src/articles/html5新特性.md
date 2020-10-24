![](http://op2clp53n.bkt.clouddn.com/201707021498972344595880b8898b2.jpg)

HTML5 是 HTML 标准的最新演进版本.它是同时包含了一系列可以被用来让 Web 站点和应用更加多样化，功能更强大的技术。

<!--more-->
#  HTML5 音频
在audio标签内使用source引入不同格式音频已保证各浏览器均能播放。
```
<audio>
    <source src="example.mp3">
    <source src="example.ogg">
</audio>
```
# HTML5 视频
同audio标签，可以使用ffmpeg去转格式。
```
<video>
    <source src="example.mp4">
    <source src="example.ogg">
</video>
```
# HTML5 拖放
请看以下demo:
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>HTML5拖动</title>
    <style>
        #div1 {
            width: 300px;
            height: 300px;
            border: 1px solid red;
        }

        #div2 {
            width: 100px;
            height: 100px;

            background: orange;
        }
    </style>
</head>
<body>
    <p>拖动图片</p>
    <div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
    <div id="div2" draddable="true" ondragstart="drag(event)"></div>
    <script>
        function allowDrop(ev) {
            ev.preventDefault();
        }

        function drag(ev) {
            ev.dataTransfer.setData("Text", ev.target.id);
        }

        function drop(ev) {
            ev.preventDefault();
            var data = ev.dataTransfer.getData("Text");
            ev.target.appendChild(document.getElementById(data));
        }
    </script>
</body>
</html>
```
# HTML5 画布
画布是一个矩形区域，可以控制其每一个像素。canvas拥有多种绘制路径、矩形、圆形、字符及添加图像的方法。

## 绘制矩形
```
<canvas id="canvas"></canvas>
<script>
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");

    //指定画笔的颜色
    ctx.fillStyle = "#ff0000";

    //绘制一个100*100的矩形
    ctx.fillRect(0, 0, 100, 100);
</script>
```
## 绘制圆形
```
<canvas id="canvas"></canvas>
<script>
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");

    //指定画笔的颜色
    ctx.fillStyle = "#ff0000";

    //绘制圆形
    //开始路径
    ctx.beginPath();
    ctx.arc(70, 18, 15, 0, Math.PI*2, true);
    //关闭路径
    ctx.closePath();
    //进行渲染
    ctx.fill();
</script>
```
## 绘制图片
```
<canvas id="canvas"></canvas>
<script>
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");

    //绘制图片
    var img = new Image();
    //当图片加载后再进行绘制！！！
    img.onload = function () {
        ctx.drawImage(img, 0, 0);
    }
    //指定图片路径
    img.src = "images/ex.jpg";
</script>
```
# HTML5 SVG
- SVG 指可伸缩矢量图形 (Scalable Vector Graphics)
- SVG 用来定义用于网络的基于矢量的图形
- SVG 使用 XML 格式定义图形
- SVG 图像在放大或改变尺寸的情况下其图形质量不会有所损失
- SVG 是万维网联盟的标准

可以在HTML中使用svg标签来创建图像：
```
<svg width="100%" height="100%" viewBox="0 0 400 400"
     xmlns="http://www.w3.org/2000/svg">
    <path d="M 100 100 L 300 100 L 200 300 z"
        fill="orange" stroke="black" stroke-width="3" />
</svg>
```

推荐使用引入文件的方式来使用svg，例如：
```
<img src="ex.svg" alt="">
```

# HTML5 地理定位
HTML5 Geolocation API 用于获得用户的地理位置。请看以下demo，可能需要科学上网：
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>定位</title>
    <style>
        #map {
            width: 800px;
            height: 600px;
        }
    </style>
</head>
<!-- 页面加载时进行定位 -->
<body onload="init()">
    <div id="map"></div>
    <!-- 引入谷歌地图api -->
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
    <!-- 编写相关代码 -->
    <script>
        function init() {
            //获取用户位置然后执行回调函数
            navigator.geolocation.getCurrentPosition(function (position) {
                var coords = position.coords;
                //设定地图参数，将用户的经纬度设为地图中心点
                var latLng = new google.maps.LatLng(coords.latitude, coords.longitude);
                //设定个性化参数
                var myOptions = {
                    zoom: 14, //缩放级别
                    center: latLng, //中心点
                    mapType: google.maps.MapTypeId.ROADMAP
                }
                //创建地图并在“map” div中显示
                var myMap = new google.maps.Map(document.getElementById("map"), myOptions);
                //在地图上创建标记
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: myMap
                });
                //设定信息窗口及信息文字
                var infoWindow = new google.maps.InfoWindow({
                    content: "您当前位置："
                });
                infoWindow.open(myMap, marker);
            });
        }
    </script>
</body>
</html>
```
# HTML5 Web存储
HTML5 提供了两种在客户端存储数据的新方法：
    - localStorage - 没有时间限制的数据存储
    - sessionStorage - 针对一个session的数据存储（窗口一关闭，数据就删除 ）
由于cooki不适合大量数据的存储，而且cookie由每个对服务器的请求来传递，使得cookie速度很慢效率也不高。

## localStorage
```
<textarea name="" id="ta" cols="30" rows="10"></textarea>
<button id="btn">保存</button>
<script>
    var ta = document.getElementById("ta"),
        btn = document.getElementById("btn");

    btn.addEventListener("click", function () {
        if (localStorage.text) {
            alert(localStorage.text);
        } else {
            localStorage.text = ta.value;
        }
    }, false);
</script>
```
## sessionStorage
```
<span id="count"></span>
<br>
<button id="btn">Add</button>
<script>
    var ta = document.getElementById("count"),
        btn = document.getElementById("btn"),

        num = 0;

    btn.addEventListener("click", function () {
        if (sessionStorage.num) {
            num = sessionStorage.num;
        }

        num++;

        sessionStorage.num = num;
        ta.innerHTML = num;
    }, false);
</script>
```
