/**
 *
 */
export class LevenshteinDistance {

 calculate(firstText, secondText) {
    if (typeof firstText !== 'string' || typeof secondText !== 'string') {
      throw new TypeError('Both arguments must be strings')
    }

    const matrix = this.#createDistanceMatrix(firstText, secondText)
    this.#fillInner(matrix, firstText, secondText)

    return matrix[firstText.length][secondText.length]
  }

  #fillInner(matrix, firstText, secondText) {
    for (let firstIndex = 1; firstIndex <= firstText.length; firstIndex++) {
      for (let secondIndex = 1; secondIndex <= secondText.length; secondIndex++) {
        const charactersAreEqual =
          firstText[firstIndex - 1] === secondText[secondIndex - 1]

        const substitutionCost = charactersAreEqual ? 0 : 1

        const viaSubstitution =
          matrix[firstIndex - 1][secondIndex - 1] + substitutionCost

        const viaInsertion =
          matrix[firstIndex][secondIndex - 1] + 1

        const viaDeletion =
          matrix[firstIndex - 1][secondIndex] + 1

        matrix[firstIndex][secondIndex] = Math.min(
          viaSubstitution,
          viaInsertion,
          viaDeletion,
        )
      }
    }
  }

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
}
