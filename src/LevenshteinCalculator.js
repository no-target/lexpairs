/**
 * Calculates the Levenshtein edit distance between two strings.
 *
 * The Levenshtein distance is the minimum number of single-character
 * insertions, deletions, or substitutions required to transform one
 * string into another.
 *
 */
export class LevenshteinCalculator {
  #distanceMatrix
  #firstWord
  #secondWord
  
  /**
   * Calculates the minimum number of single-character edits
   * needed to transform one string into another.
   *
   * @param {string} firstWord - The first string.
   * @param {string} secondWord - The second string.
   * @returns {number} The Levenshtein edit distance.
   * @throws {TypeError} If either argument is not a string.
   */
  distance(firstWord, secondWord) {
    if (typeof firstWord !== 'string' || typeof secondWord !== 'string') {
      throw new TypeError('Both arguments must be strings')
    }

    this.#firstWord = firstWord
    this.#secondWord = secondWord
    this.#distanceMatrix = this.#createDistanceMatrix(firstWord, secondWord)

    this.#fillDistanceMatrix(firstWord, secondWord)

    return this.#distanceMatrix[firstWord.length][secondWord.length]
  }

  /**
   * Creates the distance matrix with its first row and column initialized.
   *
   * @returns {number[][]} The initialized distance matrix.
   */
  #createDistanceMatrix() {
    const matrix = []

    for (let firstIndex = 0; firstIndex <= this.#firstWord.length; firstIndex++) {
      matrix[firstIndex] = [firstIndex]
    }

    for (let secondIndex = 0; secondIndex <= this.#secondWord.length; secondIndex++) {
      matrix[0][secondIndex] = secondIndex
    }

    return matrix
  }

  /**
   * Fills the remaining cells of the distance matrix.
   *
   */
  #fillDistanceMatrix() {
    for (let firstIndex = 1; firstIndex <= this.#firstWord.length; firstIndex++) {
      this.#fillRow(firstIndex)
    }
  }

  /**
   * Fills one row of the distance matrix.
   *
   * @param {number} firstIndex - The index of the current row.
   */
  #fillRow(firstIndex) {
  for (let secondIndex = 1; secondIndex <= this.#secondWord.length; secondIndex++) {
    this.#distanceMatrix[firstIndex][secondIndex] = this.#calculateCellDistance(
      firstIndex,
      secondIndex,
    )
  }
}

  /**
   * Calculates the minimum distance for a single cell.
   *
   * @param {number} firstIndex - The current row index.
   * @param {number} secondIndex - The current column index.
   * @returns {number} The minimum distance for the cell.
   */
  #calculateCellDistance(firstIndex, secondIndex) {
    const charactersAreEqual = this.#firstWord[firstIndex - 1] === this.#secondWord[secondIndex - 1]

    const substitutionCost = charactersAreEqual ? 0 : 1

    const viaSubstitution = this.#distanceMatrix[firstIndex - 1][secondIndex - 1] + substitutionCost

    const viaInsertion = this.#distanceMatrix[firstIndex][secondIndex - 1] + 1

    const viaDeletion = this.#distanceMatrix[firstIndex - 1][secondIndex] + 1

    return Math.min(viaSubstitution, viaInsertion, viaDeletion)
  }
}
