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