# Flask 入门

## HelloWorld

```python
# encoding: utf-8       # 设置编码（如果使用 Python3 则不需要）

from flask import Flask  # 导入 Flask 类

app = Flask(__name__)   # 初始化一个 flask 实例


@app.route('/')         # 路由 装饰器
def hello_world():      # 与 路由 匹配的控制器函数
    return 'hello world'


if (__name__ == '__main__'):  # 当程序作为程序入口启动时，运行 flask 实例
    app.run()                 # 默认运行在：http://127.0.0.1:5000
```

运行上面的代码，然后打开浏览器访问：`http://127.0.0.1:5000`，就可以看到效果。

## 设置 `debug` 模式

在 `app.run()` 中传入参数 `debug=True` ，就可以设置当前项目为 `debug` 模式。

```python
app.run(debug=True)
```

`debug` 模式带来的功能：

- 当程序出错时，可以在页面直接看到错误信息
- 当项目中的文件发生改动时，程序会自动重载（类似于：hot reload）

## 使用配置文件

1.  在项目中新建文件 `config.py`
2.  在主文件中引入配置文件，然后配置到 `app` ，例如：

```python
import config
app.config.from_object(config) # 使用配置
```

关于 `app.config` 更多用法，可参考 `flask` 官网。

## 路由

举个例子：

```python
@app.route('/article/<id>')        # 打开浏览器，试着访问 http://localhost:5000/article/3 查看效果
def get_article(id):
    return 'Now is article %s' % id
```

更多*路由*相关知识，可参考[路由](http://docs.jinkan.org/docs/flask/quickstart.html#accessing-request-data)。

### 构造 URL

`Flask` 不仅能匹配 URL，还可以生成 URL。通过使用 `url_for` 可以给指定的函数构造 URL。

```python
@app.route('/')         # 路由 装饰器
def hello_world():      # 与 路由 匹配的控制器函数
    print(url_for('get_article', id=100))  # 控制台打印：/article/100
    return 'hello world'

@app.route('/article/<id>')
def get_article(id):
    return 'Now is article %s' % id
```

`url_for('get_article', id=100)` 的结果是 `/article/100`。这里可以看出该函数的作用就是*构造 URL*，通过使用与路由绑定的控制器函数的函数名，再加上所需的参数，即可构造出相应的 URL。这样便无需手动去写 `URL`，避免了手写可能发生的错误。（毕竟：**Typing is hard!**）

### 重定向

可以使用 `redirect` 函数重定向。如果放弃用户请求并返回错误代码，使用 `abort` 函数。

```python
@app.route('/')         # 路由 装饰器
def hello_world():      # 与 路由 匹配的控制器函数
    print(url_for('get_article', id=100))  # 控制台打印：/article/100
    return redirect(url_for('get_article', id=100))  # 重定向
    # return 'hello world'


@app.route('/article/<id>')
def get_article(id):
    return 'Now is article %s' % id


@app.route('/abort')
def get_abort():
    return abort(401)
```

打开浏览器访问相应的路由，以查看效果。

## 模板渲染

`flask` 默认 HTML 模板文件放置在项目的 `templates` 文件夹。故新建文件夹 `templates`，并在其中新建一个文件 `index.html`。

```html
<!DOCTYPE html>
<html lang="en">

<head>
</head>

<body>
  <p>首页</p>
</body>

</html>
```

然后修改 `app.py` 相关部分：

```python
# encoding: utf-8       # 设置编码（如果使用 Python3 则不需要）

from flask import Flask, render_template  # 导入 Flask 类
import config

app = Flask(__name__)   # 初始化一个 flask 实例
app.config.from_object(config)


@app.route('/')         # 路由 装饰器
def hello_world():      # 与 路由 匹配的控制器函数
    return render_template('index.html')

if (__name__ == '__main__'):  # 当程序作为程序入口启动时，运行 flask 实例
    app.run()                 # 默认运行在：http://127.0.0.1:5000
```

打开浏览器访问: `http://127.0.0.1:5000` 即可。

### 模板传参

模板中的数据大部分都应当是动态生成的。`flask` 提供了向模板传参的访问，举个例子：

```html
<p>项目名：{{ projectName }}</p>
```

修改 python 部分：

```python
render_template('index.html', projectName="flask demo")
```

如果需要传入多个参数，可以将多个参数放置到一个字典中，然后使用 `关键字参数` 传入参数，即：

`render_template('index.html', **data)`
