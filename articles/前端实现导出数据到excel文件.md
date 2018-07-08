![](http://ownsprds9.bkt.clouddn.com/excel-2.png)

# 前端实现导出数据到excel文件

## 网页中的实现方式
1. 引入所需的依赖文件
```
<script src="https://cdn.bootcss.com/FileSaver.js/2014-11-29/FileSaver.min.js"></script>
<script src="https://cdn.bootcss.com/xlsx/0.11.3/xlsx.full.min.js"></script>
```

2. `s2ab`函数
```
function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
    };
    return buf;
}
```

3. 所需要的数据结构
```
[
    ["列A", "列B"], // 这将作为excel文件的标题
    [1,2]
]
```

4. 一个例子
```
let data = [
    ["列A", "列B"],
    [3,4]
];

let wopts = { bookType:'xlsx', type:'binary' };
let fileName = "bill.xlsx";

const ws = XLSX.utils.aoa_to_sheet(data);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

const wbout = XLSX.write(wb, wopts);
saveAs(new Blob([s2ab(wbout)]), fileName); // 保存为文件
```

[戳我看demo](http://mvpzx.top/fe-export-xlsx/index.html)<br>

## 混合开发中的实现方式
以`ionic`框架为例。
1. 安装并引入依赖
```
import { File } from '@ionic-native/file';
import * as XLSX from 'xlsx';
```
这里不再使用`FileSaver.js`，转而使用`@ionic-native/file`以将文件存储到移动设备中。

2. 一个例子
```
import { File } from '@ionic-native/file';
import * as XLSX from 'xlsx';


constructor(private file: File) {

}

/**
 * 将数据导出为.xlsx文件
 * 依赖：File、XLSX
 */
exportBill():void {
    function s2ab(s: string): ArrayBuffer {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i !== s.length; ++i) {
            view[i] = s.charCodeAt(i) & 0xFF;
        };
        return buf;
    }

    let data = [[1,2],[3,4]];
    let wopts: XLSX.WritingOptions = { bookType:'xlsx', type:'binary' };
    let fileName: string = "bill.xlsx";

    const ws = XLSX.utils.aoa_to_sheet(data);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const wbout = XLSX.write(wb, wopts);
    console.log(wbout);

    /**
     * 保存到文件
     */
    let blob = new Blob([s2ab(wbout)]);
    let pathFile = '';
    if (this.plarform.is('ios')) {
        pathFile = this.file.documentsDirectory;
    }
    else {
        pathFile = this.file.externalDataDirectory;
    }

    this.file.writeFile(pathFile, 'bill.xlsx', blob, { replace: true })
        .then((success) => {
            console.log(success);
        }, (err) => {
            alert(err);
        });
}

```
