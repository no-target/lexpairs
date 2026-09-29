import { LexiconFileReader } from './LexiconFileReader'
import { WordPairCollection } from './WordPairCollection'

export class Lexicon {
  #lexicon
  #fileReader
  #search

  constructor() {
    this.#lexicon = new WordPairCollection()
    this.#fileReader = new LexiconFileReader()
  }

  async loadFromFile(filePath, delimiter) {
    const wordPairs = await this.#fileReader.readDelimited(filePath, delimiter)

    for (const pair of wordPairs) {
      this.#lexicon.add(pair)
    }
  }

  async loadFromJson(filePath, keys) {
    const wordPairs = await this.#fileReader.readJson(filePath, keys)

    for (const pair of wordPairs) {
      this.#lexicon.add(pair)
    }
  }
}
