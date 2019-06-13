module.exports = function bubbleSort(nums) {
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
};
