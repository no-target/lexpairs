import fs from 'node:fs/promises'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { Lexicon } from './Lexicon.js'
import { WordPair } from './WordPair.js'

describe('Lexicon', () => {
  let lexicon

  beforeEach(() => {
    lexicon = new Lexicon()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('add', () => {
    it('should add a word pair', () => {
      lexicon.add('gift', 'poison')

      expect(lexicon.size).toBe(1)
      expect(lexicon.has('gift', 'poison')).toBe(true)
    })
  })

  describe('remove', () => {
    it('should remove and return a word pair', () => {
      lexicon.add('gift', 'poison')

      const removed = lexicon.remove('gift', 'poison')

      expect(removed).toBeInstanceOf(WordPair)
      expect(removed.headword).toBe('gift')
      expect(removed.counterpart).toBe('poison')
      expect(lexicon.size).toBe(0)
    })
  })

  describe('has', () => {
    it('should return true when the word pair exists', () => {
      lexicon.add('gift', 'poison')

      expect(lexicon.has('gift', 'poison')).toBe(true)
    })

    it('should return false when the word pair does not exist', () => {
      expect(lexicon.has('gift', 'poison')).toBe(false)
    })
  })

  describe('size', () => {
    it('should return the number of word pairs', () => {
      expect(lexicon.size).toBe(0)

      lexicon.add('gift', 'poison')
      lexicon.add('gift', 'present')

      expect(lexicon.size).toBe(2)
    })
  })

  describe('allPairs', () => {
    it('should return all word pairs', () => {
      lexicon.add('gift', 'poison')
      lexicon.add('gift', 'present')

      expect(lexicon.allPairs).toHaveLength(2)
      expect(lexicon.allPairs[0]).toBeInstanceOf(WordPair)
      expect(lexicon.allPairs[1]).toBeInstanceOf(WordPair)
    })
  })

  describe('allHeadwords', () => {
    it('should return all unique headwords', () => {
      lexicon.add('gift', 'poison')
      lexicon.add('gift', 'present')
      lexicon.add('Geschenk', 'gift')

      expect(lexicon.allHeadwords).toEqual(['gift', 'Geschenk'])
    })
  })

  describe('allCounterparts', () => {
    it('should return all unique counterparts', () => {
      lexicon.add('gift', 'poison')
      lexicon.add('gift', 'present')
      lexicon.add('Geschenk', 'gift')

      expect(lexicon.allCounterparts).toEqual(['poison', 'present', 'gift'])
    })
  })

  describe('clear', () => {
    it('should remove all word pairs', () => {
      lexicon.add('gift', 'poison')
      lexicon.add('gift', 'present')

      lexicon.clear()

      expect(lexicon.size).toBe(0)
      expect(lexicon.allPairs).toEqual([])
    })
  })

  describe('lookup', () => {
    it('should provide access to LexiconLookup', () => {
      expect(lexicon.lookup).toBeDefined()

      lexicon.add('gift', 'poison')

      expect(lexicon.lookup.findPairsByHeadword('gift')).toHaveLength(1)
    })
  })

  describe('loadFromFile', () => {
    it('should load word pairs from a delimited file', async () => {
      vi.spyOn(fs, 'readFile').mockResolvedValue('hus,Haus\ngåva,Geschenk')

      await lexicon.loadFromFile('lexicon.csv', ',')

      expect(fs.readFile).toHaveBeenCalledWith('lexicon.csv', 'utf-8')

      expect(lexicon.size).toBe(2)
      expect(lexicon.has('hus', 'Haus')).toBe(true)
      expect(lexicon.has('gåva', 'Geschenk')).toBe(true)
    })
  })

  describe('loadFromJson', () => {
    it('should load word pairs from a JSON file', async () => {
      vi.spyOn(fs, 'readFile').mockResolvedValue(
        JSON.stringify([
          {
            swedish: 'hus',
            german: 'Haus',
          },
          {
            swedish: 'bil',
            german: 'Auto',
          },
        ])
      )

      await lexicon.loadFromJson('lexicon.json', {
        headwordKey: 'swedish',
        counterpartKey: 'german',
      })

      expect(fs.readFile).toHaveBeenCalledWith('lexicon.json', 'utf-8')

      expect(lexicon.size).toBe(2)
      expect(lexicon.has('hus', 'Haus')).toBe(true)
      expect(lexicon.has('bil', 'auto')).toBe(true)
    })
  })
})
