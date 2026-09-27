import fs from 'node:fs'

/**
 *
 */
export class LexiconParser {


  /**
   *
   * @param filePath
   */
  parse(filePath) {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`)
    }
  }

}