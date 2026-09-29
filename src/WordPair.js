/**
 * Represents a pair of related words.
 */
export class WordPair {
  #headword
  #counterpart

  /**
   * Creates a new word pair.
   *
   * @param {string} headword - The primary word of the pair.
   * @param {string} counterpart - The word associated with the headword.
   */
  constructor(headword, counterpart) {
    if (typeof headword !== 'string' || headword.trim() === '') {
      throw new TypeError('Headword must be a non-empty string')
    }

    if (typeof counterpart !== 'string' || counterpart.trim() === '') {
      throw new TypeError('Counterpart must be a non-empty string')
    }

    this.#headword = headword.trim()
    this.#counterpart = counterpart.trim()
  }

  /**
   * Gets the headword.
   *
   * @returns {string} The headword.
   */
  get headword() {
    return this.#headword
  }

  /**
   * Gets the counterpart word.
   *
   * @returns {string} The counterpart word.
   */
  get counterpart() {
    return this.#counterpart
  }

  /**
   * Checks whether a pair is equal to another pair.
   *
   * @param {WordPair} other - The pair to compare against.
   * @returns {boolean} True if headword and counterword both match.
   */
  equals(other) {
    return this.#headword === other.#headword && this.#counterpart === other.#counterpart
  }
}
