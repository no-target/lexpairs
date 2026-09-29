import fs from 'node:fs/promises'

/**
 *
 */
export class LexiconFileReader {
  #parser

  /**
   *
   * @param parser
   */
  constructor(parser = new LexiconParser()) {
    this.#parser = parser
  }

  async readDelimited(filePath, delimiter) {
    const text = await this.#readText(filePath)
    return this.#parser.parseDelimitedText(text, delimiter)
  }

  async readJson(filePath, keys) {
    const text = await this.#readText(filePath)
    return this.#parser.parseJson(text, keys)
  }

  /**
   *
   * @param filePath
   */
  async #readText(filePath) {
    try {
      return await fs.readFile(filePath, 'utf-8')
    } catch (error) {
      if (error.code === ' ENOENT') {
        throw new Error(`File not found: ${filePath}`, { cause: error })
      }
      throw error
    }
  }
}
