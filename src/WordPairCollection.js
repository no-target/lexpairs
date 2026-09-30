import { WordPair } from './WordPair.js'

/**
 * A collection that stores unique WordPairs.
 *
 * @example
 * const collection = new WordPairCollection()
 * collection.add('hus', 'haus')
 * collection.findCounterparts('hus') // ['haus']
 */
export class WordPairCollection {
  #pairs

  /**
   * Creates a new, empty word pair collection.
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
   * Adds multiple word pairs at once.
   *
   * Validation happens before any pair is added: if any pair is invalid
   * or already exists, no pairs are added.
   *
   * @param {WordPair[]} pairs - An array of WordPair instances to add.
   * @throws {TypeError} If pairs is not an array or contains non-WordPair items.
   * @throws {Error} If any pair already exists in the collection.
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
   * Finds and returns all headwords associated with a given counterpart.
   *
   * @param {string} counterpart - The counterpart word to look up associated headwords for.
   * @returns {string[]} An array of headwords associated with the counterpart.
   */
  findHeadwords(counterpart) {
    return this.#pairs.filter((pair) => pair.hasCounterpart(counterpart)).map((pair) => pair.headword)
  }

  /**
   * Finds and returns all target words associated with a given headword.
   *
   * @param {string} headword - The headword to look up.
   * @returns {string[]} An array of counterparts associated with the headword.
   */
  findCounterparts(headword) {
    return this.#pairs.filter((pair) => pair.hasHeadword(headword)).map((pair) => pair.counterpart)
  }

  /**
   * Finds and returns all WordPair objects associated with a given headword.
   *
   * @param {string} headword - The headword used to find associated pairs.
   * @returns {WordPair[]} An array of WordPair objects that contain the headword.
   */
  findPairsByHeadword(headword) {
    return this.#pairs.filter((pair) => pair.hasHeadword(headword))
  }

  /**
   * Finds and returns all WordPair objects associated with a given counterpart word.
   *
   * @param {string} counterpart - The counterpart word used to find associated pairs.
   * @returns {WordPair[]} An array of WordPair objects that contain the counterpart.
   */
  findPairsByCounterpart(counterpart) {
    return this.#pairs.filter((pair) => pair.hasCounterpart(counterpart))
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
    const pair = new WordPair(headword, counterpart)
    return this.#pairs.some((existingPair) => existingPair.equals(pair))
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
    const pair = new WordPair(headword, counterpart)
    const index = this.#pairs.findIndex((existingPair) => existingPair.equals(pair))
    if (index === -1) {
      throw new Error(`Wordpair '${headword}' -> '${counterpart}' not found`)
    }
    return index
  }

  /**
   * Validates that all pairs are unique and can be added to the collection.
   *
   * @param {WordPair[]} pairs - The pairs to validate.
   * @throws {TypeError} If any item is not a WordPair.
   * @throws {Error} If any pair already exists or appears twice.
   */
  #validatePairs(pairs) {
    this.#assertWordPair(pairs)
    this.#assertNoDuplicatePairs(pairs)
    this.#assertNoExistingPairs(pairs)
  }

/**
 * Asserts that every item in the array is a WordPair.
 *
 * @param {WordPair[]} pairs - The pairs to validate.
 * @throws {TypeError} If any item is not a WordPair.
 */
  #assertWordPair(pairs) {
    for (const pair of pairs) {
      if (!(pair instanceof WordPair)) {
        throw new TypeError('Each item must be a WordPair')
      }
    }
  }

/**
 * Asserts that no pair appears more than once in the array.
 *
 * Comparison is case-insensitive.
 *
 * @param {WordPair[]} pairs - The pairs to validate.
 * @throws {Error} If any pair appears twice.
 */
  #assertNoDuplicatePairs(pairs) {
    const seen = new Set()

    for (const pair of pairs) {
      const key = `${pair.headword.toLowerCase()}|${pair.counterpart.toLowerCase()}`

      if (seen.has(key)) {
        throw new Error(`Wordpair '${pair.headword}' -> '${pair.counterpart}' appears twice`)
      }

      seen.add(key)
    }
  }

/**
 * Asserts that no pair already exists in the collection.
 *
 * Comparison is case-insensitive.
 *
 * @param {WordPair[]} pairs - The pairs to validate.
 * @throws {Error} If any pair already exists.
 */
  #assertNoExistingPairs(pairs) {
    for (const pair of pairs) {
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
