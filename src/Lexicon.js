import { LexiconFileReader } from './LexiconFileReader.js'
import { WordPairCollection } from './WordPairCollection.js'
import { LexiconLookup } from './LexiconLookup.js'

/**
 * A collection of word pairs that can be loaded from files and looked up.
 *
 * @example
 * // Create an empty lexicon
 * const lexicon = new Lexicon()
 *
 * // Load pairs from a CSV file
 * await lexicon.loadFromFile('words.csv', ',')
 *
 * // Look up an exact match
 * lexicon.lookup.findByHeadword('hus')
 * // → [{ headword: 'hus', counterpart: 'house' }]
 *
 * // Fuzzy lookup: find headwords within 2 edits of 'huss'
 * lexicon.lookup.similarHeadword('huss', 2)
 * // → [{ headword: 'hus', counterpart: 'house' }]
 */
export class Lexicon {
  #lexicon
  #fileReader
  #lookup

  /**
   * Creates a new, empty lexicon.
   *
   * Sets up the internal word pair collection, the file reader,
   * and the lookup service.
   */
  constructor() {
    this.#lexicon = new WordPairCollection()
    this.#fileReader = new LexiconFileReader()
    this.#lookup = new LexiconLookup(this.#lexicon)
  }

  /**
   * Provides access to lookup strategies over the lexicon.
   *
   * @returns {LexiconLookup} The lookup service for the lexicon.
   */
  get lookup() {
    return this.#lookup
  }

  /**
   * Loads word pairs from a delimited text file.
   *
   * @param {string} filePath - The path to the file to read.
   * @param {string} delimiter - The character separating fields on each line.
   * @returns {Promise<void>} Resolves when all pairs have been added.
   * @throws {Error} If the file cannot be read.
   * @throws {TypeError} If any line contains invalid data.
   */
  async loadFromFile(filePath, delimiter) {
    const wordPairs = await this.#fileReader.readDelimited(filePath, delimiter)

    this.#lexicon.addMany(wordPairs)
  }

  /**
   * Loads word pairs from a JSON file.
   *
   * @param {string} filePath - The path to the file to read.
   * @param {{ headwordKey: string, counterpartKey: string }} keys - The property names holding the headword and counterpart.
   * @returns {Promise<void>} Resolves when all pairs have been added.
   * @throws {Error} If the file cannot be read.
   * @throws {SyntaxError} If the file is not valid JSON.
   * @throws {TypeError} If keys are missing or any item is invalid.
   */
  async loadFromJson(filePath, keys) {
    const wordPairs = await this.#fileReader.readJson(filePath, keys)

    this.#lexicon.addMany(wordPairs)
  }

  /**
   * Adds a word pair to the lexicon.
   *
   * @param {string} headword - The lookup word of the pair.
   * @param {string} counterpart - The word associated with the headword.
   * @throws {TypeError} If either argument is not a non-empty string.
   * @throws {Error} If the pair already exists in the lexicon.
   */
  add(headword, counterpart) {
    this.#lexicon.add(headword, counterpart)
  }

  /**
   * Removes a word pair from the lexicon.
   *
   * @param {string} headword - The headword of the pair to remove.
   * @param {string} counterpart - The counterpart of the pair to remove.
   * @returns {WordPair} The removed word pair.
   * @throws {Error} If the pair is not found in the lexicon.
   */
  remove(headword, counterpart) {
    return this.#lexicon.remove(headword, counterpart)
  }

  /**
   * Checks whether a specific word pair exists in the lexicon.
   *
   * @param {string} headword - The headword of the pair.
   * @param {string} counterpart - The counterpart of the pair.
   * @returns {boolean} True if the pair exists, false otherwise.
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
   * Returns the number of word pairs in the lexicon.
   *
   * @returns {number} The count of pairs currently in the lexicon.
   */
  get size() {
    return this.#lexicon.size
  }

  /**
   * Returns a shallow copy of all word pairs in the lexicon.
   *
   * @returns {WordPair[]} An array containing all word pairs.
   */
  get allPairs() {
    return this.#lexicon.allPairs
  }

  /**
   * Returns all unique headwords in the lexicon.
   *
   * @returns {string[]} The headwords, in insertion order.
   */
  get allHeadwords() {
    return this.#lexicon.allHeadwords
  }

  /**
   * Returns all unique counterparts in the lexicon.
   *
   * @returns {string[]} The counterparts, in insertion order.
   */
  get allCounterparts() {
    return this.#lexicon.allCounterparts
  }
}
