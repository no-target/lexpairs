export class FuzzyMatcher {
  /**
   * Calculates the Levenshtein distance between two strings: the minimum
   * number of single-character insertions, deletions and substitutions
   * needed to turn one string into the other.
   *
   * @param {string} source - The string to start from.
   * @param {string} target - The string to end up with.
   * @returns {number} The edit distance between the two strings.
   */
  distance(source, target) {
    const distances = this.#createWithEdges(source, target)

    this.#fillInner(distances, source, target)

    return distances[source.length][target.length]
  }

  /**
   *
   * @param {string} source - The string to start from.
   * @param {string} target - The string to end up with.
   * @returns {number[][]} The table with its edges filled in.
   */
  #createWithEdges(source, target) {
    const distances = []
    for (let sourceIndex = 0; sourceIndex <= source.length; sourceIndex++) {
      distances[sourceIndex] = [sourceIndex]
    }

    for (let targetIndex = 0; targetIndex <= target.length; targetIndex++) {
      distances[0][targetIndex] = targetIndex
    }

    return distances
  }

   /**
   * Fills every cell that is not on the first row or column.
   *
   * @param {number[][]} distances - The table to fill in.
   * @param {string} source - The string to start from.
   * @param {string} target - The string to end up with.
   */
  #fillInner(distances, source, target) {
    for (let sourceIndex = 1; sourceIndex <= source.length; sourceIndex++) {
      for (let targetIndex = 1; targetIndex <= target.length; targetIndex++) {
        distances[sourceIndex][targetIndex] =
          this.#lowestCost(distances, source, target, sourceIndex, targetIndex)
      }
    }
  }

  /**
   * Finds the cheapest way to reach a cell from its neighbours.
   *
   * @param {number[][]} distances - The table built so far.
   * @param {string} source - The string to start from.
   * @param {string} target - The string to end up with.
   * @param {number} sourceIndex - How many characters of the source are used.
   * @param {number} targetIndex - How many characters of the target are used.
   * @returns {number} The edit distance for this cell.
   */
  #lowestCost(distances, source, target, sourceIndex, targetIndex) {
    const sourceCharacter = source[sourceIndex - 1]
    const targetCharacter = target[targetIndex - 1]
    const substitutionCost = sourceCharacter === targetCharacter ? 0 : 1

    const viaSubstitution = distances[sourceIndex - 1][targetIndex - 1] + substitutionCost
    const viaInsertion = distances[sourceIndex][targetIndex - 1] + 1
    const viaDeletion = distances[sourceIndex - 1][targetIndex] + 1

    return Math.min(viaSubstitution, viaInsertion, viaDeletion)
  }
}
