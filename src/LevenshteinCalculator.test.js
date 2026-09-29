import { describe, it, expect, beforeEach } from 'vitest'
import { LevenshteinCalculator } from './LevenshteinCalculator.js'

describe('LevenshteinDistance', () => {
   let calculator

  beforeEach(() => {
    calculator = new LevenshteinCalculator()
  })

   describe('distance', () => {

     it('should throw a TypeError when an argument is not a string', () => {
      expect(() => calculator.calculateDistance(123, 'hus')).toThrow(TypeError)
      expect(() => calculator.calculateDistance(null, 'hus')).toThrow(TypeError)
      expect(() => calculator.calculateDistance('haus', 456)).toThrow(TypeError)
      expect(() => calculator.calculateDistance('haus', undefined)).toThrow(TypeError)
    })
    

    
    it('should return 0 for identical strings', () => {
      expect(calculator.calculateDistance('hus', 'hus')).toBe(0)
    })

    it('should return the length of targetText when sourceText is empty', () => {
      expect(calculator.calculateDistance('', 'hus')).toBe(3)
    })

    it('should return the length of sourceText when targetText is empty', () => {
      expect(calculator.calculateDistance('hus', '')).toBe(3)
    })

    it('should count a single substitution as 1', () => {
      expect(calculator.calculateDistance('hus', 'has')).toBe(1)
    })

    it('should count a single insertion as 1', () => {
      expect(calculator.calculateDistance('Haus', 'Hause')).toBe(1)
    })

    it('should calculate the edit distance between two words', () => {
      expect(calculator.calculateDistance('kitten', 'sitting')).toBe(3)
    })

    
    it('should be symmetric', () => {
      const forward = calculator.calculateDistance('kitten', 'sitting')
      const backward = calculator.calculateDistance('sitting', 'kitten')
      expect(forward).toBe(backward)
    })
  })

  
})