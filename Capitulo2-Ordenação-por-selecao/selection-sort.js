function selectionSort(array) {
  const sorted = []
  const length = array.length

  for (let i = 0; i < length; i++) {
    let min = [array[0], 0]
    for (let j = 0; j < array.length; j++) {
      const element = array[j]
      if (element < min[0]) {
        min = [element, j]
      }
    }
    sorted.push(array.splice(min[1], 1)[0])
  }

  return sorted
}

console.log(selectionSort([3, 4, 1, 6, 10, 32, 11]))
console.log(
  selectionSort([
    37, 12, 45, 23, 8, 5, 42, 16, 31, 27, 19, 3, 49, 26, 14, 7, 34, 1, 21, 50,
    10, 36, 43, 18, 25, 39, 11, 6, 28, 32, 9, 24, 2, 41, 47, 15, 29, 30, 40, 48,
    4, 44, 17, 20, 22, 33, 13, 38, 46, 35,
  ])
)
