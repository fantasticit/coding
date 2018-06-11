![](http://op2clp53n.bkt.clouddn.com/eyetech-01.jpg)

# 前端上传图片预览
此文将介绍两种方法来实现前端上传图片预览。

## 方法1：FileReader
- `FileReader`对象允许Web应用程序异步读取存储在计算机上的文件（或原始数据缓冲区）的内容，使用`File`或`Blob`对象指定要读取的文件。其中File对象可以是来自用户在一个`<input>`元素上选择文件返回的`FileList`对象，也可以来自拖放操作生成的`DataTransfer`对象，还可以是来自一个`HTMLCanvasElement`上执行`mozGetAsFile()`方法后返回结果。

* demo示例：
```
var oFileReader = new FileReader(); // 创建一个FileReader对象
var rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i; // 验证图片的正则
var oPreview = document.getElementsByClassName('img-thumbnail')[0]; // 预览图
var oUpload = document.getElementsByClassName('file-upload')[0]; // 图片上传

oFileReader.onload = function (event) {
    oPreview.src = event.target.result; // 替换预览图的src
}

oUpload.onchange = function loadImgFile() {
    var oFile = oUpload.files[0];

    if (!rFilter.test(oFile.type)) {
        alert('必须上传图片文件！');
    }

    if (window.FileReader) {
        /*
        读取指定的Blob对象或File对象中的内容。
        当读取操作完成时，会自动尝试去调用onloadend事件。
        同时，result属性将包含一个data:URL表示读取的文件的内容。
         */
        oFileReader.readAsDataURL(oFile);
    } else if (navigator.appName === 'Microsoft Internet Explorer') { // IE浏览器
        // IE10以下版本不支持FileReader()构造函数，利用滤镜兼容旧版本的IE
        oPreview.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)';
        oPreview.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = oUpload.value;
    }
}

```
[戳我看demo](http://mvpzx.top/fe-image-upload-preview/filereader.html)。<br>
如果想对`FileReader`了解更多，[请点此链接](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader)。

## 方法2：URL.createObjectURL(blob)
`URL.createObjectURL(blob)`静态方法会创建一个`DOMString`，其中包含一个表示参数中给出的对象的URL。这个URL的生命周期和创建它的窗口中的`document`绑定。这个新的URL 对象表示指定的 File 对象或 Blob 对象。

* demo示例：
```
var rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
var oPreview = document.getElementsByClassName('img-thumbnail')[0]; // 预览图
var oUpload = document.getElementsByClassName('file-upload')[0]; // 图片上传

/**
 * 获取dataURL
 */
function createObjectURL(blob) {
    return window[window.webkitURL ? 'webkitURL' : 'URL']['createObjectURL'](blob);
}

oUpload.onchange = function () {
    var oFile = oUpload.files[0];

    if (!rFilter.test(oFile.type)) {
        alert('必须上传图片文件！');
    }

    var imgDataURL;
    if (navigator.appName === '') {
        // IE10以下版本不支持FileReader()构造函数，利用滤镜兼容旧版本的IE
        imgDataURL = oUpload.value;

        oPreview.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)';
        oPreview.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgDataURL;
    } else {
        imgDataURL = createObjectURL(oFile);
        oPreview.src = imgDataURL;
    }
}
```
[戳我看demo](http://mvpzx.top/fe-image-upload-preview/createobjecturl.html)。<br>

如果想对`Object.createObjectURL()`了解更多，[请点此链接](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL)。
