import { WordPair } from './WordPair.js'

/**
 * Converts raw text (delimited text or JSON) into WordPair instances.
 */
export class LexiconParser {
  /**
   * Parses delimited text (CSV, TSV, txt or similar) into word pairs.
   * Each line produces at most one pair, built from its first two fields.
   * Extra fields are ignored, and empty or incomplete lines are skipped.
   *
   * @param {string} text - The raw text.
   * @param {string} [delimiter=','] - The character separating fields on each line, defaults to ','.
   * @returns {WordPair[]} The parsed word pairs.
   */
  parseDelimitedText(text, delimiter = ',') {
    const pairs = []

    for (const line of this.#splitLines(text)) {
      const fields = this.#trimFields(line, delimiter)

      if (this.#hasRequiredFields(fields)) {
        pairs.push(new WordPair(fields[0], fields[1]))
      }
    }

    return pairs
  }

  /**
   * Parses a JSON array of objects into word pairs.
   *
   * @param {string} text - A JSON string containing an array of objects.
   * @param {object} keys - Names of the properties holding each word.
   * @param {string} keys.headwordKey - Name of the property holding the headword.
   * @param {string} keys.counterpartKey - Name of the property holding the counterpart word.
   * @returns {WordPair[]} The parsed word pairs.
   * @throws {TypeError} If headwordKey or counterpartKey is missing.
   * @throws {SyntaxError} If the text is not valid JSON.
   * @throws {TypeError} If the JSON is not an array.
   * @throws {TypeError} If an item lacks the headword or counterpart key, or the value is not a non-empty string.
   */
  parseJson(text, { headwordKey, counterpartKey } = {}) {
    this.#validateKeys(headwordKey, counterpartKey)

    const data = JSON.parse(text)

    if (!Array.isArray(data)) {
      throw new TypeError('Expected a JSON array of objects')
    }

    return data.map((item, index) => {
      const headword = this.#requireWord(item, headwordKey, index)
      const counterpart = this.#requireWord(item, counterpartKey, index)

      return new WordPair(headword, counterpart)
    })
  }

  /**
   * Extracts and validates a word from an item.
   *
   * @param {Object} item - The object to read from.
   * @param {string} key - The property name holding the word.
   * @param {number} index - The item's position in the array.
   * @returns {string} The extracted word.
   * @throws {TypeError} If the value is not a non-empty string.
   */
  #requireWord(item, key, index) {
    const value = item[key]

    if (typeof value !== 'string' || value.trim() === '') {
      throw new TypeError(`Item at index ${index} is missing a valid '${key}'`)
    }

    return value
  }

  /**
   * Splits text into individual lines.
   *
   * Supports both Unix and Windows line endings.
   *
   * @param {string} text - The raw text.
   * @returns {string[]} The individual lines.
   */
  #splitLines(text) {
    return text.split(/\r?\n/)
  }

  /**
   * Splits a line into trimmed fields.
   *
   * @param {string} line - The line to split.
   * @param {string} delimiter - The character separating fields.
   * @returns {string[]} The trimmed fields.
   */
  #trimFields(line, delimiter) {
    return line
      .trim()
      .split(delimiter)
      .map((field) => field.trim())
  }

  /**
   * Determines whether a line contains the required fields.
   *
   * A valid line must contain both a non-empty headword and counterpart.
   *
   * @param {string[]} fields - The fields extracted from a line.
   * @returns {boolean} True if the line contains both required fields.
   */
  #hasRequiredFields(fields) {
    return Boolean(fields[0] && fields[1])
  }

  /**
   * Validates the keys used to extract words from JSON objects.
   *
   * @param {string} headwordKey - The property name containing the headword.
   * @param {string} counterpartKey - The property name containing the counterpart.
   * @throws {TypeError} If either key is missing.
   */
  #validateKeys(headwordKey, counterpartKey) {
    if (!headwordKey || !counterpartKey) {
      throw new TypeError('Both headwordKey and counterpartKey are required')
    }
  }
}
