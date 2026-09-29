import { LevenshteinCalculator } from './LevenshteinCalculator.js'

/**
 * Provides lookup strategies over a WordPairCollection.
 *
 */
export class LexiconLookup {
  #collection
  #distanceCalculator

  /**
   * Creates a new lookup service for the given collection.
   *
   * Uses Levenshtein distance by default, but any calculator with a
   * calculateDistance(a, b) method can be passed in.
   *
   * @param {WordPairCollection} collection - The collection to look up in.
   * @param {LevenshteinCalculator} [distanceCalculator] - The distance calculator to use.
   * @throws {TypeError} If distanceCalculator lacks a calculateDistance method.
   */
  constructor(collection, distanceCalculator = new LevenshteinCalculator()) {
    if (typeof distanceCalculator?.calculateDistance !== 'function') {
      throw new TypeError('distanceCalculator must have a calculateDistance(a, b) method')
    }

    this.#collection = collection
    this.#distanceCalculator = distanceCalculator
  }

  /**
   * Returns all pairs where the headword equals the given word.
   *
   * @param {string} headword - The headword to find associated pairs for.
   * @returns {WordPair[]} The matching pairs, in insertion order.
   */
  findPairsByHeadword(headword) {
    return this.#collection.findPairsByHeadword(headword)
  }

  /**
   * Returns all pairs where the counterpart equals the given word.
   *
   * @param {string} counterpart - The counterpart word to find associated pairs for.
   * @returns {WordPair[]} The matching pairs, in insertion order.
   */
  findPairsByCounterpart(counterpart) {
    return this.#collection.findPairsByCounterpart(counterpart)
  }

  /**
   * Returns all counterparts associated with the given headword.
   *
   * @param {string} headword - The headword to look up associated counterparts for.
   * @returns {string[]} The counterparts for the headword, in insertion order.
   */
  findCounterparts(headword) {
    return this.#collection.findCounterparts(headword)
  }

  /**
   * Returns all headwords associated with the given counterpart word.
   *
   * @param {string} counterpart - The counterpart to look up associated headwords for.
   * @returns {string[]} The headwords for the counterpart, in insertion order.
   */
  findHeadwords(counterpart) {
    return this.#collection.findHeadwords(counterpart)
  }

  /**
   * Returns pairs whose headword is within the specified
   * Levenshtein distance of the given word.
   *
   * @param {string} word - The word to compare against headwords.
   * @param {number} maxDistance - The maximum allowed edit distance.
   * @returns {WordPair[]} The matching pairs, in insertion order.
   */
  similarHeadword(word, maxDistance) {
    const matchingHeadwords = this.#collection.allHeadwords.filter((headword) =>
      this.#isWithinMaxDistance(word, headword, maxDistance)
    )

    return matchingHeadwords.flatMap((headword) => this.#collection.findPairsByHeadword(headword))
  }

  /**
   * Returns pairs where its counterpart word is within the specified
   * Levenshtein distance of the given word.
   *
   * @param {string} word - The word to compare against counterparts.
   * @param {number} maxDistance - The maximum allowed edit distance.
   * @returns {WordPair[]} The matching pairs, in insertion order.
   */
  similarCounterpart(word, maxDistance) {
    const matchingCounterparts = this.#collection.allCounterparts.filter((counterpart) =>
      this.#isWithinMaxDistance(word, counterpart, maxDistance)
    )

    return matchingCounterparts.flatMap((counterpart) => this.#collection.findPairsByCounterpart(counterpart))
  }

  /**
   * Checks whether two words are within the specified maximum distance.
   *
   * @param {string} firstWord - The first word to compare.
   * @param {string} secondWord - The second word to compare.
   * @param {number} maxDistance - The maximum allowed distance.
   * @returns {boolean} True if the words are within the maximum distance.
   */
  #isWithinMaxDistance(firstWord, secondWord, maxDistance) {
    const distance = this.#distanceCalculator.calculateDistance(firstWord.toLowerCase(), secondWord.toLowerCase())

    return distance <= maxDistance
  }
}
