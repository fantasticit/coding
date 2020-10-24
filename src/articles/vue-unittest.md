![](http://ownsprds9.bkt.clouddn.com/unittest.jpg)
## 前言
使用`vue-cli`可以直接生成一个包含`unit & e2e`测试的开发环境。这里我们主要针对`unit`文件进行`单元测试`。

## 命令行效果预览
![命令行](https://user-gold-cdn.xitu.io/2017/12/3/1601bbefdc785a3a?w=675&h=395&f=jpeg&s=271601)

## test/unit 文件结构及分析
```
├── coverage
├── jest.conf.js
├── setup.js
└── specs
    ├── api-test.spec.js
    ├── click-test.spec.js
    ├── data-test.spec.js
    ├── dom-test.spec.js
    ├── input-test.spec.js
    ├── mock-test.spec.js
    └── props-test.spec.js
```

- coverage: 单元测试覆盖率的报表生成文件（当执行`npm run unit`后，可在该文件夹下打开`index.html`文件查看覆盖率）。
- jest.conf.js: jest的配置文件。Jest是Facebook开发的一个对javascript进行单元测试的工具，之前仅在其内部使用，后开源，并且是在Jasmine测试框架上演变开发而来，使用了我们熟知的expect(value).toBe(other)这种断言格式。
- setup.js: 默认生成的vue配置文件（不用更改，默认开发环境）。
- specs: 编写单元测试的文件夹（所有的测试文件都将放在该文件夹下）。

## data方法测试
假设我们编写了这样一个组件：

```
<!-- data-test.vue -->
<template>
  <span>{{ msg }}</span>
</template>

<script>
export default {
  name: 'TestData',

  data() {
    return {
      msg: 'hello'
    }
  },
  
  created() {
    this.msg = 'bye'
  }
}
</script>
```

那么，我们可以这样编写断言

```
// data.spec.js
// 导入vue.js和组件，进行测试
import Vue from 'vue'
import TestDataComponent from '@/components/data-test.vue'

describe('TestDataComponent', () => {
  // 检查原始组件选项
  it('has a created hook', () => {
    expect(typeof TestDataComponent.created).toEqual('function')
  })

  // 评估原始组件选项中的函数的结果
  it('should set the correct default data', () => {
    expect(typeof TestDataComponent.data).toEqual('function')

    const data = TestDataComponent.data()
    expect(data.msg).toEqual('hello')
  })

  // 检查mount中的组件实例
  it('should correctly set the msg when created', () => {
    const vm = new Vue(TestDataComponent).$mount()
    expect(vm.msg).toEqual('bye')
  })

  // 创建一个实例并检查渲染输出
  it('should render correct msg', () => {
    const Ctor = Vue.extend(TestDataComponent)
    const vm = new Ctor().$mount()
    expect(vm.$el.textContent).toEqual('bye')
  })
})
```

## props测试
很多组件的渲染输出由它的 props 决定。事实上，如果一个组件的渲染输出完全取决于它的 props，那么它会让测试变得简单，就好像断言不同参数的纯函数的返回值。例子：

```
<template>
  <!-- props-test.vue  -->
  <p>{{ msg }}</p>
</template>

<script>
export default {
  props: ['msg']
}
</script>
```

那么我们就可以在不同的 `props` 中，通过 propsData 选项断言它的渲染输出：

```
// props.spec.js
import Vue from 'vue'
import TestPropsComponent from '@/components/props-test.vue'

const Ctor = Vue.extend(TestPropsComponent);

// 针对props，可以通过propsData选项断言它的渲染输出
const getRenderText = (propsData) => {
  const vm = new Ctor({propsData}).$mount()
  return vm.$el.textContent
}

describe('TestPropsComponent', () => {
  it('should render correctly with different props', () => {
    expect(getRenderText({msg: 'Hello'})).toEqual('Hello')
    expect(getRenderText({msg: 'Bye'})).toEqual('Bye')
  })
})
```

## 断言异步更新
由于 Vue 进行 异步更新 DOM 的情况，一些依赖 DOM 更新结果的断言必须在 Vue.nextTick 回调中进行：

```
<template>
  <!-- dom-test.vue -->
  <span>{{ msg }}</span>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hello'
    }
  }
}
</script>

```

断言的编写：

```
// dom.spec.js
import Vue from 'vue'
import DomUpdateComponent from '@/components/dom-test.vue'

describe('DomUpdateComponent', () => {
  it('the msg should be Hello', () => {
    const data = DomUpdateComponent.data()
    expect(data.msg).toEqual('Hello')
  })

  // 在状态更新后检查生成的HTML
  it('the msg should change to Bye', () =>  {
    const vm = new Vue(DomUpdateComponent).$mount()

    vm.msg = 'Bye'

    // 在状态改变后和断言 DOM 更新前等待一刻
    Vue.nextTick(() => {
      expect(vm.$el.textContent).toEqual('Bye')
    })
  })
})

```

## 组件事件的测试
假设我们编写了这样一个组件，其中有一个按钮，按钮有一个`点击事件`：

```
<!-- click-test.vue -->
<template>
  <div>
    <p>现在是{{ num }}</p>
    <button @click="increase">change</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 0
    }
  },

  methods: {
    increase() {
      this.num++
    }
  }
}
</script>
```

那么，我们可以这样在断言中触发事件:

```
// click.spec.js
import Vue from 'vue'
import ClickTestComponent from '@/components/click-test.vue'

describe('ClickTestComponent', () => {
  const Ctor = Vue.extend(ClickTestComponent)

  const vm = new Ctor().$mount()
  // 获取按钮
  const oBtn = vm.$el.querySelector('button')
  // 创建点击事件
  const clickEvent = new window.Event('click')

  it("the num should be 1", () => {
    // 触发按钮点击事件
    oBtn.dispatchEvent(clickEvent)
    // 需要手动监听更新
    vm._watcher.run()

    expect(vm.$el.textContent).toContain('1')
  })

  it("the num should be 2", () => {
    // 触发按钮点击事件
    oBtn.dispatchEvent(clickEvent)
    // 需要手动监听更新
    vm._watcher.run()
    
    expect(vm.$el.textContent).toContain('2')
  })
})
```

## 用户交互组件的测试
假设我们有一个输入框，并且绑定了一些事件：

```
<template>
  <!-- input-test.vue -->
  <div>
    <p>{{ msg }}</p>
    <input type="text" v-model="input">
    <button @click="handle"></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '',
      input: 'hi'
    }
  },

  methods: {
    handle() {
      this.msg = this.input
    }
  }
}
</script>

```

很显然，我们是要利用`v-model`模拟`input`进行断言：

```
// input.spec.js
import Vue from 'vue'
import InputTestComponent from '@/components/input-test.vue'

describe('InputTestComponent', () => {
  const Ctor = Vue.extend(InputTestComponent)
  const vm = new Ctor().$mount()

  const oBtn = vm.$el.querySelector('button')
  const clickEvent = new window.Event('click')

  it('the msg should be equal with input', () => {
    vm.input = 'let me change msg to what I say'

    oBtn.dispatchEvent(clickEvent)

    // 手动监听更新
    vm._watcher.run()

    expect(vm.$el.textContent).toContain('let me change msg to what I say')
  })
});

```

## API的测试
1. 利用`mock.js`模拟后端接口
在`src`文件夹下新建`mock`文件夹，编写`index.js`:

```
// mock/index.js
import Mock from 'mockjs'

export default Mock.mock('http://api.rs.com/v1/test', {
  'greeting': 'Hi, Vue'
});
```

2. 利用`axios`进行ajax
在`src`文件夹下新建`provider`文件夹，编写`index.js`:

```
// provider/index.js
import axios from 'axios'
import '../mock/index'

const getGreeting = async (url = 'http://api.rs.com/v1/test') => {
  try {
    const res = await axios.get(url)

    return res.data
  } catch (err) {
    throw new Error('获取问候语失败')
  }
}

export default getGreeting
```

3. 编写组件

```
<template>
  <!-- mock-test.vue -->
  <p>{{ msg }}</p>
</template>

<script>
import getGreeting from '@/provider/index'

export default {
  data() {
    return {
      msg: 'waiting'
    }
  },

  created() {
    this.getMsg()
  },

  methods: {
    async getMsg(url) {
      try {
        const data = await getGreeting(url)

        this.msg = data.greeting
      } catch (err) {
        console.log(err.message)
      }
    }
  }
}
</script>
```

4. 针对`provider/index.js`进行单元测试

```
// api.spec.js
import getGreeting from '@/provider/index'

describe('test greeting', async () => {
  it('res should be "Hi, Vue"', async () => {
    const res = await getGreeting();
    expect(res.greeting).toEqual('Hi, Vue')
  })

  it('err should be catched', async () => {
    try {
      const res = await getGreeting('wrongUrl')
    } catch (err) {
      expect(err.message).toEqual('获取问候语失败')
    }
  })
})
```

5. 针对编写的组件进行测试

```
// mock-test.spec.js
import Vue from 'vue'
import MockTestComponet from '@/components/mock-test.vue'

describe('MockTestComponet', () => {
  it('should have the created hook', () => {
    expect(typeof MockTestComponet.created).toEqual('function')
  })

  it('the msg should be waiting', () => {
    const data = MockTestComponet.data()

    expect(data.msg).toEqual('waiting')
  })

  it('the msg should change when created', async () => {
    // const vm = new Vue(MockTestComponet).$mount()
    const Ctor = Vue.extend(MockTestComponet)
    const vm = new Ctor().$mount()

    setTimeout(() => {
      expect(vm.msg).toEqual('Hi, Vue')
    }, 0)
  })

  // 返回正确的结果
  it('test methods getMsg by correct url', async () => {
    const vm = new Vue(MockTestComponet)
    await vm.getMsg();

    expect(vm.msg).toEqual('Hi, Vue')
  })

  // 抛出异常
  it('test methods getMsg by wrong url', async () => {
    try {
      const vm = new Vue(MockTestComponet)
      await vm.getMsg('fuck');
    } catch (err) {
      expect(err.message).toEqual('获取问候语失败')
    }
  })
})
```

