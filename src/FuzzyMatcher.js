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
    const distances = []

    for (let sourceIndex = 0; sourceIndex <= source.length; sourceIndex++) {
      distances[sourceIndex] = [sourceIndex]
    }

    for (let targetIndex = 0; targetIndex <= target.length; targetIndex++) {
      distances[0][targetIndex] = targetIndex
    }

    for (let sourceIndex = 1; sourceIndex <= source.length; sourceIndex++) {
      for (let targetIndex = 1; targetIndex <= target.length; targetIndex++) {
        const sourceCharacter = source[sourceIndex - 1]
        const targetCharacter = target[targetIndex - 1]
        const substitutionCost = sourceCharacter === targetCharacter ? 0 : 1

        const viaSubstitution = distances[sourceIndex - 1][targetIndex - 1] + substitutionCost
        const viaInsertion = distances[sourceIndex][targetIndex - 1] + 1
        const viaDeletion = distances[sourceIndex - 1][targetIndex] + 1

        distances[sourceIndex][targetIndex] = Math.min(viaSubstitution, viaInsertion, viaDeletion)
      }
    }

    return distances[source.length][target.length]
  }
}
