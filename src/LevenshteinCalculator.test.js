import { describe, it, expect } from 'vitest'
import { LevenshteinCalculator } from './LevenshteinCalculator.js'

describe('LevenshteinCalculator', () => {
  describe('constructor', () => {
    it('should create an instance when given valid string inputs', () => {
      const calc = new LevenshteinCalculator('haus', 'hus')
      expect(calc).toBeInstanceOf(LevenshteinCalculator)
    })

    it('should throw a TypeError when sourceText is not a string', () => {
      expect(() => new LevenshteinCalculator(123, 'hus')).toThrow(TypeError)
      expect(() => new LevenshteinCalculator(null, 'hus')).toThrow(TypeError)
    })

    it('should throw a TypeError when targetText is not a string', () => {
      expect(() => new LevenshteinCalculator('haus', 456)).toThrow(TypeError)
      expect(() => new LevenshteinCalculator('haus', undefined)).toThrow(TypeError)
    })
  })

   describe('distance', () => {
    it('should return 0 for identical strings', () => {
      expect(new LevenshteinCalculator('hus', 'hus').distance).toBe(0)
    })

    it('should return the length of targetText when sourceText is empty', () => {
      expect(new LevenshteinCalculator('', 'hus').distance).toBe(3)
    })

    it('should return the length of sourceText when targetText is empty', () => {
      expect(new LevenshteinCalculator('hus', '').distance).toBe(3)
    })

    it('should count a single substitution as 1', () => {
      expect(new LevenshteinCalculator('hus', 'has').distance).toBe(1)
    })

    it('should count a single insertion as 1', () => {
      expect(new LevenshteinCalculator('Haus', 'Hause').distance).toBe(1)
    })

    it('should calculate the edit distance between two words', () => {
      expect(new LevenshteinCalculator('kitten', 'sitting').distance).toBe(3)
    })

    it('should be symmetric', () => {
      const forward = new LevenshteinCalculator('kitten', 'sitting').distance
      const backward = new LevenshteinCalculator('sitting', 'kitten').distance
      expect(forward).toBe(backward)
    })
  })

  
})