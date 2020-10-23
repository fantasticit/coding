export default {
  title: '学习笔记 | fantasticit',
  logo: 'Fantasticit',
  toc: true,
  renderFooter: (buildTime, relativeFilePath) =>
    `Bulid at ${buildTime}, Modify on <a href="https://github.com/fantasticit/coding/tree/main${relativeFilePath}" target="_blank">Github</a>`,
  navs: [
    {
      title: '首页',
      path: '/index'
    },
    {
      title: '文章',
      path: '/articles'
    },
    {
      title: '数据结构',
      path: '/data-structure'
    },
    {
      title: '算法',
      path: '/algorithms'
    },
    {
      title: '设计模式',
      path: '/design-patterns'
    },
    {
      title: '其他',
      path: '/others'
    },
    {
      title: "Github",
      path: "https://github.com/fantasticit/coding"
    }
  ]
}
