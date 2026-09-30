import { describe, it, expect, beforeEach } from 'vitest'
import { LexiconLookup } from './LexiconLookup.js'
import { WordPairCollection } from './WordPairCollection.js'

describe('LexiconLookup', () => {
  let collection
  let lookup

  beforeEach(() => {
    collection = new WordPairCollection()

    collection.add('sova', 'schlafen')
    collection.add('sova', 'pennen')
    collection.add('hus', 'Haus')
    collection.add('katt', 'Katze')

    lookup = new LexiconLookup(collection)
  })

  describe('constructor', () => {
    it('should reject an invalid calculator', () => {
      expect(() => new LexiconLookup(collection, {})).toThrow(TypeError)
      expect(() => new LexiconLookup(collection, null)).toThrow(TypeError)
    })
  })

  describe('findPairsByHeadword', () => {
    it('should return all matching pairs', () => {
      const pairs = lookup.findPairsByHeadword('sova')

      expect(pairs).toHaveLength(2)
      expect(pairs.map((p) => p.counterpart)).toEqual(['schlafen', 'pennen'])
    })

    it('should be case-insensitive', () => {
      expect(lookup.findPairsByHeadword('HUS')).toHaveLength(1)
    })
  })

  describe('findPairsByCounterpart', () => {
    it('should return all matching pairs', () => {
      const pairs = lookup.findPairsByCounterpart('pennen')

      expect(pairs).toHaveLength(1)
      expect(pairs[0].headword).toBe('sova')
    })

    it('should be case-insensitive', () => {
      expect(lookup.findPairsByCounterpart('HAUS')).toHaveLength(1)
    })
  })

  describe('findCounterparts', () => {
    it('should return all counterparts for a headword', () => {
      expect(lookup.findCounterparts('sova')).toEqual(['schlafen', 'pennen'])
    })

    it('should be case-insensitive', () => {
      expect(lookup.findCounterparts('HUS')).toEqual(['Haus'])
    })
  })

  describe('findHeadwords', () => {
    it('should return all headwords for a counterpart', () => {
      expect(lookup.findHeadwords('pennen')).toEqual(['sova'])
    })

    it('should be case-insensitive', () => {
      expect(lookup.findHeadwords('HAUS')).toEqual(['hus'])
    })
  })

  describe('similarHeadword', () => {
    it('should return pairs within maxDistance', () => {
      const result = lookup.similarHeadword('sovva', 1)

      expect(result).toHaveLength(2)
      expect(result.map((p) => p.counterpart)).toEqual(['schlafen', 'pennen'])
    })

    it('should be case-insensitive', () => {
      const result = lookup.similarHeadword('HUS', 1)

      expect(result).toHaveLength(1)
      expect(result[0].headword).toBe('hus')
    })
  })

  describe('similarCounterpart', () => {
    it('should return pairs within maxDistance', () => {
      const result = lookup.similarCounterpart('katz', 1)

      expect(result).toHaveLength(1)
      expect(result[0].headword).toBe('katt')
    })

    it('should be case-insensitive', () => {
      const result = lookup.similarCounterpart('katzee', 1)

      expect(result).toHaveLength(1)
      expect(result[0].counterpart).toBe('Katze')
    })
  })
})
