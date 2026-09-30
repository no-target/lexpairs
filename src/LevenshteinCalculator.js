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
    this.#distanceMatrix = this.#createDistanceMatrix()

    this.#fillDistanceMatrix()

    return this.#distanceMatrix[firstWord.length][secondWord.length]
  }

  /**
   * Creates and initializes the distance matrix used by the
   * Levenshtein distance algorithm.
   *
   * Each cell represents the minimum number of edits required
   * to transform a prefix of the first word into a prefix of
   * the second word.
   *
   * The first row is initialized with the number of insertions
   * required to transform an empty string into each prefix of
   * the second word. The first column is initialized with the
   * number of deletions required to transform each prefix of
   * the first word into an empty string.
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
   * Fills all remaining cells of the distance matrix.
   *
   * Iterates over each row of the matrix and delegates the
   * calculation of individual rows to {@link #fillRow}.
   */
  #fillDistanceMatrix() {
    for (let firstIndex = 1; firstIndex <= this.#firstWord.length; firstIndex++) {
      this.#fillRow(firstIndex)
    }
  }

  /**
   * Fills all cells in a single row of the distance matrix.
   *
   * Each cell contains the minimum number of edits required to
   * transform the corresponding prefix of the first word into
   * the corresponding prefix of the second word.
   *
   * @param {number} firstIndex - The index of the row to fill.
   */
  #fillRow(firstIndex) {
    for (let secondIndex = 1; secondIndex <= this.#secondWord.length; secondIndex++) {
      this.#distanceMatrix[firstIndex][secondIndex] = this.#calculateCellDistance(firstIndex, secondIndex)
    }
  }

  /**
   * Calculates the minimum edit distance for a single cell in the
   * distance matrix.
   *
   * The cell considers three possible operations:
   * - substitution: replace one character with another
   * - insertion: insert a character into the first word
   * - deletion: remove a character from the first word
   *
   * If the current characters are equal, substitution has no cost.
   * Otherwise, substitution has a cost of one. The operation with
   * the lowest total cost determines the value of the cell.
   *
   * @param {number} firstIndex - The current row index.
   * @param {number} secondIndex - The current column index.
   * @returns {number} The minimum number of edits required for the current cell.
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
