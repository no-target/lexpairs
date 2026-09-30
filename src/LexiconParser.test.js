import { describe, it, expect } from 'vitest'
import { LexiconParser } from './LexiconParser.js'
import { WordPair } from './WordPair.js'

describe('LexiconParser', () => {
  const parser = new LexiconParser()

  describe('parseDelimitedText', () => {
    it('should parse comma-separated lines', () => {
      const pairs = parser.parseDelimitedText('hus,Haus\nbil,Auto')

      expect(pairs).toHaveLength(2)
      expect(pairs[0]).toBeInstanceOf(WordPair)
      expect(pairs[0].headword).toBe('hus')
      expect(pairs[0].counterpart).toBe('Haus')
    })

    it('should support custom delimiters', () => {
      const pairs = parser.parseDelimitedText('hus\tHaus', '\t')
      expect(pairs[0].headword).toBe('hus')
      expect(pairs[0].counterpart).toBe('Haus')
    })

    it('should skip empty lines', () => {
      const pairs = parser.parseDelimitedText('hus,Haus\n\n\nbil,Auto')
      expect(pairs).toHaveLength(2)
    })

    it('should skip lines with only one field', () => {
      const pairs = parser.parseDelimitedText('hus,Haus\nonlyone\nbil,Auto')
      expect(pairs).toHaveLength(2)
    })

    it('should skip lines where a field is whitespace only', () => {
      const pairs = parser.parseDelimitedText('hus,   \nbil,Auto')
      expect(pairs).toHaveLength(1)
    })

    it('should trim whitespace from fields', () => {
      const pairs = parser.parseDelimitedText('  hus  ,  Haus  ')
      expect(pairs[0].headword).toBe('hus')
      expect(pairs[0].counterpart).toBe('Haus')
    })

    it('should ignore extra fields', () => {
      const pairs = parser.parseDelimitedText('hus,Haus,extra,fields')
      expect(pairs[0].headword).toBe('hus')
      expect(pairs[0].counterpart).toBe('Haus')
    })

    it('should handle Windows line endings', () => {
      const pairs = parser.parseDelimitedText('hus,Haus\r\nbil,Auto')
      expect(pairs).toHaveLength(2)
    })
  })

  describe('parseJson', () => {
    const keys = { headwordKey: 'swedish', counterpartKey: 'german' }

    it('should parse a JSON array of objects', () => {
      const text = JSON.stringify([
        { swedish: 'hus', german: 'Haus' },
        { swedish: 'bil', german: 'Auto' },
      ])

      const pairs = parser.parseJson(text, keys)

      expect(pairs).toHaveLength(2)
      expect(pairs[0]).toBeInstanceOf(WordPair)
      expect(pairs[0].headword).toBe('hus')
      expect(pairs[0].counterpart).toBe('Haus')
    })

    it('should throw if key is missint', () => {
      expect(() => parser.parseJson('[]', { counterpartKey: 'x' })).toThrow(TypeError)
      expect(() => parser.parseJson('[]', { headwordKey: 'x' })).toThrow(TypeError)
    })

    it('should throw if the JSON is not an array', () => {
      expect(() => parser.parseJson('{"a": 1}', keys)).toThrow(TypeError)
    })

    it('should throw if the JSON is invalid', () => {
      expect(() => parser.parseJson('not json', keys)).toThrow(SyntaxError)
    })
  })
})
