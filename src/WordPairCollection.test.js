import { describe, it, expect, beforeEach } from 'vitest'
import { WordPair } from './WordPair.js'
import { WordPairCollection } from './WordPairCollection.js'

describe('WordPairCollection', () => {
  let wordPairCollection

  beforeEach(() => {
    wordPairCollection = new WordPairCollection()
  })

  describe('constructor', () => {
    it('should create an empty collection by default', () => {
      expect(wordPairCollection.size).toBe(0)
    })
  })

  describe('add', () => {
    it('should add a word pair to collection', () => {
      wordPairCollection.add('haus', 'hus')
      expect(wordPairCollection.size).toBe(1)
    })

it('should throw a TypeError when source is not a string', () => {
  expect(() => wordPairCollection.add(123, 'hus')).toThrow(TypeError)
})

it('should throw a TypeError when target is not a string', () => {
  expect(() => wordPairCollection.add('haus', 123)).toThrow(TypeError)
})

    it('should throw when adding an identical pair twice', () => {
      wordPairCollection.add('gift', 'poison')
      expect(() => wordPairCollection.add('gift', 'poison')).toThrow()
    })

    it('should allow multiple different translations for the same source word', () => {
      wordPairCollection.add('gift', 'married')
      wordPairCollection.add('gift', 'poison')

      expect(wordPairCollection.size).toBe(2)
    })
  })

  describe('remove', () => {
    it('should remove an existing pair and return it', () => {
      wordPairCollection.add('haus', 'hus')

      const removed = wordPairCollection.remove('haus', 'hus')

      expect(removed.source).toBe('haus')
      expect(removed.target).toBe('hus')
      expect(wordPairCollection.size).toBe(0)
    })

    it('should throw when the pair does not exist', () => {
      expect(() => wordPairCollection.remove('nonexistent', 'word')).toThrow()
    })

    it('should not remove a pair when only the source matches', () => {
      wordPairCollection.add('gift', 'married')
      wordPairCollection.add('gift', 'poison')

      wordPairCollection.remove('gift', 'poison')

      expect(wordPairCollection.size).toBe(1)
      expect(wordPairCollection.findTargetWords('gift')).toEqual(['married'])
    })
  })

  describe('findTargetWords', () => {
    it('should return all target words associated with a given source word', () => {
      wordPairCollection.add('gift', 'married')
      wordPairCollection.add('gift', 'poison')

      expect(wordPairCollection.findTargetWords('gift')).toEqual(['married', 'poison'])
    })

    it('should return an empty array if the source word is not found', () => {
      expect(wordPairCollection.findTargetWords('nonexistent')).toEqual([])
    })
  })

  describe('findSourceWords', () => {
    it('should return all source words associated with a given target word', () => {
      wordPairCollection.add('schlafen', 'sova')
      wordPairCollection.add('pennen', 'sova')

      expect(wordPairCollection.findSourceWords('sova')).toEqual(['schlafen', 'pennen'])
    })

    it('should return an empty array if the target word is not found', () => {
      expect(wordPairCollection.findSourceWords('nonexistent')).toEqual([])
    })
  })

  describe('findPairsBySource', () => {
    it('should return all WordPair instances associated with a given source word', () => {
      wordPairCollection.add('gift', 'married')
      wordPairCollection.add('gift', 'poison')

      const pairs = wordPairCollection.findPairsBySource('gift')

      expect(pairs).toHaveLength(2)
      expect(pairs.every((pair) => pair instanceof WordPair)).toBe(true)
      expect(pairs.map((p) => p.target)).toEqual(['married', 'poison'])
    })

    it('should return an empty array if no pairs match the source word', () => {
      expect(wordPairCollection.findPairsBySource('nonexistent')).toEqual([])
    })
  })

  describe('findPairsByTarget', () => {
  it('should return all WordPair instances associated with a given target word', () => {
    wordPairCollection.add('gift', 'poison')
    wordPairCollection.add('gift', 'married')
    wordPairCollection.add('Geschenk', 'gift')

    const pairs = wordPairCollection.findPairsByTarget('gift')

    expect(pairs).toHaveLength(1)
    expect(pairs[0].source).toBe('Geschenk')
  })

  it('should return an empty array if no pairs match the target word', () => {
    expect(wordPairCollection.findPairsByTarget('nonexistent')).toEqual([])
  })
})

describe('getAllSourceWords', () => {
  it('should return all unique source words', () => {
    wordPairCollection.add('gift', 'married')
    wordPairCollection.add('gift', 'poison')
    wordPairCollection.add('haus', 'hus')

    expect(wordPairCollection.getAllSourceWords()).toEqual(['gift', 'haus'])
  })

  it('should return an empty array for an empty collection', () => {
    expect(wordPairCollection.getAllSourceWords()).toEqual([])
  })
})

describe('getAllTargetWords', () => {
  it('should return all unique target words', () => {
    wordPairCollection.add('gift', 'married')
    wordPairCollection.add('Geschenk', 'gift')

    expect(wordPairCollection.getAllTargetWords()).toEqual(['married', 'gift'])
  })

  it('should return an empty array for an empty collection', () => {
  expect(wordPairCollection.getAllTargetWords()).toEqual([])
})
})

  describe('getAllPairs', () => {
   it('should return an array containing all WordPair objects', () => {
    wordPairCollection.add('haus', 'hus')
    wordPairCollection.add('katze', 'katt')

    expect(wordPairCollection.getAllPairs()).toEqual([
      new WordPair('haus', 'hus'),
      new WordPair('katze', 'katt'),
    ])
  })

    it('should protect internal state against external array mutations', () => {
      wordPairCollection.add('haus', 'hus')
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
      wordPairCollection.add('haus', 'hus')
      expect(wordPairCollection.size).toBe(1)
    })

    it('should decrease when a pair is removed', () => {
      wordPairCollection.add('katze', 'katt')
      wordPairCollection.remove('katze', 'katt')
      expect(wordPairCollection.size).toBe(0)
    })

    it('should remain unchanged when attempting to remove a non-existent pair', () => {
      wordPairCollection.add('haus', 'hus')

      expect(() => wordPairCollection.remove('nonexistent', 'word')).toThrow()
      expect(wordPairCollection.size).toBe(1)
    })
  })

  describe('has', () => {
  it('should return true when the pair exists', () => {
    wordPairCollection.add('haus', 'hus')
    expect(wordPairCollection.has('haus', 'hus')).toBe(true)
  })

  it('should return false when the pair does not exist', () => {
    expect(wordPairCollection.has('haus', 'hus')).toBe(false)
  })

  it('should return false when only the source matches', () => {
    wordPairCollection.add('gift', 'married')
    expect(wordPairCollection.has('gift', 'poison')).toBe(false)
  })

  it('should return false when only the target matches', () => {
    wordPairCollection.add('gift', 'married')
    expect(wordPairCollection.has('Geschenk', 'married')).toBe(false)
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

          expect(iterated).toEqual([
      new WordPair('haus', 'hus'),
      new WordPair('katze', 'katt'),
    ])
    })

    it('should allow spreading the collection into an array using [...lexicon]', () => {
      wordPairCollection.add('haus', 'hus')

      expect([...wordPairCollection]).toEqual([new WordPair('haus', 'hus')])
    })
  })
})
