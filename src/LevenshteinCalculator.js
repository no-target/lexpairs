/**
 *
 */
export class LevenshteinCalculator {

  /**
   * Calculates the minimum number of single-character edits
   * needed to transform one string into another.
   *
   * @param {string} firstText - The first string.
   * @param {string} secondText - The second string.
   * @returns {number} The Levenshtein edit distance.
   * @throws {TypeError} If either argument is not a string.
   */
 calculateDistance(firstText, secondText) {
   if (typeof firstText !== 'string' || typeof secondText !== 'string') {
      throw new TypeError('Both arguments must be strings')
    }

    const matrix = this.#createDistanceMatrix(firstText, secondText)

    this.#fillDistanceMatrix(matrix, firstText, secondText)

    return matrix[firstText.length][secondText.length]
  }

  /**
   * Creates the distance matrix with its first row and column initialized.
   *
   * @param {string} firstText - The first string.
   * @param {string} secondText - The second string.
   * @returns {number[][]} The initialized distance matrix.
   */
  #createDistanceMatrix(firstText, secondText) {
    const matrix = []

    for (let firstIndex = 0; firstIndex <= firstText.length; firstIndex++) {
      matrix[firstIndex] = [firstIndex]
    }

    for (let secondIndex = 0; secondIndex <= secondText.length; secondIndex++) {
      matrix[0][secondIndex] = secondIndex
    }

    return matrix
  }

  /**
   * Fills the remaining cells of the distance matrix.
   *
   * @param {number[][]} matrix - The distance matrix.
   * @param {string} firstText - The first string.
   * @param {string} secondText - The second string.
   */
  #fillDistanceMatrix(matrix, firstText, secondText) {
    for (let firstIndex = 1; firstIndex <= firstText.length; firstIndex++) {
      this.#fillRow(matrix, firstText, secondText, firstIndex)
    }
  }

  /**
   * Fills one row of the distance matrix.
   *
   * @param {number[][]} matrix - The distance matrix.
   * @param {string} firstText - The first string.
   * @param {string} secondText - The second string.
   * @param {number} firstIndex - The index of the current row.
   */
  #fillRow(matrix, firstText, secondText, firstIndex) {
    for (let secondIndex = 1; secondIndex <= secondText.length; secondIndex++) {
      matrix[firstIndex][secondIndex] =
        this.#calculateCellDistance(
          matrix,
          firstText,
          secondText,
          firstIndex,
          secondIndex,
        )
    }
  }

  /**
   * Calculates the minimum distance for a single cell.
   *
   * @param {number[][]} matrix - The distance matrix.
   * @param {string} firstText - The first string.
   * @param {string} secondText - The second string.
   * @param {number} firstIndex - The current row index.
   * @param {number} secondIndex - The current column index.
   * @returns {number} The minimum distance for the cell.
   */
  #calculateCellDistance(
    matrix,
    firstText,
    secondText,
    firstIndex,
    secondIndex,
  ) {
    const charactersAreEqual =
      firstText[firstIndex - 1] === secondText[secondIndex - 1]

    const substitutionCost = charactersAreEqual ? 0 : 1

    const viaSubstitution =
      matrix[firstIndex - 1][secondIndex - 1] + substitutionCost

    const viaInsertion =
      matrix[firstIndex][secondIndex - 1] + 1

    const viaDeletion =
      matrix[firstIndex - 1][secondIndex] + 1

    return Math.min(
      viaSubstitution,
      viaInsertion,
      viaDeletion,
    )
  }
}