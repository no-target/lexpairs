/**
 *
 */
export class FuzzyMatcher {
  #distanceCalculator
  #maxDistance

  /**
   *
   * @param distanceCalculator
   * @param maxDistance
   */
  constructor(distanceCalculator, maxDistance) {
    if (typeof distanceCalculator?.calculateDistance !== 'function') {
      throw new TypeError('distanceCalculator must have a calculateDistance(a, b) method')
    }

    if (!Number.isInteger(maxDistance) || maxDistance < 0) {
      throw new TypeError('maxDistance must be a non-negative integer')
    }

    this.#distanceCalculator = distanceCalculator
    this.#maxDistance = maxDistance
  }

  /**
   *
   * @param searchTerm
   * @param words
   */
  findApproximateMatches(searchTerm, words) {
    return words.filter((word) => this.#isSimilar(searchTerm.toLowerCase(), word.toLowerCase()))
  }

  /**
   *
   * @param firstWord
   * @param secondWord
   */
  #isSimilar(firstWord, secondWord) {
    const distance = this.#distanceCalculator.calculateDistance(firstWord, secondWord)

    return distance <= this.#maxDistance
  }
}
