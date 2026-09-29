import { WordPair } from './WordPair'

/**
 * Represents a collection that stores unique WordPairs.
 */
export class WordPairCollection {
  #pairs

  /**
   * Creates a new instance of WordpairCollection.
   *
   * @param {WordPair[]} [initialPairs=[]] - An optional array of WordPair objects.
   * @throws {TypeError} If any element in initialPairs is not an instance of WordPair.
   * @throws {Error} If initialPairs contains duplicate word pairs.
   */
  constructor() {
    this.#pairs = []
  }

  /**
   * Adds a new word pair to the collection.
   *
   * @param {string} headword
   * @param {string} counterpart - The associated word of the source.
   * @throws {TypeError} If the argument is not an instance of WordPair.
   * @throws {Error} If an identical word pair already exists in the collection.
   */
  add(headword, counterpart) {
    const pair = new WordPair(headword, counterpart)

    if (this.#pairs.some((existingPair) => existingPair.equals(pair))) {
      throw new Error(`Wordpair '${headword}' -> '${counterpart}' already exists`)
    }

    this.#pairs.push(pair)
  }

  /**
   * Removes and returns a word pair based on the source and target words.
   *
   * @param {string} source - The source word of the pair to remove.
   * @param {string} target - The target word of the pair to remove.
   * @param headword
   * @param counterpart
   * @returns {WordPair} The removed word pair.
   * @throws {Error} If the word pair is not found in the collection.
   */
  remove(headword, counterpart) {
    const index = this.#findIndex(headword, counterpart)
    const [removed] = this.#pairs.splice(index, 1)
    return removed
  }

  /**
   * Finds and returns all target words associated with a given source word.
   *
   * @param {string} source - The source word to look up.
   * @param headword
   * @returns {string[]} An array of target words that match the source.
   */
  findCounterparts(headword) {
    return this.#pairs.filter((pair) => pair.headword === headword).map((pair) => pair.counterpart)
  }

  /**
   * Finds and returns all source words associated with a given target word.
   *
   * @param {string} target - The target word to look up.
   * @param counterpart
   * @returns {string[]} An array of source words that match the target.
   */
  findHeadwords(counterpart) {
    return this.#pairs.filter((pair) => pair.counterpart === counterpart).map((pair) => pair.headword)
  }

  /**
   * Finds and returns all WordPair objects associated with a given source word.
   *
   * @param {string} source - The source word to search for.
   * @param headword
   * @returns {WordPair[]} An array of WordPair objects that match the source.
   */
  findPairsByHeadword(headword) {
    return this.#pairs.filter((pair) => pair.headword === headword)
  }

  /**
   * Finds and returns all WordPair objects associated with a given target word.
   *
   * @param {string} - The target word to search for.
   * @param counterpart
   * @returns {WordPair[]} An array of WordPair objects that match the target.
   */
  findPairsByCounterpart(counterpart) {
    return this.#pairs.filter((pair) => pair.counterpart === counterpart)
  }

  /**
   * @returns {string[]} All unique source words in the collection.
   */
  get allHeadwords() {
    return [...new Set(this.#pairs.map((pair) => pair.headword))]
  }

  /**
   * @returns {string[]} All unique target words in the collection.
   */
  get allCounterparts() {
    return [...new Set(this.#pairs.map((pair) => pair.counterpart))]
  }

  /**
   * Checks whether a specific word pair exists in the collection.
   *
   * @param {string} source - The source word.
   * @param {string} target - The target word.
   * @param headword
   * @param counterpart
   * @returns {boolean} True if the pair exists.
   */
  has(headword, counterpart) {
    return this.#pairs.some((pair) => pair.headword === headword && pair.counterpart === counterpart)
  }

  /**
   * Gets the total number of word pairs in the collection.
   *
   * @returns {number} The number of word pairs.
   */
  get size() {
    return this.#pairs.length
  }

  /**
   * Returns a shallow copy of all WordPair objects in the collection.
   *
   * @returns {WordPair[]} An array containing all WordPair objects.
   */
  get allPairs() {
    return [...this.#pairs]
  }

  /**
   * Clears all word pairs from the collection.
   */
  clear() {
    this.#pairs = []
  }

  /**
   * Helper method to find the index of a specified word pair.
   *
   * @param {string} source - The source word to search for.
   * @param {string} target - The target word to search for.
   * @param headword
   * @param counterpart
   * @returns {number} The index of the word pair in the internal array.
   * @throws {Error} If the word pair is not found in the collection.
   */
  #findIndex(headword, counterpart) {
    const index = this.#pairs.findIndex((pair) => pair.headword === headword && pair.counterpart === counterpart)
    if (index === -1) {
      throw new Error(`Wordpair '${headword}' -> '${counterpart}' not found`)
    }
    return index
  }

  /**
   * Allows iteration over all WordPair objects in the collection.
   *
   * @returns {IterableIterator<WordPair>}
   */
  [Symbol.iterator]() {
    return this.#pairs.values()
  }
}
