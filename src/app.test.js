import { describe, it, expect } from 'vitest'
import { WordPair } from './WordPair.js'

describe('WordPair', () => {
  it('should create a word pair with a source and target word', () => {
    const pair = new WordPair('haus', 'hus')
    expect(pair.source).toBe('haus')
    expect(pair.target).toBe('hus')

  })

  

 
})
