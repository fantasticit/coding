/**
 * 以毫秒为单位将元素从完全不透明淡出到完全透明
 * @param {*} element 元素
 * @param {*} time 过渡时间
 * @param {*} cb  动画完成后的回调函数
 */
function fadeOut(element, cb, time = 500) {
  if (typeof element == 'string') {
    element = document.querySelector(element);
  }

  const start = new Date(); // 动画开始时间
  animate();

  function animate() {
    const cost = new Date() - start; // 消耗的时间
    const fraction = cost / time;    // 总时间的几分之几

    if (fraction < 1) { // 动画未完成
      const opacity = 1 - Math.sqrt(fraction);
      element.style.opacity = String(opacity);

      setTimeout(animate, Math.min(25, time - cost));
    } else {
      element.style.opacity = 0;
      if (cb) {
        cb.call(this, element);
      }
    }
  }
}

// 使元素左右回来抖动
// 上下抖动则该style.top就可以了
function shake(element, cb, distance = 5, time = 500) {
  if (typeof element == 'string') {
    element = document.querySelector(element);
  }

  const originalStyle = element.style.cssText; // 元素的原样式
  element.style.position = 'relative'; // 使元素相对定位
  const start = new Date(); // 动画开始时间
  animate();
  
  function animate() {
    const cost = new Date() - start;
    const fraction = cost / time;

    if (fraction < 1) { // 动画未完成
      const x = distance * Math.sin(fraction * 4 * Math.PI); //正弦函数
      element.style.left = x + 'px';

      setTimeout(animate, Math.min(25, time - cost));
    } else {
      element.style.cssText = originalStyle;
      if (cb) {
        cb.call(this, element);
      }
    }
  }
}
