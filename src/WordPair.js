/**
 * Represents a pair of related words.
 */
export class WordPair {
  #source
  #target

  /**
   * Creates a new word pair.
   *
   * @param {string} source - The word used as the starting point of the pair.
   * @param {string} target -  The word associated with the source word.
   */
  constructor(source, target) {
    this.#source = source
    this.#target = target
  }

  /**
   * Gets the source word.
   *
   * @returns {string} The source word.
   */
  get source() {
    return this.#source
  }
  /**
   * Gets the target word.
   *
   * @returns {string} The target word.
   */
  get target() {
    return this.#target
  }
}
