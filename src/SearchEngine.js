import { LevenshteinCalculator } from './LevenshteinCalculator.js'

/**
 *
 */
export class SearchEngine {
  #collection
  #distanceCalculator

  /**
   *
   * @param collection
   * @param distanceCalculator
   */
  constructor(collection, distanceCalculator = new LevenshteinCalculator()) {
    if (typeof distanceCalculator?.calculateDistance !== 'function') {
      throw new TypeError(
        'distanceCalculator must have a calculateDistance(a, b) method',
      )
    }

    this.#collection = collection
    this.#distanceCalculator = distanceCalculator
  }



  /**
   * Returns pairs with an exact source word.
   *
   * @param {string} word
   * @returns {WordPair[]}
   */
  exactSource(word) {
    return this.#collection.findPairsBySource(word)
  }

  /**
   * Returns  pairs with an exact target word.
   *
   * @param {string} word
   * @returns {WordPair[]}
   */
  exactTarget(word) {
    return this.#collection.findPairsByTarget(word)
  }



 /**
   * Returns pairs whose source word is within the specified
   * Levenshtein distance of the search term.
   *
   * @param {string} searchTerm
   * @param {number} maxDistance
   * @returns {WordPair[]}
   */
  fuzzySource(searchTerm, maxDistance = 2) {
  const normalizedSearchTerm = searchTerm.toLowerCase()

  const matchingSources = this.#collection
    .getAllSourceWords()
    .filter((sourceWord) => {
      const distance = this.#distanceCalculator.calculateDistance(
        normalizedSearchTerm,
        sourceWord.toLowerCase(),
      )

      return distance <= maxDistance
    })

  return matchingSources.flatMap((source) =>
    this.#collection.findPairsBySource(source),
  )
}

  /**
   * Returns pairs whose target word is within the specified
   * Levenshtein distance of the search term.
   *
   * @param {string} searchTerm
   * @param {number} maxDistance
   * @returns {WordPair[]}
   */
  fuzzyTarget(searchTerm, maxDistance = 2) {
  const normalizedSearchTerm = searchTerm.toLowerCase()

  const matchingTargets = this.#collection
    .getAllTargetWords()
    .filter((targetWord) => {
      const distance = this.#distanceCalculator.calculateDistance(
        normalizedSearchTerm,
        targetWord.toLowerCase(),
      )

      return distance <= maxDistance
    })

  return matchingTargets.flatMap((target) =>
    this.#collection.findPairsByTarget(target),
  )
}
}



