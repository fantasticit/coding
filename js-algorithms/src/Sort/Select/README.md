# 选择排序

对于选择排序，时间复杂度总是 `O(n²)`。

## 算法步骤

1. 在未排序数列中找到最小（大）元素，存放到起始位置
2. 再从剩余未排序数列找到最小（大）元素，存放到已排序数列部分末尾（或 当前剩余为排序数列头部）
3. 重复 第 2 步直到全部排列完成

前 2 步的动作为：

```javascript
let startIndex = 0;
let minIndex = 0;

for (let j = startIndex + 1; j < nums.length; j++) {
  if (nums[j] < nums[minIndex]) {
    minIndex = j;
  }
}

[arr[startIndex], arr[minIndex]] = [arr[minIndex], arr[startIndex]];
```

第 3 步则是调整 `startIndex` 重复前 2 步。

## 代码实现

```javascript
function selectSort(nums) {
  if (!Array.isArray(nums) || nums.length <= 1) {
    return nums;
  }

  let len = nums.length;

  let minIndex = 0;

  for (let i = 0; i < len; i++) {
    minIndex = i;

    for (let j = i + 1; j < len; j++) {
      if (nums[j] < nums[minIndex]) {
        minIndex = j;
      }
    }

    [nums[i], nums[minIndex]] = [nums[minIndex], nums[i]];
  }

  return nums;
}
```
