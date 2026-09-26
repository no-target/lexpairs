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
   * @param {string} target - The word associated with the source word.
   */
  constructor(source, target) {
    if (typeof source !== 'string' || source.trim() === '') {
      throw new TypeError('Source word must be a non-empty string')
    }

    if (typeof target !== 'string' || target.trim() === '') {
      throw new TypeError('Target word  must be a non-empty string')
    }

    this.#source = source.trim()
    this.#target = target.trim()
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
