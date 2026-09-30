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
   * Checks whether the headword matches the given word, case-insensitive.
   *
   * @param {string} word - The word to compare against.
   * @returns {boolean} True if the headword matches.
   */
  hasHeadword(word) {
    return this.#headword.toLowerCase() === word.toLowerCase()
  }

  /**
   * Checks whether the counterpart matches the given word, case-insensitive.
   *
   * @param {string} word - The word to compare against.
   * @returns {boolean} True if the counterpart matches.
   */
  hasCounterpart(word) {
    return this.#counterpart.toLowerCase() === word.toLowerCase()
  }

  /**
   * Checks whether this pair equals another pair, case-insensitive.
   *
   * @param {WordPair} other - The pair to compare against.
   * @returns {boolean} True if both headword and counterpart match.
   */
  equals(other) {
    return this.hasHeadword(other.headword) && this.hasCounterpart(other.counterpart)
  }
}
