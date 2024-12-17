const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

class Node {
  constructor(val, next = null) {
    this.val = val
    this.next = next
  }
}
const root = array.length > 1 ? new Node(array[0]) : null
let current = root

for (let i = 1; i < array.length; i++) {
  current.next = new Node(array[i])
  current = current.next
}

function listCount(root) {
  if (root === null) return 0
  return 1 + listCount(root.next)
}

console.log(listCount(root))
