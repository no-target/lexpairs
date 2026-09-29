import { describe, it, expect, beforeEach } from 'vitest'
import { LevenshteinDistance } from './LevenshteinDistance.js'

describe('LevenshteinDistance', () => {
   let distance

  beforeEach(() => {
    distance = new LevenshteinDistance()
  })

   describe('calculate', () => {

     it('should throw a TypeError when an argument is not a string', () => {
      expect(() => distance.distance(123, 'hus')).toThrow(TypeError)
      expect(() => distance.distance(null, 'hus')).toThrow(TypeError)
      expect(() => distance.distance('haus', 456)).toThrow(TypeError)
      expect(() => distance.distance('haus', undefined)).toThrow(TypeError)
    })
    

    
    it('should return 0 for identical strings', () => {
      expect(distance.calculate('hus', 'hus')).toBe(0)
    })

    it('should return the length of targetText when sourceText is empty', () => {
      expect(distance.calculate('', 'hus')).toBe(3)
    })

    it('should return the length of sourceText when targetText is empty', () => {
      expect(distance.calculate('hus', '')).toBe(3)
    })

    it('should count a single substitution as 1', () => {
      expect(distance.calculate('hus', 'has')).toBe(1)
    })

    it('should count a single insertion as 1', () => {
      expect(distance.calculate('Haus', 'Hause')).toBe(1)
    })

    it('should calculate the edit distance between two words', () => {
      expect(distance.calculate('kitten', 'sitting')).toBe(3)
    })

    it('should be symmetric', () => {
      const forward = distance.calculate('kitten', 'sitting')
      const backward = distance.calculate('sitting', 'kitten')
      expect(forward).toBe(backward)
    })
  })

  
})