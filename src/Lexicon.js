import { LexiconFileReader } from './LexiconFileReader'
import { WordPairCollection } from './WordPairCollection'
import { SearchEngine } from './SearchEngine'

/**
 *
 */
export class Lexicon {
  #lexicon
  #fileReader
  #searchEngine


  /**
   *
   */
  constructor() {
    this.#lexicon = new WordPairCollection()
    this.#fileReader = new LexiconFileReader()
    this.#searchEngine = new SearchEngine(this.#lexicon)

  }

  /**
   * Provides access to search strategies.
   *
   * @returns {SearchEngine}
   */
  get search() {
    return this.#searchEngine
  }

  /**
   *
   * @param filePath
   * @param delimiter
   */
  async loadFromFile(filePath, delimiter) {
 const wordPairs = await this.#fileReader.readDelimited(filePath, delimiter)

  for (const pair of wordPairs) {
    this.#lexicon.add(pair.headword, pair.counterpart)
  }
}

  /**
   *
   * @param filePath
   * @param keys
   */
  async loadFromJson(filePath, keys) {
   const wordPairs = await this.#fileReader.readJson(filePath, keys)

  for (const pair of wordPairs) {
    this.#lexicon.add(pair.headword, pair.counterpart)
  }
  }

    /**
     * Adds a word pair to the lexicon.
     *
     * @param {string} headword
     * @param {string} counterpart
     */
  add(headword, counterpart) {
    this.#lexicon.add(headword, counterpart)  }

    /**
     * Removes a word pair from the lexicon.
     *
     * @param {string} headword
     * @param {string} counterpart
     * @returns {WordPair}
     */
  remove(headword, counterpart) {
    return this.#lexicon.remove(headword, counterpart)
  }

      /**
     * @param {string} headword
     * @param {string} counterpart
     * @returns {boolean} True if the pair exists.
     */
  has(headword, counterpart) {
    return this.#lexicon.has(headword, counterpart)
  }


    /**
   * Removes all word pairs in the lexicon.
   */
  clear() {
    this.#lexicon.clear()
  }


  /**
   * @returns {number} The number of pairs in the lexicon.
   */
  get size() {
    return this.#lexicon.size
  }

    /**
     * @returns {WordPair[]} A copy of all word pairs.
     */
  get allPairs() {
    return this.#lexicon.allPairs
  }

  /**
   *
   */
  get allHeadwords() {
  return this.#lexicon.allHeadwords
}

/**
 *
 */
get allCounterparts() {
  return this.#lexicon.allCounterparts
}

}
