import { describe, it, expect, beforeEach } from 'vitest'
import { WordPair } from './WordPair.js'
import { WordPairCollection } from './WordPairCollection.js'

describe('WordPairCollection', () => {
  let wordPairCollection

  beforeEach(() => {
    wordPairCollection = new WordPairCollection()
  })

  describe('add', () => {
    it('should add a word pair to collection', () => {
      wordPairCollection.add('haus', 'hus')
      expect(wordPairCollection.size).toBe(1)
    })

    it('should throw when adding an identical pair', () => {
      wordPairCollection.add('gift', 'poison')
      expect(() => wordPairCollection.add('gift', 'poison')).toThrow()
    })

    it('should allow multiple counterparts for the same headword', () => {
      wordPairCollection.add('gift', 'married')
      wordPairCollection.add('gift', 'poison')

      expect(wordPairCollection.size).toBe(2)
    })

    it('should throw when adding a pair that differs only in case', () => {
      wordPairCollection.add('Haus', 'house')

      expect(() => wordPairCollection.add('haus', 'house')).toThrow()
      expect(() => wordPairCollection.add('HAUS', 'HOUSE')).toThrow()
    })
  })

  describe('addMany', () => {
    it('should add multiple pairs at once', () => {
      wordPairCollection.addMany([new WordPair('hus', 'haus'), new WordPair('bil', 'auto')])

      expect(wordPairCollection.size).toBe(2)
      expect(wordPairCollection.has('hus', 'haus')).toBe(true)
      expect(wordPairCollection.has('bil', 'auto')).toBe(true)
    })

    it('should throw a TypeError when pairs is not an array', () => {
      expect(() => wordPairCollection.addMany(null)).toThrow(TypeError)
      expect(() => wordPairCollection.addMany('not an array')).toThrow(TypeError)
      expect(() => wordPairCollection.addMany({})).toThrow(TypeError)
    })

    it('should throw when a pair already exists', () => {
      wordPairCollection.add('hus', 'haus')

      expect(() => wordPairCollection.addMany([new WordPair('hus', 'haus')])).toThrow()
    })

    it('should not add any pairs if one is invalid (all or nothing)', () => {
      wordPairCollection.add('hus', 'haus')

      expect(() => wordPairCollection.addMany([new WordPair('bil', 'auto'), new WordPair('hus', 'haus')])).toThrow()

      expect(wordPairCollection.size).toBe(1)
      expect(wordPairCollection.has('bil', 'auto')).toBe(false)
    })

    it('should not add any pairs when an item is not a WordPair', () => {
      expect(() =>
        wordPairCollection.addMany([new WordPair('bil', 'auto'), { headword: 'hus', counterpart: 'haus' }])
      ).toThrow(TypeError)

      expect(wordPairCollection.size).toBe(0)
    })

    it('should throw when input contains duplicate pairs', () => {
      expect(() => wordPairCollection.addMany([new WordPair('bil', 'auto'), new WordPair('bil', 'auto')])).toThrow()
    })

    it('should treat pairs with different casing as duplicates', () => {
      expect(() => wordPairCollection.addMany([new WordPair('Haus', 'house'), new WordPair('haus', 'house')])).toThrow()
    })
  })

  describe('remove', () => {
    it('should remove an existing pair and return it', () => {
      wordPairCollection.add('haus', 'hus')

      const removed = wordPairCollection.remove('haus', 'hus')

      expect(removed.headword).toBe('haus')
      expect(removed.counterpart).toBe('hus')
      expect(wordPairCollection.size).toBe(0)
    })

    it('should remove pairs regardless of case', () => {
      wordPairCollection.add('Haus', 'house')
      wordPairCollection.remove('haus', 'HOUSE')
      expect(wordPairCollection.size).toBe(0)
    })

    it('should throw when the pair does not exist', () => {
      expect(() => wordPairCollection.remove('nonexistent', 'word')).toThrow()
    })

    it('should not remove a pair when only the headword matches', () => {
      wordPairCollection.add('gift', 'married')
      wordPairCollection.add('gift', 'poison')

      wordPairCollection.remove('gift', 'poison')

      expect(wordPairCollection.size).toBe(1)
      expect(wordPairCollection.findCounterparts('gift')).toEqual(['married'])
    })
  })

  describe('findCounterparts', () => {
    it('should return all counterparts associated with a given headword', () => {
      wordPairCollection.add('gift', 'married')
      wordPairCollection.add('gift', 'poison')

      expect(wordPairCollection.findCounterparts('gift')).toEqual(['married', 'poison'])
    })

    it('should return an empty array if the headword is not found', () => {
      expect(wordPairCollection.findCounterparts('nonexistent')).toEqual([])
    })

    it('should find counterparts regardless of case', () => {
      wordPairCollection.add('Haus', 'house')
      expect(wordPairCollection.findCounterparts('haus')).toEqual(['house'])
    })
  })

  describe('findHeadwords', () => {
    it('should return all headwords associated with a given counterpart', () => {
      wordPairCollection.add('schlafen', 'sova')
      wordPairCollection.add('pennen', 'sova')

      expect(wordPairCollection.findHeadwords('sova')).toEqual(['schlafen', 'pennen'])
    })

    it('should return an empty array if the counterpart is not found', () => {
      expect(wordPairCollection.findHeadwords('nonexistent')).toEqual([])
    })

    it('should find headwords regardless of case', () => {
      wordPairCollection.add('Haus', 'house')
      expect(wordPairCollection.findHeadwords('HOUSE')).toEqual(['Haus'])
    })
  })

  describe('findPairsByHeadword', () => {
    it('should return all WordPair instances associated with a given headword', () => {
      wordPairCollection.add('gift', 'married')
      wordPairCollection.add('gift', 'poison')

      const pairs = wordPairCollection.findPairsByHeadword('gift')

      expect(pairs).toEqual([new WordPair('gift', 'married'), new WordPair('gift', 'poison')])
    })

    it('should find pairs regardless of case in headword', () => {
      wordPairCollection.add('Haus', 'house')
      expect(wordPairCollection.findPairsByHeadword('haus')).toHaveLength(1)
      expect(wordPairCollection.findPairsByHeadword('HAUS')).toHaveLength(1)
      expect(wordPairCollection.findPairsByHeadword('Haus')).toHaveLength(1)
    })

    it('should return an empty array if no pairs match the headword', () => {
      expect(wordPairCollection.findPairsByHeadword('nonexistent')).toEqual([])
    })
  })

  describe('findPairsByCounterpart', () => {
    it('should return all WordPair instances associated with a given counterpart', () => {
      wordPairCollection.add('gift', 'poison')
      wordPairCollection.add('gift', 'married')
      wordPairCollection.add('Geschenk', 'gift')

      const pairs = wordPairCollection.findPairsByCounterpart('gift')

      expect(pairs).toHaveLength(1)
      expect(pairs[0].headword).toBe('Geschenk')
    })

    it('should find pairs regardless of case in counterpart', () => {
      wordPairCollection.add('Haus', 'house')
      expect(wordPairCollection.findPairsByCounterpart('HOUSE')).toHaveLength(1)
      expect(wordPairCollection.findPairsByCounterpart('house')).toHaveLength(1)
    })

    it('should return an empty array if no pairs match the counterpart word', () => {
      expect(wordPairCollection.findPairsByCounterpart('nonexistent')).toEqual([])
    })
  })

  describe('allHeadwords', () => {
    it('should return all unique headwords', () => {
      wordPairCollection.add('gift', 'married')
      wordPairCollection.add('gift', 'poison')
      wordPairCollection.add('haus', 'hus')

      expect(wordPairCollection.allHeadwords).toEqual(['gift', 'haus'])
    })

    it('should return an empty array for an empty collection', () => {
      expect(wordPairCollection.allHeadwords).toEqual([])
    })
  })

  describe('allCounterparts', () => {
    it('should return all unique counterpart words', () => {
      wordPairCollection.add('gift', 'married')
      wordPairCollection.add('Geschenk', 'gift')

      expect(wordPairCollection.allCounterparts).toEqual(['married', 'gift'])
    })

    it('should return an empty array for an empty collection', () => {
      expect(wordPairCollection.allCounterparts).toEqual([])
    })
  })

  describe('allPairs', () => {
    it('should return an array containing all WordPair objects', () => {
      wordPairCollection.add('haus', 'hus')
      wordPairCollection.add('katze', 'katt')

      expect(wordPairCollection.allPairs).toEqual([new WordPair('haus', 'hus'), new WordPair('katze', 'katt')])
    })

    it('should protect internal state against external array mutations', () => {
      wordPairCollection.add('haus', 'hus')
      const copy = wordPairCollection.allPairs

      copy.pop()

      expect(wordPairCollection.size).toBe(1)
    })
  })

  describe('size', () => {
    it('should return the number of word pairs', () => {
      expect(wordPairCollection.size).toBe(0)

      wordPairCollection.add('haus', 'hus')
      wordPairCollection.add('katze', 'katt')

      expect(wordPairCollection.size).toBe(2)
    })
  })

  describe('has', () => {
    it('should return true when the pair exists', () => {
      wordPairCollection.add('haus', 'hus')
      expect(wordPairCollection.has('haus', 'hus')).toBe(true)
    })

    it('should return false when the pair does not exist', () => {
      wordPairCollection.add('gift', 'married')

      expect(wordPairCollection.has('gift', 'poison')).toBe(false)
      expect(wordPairCollection.has('Geschenk', 'married')).toBe(false)
      expect(wordPairCollection.has('haus', 'hus')).toBe(false)
    })
  })

  describe('clear', () => {
    it('should remove all word pairs', () => {
      wordPairCollection.add('haus', 'hus')
      wordPairCollection.add('katze', 'katt')

      wordPairCollection.clear()

      expect(wordPairCollection.size).toBe(0)
    })
  })

  describe('[Symbol.iterator]()', () => {
    it('should allow iteration over word pairs using for...of', () => {
      wordPairCollection.add('haus', 'hus')
      wordPairCollection.add('katze', 'katt')

      const iterated = []

      for (const pair of wordPairCollection) {
        iterated.push(pair)
      }

      expect(iterated).toEqual([new WordPair('haus', 'hus'), new WordPair('katze', 'katt')])
    })
  })
})
