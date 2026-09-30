import { describe, it, expect, vi, afterEach } from 'vitest'
import fs from 'node:fs/promises'
import { LexiconFileReader } from './LexiconFileReader.js'

describe('LexiconFileReader', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('readDelimited', () => {
    it('should read a file and parse its content as delimited text', async () => {
      const parser = {
        parseDelimitedText: vi.fn().mockReturnValue(['parsed data']),
      }

      vi.spyOn(fs, 'readFile').mockResolvedValue('gift,poison')

      const reader = new LexiconFileReader(parser)

      const result = await reader.readDelimited('words.csv', ',')

      expect(result).toEqual(['parsed data'])

      expect(fs.readFile).toHaveBeenCalledWith('words.csv', 'utf-8')

      expect(parser.parseDelimitedText).toHaveBeenCalledWith('gift,poison', ',')
    })
  })

  describe('readJson', () => {
    it('should read a file and parse its content as JSON', async () => {
      const parser = {
        parseJson: vi.fn().mockReturnValue(['parsed data']),
      }

      vi.spyOn(fs, 'readFile').mockResolvedValue('[{"first":"gift","second":"poison"}]')

      const reader = new LexiconFileReader(parser)

      const keys = {
        headwordKey: 'first',
        counterpartKey: 'second',
      }

      const result = await reader.readJson('words.json', keys)

      expect(result).toEqual(['parsed data'])

      expect(fs.readFile).toHaveBeenCalledWith('words.json', 'utf-8')

      expect(parser.parseJson).toHaveBeenCalledWith('[{"first":"gift","second":"poison"}]', keys)
    })
  })

  describe('file errors', () => {
    it('should throw an error when the file does not exist', async () => {
      const error = new Error('ENOENT')
      error.code = 'ENOENT'

      vi.spyOn(fs, 'readFile').mockRejectedValue(error)

      const reader = new LexiconFileReader()

      await expect(reader.readDelimited('missing.csv', ',')).rejects.toThrow('File not found: missing.csv')
    })

    it('should rethrow other file errors', async () => {
      const error = new Error('Permission denied')
      error.code = 'EACCES'

      vi.spyOn(fs, 'readFile').mockRejectedValue(error)

      const reader = new LexiconFileReader()

      await expect(reader.readDelimited('words.csv', ',')).rejects.toThrow('Permission denied')
    })
  })
})
