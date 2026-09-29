
/**
 *
 */
export class FuzzyMatcher {
   #distanceCalculator
   #maxDistance

  /**
   *
   * @param distanceCalculator
   */
  constructor(distanceCalculator, maxDistance) {
    this.#distanceCalculator = distanceCalculator
    this.#maxDistance = maxDistance
  }

  /**
   *
   * @param searchTerm
   * @param words
   * @param maxDistance
   */
  findApproximateMatches(searchTerm, words) {
    return words.filter((word) => {
      const distance = this.#distanceCalculator(searchTerm, word)
      return distance <= this.#maxDistance
    })
  }
}
