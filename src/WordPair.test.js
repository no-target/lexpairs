import { describe, it, expect } from 'vitest'
import { WordPair } from './WordPair.js'

describe('WordPair', () => {
  it('should create a word pair with a headword and counterpart', () => {
    const pair = new WordPair('haus', 'hus')
    expect(pair.headword).toBe('haus')
    expect(pair.counterpart).toBe('hus')
  })

  it('should throw a TypeError when headword is not a string', () => {
    expect(() => new WordPair(123, 'hus')).toThrow(TypeError)
    expect(() => new WordPair(null, 'hus')).toThrow(TypeError)
    expect(() => new WordPair(true, 'hus')).toThrow(TypeError)
  })

  it('should throw a TypeError when counterpart is not a string', () => {
    expect(() => new WordPair('haus', 123)).toThrow(TypeError)
    expect(() => new WordPair('haus', null)).toThrow(TypeError)
    expect(() => new WordPair('haus', true)).toThrow(TypeError)
  })

  it('should throw a TypeError when headword is empty', () => {
    expect(() => new WordPair('', 'hus')).toThrow(TypeError)
  })

  it('should throw a TypeError when counterpart is empty', () => {
    expect(() => new WordPair('haus', '')).toThrow(TypeError)
  })

  it('should throw a TypeError when headword contains only whitespace', () => {
    expect(() => new WordPair('   ', 'hus')).toThrow(TypeError)
  })

  it('should throw a TypeError when counterpart contains only whitespace', () => {
    expect(() => new WordPair('haus', '   ')).toThrow(TypeError)
  })

  it('should trim whitespace from headword and counterpart', () => {
    const pair = new WordPair(' haus ', ' hus ')

    expect(pair.headword).toBe('haus')
    expect(pair.counterpart).toBe('hus')
  })
})
