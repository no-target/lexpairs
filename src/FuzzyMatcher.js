export class FuzzyMatcher {

  distance(source, target) {
    const distances = this.#createWithEdges(source, target)

    this.#fillInner(distances, source, target)

    return distances[source.length][target.length]
  }


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

   
  #fillInner(distances, source, target) {
    for (let sourceIndex = 1; sourceIndex <= source.length; sourceIndex++) {
      for (let targetIndex = 1; targetIndex <= target.length; targetIndex++) {
        distances[sourceIndex][targetIndex] =
          this.#lowestCost(distances, source, target, sourceIndex, targetIndex)
      }
    }
  }

  
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
