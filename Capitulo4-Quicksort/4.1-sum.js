console.log(sum([1, 2, 3, 4, 5, 6, 7, 8, 9]))

function sum(array) {
  const element = array.splice(0, 1)[0]
  if (array.length === 0) return element
  return element + sum(array)
}
