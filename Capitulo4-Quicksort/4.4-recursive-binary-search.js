const sortedArray = []
const numberOfElements = 5000
for (let i = 0; i < numberOfElements; i++) {
  sortedArray.push(i)
}

function binarySearch(target, bot = 0, top = numberOfElements - 1) {
  if (bot > top) return -1 //caso base

  const mid = Math.floor((top + bot) / 2)
  const midVal = sortedArray[mid]

  if (midVal === target) return mid
  if (midVal > target) {
    return binarySearch(target, bot, mid - 1)
  } else {
    return binarySearch(target, mid + 1, top)
  }
}

console.log(binarySearch(2))
console.log(binarySearch(2500))
console.log(binarySearch(33))
console.log(binarySearch(0))
console.log(binarySearch(40000))
console.log(binarySearch(-12))
console.log(binarySearch(5000))
console.log(binarySearch(4999))
