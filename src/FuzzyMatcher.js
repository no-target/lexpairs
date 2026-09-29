
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
      this.isSimilar(searchTerm, word)
    })
  }

/**
 *
 * @param firstWord
 * @param secondWord
 */
isSimilar(firstWord, secondWord) {
  const distance = this.#distanceCalculator(firstWord, secondWord)

  return distance <= this.#maxDistance
}

}
