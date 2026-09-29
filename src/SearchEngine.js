/**
 *
 */
export class SearchEngine {
   #collection
  #distanceCalculator

  constructor(collection, distanceCalculator = new LevenshteinDistance()) {
    if (typeof collection?.findPairsBySource !== 'function') {
      throw new TypeError('collection must have a findPairsBySource method')
    }

    if (typeof distanceCalculator?.calculateDistance !== 'function') {
      throw new TypeError(
        'distanceCalculator must have a calculateDistance(a, b) method',
      )
    }

    this.#collection = collection
    this.#distanceCalculator = distanceCalculator
  }

  fuzzySearch(searchTerm, maxDistance = 2) {
   const sources = this.#collection
    .getAllSourceWords()
    .filter((sourceWord) => {
      const distance = this.#distanceCalculator.calculateDistance(
        searchTerm.toLowerCase(),
        sourceWord.toLowerCase(),
      )

      return distance <= maxDistance
    })

  return sources.flatMap((source) =>
    this.#collection.findPairsBySource(source),
  )
}
}



