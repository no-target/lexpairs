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

      if (!trimmedLine) {
    continue
  }
      const parts = trimmedLine.split(delimiter)

      const source = parts[0]
      const target = parts[1]

      if (source && target) {
        pairs.push(this.#createWordPair(source, target))
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
  parseJson(text, { source, target }) {
   const data = JSON.parse(text)

    return data.map((item) => {
    return this.#createWordPair(item[source], item[target])
  })
  }

  /**
   *
   * @param source
   * @param target
   */
  #createWordPair(source, target) {
    if (!source || !target) {
      throw new Error('Source and target are required')
    }

    return new WordPair(source, target)
  }
}
