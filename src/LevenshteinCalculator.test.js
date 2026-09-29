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

  
})