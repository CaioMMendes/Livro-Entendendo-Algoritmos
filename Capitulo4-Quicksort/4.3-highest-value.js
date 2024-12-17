const array = [1, 25, 36, 411, 54, 61, 7123, 80, 9, 10]

class Node {
  constructor(val, next = null) {
    this.val = val
    this.next = next
  }
}
const root = array.length >= 1 ? new Node(array[0]) : null
let current = root

for (let i = 1; i < array.length; i++) {
  current.next = new Node(array[i])
  current = current.next
}

function findMax(root) {
  if (root === null) return null
  if (root?.next === null) {
    return root.val
  }
  return Math.max(root.val, findMax(root.next))
}

console.log(findMax(root))
