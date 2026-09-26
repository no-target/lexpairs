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