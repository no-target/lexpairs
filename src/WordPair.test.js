import { describe, it, expect } from 'vitest'
import { WordPair } from './WordPair.js'

describe('WordPair', () => {
  it('should create a word pair with a headword and counterpart', () => {
    const pair = new WordPair('haus', 'hus')
    expect(pair.headword).toBe('haus')
    expect(pair.counterpart).toBe('hus')
  })

  it('should throw when headword is not a non-empty string', () => {
    expect(() => new WordPair(123, 'hus')).toThrow(TypeError)
    expect(() => new WordPair(null, 'hus')).toThrow(TypeError)
    expect(() => new WordPair(true, 'hus')).toThrow(TypeError)
    expect(() => new WordPair('', 'hus')).toThrow(TypeError)
  })

  it('should throw when counterpart is not a non-empty string', () => {
    expect(() => new WordPair('haus', 123)).toThrow(TypeError)
    expect(() => new WordPair('haus', null)).toThrow(TypeError)
    expect(() => new WordPair('haus', true)).toThrow(TypeError)
    expect(() => new WordPair('haus', '')).toThrow(TypeError)
  })

  it('should trim whitespace from headword and counterpart', () => {
    const pair = new WordPair(' haus ', ' hus ')

    expect(pair.headword).toBe('haus')
    expect(pair.counterpart).toBe('hus')
  })

  it('should match headword regardless of case', () => {
    const pair = new WordPair('Haus', 'house')

    expect(pair.hasHeadword('haus')).toBe(true)
    expect(pair.hasHeadword('HAUS')).toBe(true)
  })

  it('should match counterpart regardless of case', () => {
    const pair = new WordPair('Haus', 'House')

    expect(pair.hasCounterpart('house')).toBe(true)
    expect(pair.hasCounterpart('HOUSE')).toBe(true)
  })

  it('should require headword and counterpart to match for equality', () => {
    const pair = new WordPair('Haus', 'house')

    expect(pair.equals(new WordPair('haus', 'HOUSE'))).toBe(true)
    expect(pair.equals(new WordPair('Haus', 'wohnung'))).toBe(false)
    expect(pair.equals(new WordPair('Wohnung', 'house'))).toBe(false)
  })
})
