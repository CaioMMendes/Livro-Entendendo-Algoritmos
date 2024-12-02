const sortedArray = []
const numberOfElements = 5000
for (let i = 0; i < numberOfElements; i++) {
  sortedArray.push(i)
}

function binarySearch(find) {
  let bot = 0
  let top = numberOfElements - 1

  while (bot <= top) {
    let mid = Math.floor((top + bot) / 2)
    const midElement = sortedArray[mid]
    if (find === midElement) return mid
    if (find < midElement) {
      top = midElement - 1
    } else {
      bot = midElement + 1
    }
  }

  return -1
}

console.log(binarySearch(2))
console.log(binarySearch(2500))
console.log(binarySearch(33))
console.log(binarySearch(0))
console.log(binarySearch(40000))
console.log(binarySearch(-12))
