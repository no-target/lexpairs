import fs from 'node:fs'
import { WordPair } from './WordPair.js'


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

  parseDelimitedText(text, delimiter = ',') {
    // Split on \n (Unix) or \r\n (Windows) line endings
    const lines = text.split(/\r?\n/)
    const pairs = []

    for (const line of lines) {
      const trimmedLine = line.trim()
      if (!trimmedLine) {
        continue
      }

      const fields = trimmedLine.split(delimiter)
      if (fields.length < 2) {
        continue
      }

      const source = fields[0].trim()
      const target = fields[1].trim()

      if (source && target) {
        pairs.push(new WordPair(source, target))
      }
    }
  }

}