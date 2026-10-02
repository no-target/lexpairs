# lexpairs

`lexpairs` is a JavaScript module for working with pairs of related words. It can be used for translations, synonyms, or other relationships between words.

## Features

`lexpairs` provides a `Lexicon` class for working with word pairs.

- Store and manage a collection of word pairs
- Load word pairs from delimited text files (CSV, TSV, or similar)
- Load word pairs from JSON arrays, with configurable property names
- Case-insensitive lookups by either word, including fuzzy matching with Levenshtein distance

## What it does not do

- Does not handle quoted fields or delimiter characters within words (no full RFC 4180 CSV support)
- Does not support binary or multi-file dictionary formats (e.g. StarDict)
- Does not write/save word pairs back to a file
- JSON input must be an array of objects. Flat key-value objects such as `{"word": "translation"}` are not supported.

## Installation

Requires Node.js 24 or later.

   ```bash
npm install no-target/lexpairs
   ```

## Usage

```javascript
import { Lexicon } from 'lexpairs'

const lexicon = new Lexicon()

lexicon.add('hus', 'Haus')
lexicon.add('sova', 'pennen')
lexicon.add('sova', 'schlafen')

lexicon.lookup.findCounterparts('hus')        // ['Haus']
lexicon.lookup.findHeadwords('Haus')          // ['hus']
lexicon.lookup.findPairsByHeadword('sova')    // both pairs for 'sova'

lexicon.lookup.similarHeadword('såva', 1)    // pairs with headwords within edit distance 1 of 'såva'

await lexicon.loadFromFile('./words.csv')             // comma-delimited by default
await lexicon.loadFromFile('./words.tsv', '\t')       // tab-delimited
await lexicon.loadFromJson('./words.json', {
  headwordKey: 'sv',
  counterpartKey: 'de'
})

```

## Input Formats

### Delimited text files

Each line is split using the specified delimiter. The first two fields are used as the `headword` and `counterpart`; additional fields are ignored. Empty or incomplete lines are skipped. 

The delimiter defaults to a comma:

```javascript
await lexicon.loadFromFile('./words.csv')
```

For tab-delimited files:
```javascript

await lexicon.loadFromFile('./words.tsv', '\t')
```
Custom delimiters are also supported:
```javascript
await lexicon.loadFromFile('./words.txt', ';')
```

### JSON

JSON input must be an array of objects. The property names containing the headword and counterpart are configurable.

```json
[
  { "sv": "hus", "de": "Haus" },
  { "sv": "sova", "de": "schlafen" },
  { "sv": "sova", "de": "pennen" }
]
```

The corresponding property names are specified when loading the file:

```javascript

await lexicon.loadFromJson('./words.json', {
  headwordKey: 'sv',
  counterpartKey: 'de'
})
```

The values of `headwordKey` and `counterpartKey` specify which property names to use from the JSON objects.

##  License
MIT
