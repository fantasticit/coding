![](http://op2clp53n.bkt.clouddn.com/building_science_bulletin_cover_2__1x.jpg)

node学习笔记：文件上传

<!--more-->

# 基于express+multer的文件上传

## 安装依赖
1. `npm init`（创建package.json文件）
2. `npm install express multer --save`（安装依赖）

## 单文件上传

- app.js
```
let fs = require('fs');
let express = require('express');
let multer = require('multer');

let app = express();

/**
 * 单文件上传
 */
let uploadSingle = multer({
	dest: 'upload-single/'
});

app.post('/upload-single', uploadSingle.single('logo'), (req, res, next) => {
	var file = req.file;
	var fileInfo = {};

	// 获取文件信息
	fileInfo.mimetype = file.mimetype;
	fileInfo.originalname = file.originalname;
	fileInfo.size = file.size;
	fileInfo.path = file.path;

	// 设置响应类型及编码
	res.set({
		'content-type': 'application/json; charset=utf-8'
	});

	res.send(JSON.stringify(fileInfo));
});

/**
 * http服务
 */
app.get('/', (req, res, next) => {
	let form = fs.readFileSync('./index.html', {
		encoding: 'utf8'
	});

	res.send(form);
});

app.listen(3100);
```

- index.html
```
<form action="/upload-single" method="post" enctype="multipart/form-data">
	<h2>单文件上传</h2>
	<div class="form-group">
		<input type="file" name="logo" class="from-control">
	</div>
	<button type="submit" class="btn btn-default">上传</button>
</form>
```

运行`app.js`，访问`http://localhost:3100`，上传文件后可到该文件路径`upload-single`文件下查看上传的文件。

## 多文件上传
将前面的 upload.single('logo') 改成 upload.array('logo', 2) 就行。表示：同时支持2张图片上传，并且 name 属性为 logo。

- app.js
```
let fs = require('fs');
let express = require('express');
let multer = require('multer');

let app = express();


/**
 * 多文件上传
 */
let uploadMulti = multer({
	dest: 'upload-multer/'
});

app.post('/upload-multi', uploadMulti.array('logos', 2), (req, res, next) => {
	var files = req.files;
	var fileInfos = [];

	// 获取文件信息
	for (let i in files) {
		var file = files[i];
		var fileInfo = {};

		fileInfo.mimetype = file.mimetype;
		fileInfo.originalname = file.originalname;
		fileInfo.size = file.size;
		fileInfo.path = file.path;

		fileInfos.push(fileInfo);
	}

	// 设置响应类型及编码
	res.set({
		'content-type': 'application/json; charset=utf-8'
	});
	res.end(JSON.stringify(fileInfos), 'utf8');
});


/**
 * http服务
 */
app.get('/', (req, res, next) => {
	let form = fs.readFileSync('./index.html', {
		encoding: 'utf8'
	});

	res.send(form);
});

app.listen(3100);

```

- index.html
```
<form action="/upload-multi" method="post" enctype="multipart/form-data">
	<h2>多文件上传</h2>
	<div class="form-group">
		<input type="file" name="logos" class="from-control">
	</div>
	<div class="form-group">
		<input type="file" name="logos" class="from-control">
	</div>
	<button type="submit" class="btn btn-default">上传</button>
</form>
```
运行`app.js`，访问`http://localhost:3100`，上传文件后可到该文件路径`upload-multi`文件下查看上传的文件。

## 自定义文件上传路径、名称
### 自定义保存路径
```
let uploadSingle = multer({
	dest: 'upload-single/'
});
```
修改dest配置即可。

### 自定义文件名
multer提供了**storage**来对资源路径、名称进行自定义。
- destination: 设置资源的保存路径，默认/tmp/uploads
- filename: 设置保存的资源的文件名

* app.js
```
let fs = require('fs');
let express = require('express');
let multer = require('multer');

let app = express();

/**
 * 创建文件夹
 */
let createFolder = (folder) => {
	try {
		fs.accessSync(folder);
	}
	catch (e) {
		fs.mkdirSync(folder);
	}
}

let uploadFolder = './upload/';
createFolder(uploadFolder);

/**
 * storage自定义配置（使用filename）
 */
let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadFolder);
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname + '-' + Date.now());
	}
});

// 通过 storage 选项来进行自定义
let upload = multer({
	storage: storage
});

/**
 * 单文件上传
 */
app.post('/upload', upload.single('logo'), (req, res, next) => {
	var file = req.file;
	var fileInfo = {};

	// 获取文件信息
	fileInfo.mimetype = file.mimetype;
	fileInfo.originalname = file.originalname;
	fileInfo.size = file.size;
	fileInfo.path = file.path;

	// 设置响应类型及编码
	res.set({
		'content-type': 'application/json; charset=utf-8'
	});

	res.send(JSON.stringify(fileInfo));
});

/**
 * http服务
 */
app.get('/', (req, res, next) => {
	let form = fs.readFileSync('./index2.html', {
		encoding: 'utf8'
	});

	res.send(form);
});

app.listen(3100);

```

* index2.html
```
<form action="/upload" method="post" enctype="multipart/form-data">
	<h2>单文件上传</h2>
	<div class="form-group">
		<input type="file" name="logo" class="from-control">
	</div>
	<button type="submit" class="btn btn-default">上传</button>
</form>
```
