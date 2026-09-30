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

    it('should allow multiple counterparts for the same headword', () => {
      wordPairCollection.add('gift', 'married')
      wordPairCollection.add('gift', 'poison')

      expect(wordPairCollection.size).toBe(2)
    })

    it('should throw when adding a duplicate', () => {
      wordPairCollection.add('Haus', 'house')

      expect(() => wordPairCollection.add('Haus', 'house')).toThrow()
      expect(() => wordPairCollection.add('haus', 'house')).toThrow()
      expect(() => wordPairCollection.add('HAUS', 'HOUSE')).toThrow()
    })
  })

  describe('addMany', () => {
    it('should add multiple pairs at once', () => {
      wordPairCollection.addMany([
        new WordPair('hus', 'haus'),
        new WordPair('bil', 'auto'),
      ])

      expect(wordPairCollection.size).toBe(2)
      expect(wordPairCollection.has('hus', 'haus')).toBe(true)
      expect(wordPairCollection.has('bil', 'auto')).toBe(true)
    })

    it('should throw a TypeError when input is not an array', () => {
      expect(() => wordPairCollection.addMany(null)).toThrow(TypeError)
      expect(() => wordPairCollection.addMany('not an array')).toThrow(TypeError)
      expect(() => wordPairCollection.addMany({})).toThrow(TypeError)
    })

    it('should throw when a pair already exists in the collection', () => {
      wordPairCollection.add('hus', 'haus')

      expect(() =>
        wordPairCollection.addMany([new WordPair('hus', 'haus')]),
      ).toThrow()
    })

    it('should throw when input contains duplicates', () => {
      expect(() =>
        wordPairCollection.addMany([
          new WordPair('bil', 'auto'),
          new WordPair('bil', 'auto'),
        ]),
      ).toThrow()

      expect(() =>
        wordPairCollection.addMany([
          new WordPair('Haus', 'house'),
          new WordPair('haus', 'house'),
        ]),
      ).toThrow()
    })

    it('should not add any pairs if an item is not a WordPair', () => {
      expect(() =>
        wordPairCollection.addMany([
          new WordPair('bil', 'auto'),
          { headword: 'hus', counterpart: 'haus' },
        ]),
      ).toThrow(TypeError)

      expect(wordPairCollection.size).toBe(0)
    })

    it('should not add any pairs if one is invalid', () => {
      wordPairCollection.add('hus', 'haus')

      expect(() =>
        wordPairCollection.addMany([
          new WordPair('bil', 'auto'),
          new WordPair('hus', 'haus'),
        ]),
      ).toThrow()

      expect(wordPairCollection.size).toBe(1)
      expect(wordPairCollection.has('bil', 'auto')).toBe(false)
    })

    it('should not add any pairs if input contains duplicates', () => {
      expect(() =>
        wordPairCollection.addMany([
          new WordPair('bil', 'auto'),
          new WordPair('hus', 'haus'),
          new WordPair('bil', 'auto'),
        ]),
      ).toThrow()

      expect(wordPairCollection.size).toBe(0)
    })
  })

  describe('remove', () => {
    it('should remove a pair', () => {
      wordPairCollection.add('haus', 'hus')
      wordPairCollection.add('Auto', 'bil')

      wordPairCollection.remove('auto', 'bil')
      wordPairCollection.remove('haus', 'hus')
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
    it('should return counterparts for a headword', () => {
      wordPairCollection.add('gift', 'married')
      wordPairCollection.add('gift', 'poison')

      expect(wordPairCollection.findCounterparts('gift')).toEqual(['married', 'poison'])
    })

    it('should be case-insensitive', () => {
      wordPairCollection.add('Haus', 'house')
      expect(wordPairCollection.findCounterparts('haus')).toEqual(['house'])
    })
  })

  describe('findHeadwords', () => {
    it('should return headwords for a counterpart', () => {
      wordPairCollection.add('schlafen', 'sova')
      wordPairCollection.add('pennen', 'sova')

      expect(wordPairCollection.findHeadwords('sova')).toEqual(['schlafen', 'pennen'])
    })

    it('should be case-insensitive', () => {
      wordPairCollection.add('Haus', 'house')
      expect(wordPairCollection.findHeadwords('HOUSE')).toEqual(['Haus'])
    })
  })

  describe('findPairsByHeadword', () => {
    it('should return pairs for a headword', () => {
      wordPairCollection.add('gift', 'married')
      wordPairCollection.add('gift', 'poison')

      expect(wordPairCollection.findPairsByHeadword('gift')).toEqual([
        new WordPair('gift', 'married'),
        new WordPair('gift', 'poison'),
      ])
    })

    it('should be case-insensitive', () => {
      wordPairCollection.add('Haus', 'house')

      expect(wordPairCollection.findPairsByHeadword('haus')).toHaveLength(1)
      expect(wordPairCollection.findPairsByHeadword('HAUS')).toHaveLength(1)
      expect(wordPairCollection.findPairsByHeadword('Haus')).toHaveLength(1)
    })
  })

  describe('findPairsByCounterpart', () => {
    it('should return pairs for a counterpart', () => {
      wordPairCollection.add('gift', 'poison')
      wordPairCollection.add('gift', 'married')
      wordPairCollection.add('Geschenk', 'gift')

      expect(wordPairCollection.findPairsByCounterpart('gift')).toEqual([
        new WordPair('Geschenk', 'gift'),
      ])
    })

    it('should be case-insensitive', () => {
      wordPairCollection.add('Haus', 'house')

      expect(wordPairCollection.findPairsByCounterpart('HOUSE')).toHaveLength(1)
      expect(wordPairCollection.findPairsByCounterpart('house')).toHaveLength(1)
    })
  })

  describe('allHeadwords', () => {
    it('should return all unique headwords', () => {
      wordPairCollection.add('gift', 'married')
      wordPairCollection.add('gift', 'poison')
      wordPairCollection.add('haus', 'hus')

      expect(wordPairCollection.allHeadwords).toEqual(['gift', 'haus'])
    })
  })

  describe('allCounterparts', () => {
    it('should return all unique counterparts', () => {
      wordPairCollection.add('gift', 'married')
      wordPairCollection.add('Geschenk', 'gift')

      expect(wordPairCollection.allCounterparts).toEqual(['married', 'gift'])
    })
  })

  describe('allPairs', () => {
    it('should return all pairs in insertion order', () => {
      wordPairCollection.add('haus', 'hus')
      wordPairCollection.add('katze', 'katt')

      expect(wordPairCollection.allPairs).toEqual([
        new WordPair('haus', 'hus'),
        new WordPair('katze', 'katt'),
      ])
    })

    it('should return a copy that protects internal state', () => {
      wordPairCollection.add('haus', 'hus')
      const copy = wordPairCollection.allPairs

      copy.pop()

      expect(wordPairCollection.size).toBe(1)
    })
  })

  describe('size', () => {
    it('should return the number of pairs', () => {
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

    it('should return false when either word does not match', () => {
      wordPairCollection.add('gift', 'married')

      expect(wordPairCollection.has('gift', 'poison')).toBe(false)
      expect(wordPairCollection.has('Geschenk', 'married')).toBe(false)
      expect(wordPairCollection.has('haus', 'hus')).toBe(false)
    })
  })

  describe('clear', () => {
    it('should remove all pairs', () => {
      wordPairCollection.add('haus', 'hus')
      wordPairCollection.add('katze', 'katt')

      wordPairCollection.clear()

      expect(wordPairCollection.size).toBe(0)
    })
  })

  describe('[Symbol.iterator]', () => {
    it('should allow iteration with for...of', () => {
      wordPairCollection.add('haus', 'hus')
      wordPairCollection.add('katze', 'katt')

      const iterated = []

      for (const pair of wordPairCollection) {
        iterated.push(pair)
      }

      expect(iterated).toEqual([
        new WordPair('haus', 'hus'),
        new WordPair('katze', 'katt'),
      ])
    })
  })
})