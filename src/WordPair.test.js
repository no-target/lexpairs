import { describe, it, expect } from 'vitest'
import { WordPair } from './WordPair.js'

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
