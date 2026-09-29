import { describe, it, expect, beforeEach } from 'vitest'
import { WordPair } from './WordPair.js'
import { WordPairCollection } from './WordPairCollection.js'

describe('WordPairCollection', () => {
  let wordPairCollection

  beforeEach(() => {
    wordPairCollection = new WordPairCollection()
  })

  describe('constructor', () => {
    it('should create an empty lexicon by default', () => {
      expect(wordPairCollection.size).toBe(0)
    })

    it('should accept an array of initial pairs', () => {
      const initial = [new WordPair('haus', 'hus'), new WordPair('katze', 'katt')]
      const populated = new WordPairCollection(initial)

      expect(populated.size).toBe(2)
    })

    it('should throw if initial pairs contain an invalid item', () => {
      expect(() => new WordPairCollection(['not a word pair'])).toThrow(TypeError)
    })
  })

  describe('add', () => {
    it('should add a word pair to collection', () => {
      wordPairCollection.add(new WordPair('haus', 'hus'))
      expect(wordPairCollection.size).toBe(1)
    })

    it('should throw a TypeError when argument is not a WordPair', () => {
      expect(() => wordPairCollection.add('haus')).toThrow(TypeError)
      expect(() => wordPairCollection.add({ source: 'haus', target: 'hus' })).toThrow(TypeError)
    })

    it('should throw when adding an identical pair twice', () => {
      wordPairCollection.add(new WordPair('gift', 'poison'))
      expect(() => wordPairCollection.add(new WordPair('gift', 'poison'))).toThrow()
    })

    it('should allow multiple different translations for the same source word', () => {
      wordPairCollection.add(new WordPair('gift', 'married'))
      wordPairCollection.add(new WordPair('gift', 'poison'))

      expect(wordPairCollection.size).toBe(2)
    })
  })

  describe('remove', () => {
    it('should remove an existing pair and return it', () => {
      wordPairCollection.add(new WordPair('haus', 'hus'))

      const removed = wordPairCollection.remove('haus', 'hus')

      expect(removed.source).toBe('haus')
      expect(removed.target).toBe('hus')
      expect(wordPairCollection.size).toBe(0)
    })

    it('should throw when the pair does not exist', () => {
      expect(() => wordPairCollection.remove('nonexistent', 'word')).toThrow()
    })

    it('should not remove a pair when only the source matches', () => {
      wordPairCollection.add(new WordPair('gift', 'married'))
      wordPairCollection.add(new WordPair('gift', 'poison'))

      wordPairCollection.remove('gift', 'poison')

      expect(wordPairCollection.size).toBe(1)
      expect(wordPairCollection.findTargetWords('gift')).toEqual(['married'])
    })
  })

  describe('findTargetWords', () => {
    it('should return all target words associated with a given source word', () => {
      wordPairCollection.add(new WordPair('gift', 'married'))
      wordPairCollection.add(new WordPair('gift', 'poison'))

      expect(wordPairCollection.findTargetWords('gift')).toEqual(['married', 'poison'])
    })

    it('should return an empty array if the source word is not found', () => {
      expect(wordPairCollection.findTargetWords('nonexistent')).toEqual([])
    })
  })

  describe('findSourceWords', () => {
    it('should return all source words associated with a given target word', () => {
      wordPairCollection.add(new WordPair('schlafen', 'sova'))
      wordPairCollection.add(new WordPair('pennen', 'sova'))

      expect(wordPairCollection.findSourceWords('sova')).toEqual(['schlafen', 'pennen'])
    })

    it('should return an empty array if the target word is not found', () => {
      expect(wordPairCollection.findSourceWords('nonexistent')).toEqual([])
    })
  })

  describe('findPairsBySource', () => {
    it('should return all WordPair instances associated with a given source word', () => {
      wordPairCollection.add(new WordPair('gift', 'married'))
      wordPairCollection.add(new WordPair('gift', 'poison'))

      const pairs = wordPairCollection.findPairsBySource('gift')

      expect(pairs).toHaveLength(2)
      expect(pairs.every((pair) => pair instanceof WordPair)).toBe(true)
      expect(pairs.map((p) => p.target)).toEqual(['married', 'poison'])
    })

    it('should return an empty array if no pairs match the source word', () => {
      expect(wordPairCollection.findPairsBySource('nonexistent')).toEqual([])
    })
  })

  describe('getAllPairs', () => {
    it('should return an array containing all WordPair objects', () => {
      const pair1 = new WordPair('haus', 'hus')
      const pair2 = new WordPair('katze', 'katt')
      wordPairCollection.add(pair1)
      wordPairCollection.add(pair2)

      expect(wordPairCollection.getAllPairs()).toEqual([pair1, pair2])
    })

    it('should protect internal state against external array mutations', () => {
      wordPairCollection.add(new WordPair('haus', 'hus'))
      const copy = wordPairCollection.getAllPairs()

      copy.pop()

      expect(wordPairCollection.size).toBe(1)
    })
  })

  describe('size', () => {
    it('should return 0 for an empty collection', () => {
      expect(wordPairCollection.size).toBe(0)
    })

    it('should increase when a pair is added', () => {
      wordPairCollection.add(new WordPair('haus', 'hus'))
      expect(wordPairCollection.size).toBe(1)
    })

    it('should decrease when a pair is removed', () => {
      wordPairCollection.add(new WordPair('katze', 'katt'))
      wordPairCollection.remove('katze', 'katt')
      expect(wordPairCollection.size).toBe(0)
    })

    it('should remain unchanged when attempting to remove a non-existent pair', () => {
      wordPairCollection.add(new WordPair('haus', 'hus'))

      expect(() => wordPairCollection.remove('nonexistent', 'word')).toThrow()
      expect(wordPairCollection.size).toBe(1)
    })
  })

  describe('clear', () => {
    it('should remove all word pairs', () => {
      wordPairCollection.add(new WordPair('haus', 'hus'))
      wordPairCollection.add(new WordPair('katze', 'katt'))

      wordPairCollection.clear()

      expect(wordPairCollection.size).toBe(0)
    })
  })

  describe('[Symbol.iterator]()', () => {
    it('should allow iteration over word pairs using for...of', () => {
      const pair1 = new WordPair('haus', 'hus')
      const pair2 = new WordPair('katze', 'katt')

      wordPairCollection.add(pair1)
      wordPairCollection.add(pair2)

      const iterated = []
      for (const pair of wordPairCollection) {
        iterated.push(pair)
      }

      expect(iterated).toEqual([pair1, pair2])
    })

    it('should allow spreading the collection into an array using [...lexicon]', () => {
      const pair = new WordPair('haus', 'hus')
      wordPairCollection.add(pair)

      expect([...wordPairCollection]).toEqual([pair])
    })
  })
})
