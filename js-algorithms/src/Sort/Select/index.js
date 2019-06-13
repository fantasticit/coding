module.exports = function selectSort(nums) {
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
};
