/**
 *
 */
export class LevenshteinCalculator {
  #sourceText
  #targetText
  #distanceMatrix

  /**
   *
   * @param sourceText
   * @param targetText
   */
  constructor(sourceText, targetText) {
    if (typeof sourceText !== 'string' || typeof targetText !== 'string') {
      throw new TypeError('Both sourceText and targetText must be strings')
    }

    this.#sourceText = sourceText
    this.#targetText = targetText
    this.#distanceMatrix = this.#createDistanceMatrix()
    this.#fillInner()
  }

  /**
   *
   */
  get distance() {
    return this.#distanceMatrix[this.#sourceText.length][this.#targetText.length]
  }

  /**
   *
   */
  #fillInner() {
    for (let sourceIndex = 1; sourceIndex <= this.#sourceText.length; sourceIndex++) {
      this.#fillRow(sourceIndex)
    }
  }

  /**
   *
   * @param sourceIndex
   */
  #fillRow(sourceIndex) {
    for (let targetIndex = 1; targetIndex <= this.#targetText.length; targetIndex++) {
      this.#distanceMatrix[sourceIndex][targetIndex] = this.#calculateCellCost(sourceIndex, targetIndex)
    }
  }
  /**
   * Calculates the cheapest way to reach a cell from its neighbours.
   *
   * @param {number} sourceIndex - How many characters of the first word are used.
   * @param {number} targetIndex - How many characters of the second word are used.
   * @returns {number} The edit distance for this cell.
   */
  #calculateCellCost(sourceIndex, targetIndex) {
    const lastCharactersAreEqual = this.#sourceText[sourceIndex - 1] === this.#targetText[targetIndex - 1]
    const substitutionCost = lastCharactersAreEqual ? 0 : 1

    const viaSubstitution = this.#distanceMatrix[sourceIndex - 1][targetIndex - 1] + substitutionCost
    const viaInsertion = this.#distanceMatrix[sourceIndex][targetIndex - 1] + 1
    const viaDeletion = this.#distanceMatrix[sourceIndex - 1][targetIndex] + 1

    return Math.min(viaSubstitution, viaInsertion, viaDeletion)
  }

  /**
   * Creates the table with only its first row and column filled in:
   * turning a prefix into an empty word takes one deletion per character,
   * and the reverse takes one insertion per character.
   *
   * @returns {number[][]} The table with its edges filled in.
   */
  #createDistanceMatrix() {
    const distanceMatrix = []

    for (let sourceIndex = 0; sourceIndex <= this.#sourceText.length; sourceIndex++) {
      distanceMatrix[sourceIndex] = [sourceIndex]
    }

    for (let targetIndex = 0; targetIndex <= this.#targetText.length; targetIndex++) {
      distanceMatrix[0][targetIndex] = targetIndex
    }

    return distanceMatrix
  }
}
