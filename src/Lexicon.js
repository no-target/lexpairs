import { WordPair } from './WordPair'

/**
 * Represents a Lexicon that stores unique WordPairs.
 */
export class Lexicon {
  #pairs

  /**
   * Creates a new instance of Lexicon.
   *
   * @param {WordPair[]} [initialPairs=[]] - An optional array of WordPair objects.
   * @throws {TypeError} If any element in initialPairs is not an instance of WordPair.
   * @throws {Error} If initialPairs contains duplicate word pairs.
   */
  constructor(initialPairs = []) {
    this.#pairs = []

    for (const pair of initialPairs) {
      this.add(pair)
    }
  }

  /**
   * Adds a new word pair to the lexicon.
   *
   * @param {WordPair} pair - The word pair to add.
   * @throws {TypeError} If the argument is not an instance of WordPair.
   * @throws {Error} If an identical word pair already exists in the lexicon.
   */
  add(pair) {
    if (!(pair instanceof WordPair)) {
      throw new TypeError('Expected a WordPair')
    }

    if (this.#pairs.some((existingPair) => existingPair.equals(pair))) {
      throw new Error(`Wordpair '${pair.source}' -> '${pair.target}' already exists`)
    }

    this.#pairs.push(pair)
  }

  /**
   * Removes and returns a word pair based on the source and target words.
   *
   * @param {string} source - The source word of the pair to remove.
   * @param {string} target - The target word of the pair to remove.
   * @returns {WordPair} The removed word pair.
   * @throws {Error} If the word pair is not found in the lexicon.
   */
  remove(source, target) {
    const index = this.#findIndex(source, target)
    const [removed] = this.#pairs.splice(index, 1)
    return removed
  }

  /**
   * Finds and returns all target words associated with a given source word.
   *
   * @param {string} source - The source word to look up.
   * @returns {string[]} An array of target words that match the source.
   */
  findTargets(source) {
    return this.#pairs.filter((pair) => pair.source === source).map((pair) => pair.target)
  }

  /**
   * Finds and returns all source words associated with a given target word.
   *
   * @param {string} target - The target word to look up.
   * @returns {string[]} An array of source words that match the target.
   */
  findSources(target) {
    return this.#pairs.filter((pair) => pair.target === target).map((pair) => pair.source)
  }

  /**
   * Finds and returns all WordPair objects associated with a given source word.
   *
   * @param {string} source - The source word to search for.
   * @returns {WordPair[]} An array of WordPair objects that match the source.
   */
  findPairs(source) {
    return this.#pairs.filter((pair) => pair.source === source)
  }

  /**
   * Gets the total number of word pairs in the lexicon.
   *
   * @returns {number} The number of word pairs.
   */
  get size() {
    return this.#pairs.length
  }

  /**
   * Returns a shallow copy of all WordPair objects in the lexicon.
   *
   * @returns {WordPair[]} An array containing all WordPair objects.
   */
  getAllPairs() {
    return [...this.#pairs]
  }

  /**
   * Clears all word pairs from the lexicon.
   */
  clear() {
    this.#pairs = []
  }

  /**
   * Helper method to find the index of a specified word pair.
   *
   * @param {string} source - The source word to search for.
   * @param {string} target - The target word to search for.
   * @returns {number} The index of the word pair in the internal array.
   * @throws {Error} If the word pair is not found in the lexicon.
   */
  #findIndex(source, target) {
    const index = this.#pairs.findIndex((pair) => pair.source === source && pair.target === target)
    if (index === -1) {
      throw new Error(`Wordpair '${source}' -> '${target}' not found`)
    }
    return index
  }

  /**
   * Allows iteration over all WordPair objects in the lexicon.
   *
   * @returns {IterableIterator<WordPair>}
   */
  [Symbol.iterator]() {
    return this.#pairs.values()
  }
}
