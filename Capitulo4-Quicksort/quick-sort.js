const arr = [3, 5, 2, 2, 1, 4]

function quickSort(arr) {
  if (arr.length < 2) {
    if (arr[0] > arr[1]) {
      return [arr[1], arr[0]]
    } else {
      return arr
    }
  }

  const left = []
  const right = []
  const pivot = arr[0]

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }

  return quickSort(left).concat(pivot).concat(quickSort(right))
}

console.log(quickSort(arr))
console.log(quickSort([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]))
console.log(quickSort([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
console.log(quickSort([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]))
console.log(quickSort([-10, -20, 5, 0, -3, 7, 2, -1, 9, -5]))
console.log(quickSort([4, 2, 4, 1, 4, 3, 2, 1, 3, 2, 4]))
console.log(quickSort([42]))
console.log(quickSort([]))
console.log(quickSort([3.14, 1.41, 2.71, 1.73, 0.577, 4.669]))
console.log(
  quickSort([
    Number.MAX_SAFE_INTEGER,
    Number.MIN_SAFE_INTEGER,
    0,
    1,
    -1,
    999999999,
    -999999999,
  ])
)
