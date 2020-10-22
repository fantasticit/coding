---
title: "js 朗读文章内容"
index: 1
---

## js 朗读文章内容

今天，从 MDN 上看到了 `SpeechSynthesis` 这个 API。看了下它的介绍。
网页语音 API 的 `SpeechSynthesis` 接口是语音服务的控制接口；它可以用于获取设备上关于可用的合成声音的信息，开始、暂停语音，或除此之外的其他命令。
卧槽，这一看不得了啊，这个接口可以调用设备接口读出文字，那这样岂不是就可以在 web 页面上实现朗读功能。来，试一下：

```js
function speak() {
  let synth = window.speechSynthesis;
  let voices = synth.getVoices().filter((voice) => voice.lang === "zh-CN");
  if (voices.length == 0) return;
  let utterThis = new SpeechSynthesisUtterance(
    document.querySelector(
      "#app > main > div > div.markdown-container.el-col.el-col-24.el-col-xs-24.el-col-sm-20 > section"
    ).textContent
  );
  utterThis.voice = voices[0];
  synth.speak(utterThis);
}
```

可在本博客页面打开控制台，并执行代码，体验一下“朗读功能”。(如果没有朗读，可以再调一次 speak()❤️😄😁)

在控制台打印一下 `voices `。

![](https://wipi.oss-cn-shanghai.aliyuncs.com/2020-03-27/QQ%E6%88%AA%E5%9B%BE20200327235302.png)

应该是不同的硬件设备，不同的操作系统，可用的 voices 不一样，比如 mac 和 windows。

![](https://wipi.oss-cn-shanghai.aliyuncs.com/2020-03-27/QQ%E6%88%AA%E5%9B%BE20200327235612.png)

最后，看一下兼容性还不错。😹💓
