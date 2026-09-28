/**
 *
 */
export class LevenshteinDistance {
  #firstWord
  #secondWord
  #distances


  /**
   *
   * @param firstWord
   * @param secondWord
   */
  constructor(firstWord, secondWord) {
    this.#firstWord = firstWord
    this.#secondWord = secondWord
    this.#distances = this.#createWithEdges()
  }

  /**
   * Fills in the table and returns the edit distance between the full words.
   *
   * @returns {number} The edit distance.
   */
  calculate() {
    this.#fillInner()

    return this.#distances[this.#firstWord.length][this.#secondWord.length]
  }

  /**
   * Fills every cell that is not on the first row or column, using the
   * cheapest of the three edit operations.
   */
  #fillInner() {
    for (let firstIndex = 1; firstIndex <= this.#firstWord.length; firstIndex++) {
      for (let secondIndex = 1; secondIndex <= this.#secondWord.length; secondIndex++) {
        this.#distances[firstIndex][secondIndex] = this.#lowestCost(firstIndex, secondIndex)
      }
    }
  }

  /**
   * Calculates the cheapest way to reach a cell from its neighbours.
   *
   * @param {number} firstIndex - How many characters of the first word are used.
   * @param {number} secondIndex - How many characters of the second word are used.
   * @returns {number} The edit distance for this cell.
   */
  #lowestCost(firstIndex, secondIndex) {
    const lastCharactersAreEqual = this.#firstWord[firstIndex - 1] === this.#secondWord[secondIndex - 1]
    const substitutionCost = lastCharactersAreEqual ? 0 : 1

    const viaSubstitution = this.#distances[firstIndex - 1][secondIndex - 1] + substitutionCost
    const viaInsertion = this.#distances[firstIndex][secondIndex - 1] + 1
    const viaDeletion = this.#distances[firstIndex - 1][secondIndex] + 1

    return Math.min(viaSubstitution, viaInsertion, viaDeletion)
  }

  /**
   * Creates the table with only its first row and column filled in:
   * turning a prefix into an empty word takes one deletion per character,
   * and the reverse takes one insertion per character.
   *
   * @returns {number[][]} The table with its edges filled in.
   */
  #createWithEdges() {
    const distances = []

    for (let firstIndex = 0; firstIndex <= this.#firstWord.length; firstIndex++) {
      distances[firstIndex] = [firstIndex]
    }

    for (let secondIndex = 0; secondIndex <= this.#secondWord.length; secondIndex++) {
      distances[0][secondIndex] = secondIndex
    }

    return distances
  }
}