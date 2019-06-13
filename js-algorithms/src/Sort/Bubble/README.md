# 冒泡排序

冒泡排序要重复地遍历数列，一次比较两个元素，若这两个元素顺序错误就交换过来，一直重复到无需再进行交换。

## 算法步骤

1. 比较相邻的元素，若前者比后者大就交换。
2. 对每一对相邻的元素作第一步的动作。
3. 经过前 2 步，数列中的最大项已经移到数列最后一位，所以接下来的工作就是对剩下的前 `n - 1` 项重复前 2 步。

前 2 步的动作为：

```javascript
for (let j = 0; j < nums.length - 1; j++) {
  if (nums[j] > nums[j + 1]) {
    [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
  }
}
```

第 3 步则是缩小要比较的数列重复执行前 2 步:

```javascript
for (let i = 0; i < nums.length - 1; i++) {
  for (let j = 0; j < nums.length - 1 - i; j++) {
    if (nums[j] > nums[j + 1]) {
      [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
    }
  }
}
```

## 代码实现

```javascript
function bubbleSort(nums) {
  if (!Array.isArray(nums) || nums.length <= 1) {
    return nums;
  }

  let len = nums.length;

  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
      }
    }
  }

  return nums;
}
```
