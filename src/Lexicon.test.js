import { describe, it, expect, beforeEach } from 'vitest'
import { WordPair } from './WordPair.js'
import { Lexicon } from './Lexicon.js'

describe('Lexicon', () => {
  let lexicon

  beforeEach(() => {
    lexicon = new Lexicon()
  })

  describe('constructor', () => {
    it('should create an empty lexicon by default', () => {
      expect(lexicon.size).toBe(0)
    })

    it('should accept an array of initial pairs', () => {
      const initial = [new WordPair('haus', 'hus'), new WordPair('katze', 'katt')]
      const populated = new Lexicon(initial)

      expect(populated.size).toBe(2)
    })

    it('should throw if initial pairs contain an invalid item', () => {
      expect(() => new Lexicon(['not a word pair'])).toThrow(TypeError)
    })
  })

  describe('add', () => {
    it('should add a word pair to lexicon', () => {
      lexicon.add(new WordPair('haus', 'hus'))
      expect(lexicon.size).toBe(1)
    })

    it('should throw a TypeError when argument is not a WordPair', () => {
      expect(() => lexicon.add('haus')).toThrow(TypeError)
      expect(() => lexicon.add({ source: 'haus', target: 'hus' })).toThrow(TypeError)
    })

    it('should throw when adding an identical pair twice', () => {
      lexicon.add(new WordPair('gift', 'poison'))
      expect(() => lexicon.add(new WordPair('gift', 'poison'))).toThrow()
    })

    it('should allow multiple different translations for the same source word', () => {
      lexicon.add(new WordPair('gift', 'married'))
      lexicon.add(new WordPair('gift', 'poison'))

      expect(lexicon.size).toBe(2)
    })
  })

  describe('remove', () => {
    it('should remove an existing pair and return it', () => {
      lexicon.add(new WordPair('haus', 'hus'))

      const removed = lexicon.remove('haus', 'hus')

      expect(removed.source).toBe('haus')
      expect(removed.target).toBe('hus')
      expect(lexicon.size).toBe(0)
    })

    it('should throw when the pair does not exist', () => {
      expect(() => lexicon.remove('nonexistent', 'word')).toThrow()
    })

    it('should not remove a pair when only the source matches', () => {
      lexicon.add(new WordPair('gift', 'married'))
      lexicon.add(new WordPair('gift', 'poison'))

      lexicon.remove('gift', 'poison')

      expect(lexicon.size).toBe(1)
      expect(lexicon.findTargets('gift')).toEqual(['married'])
    })
  })

  describe('findTargets', () => {
    it('should return all target words associated with a given source word', () => {
      lexicon.add(new WordPair('gift', 'married'))
      lexicon.add(new WordPair('gift', 'poison'))

      expect(lexicon.findTargets('gift')).toEqual(['married', 'poison'])
    })

    it('should return an empty array if the source word is not found', () => {
      expect(lexicon.findTargets('nonexistent')).toEqual([])
    })
  })

  describe('findSources', () => {
    it('should return all source words associated with a given target word', () => {
      lexicon.add(new WordPair('schlafen', 'sova'))
      lexicon.add(new WordPair('pennen', 'sova'))

      expect(lexicon.findSources('sova')).toEqual(['schlafen', 'pennen'])
    })

    it('should return an empty array if the target word is not found', () => {
      expect(lexicon.findSources('nonexistent')).toEqual([])
    })
  })

  describe('findPairs', () => {
    it('should return all WordPair instances associated with a given source word', () => {
      lexicon.add(new WordPair('gift', 'married'))
      lexicon.add(new WordPair('gift', 'poison'))

      const pairs = lexicon.findPairs('gift')

      expect(pairs).toHaveLength(2)
      expect(pairs.every((pair) => pair instanceof WordPair)).toBe(true)
      expect(pairs.map((p) => p.target)).toEqual(['married', 'poison'])
    })

    it('should return an empty array if no pairs match the source word', () => {
      expect(lexicon.findPairs('nonexistent')).toEqual([])
    })
  })

  describe('getAllPairs', () => {
    it('should return an array containing all WordPair objects', () => {
      const pair1 = new WordPair('haus', 'hus')
      const pair2 = new WordPair('katze', 'katt')
      lexicon.add(pair1)
      lexicon.add(pair2)

      expect(lexicon.getAllPairs()).toEqual([pair1, pair2])
    })

    it('should protect internal state against external array mutations', () => {
      lexicon.add(new WordPair('haus', 'hus'))
      const copy = lexicon.getAllPairs()

      copy.pop()

      expect(lexicon.size).toBe(1)
    })
  })

  describe('size', () => {
    it('should return 0 for an empty lexicon', () => {
      expect(lexicon.size).toBe(0)
    })
    
    it('should increase when a pair is added', () => {
      lexicon.add(new WordPair('haus', 'hus'))
      expect(lexicon.size).toBe(1)
    })

    it('should decrease when a pair is removed', () => {
      lexicon.add(new WordPair('katze', 'katt'))
      lexicon.remove('katze', 'katt')
      expect(lexicon.size).toBe(0)
    })

    it('should remain unchanged when attempting to remove a non-existent pair', () => {
     lexicon.add(new WordPair('haus', 'hus'))

     expect(() => lexicon.remove('nonexistent', 'word')).toThrow()
     expect(lexicon.size).toBe(1)
    })
  })
})
