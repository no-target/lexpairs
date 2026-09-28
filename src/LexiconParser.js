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
   * @param {string} [delimiter=','] - The character separating fields on each line.
   * @returns {WordPair[]} The parsed word pairs.
   */
  parseDelimitedText(text, delimiter = ',') {
    const lines = text.split(/\r?\n/)
    const pairs = []

    for (const line of lines) {
      const trimmedLine = line.trim()
      if (!trimmedLine) {
        continue
      }

      // Trim each field so whitespace-only fields count as empty and the line is skipped
      const [source, target] = trimmedLine.split(delimiter).map((field) => field.trim())
      if (source && target) {
        pairs.push(new WordPair(source, target))
      }
    }

    return pairs
  }

  /**
   * Parses a JSON array of objects into word pairs.
   *
   * @param {string} text - A JSON string containing an array of objects.
   * @param {Object} keys - Names of the properties holding each word.
   * @param {string} keys.sourceKey - Name of the property holding the source word.
   * @param {string} keys.targetKey - Name of the property holding the target word.
   * @returns {WordPair[]} The parsed word pairs.
   * @throws {TypeError} If sourceKey or targetKey is missing.
   * @throws {SyntaxError} If the text is not valid JSON.
   * @throws {TypeError} If the JSON is not an array.
   * @throws {TypeError} If an item lacks the source or target key, or the value is not a non-empty string.
   */
  parseJson(text, { sourceKey, targetKey } = {}) {
    if (!sourceKey || !targetKey) {
      throw new TypeError('Both sourceKey and targetKey are required')
    }

    const data = JSON.parse(text)

    if (!Array.isArray(data)) {
      throw new TypeError('Expected a JSON array of objects')
    }

    return data.map((item) => new WordPair(item[sourceKey], item[targetKey]))
  }
}
