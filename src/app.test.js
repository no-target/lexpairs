import { describe, it, expect, beforeEach } from 'vitest'
import { WordPair } from './WordPair.js'
import { Lexicon } from './Lexicon.js'


describe('WordPair', () => {
  it('should create a word pair with a source and target word', () => {
    const pair = new WordPair('haus', 'hus')
    expect(pair.source).toBe('haus')
    expect(pair.target).toBe('hus')
  })

  it('should throw a TypeError when source is not a string', () => {
    expect(() => new WordPair(123, 'hus')).toThrow(TypeError)
    expect(() => new WordPair(null, 'hus')).toThrow(TypeError)
    expect(() => new WordPair(true, 'hus')).toThrow(TypeError)
  })

  it('should throw a TypeError when target is not a string', () => {
    expect(() => new WordPair('haus', 123)).toThrow(TypeError)
    expect(() => new WordPair('haus', null)).toThrow(TypeError)
    expect(() => new WordPair('haus', true)).toThrow(TypeError)
  })

  it('should throw a TypeError when source is empty', () => {
    expect(() => new WordPair('', 'hus')).toThrow(TypeError)
  })

  it('should throw a TypeError when target is empty', () => {
    expect(() => new WordPair('haus', '')).toThrow(TypeError)
  })

  it('should throw a TypeError when source contains only whitespace', () => {
    expect(() => new WordPair('   ', 'hus')).toThrow(TypeError)
  })

  it('should throw a TypeError when target contains only whitespace', () => {
    expect(() => new WordPair('haus', '   ')).toThrow(TypeError)
  })

  it('should trim whitespace from source and target', () => {
    const pair = new WordPair(' haus ', ' hus ')

    expect(pair.source).toBe('haus')
    expect(pair.target).toBe('hus')
  })
})

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
})