# encoding: utf-8       # 设置编码（如果使用 Python3 则不需要）

from flask import Flask, abort, url_for, redirect, render_template  # 导入 Flask 类
import config

app = Flask(__name__)   # 初始化一个 flask 实例
app.config.from_object(config)


@app.route('/')         # 路由 装饰器
def hello_world():      # 与 路由 匹配的控制器函数
    print(url_for('get_article', id=100))  # 控制台打印：/article/100
    return render_template('index.html', projectName="flask demo")


@app.route('/article/<id>')
def get_article(id):
    return 'Now is article %s' % id


@app.route('/abort')
def get_abort():
    return abort(401)


if (__name__ == '__main__'):  # 当程序作为程序入口启动时，运行 flask 实例
    app.run()                 # 默认运行在：http://127.0.0.1:5000
