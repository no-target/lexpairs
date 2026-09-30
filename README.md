# lexpairs

`lexpairs` is a JavaScript module for storing, parsing and looking up pairs of related words.

Intended for programmers who need to work with word pairs, for example translations or other relationships between two words.

## Features

`lexpairs` provides a `Lexicon` class for working with word pairs. It supports:

- Adding and removing word pairs
- Checking whether a word pair exists
- Finding headwords and counterparts
- Exact, case-insensitive lookups
- Fuzzy lookups using Levenshtein distance
- Parsing word pairs from delimited text
- Parsing word pairs from JSON
- Loading word pairs from simple text files

Words are trimmed and compared case-insensitively.

## What it does not do

- It is not a complete application. It has no user interface.
- It does not translate words itself.
- It does not retrieve word pairs from external APIs or dictionaries.

---

## Usage



### Prerequisites

Ensure you have **Node.js** (version 24.12.0 or later) and **Git** installed on your machine.

The module uses ES modules and requires a JavaScript environment that supports import and export.

### Installation & Project Setup


   ```bash
   git clone
   cd <your-repository-name>
   ```

   ```bash
   npm install
   ```

---

## Available Scripts

### Running Tests

- **Interactive Watch Mode (Recommended for development):**
  ```bash
  npm test
  ```
- **Single Execution Run:**
  ```bash
  npm run test:run
  ```
- **Run Specific Tests (by matching name patterns):**
  ```bash
  npm run test:match -- <test-name-pattern>
  ```

### Code Linting

Analyze the source code in `src/` for errors, syntax issues, and anti-patterns:

```bash
npm run lint
```

Automatically fix fixable linting issues:

```bash
npm run lint:fix
```

### Formatting

Check if files comply with Prettier styling rules:

```bash
npm run format:check
```

Automatically reformat all source files:

```bash
npm run format
```


---

##  License

