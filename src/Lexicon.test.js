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
    lexicon.add(new WordPair('gift', 'poisoned'))
    expect(() => lexicon.add(new WordPair('gift', 'poisoned'))).toThrow()
  })

  it('should allow multiple different translations for the same source word', () => {
    lexicon.add(new WordPair('gift', 'married'))
    lexicon.add(new WordPair('gift', 'poisoned'))

    expect(lexicon.size).toBe(2)
  })

  })
})