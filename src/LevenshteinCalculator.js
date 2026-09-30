/**
 *
 */
export class LevenshteinCalculator {
  /**
   * Calculates the minimum number of single-character edits
   * needed to transform one string into another.
   *
   * @param {string} firstWord - The first string.
   * @param {string} secondWord - The second string.
   * @returns {number} The Levenshtein edit distance.
   * @throws {TypeError} If either argument is not a string.
   */
  calculateDistance(firstWord, secondWord) {
    if (typeof firstWord !== 'string' || typeof secondWord !== 'string') {
      throw new TypeError('Both arguments must be strings')
    }

    const matrix = this.#createDistanceMatrix(firstWord, secondWord)

    this.#fillDistanceMatrix(matrix, firstWord, secondWord)

    return matrix[firstWord.length][secondWord.length]
  }

  /**
   * Creates the distance matrix with its first row and column initialized.
   *
   * @param {string} firstWord - The first string.
   * @param {string} secondWord - The second string.
   * @returns {number[][]} The initialized distance matrix.
   */
  #createDistanceMatrix(firstWord, secondWord) {
    const matrix = []

    for (let firstIndex = 0; firstIndex <= firstWord.length; firstIndex++) {
      matrix[firstIndex] = [firstIndex]
    }

    for (let secondIndex = 0; secondIndex <= secondWord.length; secondIndex++) {
      matrix[0][secondIndex] = secondIndex
    }

    return matrix
  }

  /**
   * Fills the remaining cells of the distance matrix.
   *
   * @param {number[][]} matrix - The distance matrix.
   * @param {string} firstWord - The first string.
   * @param {string} secondWord - The second string.
   */
  #fillDistanceMatrix(matrix, firstWord, secondWord) {
    for (let firstIndex = 1; firstIndex <= firstWord.length; firstIndex++) {
      this.#fillRow(matrix, firstWord, secondWord, firstIndex)
    }
  }

  /**
   * Fills one row of the distance matrix.
   *
   * @param {number[][]} matrix - The distance matrix.
   * @param {string} firstWord - The first string.
   * @param {string} secondWord - The second string.
   * @param {number} firstIndex - The index of the current row.
   */
  #fillRow(matrix, firstWord, secondWord, firstIndex) {
    for (let secondIndex = 1; secondIndex <= secondWord.length; secondIndex++) {
      matrix[firstIndex][secondIndex] = this.#calculateCellDistance(
        matrix,
        firstWord,
        secondWord,
        firstIndex,
        secondIndex
      )
    }
  }

  /**
   * Calculates the minimum distance for a single cell.
   *
   * @param {number[][]} matrix - The distance matrix.
   * @param {string} firstWord - The first string.
   * @param {string} secondWord - The second string.
   * @param {number} firstIndex - The current row index.
   * @param {number} secondIndex - The current column index.
   * @returns {number} The minimum distance for the cell.
   */
  #calculateCellDistance(matrix, firstWord, secondWord, firstIndex, secondIndex) {
    const charactersAreEqual = firstWord[firstIndex - 1] === secondWord[secondIndex - 1]

    const substitutionCost = charactersAreEqual ? 0 : 1

    const viaSubstitution = matrix[firstIndex - 1][secondIndex - 1] + substitutionCost

    const viaInsertion = matrix[firstIndex][secondIndex - 1] + 1

    const viaDeletion = matrix[firstIndex - 1][secondIndex] + 1

    return Math.min(viaSubstitution, viaInsertion, viaDeletion)
  }
}
