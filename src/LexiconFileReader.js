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

  /**
   *
   * @param filePath
   */
  async readText(filePath) {
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