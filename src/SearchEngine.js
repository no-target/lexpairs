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
      throw new TypeError('distanceCalculator must have a calculateDistance(a, b) method')
    }

    this.#collection = collection
    this.#distanceCalculator = distanceCalculator
  }

  /**
   * Returns pairs whose source word equals the specified word.
   *
   * @param {string} headword
   * @returns {WordPair[]}
   */
  byHeadword(headword) {
    return this.#collection.findPairsByHeadword(headword)
  }

  /**
   * Returns pairs whose target word equals the specified word.
   *
   * @param {string} searchTerm
   * @returns {WordPair[]}
   */
  byCounterpart(counterpart) {
    return this.#collection.findPairsByCounterpart(counterpart)
  }

  /**
 * Returns all counterparts associated with the specified headword.
 *
 * @param {string} headword
 * @returns {string[]}
 */
findCounterparts(headword) {
  return this.#collection.findCounterparts(headword)
}

/**
 * Returns all headwords associated with the specified counterpart.
 *
 * @param {string} counterpart
 * @returns {string[]}
 */
findHeadwords(counterpart) {
  return this.#collection.findHeadwords(counterpart)
}


  /**
   * Returns pairs whose headword is within the specified
   * Levenshtein distance of the search term.
   *
   * @param {string} searchTerm
   * @param {number} maxDistance
   * @returns {WordPair[]}
   */
  similarHeadword(searchTerm, maxDistance) {
    const matchingHeadwords = this.#collection
      .allHeadwords
      .filter((headword) => this.#isWithinMaxDistance(searchTerm, headword, maxDistance))

    return matchingHeadwords.flatMap((headword) => this.#collection.findPairsByHeadword(headword))
  }

  /**
   * Returns pairs where its counterpart word is within the specified
   * Levenshtein distance of the search term.
   *
   * @param {string} searchTerm
   * @param {number} maxDistance
   * @returns {WordPair[]}
   */
  similarCounterpart(searchTerm, maxDistance) {
    const matchingCounterparts = this.#collection
      .allCounterparts
      .filter((counterpart) => this.#isWithinMaxDistance(searchTerm, counterpart, maxDistance))

    return matchingCounterparts.flatMap((counterpart) => this.#collection.findPairsByCounterpart(counterpart))
  }

  /**
   * Checks whether two words are within the specified maximum distance.
   *
   * @param {string} firstTerm - The first word to compare.
   * @param {string} secondTerm - The second word to compare.
   * @param {number} maxDistance - The maximum allowed distance.
   * @returns {boolean} True if the words are within the maximum distance.
   */
  #isWithinMaxDistance(firstTerm, secondTerm, maxDistance) {
    const distance = this.#distanceCalculator.calculateDistance(firstTerm.toLowerCase(), secondTerm.toLowerCase())

    return distance <= maxDistance
  }
}
