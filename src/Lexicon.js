import { WordPair } from './WordPair'

/**
 *
 */
export class Lexicon {
  #pairs

  /**
   *
   * @param initialPairs
   */
  constructor(initialPairs = []) {
    this.#pairs = []

    for (const pair of initialPairs) {
      this.add(pair)
    }
  }

  
  /**
   *
   * @param pair
   */
  add(pair) {
   if (!(pair instanceof WordPair)) {
    throw new TypeError('Expected a WordPair')
   }
  
  this.#pairs.push(pair)
}

remove(source, target) {
const index = this.#pairs.findIndex(
    p => p.source === source && p.target === target
  )

  if (index === -1) {
    throw new Error(`Word pair '${source}' -> '${target}' not found`)
  }

  this.#pairs.splice(index, 1)
}


/**
 *
 */
get size() {
    return this.#pairs.length
  }

  /**
   *
   */
  clear() {
    this.#pairs = []
  }
}