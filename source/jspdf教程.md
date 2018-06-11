![](http://op2clp53n.bkt.clouddn.com/20161104122758_cap-hpi.jpg)

jsPDF 是一个基于 HTML5 的客户端解决方案,用于生成各种用途的 PDF 文档。

<!--more-->
# 前言
前两天做了一个在线制作问卷的网页，需要将设计好的问卷下载下拉，想到pdf格式比较稳定，就使用了jsPDF来生成文档，安利一下网页的地址：http://mvpzx.top/online/qnaire/index.html

# 引入依赖脚本
原理上需要先把需要保存的节点渲染到一个canvas，然后利用这个canvas制作pdf，所以先引入以下两个依赖代码文件：
```
<script src="https://cdn.bootcss.com/html2canvas/0.5.0-beta4/html2canvas.js"></script>
<script src="https://cdn.bootcss.com/jspdf/1.3.4/jspdf.debug.js"></script>
```
# 编写所需代码
假设所需要打印的dom的父容器的class名是`right-aside`，就可以写这样一个函数：

```
function () {
  var target = document.getElementsByClassName("right-aside")[0];
  target.style.background = "#FFFFFF";

  html2canvas(target, {
    onrendered:function(canvas) {
        var contentWidth = canvas.width;
        var contentHeight = canvas.height;

        //一页pdf显示html页面生成的canvas高度;
        var pageHeight = contentWidth / 592.28 * 841.89;
        //未生成pdf的html页面高度
        var leftHeight = contentHeight;
        //页面偏移
        var position = 0;
        //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        var imgWidth = 595.28;
        var imgHeight = 592.28/contentWidth * contentHeight;

        var pageData = canvas.toDataURL('image/jpeg', 1.0);

        var pdf = new jsPDF('', 'pt', 'a4');

        //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        //当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
        pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
        } else {
            while(leftHeight > 0) {
                pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                leftHeight -= pageHeight;
                position -= 841.89;
                //避免添加空白页
                if(leftHeight > 0) {
                  pdf.addPage();
                }
            }
        }

        pdf.save("content.pdf");
    }
  })
}
```
以上代码将会以a4纸的尺寸来生成pdf文件，可以分页，代码来自于网络！

# 坑点提示

> jsPDF打印成pdf文件时，注意页面要回到打印区域的顶部，我在该demo设置了先回到页面顶部，再打印，这样就不会出现黑块了。

<br>

> jsPDF打印成pdf文件时，注意设置打印区域dom的背景色为白色，即`#FFFFFF`。


