import { WordPair } from './WordPair'

/**
 * Represents a collection that stores unique WordPairs.
 */
export class WordPairCollection {
  #pairs

  /**
   * Creates a new instance of WordpairCollection.
   */
  constructor() {
    this.#pairs = []
  }

  /**
   * Adds a new word pair to the collection.
   *
   * @param {string} headword - The headword of the word pair.
   * @param {string} counterpart - The counterpart to the headword.
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
   *
   * @param pairs
   */
  addMany(pairs) {
  if (!Array.isArray(pairs)) {
    throw new TypeError('Expected an array of WordPairs')
  }

  this.#validatePairs(pairs)

  for (const pair of pairs) {
    this.add(pair.headword, pair.counterpart)
  }
}

  /**
   * Removes and returns a word pair based on the headword and its counterpart.
   *
   * @param {string} headword - The headword of the pair to remove.
   * @param {string} counterpart - The counterpart of the pair to remove.
   * @returns {WordPair} The removed word pair.
   * @throws {Error} If the word pair is not found in the collection.
   */
  remove(headword, counterpart) {
    const index = this.#findIndex(headword, counterpart)
    const [removed] = this.#pairs.splice(index, 1)
    return removed
  }

  /**
   * Finds and returns all target words associated with a given headword.
   *
   * @param {string} headword - The headword to look up.
   * @returns {string[]} An array of counterparts associated with the headword.
   */
  findCounterparts(headword) {
    return this.#pairs.filter((pair) => pair.headword === headword).map((pair) => pair.counterpart)
  }

  /**
   * Finds and returns all headwords associated with a given counterpart.
   *
   * @param {string} counterpart - The counterpart word to look up associated headwords for.
   * @returns {string[]} An array of headwords associated with the counterpart.
   */
  findHeadwords(counterpart) {
    return this.#pairs.filter((pair) => pair.counterpart === counterpart).map((pair) => pair.headword)
  }

  /**
   * Finds and returns all WordPair objects associated with a given headword.
   *
   * @param {string} headword - The headword used to find associated pairs.
   * @returns {WordPair[]} An array of WordPair objects that contain the headword.
   */
  findPairsByHeadword(headword) {
    return this.#pairs.filter((pair) => pair.headword === headword)
  }

  /**
   * Finds and returns all WordPair objects associated with a given counterpart word.
   *
   * @param {string} counterpart - The counterpart word used to find associated pairs.
   * @returns {WordPair[]} An array of WordPair objects that contain the counterpart.
   */
  findPairsByCounterpart(counterpart) {
    return this.#pairs.filter((pair) => pair.counterpart === counterpart)
  }

  /**
   * Returns all unique headwords in the collection.
   *
   * @returns {string[]} The headwords, in insertion order.
   */
  get allHeadwords() {
    return [...new Set(this.#pairs.map((pair) => pair.headword))]
  }
  /**
   * Returns all unique counterparts in the collection.
   *
   * @returns {string[]} The counterparts, in insertion order.
   */
  get allCounterparts() {
    return [...new Set(this.#pairs.map((pair) => pair.counterpart))]
  }

  /**
   * Checks whether a specific word pair exists in the collection.
   *
   * @param {string} headword - The headword of the pair.
   * @param {string} counterpart - The counterpart of the pair.
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
   * @param {string} headword - The headword of the pair.
   * @param {string} counterpart - The counterpart of the pair.
   * @returns {number} The index of the word pair in the internal array.
   * @throws {Error} If the word pair is not found in the collection.
   */
  #findIndex(headword, counterpart) {
    const index = this.#pairs.findIndex(
      (pair) => pair.headword === headword && pair.counterpart === counterpart)
    if (index === -1) {
      throw new Error(`Wordpair '${headword}' -> '${counterpart}' not found`)
    }
    return index
  }

  #validatePairs(pairs) {
  for (const pair of pairs) {
    if (!(pair instanceof WordPair)) {
      throw new TypeError('Each item must be a WordPair')
    }
    if (this.has(pair.headword, pair.counterpart)) {
      throw new Error(`Wordpair '${pair.headword}' -> '${pair.counterpart}' already exists`)
    }
  }
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
