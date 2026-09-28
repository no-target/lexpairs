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

  /**
   *
   * @param text
   * @param delimiter
   */
  parseDelimitedText(text, delimiter = ',') {
    const lines = text.split(/\r?\n/)
    const pairs = []

    for (const line of lines) {
      const trimmedLine = line.trim()
      const parts = trimmedLine.split(delimiter)

      const source = parts[0]
      const target = parts[1]

      if (source && target) {
        pairs.push(new WordPair(source, target))
      }
    }

    return pairs
  }

  /**
   *
   * @param text
   * @param sourceKey
   * @param targetKey
   */
  parseJson(text, sourceKey, targetKey) {
    const data = JSON.parse(text)
    const pairs = []

    for (const item of data) {
      const source = item[sourceKey]
      const target = item[targetKey]

      if (source === undefined || target === undefined) {
      throw new Error(
        `Could not find source or target field in JSON object`
      )
    }

      if (source && target) {
        pairs.push(new WordPair(source, target))
      }
    }
    return pairs
  }

}