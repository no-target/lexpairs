import fs from 'node:fs/promises'
import { LexiconParser } from './LexiconParser.js'

/**
 * Reads lexicon data from files, delegates parsing to a LexiconParser.
 */
export class LexiconFileReader {
  #parser

  /**
   * Creates a new LexiconFileReader.
   *
   * Uses a new LexiconParser by default.
   *
   * @param {LexiconParser} [parser] - The parser used to convert raw file text into word pairs.
   */
  constructor(parser = new LexiconParser()) {
    this.#parser = parser
  }

  /**
   * Reads a delimited text file and parses it into word pairs.
   *
   * @param {string} filePath - The path to the file to read.
   * @param {string} delimiter - The character separating fields on each line.
   * @returns {Promise<WordPair[]>} The parsed word pairs.
   * @throws {Error} If the file is not found.
   * @throws {TypeError} If the text contains invalid data.
   */
  async readDelimited(filePath, delimiter) {
    const text = await this.#readText(filePath)
    return this.#parser.parseDelimitedText(text, delimiter)
  }

  /**
   * Reads a JSON file and parses it into word pairs.
   *
   * @param {string} filePath - The path to the file to read.
   * @param {{ headwordKey: string, counterpartKey: string }} keys - The property names holding the headword and counterpart.
   * @returns {Promise<WordPair[]>} The parsed word pairs.
   * @throws {Error} If the file is not found.
   * @throws {SyntaxError} If the file is not valid JSON.
   * @throws {TypeError} If keys are missing or any item is invalid.
   */
  async readJson(filePath, keys) {
    const text = await this.#readText(filePath)
    return this.#parser.parseJson(text, keys)
  }

  /**
   * Reads a file as UTF-8 text.
   *
   * @param {string} filePath - The path to the file to read.
   * @returns {Promise<string>} The file contents as a string.
   * @throws {Error} If the file is not found.
   */
  async #readText(filePath) {
    try {
      return await fs.readFile(filePath, 'utf-8')
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error(`File not found: ${filePath}`, { cause: error })
      }
      throw error
    }
  }
}
