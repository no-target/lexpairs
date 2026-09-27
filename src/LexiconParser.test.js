import { describe, it, expect } from 'vitest'
import { LexiconParser } from './LexiconParser.js'

describe('LexiconParser', () => {
  describe('parse', () => {
    it('should throw when the file does not exist', () => {
      const parser = new LexiconParser()
      expect(() => parser.parse('./nonexistent.json')).toThrow()
    })
  })
})