import { describe, it, expect } from 'vitest'
import { FuzzyMatcher } from './FuzzyMatcher.js'
import { LevenshteinCalculator } from './LevenshteinCalculator.js'

describe('FuzzyMatcher', () => {
  const calculator = new LevenshteinCalculator()

  describe('findApproximateMatches', () => {
    it('should return words within maxDistance', () => {
      const matcher = new FuzzyMatcher(calculator, 2)
      expect(matcher.findApproximateMatches('kitten', ['kitten', 'smitten', 'sitting', 'dog']))
        .toEqual(['kitten', 'smitten'])
    })

  })
})