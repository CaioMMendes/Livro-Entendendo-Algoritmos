class HashTable {
  arrayLength
  loadFactor
  currentLoad
  array

  constructor(arrayLength = 5, loadFactor = 0.7) {
    this.array = new Array(arrayLength)
    this.currentLoad = 0
    this.arrayLength = arrayLength
    this.loadFactor = loadFactor
  }

  remove(key) {
    const index = this.#hashFunction(key)
    let tempArray = this.array[index]

    if (!tempArray) return

    if (tempArray?.[0] === key) {
      console.log("igual")
      this.array[index] = tempArray[2]
      return
    } else {
      while (tempArray !== undefined) {
        if (tempArray?.[2]?.[0] === key) {
          tempArray[2] = tempArray?.[2]?.[2]
          return
        } else {
          tempArray = tempArray[2]
        }
      }
    }

    return
  }

  add(key, value) {
    console.log("Adicionando: ", key, " ", value)
    const index = this.#hashFunction(key)
    this.#allocateMemory(index, key, value)
  }

  get(key) {
    const index = this.#hashFunction(key)
    let tempArray = this.array[index]
    while (tempArray !== undefined) {
      if (tempArray[0] === key) {
        return tempArray[1]
      } else {
        tempArray = tempArray[2]
      }
    }

    return undefined
  }

  has(key) {
    const index = this.#hashFunction(key)
    let tempArray = this.array[index]
    while (tempArray !== undefined) {
      if (tempArray[0] === key) {
        return true
      } else {
        tempArray = tempArray[2]
      }
    }

    return false
  }

  #hashFunction(string) {
    string = string.toString()
    // const largePrime = 9_007_199_254_740_991 // 2^53 - 1, um número primo muito grande
    const largePrime = 97
    let hash = 2

    for (let i = 0; i < string.length; i++) {
      hash = (hash * largePrime + string.charCodeAt(i)) % this.arrayLength
    }

    return hash
  }

  #allocateMemory(index, key, value, array = this.array) {
    if (array[index] !== undefined) {
      let tempArray = array[index]
      let findedElement = false
      while (tempArray !== undefined) {
        if (tempArray[0] === key) {
          tempArray[1] = value
          findedElement = true
          break
        } else {
          tempArray = tempArray[2]
        }
      }

      if (!findedElement) {
        const currentVal = array[index]
        const newArray = new Array(3)
        newArray[0] = key
        newArray[1] = value
        newArray[2] = currentVal
        array[index] = newArray
      }
    } else {
      const newArray = new Array(3)
      newArray[0] = key
      newArray[1] = value
      newArray[2] = undefined
      array[index] = newArray
      this.currentLoad += 1 / this.arrayLength
    }

    if (this.currentLoad > 0.7) {
      console.log("Duplicando o tamanho!!")
      //todo regerar o array duplicando o tamanho
      this.currentLoad = 0
      this.arrayLength = this.arrayLength * 2
      const newArray = new Array(this.arrayLength)

      for (let i = 0; i < this.arrayLength / 2; i++) {
        let currentArray = array[i]
        console.log(currentArray)
        while (currentArray !== undefined) {
          const hashIndex = this.#hashFunction(currentArray[0])
          this.#allocateMemory(
            hashIndex,
            currentArray[0],
            currentArray[1],
            newArray
          )
          currentArray = currentArray?.[2]
        }
      }
    }
  }
}

// const hashTable = new HashTable()

// console.log(hashTable.add("abc", 1))
// console.log(hashTable.add("abc", 2))
// console.log(hashTable.add("cba", 33))
// console.log(hashTable.add("bca", 34))
// console.log(hashTable.add("cca", 34))
// console.log(hashTable.add("ccc", 34))
// console.log(hashTable.add("ccd", 34))
// console.log(hashTable.add("teste", 20))
// console.log(hashTable.array)
// console.log(hashTable.currentLoad, hashTable.arrayLength)
// console.log(hashTable.get("abc"))
// console.log(hashTable.get("teste"))
// console.log(hashTable.get("testes"))
// console.log(hashTable.has("teste"))
// console.log(hashTable.has("testes"))
// hashTable.remove("ccd")
// console.log(hashTable.has("cba"))
// console.log(hashTable.array)

const table = new HashTable(5, 0.7)

// Teste básico de adição e recuperação
console.log("==== Teste Básico ====")
table.add("nome", "Caio")
table.add("idade", 26)
console.log(table.get("nome")) // Esperado: "Caio"
console.log(table.get("idade")) // Esperado: 26
console.log(table.has("nome")) // Esperado: true
console.log(table.has("idade")) // Esperado: true

// Teste de sobrescrita de valor
console.log("\n==== Teste de Sobrescrita ====")
table.add("nome", "Carlos")
console.log(table.get("nome")) // Esperado: "Carlos"

// Teste de remoção de um item
console.log("\n==== Teste de Remoção ====")
table.remove("nome")
console.log(table.get("nome")) // Esperado: undefined
console.log(table.has("nome")) // Esperado: false

// Teste de remoção de um item inexistente
console.log("\n==== Teste de Remoção de Chave Inexistente ====")
table.remove("chaveInexistente") // Não deve causar erro
console.log(table.get("chaveInexistente")) // Esperado: undefined

// Teste de colisões (adicionando várias chaves que mapeiam para o mesmo índice)
console.log("\n==== Teste de Colisões ====")
table.add("a", 1)
table.add("b", 2)
table.add("c", 3)
table.add("d", 4) // Dependendo do hash, pode colidir
console.log(table.get("a")) // Esperado: 1
console.log(table.get("b")) // Esperado: 2
console.log(table.get("c")) // Esperado: 3
console.log(table.get("d")) // Esperado: 4

// Teste de crescimento do array
console.log("\n==== Teste de Crescimento da Tabela ====")
table.add("e", 5)
table.add("f", 6)
table.add("g", 7) // Deve disparar o aumento da tabela
console.log(table.get("e")) // Esperado: 5
console.log(table.get("f")) // Esperado: 6
console.log(table.get("g")) // Esperado: 7

// Teste após crescimento para ver se dados anteriores ainda existem
console.log("\n==== Teste Após Crescimento ====")
console.log(table.get("a")) // Deve ainda ser 1
console.log(table.get("b")) // Deve ainda ser 2
console.log(table.get("c")) // Deve ainda ser 3
console.log(table.get("d")) // Deve ainda ser 4
console.log(table.get("e")) // Deve ainda ser 5
console.log(table.get("f")) // Deve ainda ser 6
console.log(table.get("g")) // Deve ainda ser 7
