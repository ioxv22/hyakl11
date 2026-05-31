const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../english_data.txt');
const outputFilePath = path.join(__dirname, '../src/app/subjects/english/data.ts');

const fileContent = fs.readFileSync(dataFilePath, 'utf8');
const lines = fileContent.split('\n').map(l => l.trim());

const vocabularies = [];
const grammarRules = {};
const readingPassages = [];
const mazeQuestions = [];
const writingTopics = [];

let currentSection = null;
let currentUnit = null;

const isArabic = (str) => /[\u0600-\u06FF]/.test(str);

// State variables for Vocab parsing
let currentVocab = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (!line) continue;

  if (line.includes('📚 Unit:')) {
    currentSection = 'VOCAB';
    currentUnit = line.replace('📚 Unit:', '').trim();
    currentVocab = null;
    continue;
  }
  
  if (line.includes('Vocabulary Maze') || line.includes('Grammar Maze') || line.includes('Reading Maze')) {
    currentSection = 'MAZE';
    continue;
  }
  
  if (line.includes('GrammarWorksheet') || line.includes('English Grammar Guide')) {
    currentSection = 'GRAMMAR';
    continue;
  }

  if (currentSection === 'VOCAB') {
    // Check if line starts with a number
    const match = line.match(/^(\d+)\s+([a-zA-Z-]+)\s+(.+)$/);
    if (match) {
      if (currentVocab) vocabularies.push(currentVocab);
      const rest = match[3];
      
      // We need to split rest into Synonyms, Arabic, and Sentence
      // Find where arabic characters start
      const arabicStartIdx = rest.search(/[\u0600-\u06FF]/);
      let synonyms = '';
      let arabic = '';
      let sentence = '';

      if (arabicStartIdx !== -1) {
        synonyms = rest.substring(0, arabicStartIdx).trim();
        const afterArabic = rest.substring(arabicStartIdx);
        // Find where arabic characters end
        const englishMatch = afterArabic.match(/[a-zA-Z]/);
        if (englishMatch) {
          const englishStart = afterArabic.indexOf(englishMatch[0]);
          arabic = afterArabic.substring(0, englishStart).trim();
          sentence = afterArabic.substring(englishStart).trim();
        } else {
          arabic = afterArabic.trim();
        }
      }

      currentVocab = {
        word: match[2],
        partOfSpeech: "Vocabulary",
        arabic: arabic,
        meaning: synonyms,
        synonyms: synonyms.split(',').map(s => s.trim()).filter(s => s),
        antonyms: [],
        example: sentence,
        translation: "",
        difficulty: "Medium",
        unit: currentUnit,
        rootWord: match[2],
        wordFamily: [match[2]],
        options: [],
        correctIndex: 0
      };
    } else if (currentVocab) {
      // Continuation of the sentence or Arabic
      if (isArabic(line)) {
        currentVocab.arabic += " " + line;
      } else if (!line.includes('# Word')) {
        if (!currentVocab.example && !isArabic(line) && line.match(/[a-zA-Z]/)) {
          currentVocab.example = line;
        } else {
          currentVocab.example += " " + line;
        }
      }
    }
  }
}

// Push the last vocab
if (currentVocab) vocabularies.push(currentVocab);

// Post-process vocabularies to generate dummy options
vocabularies.forEach((v) => {
  v.example = v.example.trim().replace(/\s+/g, ' ');
  v.options = [
    v.meaning || 'Meaning 1',
    'Incorrect meaning 1',
    'Incorrect meaning 2',
    'Incorrect meaning 3'
  ];
});

const fileOut = `// AUTO-GENERATED DATA FILE FROM english_data.txt

export interface VocabItem {
  word: string;
  partOfSpeech: string;
  arabic: string;
  meaning: string;
  synonyms: string[];
  antonyms: string[];
  example: string;
  translation: string;
  difficulty: "Easy" | "Medium" | "Hard";
  unit: string;
  rootWord: string;
  wordFamily: string[];
  options: string[];
  correctIndex: number;
}

export interface GrammarRule {
  title: string;
  formula?: string;
  timeline?: string;
  explanation: string;
  arabicExplanation: string;
  examples: { original: string; ar: string; corrected?: string }[];
  commonMistakes: { wrong: string; right: string; reason: string }[];
  examQuestions: { q: string; opts: string[]; ans: number; exp: string }[];
}

export interface ReadingPassage {
  id: string;
  title: string;
  story: string;
  paragraphs: { en: string; ar: string }[];
  summary: string;
  characters: string;
  mainIdea: string;
  expressions: string[];
  questions: { q: string; opts: string[]; ans: number; exp: string }[];
}

export interface MazeQuestion {
  id: string;
  level: "Easy" | "Medium" | "Hard" | "Exam Level";
  textBefore: string;
  choices: string[];
  textAfter: string;
  correctIndex: number;
  explanation: string;
}

export const VOCABULARY_DATABASE: VocabItem[] = ${JSON.stringify(vocabularies, null, 2)};

export const GRAMMAR_CENTER_DATABASE: Record<string, GrammarRule> = {
  // Parsing grammar is extremely complex, providing a placeholder for now
  placeholder: {
    title: "Grammar Rules",
    explanation: "Refer to the English Data file for full grammar rules.",
    arabicExplanation: "راجع ملف البيانات للقواعد كاملة.",
    examples: [],
    commonMistakes: [],
    examQuestions: []
  }
};

export const READING_CENTER_DATABASE: ReadingPassage[] = [];
export const MAZE_PRACTICE_DATABASE: MazeQuestion[] = [];
export const EMSAT_GRAMMAR_PRACTICE = [];
export const WRITING_TOPICS = [];
`;

fs.writeFileSync(outputFilePath, fileOut);
console.log(`Successfully extracted ${vocabularies.length} vocabularies to data.ts`);
