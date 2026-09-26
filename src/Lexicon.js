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
   * @param source
   * @param target
   */
  remove(source, target) {
    const index = this.#findIndex(source, target)
    const [removed] = this.#pairs.splice(index, 1)
    return removed
  }

  /**
   *
   * @param source
   * @param target
   */
  #findIndex(source, target) {
    const index = this.#pairs.findIndex((pair) => pair.source === source && pair.target === target)
    if (index === -1) {
      throw new Error(`Wordpair '${source}' -> '${target}' not found`)
    }
    return index
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
