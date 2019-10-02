let inputNumsValue = (document.getElementById("inputNums").value =
  "123, 324114, 2313, 13, 323, 123");
// RADIX SORT
const getPosition = (num, position) => {
  return Math.floor(Math.abs(num) / Math.pow(10, position)) % 10;
};

const sortRadix = arr => {
  const longestNum = Math.max(...arr).toString(10).length;

  for (let i = 0; i < longestNum; i++) {
    let buckets = Array.from({ length: 10 }, () => []);

    for (let j = 0; j < arr.length; j++) {
      buckets[getPosition(arr[j], i)].push(arr[j]);
    }
    arr = [].concat(...buckets);
  }
  return arr;
};
// HEAP SORT
const heapify = (arr, length, i) => {
  let largest = i;
  let left = i * 2 + 1;
  let right = left + 1;

  if (left < length && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < length && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest != i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, length, largest);
  }

  return arr;
};

const heapSort = arr => {
  let length = arr.length;
  let i = Math.floor(length / 2 - 1);
  let k = length - 1;

  while (i >= 0) {
    heapify(arr, length, i);
    i--;
  }

  while (k >= 0) {
    [arr[0], arr[k]] = [arr[k], arr[0]];
    heapify(arr, k, 0);
    k--;
  }

  return arr;
};
// Sort Event 
const sortNumsBy = callback => {
  let sortResult = document.getElementById("sortResult");
  let inputNumsValue = document
    .getElementById("inputNums")
    .value.replace(/\s/, "")
    .split(",")
    .map(item => parseInt(item, 10))
    .filter(item => !isNaN(item));

  if (!inputNumsValue.length) {
    sortResult.textContent = "Enter correct value, please.";
    return;
  }

  sortResult.textContent = callback(inputNumsValue);
};

// Get buttons
let radixSortButton = document.getElementById("radixSort");
let heapSortButton = document.getElementById("heapSort");
// Attach events
radixSortButton.addEventListener("click", () => {
  sortNumsBy(sortRadix);
});
heapSortButton.addEventListener("click", () => {
  sortNumsBy(heapSort);
});
