// AUTO-GENERATED DATA FILE FROM english_data.txt

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

export const VOCABULARY_DATABASE: VocabItem[] = [
  {
    "word": "antiquity",
    "partOfSpeech": "Vocabulary",
    "arabic": "اﻟﻌﺻور اﻟﻘدﯾﻣﺔ",
    "meaning": "ancient times, old age",
    "synonyms": [
      "ancient times",
      "old age"
    ],
    "antonyms": [],
    "example": "Many artifacts from antiquity are displayed in the museum.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Ancient Trade & The Silk Road",
    "rootWord": "antiquity",
    "wordFamily": [
      "antiquity"
    ],
    "options": [
      "ancient times, old age",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "fabric",
    "partOfSpeech": "Vocabulary",
    "arabic": "ش / ﻧﺳﯾﺞ",
    "meaning": "cloth, textile, material ﻗﻣﺎ",
    "synonyms": [
      "cloth",
      "textile",
      "material ﻗﻣﺎ"
    ],
    "antonyms": [],
    "example": "The fabric of this dress is made of pure silk.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Ancient Trade & The Silk Road",
    "rootWord": "fabric",
    "wordFamily": [
      "fabric"
    ],
    "options": [
      "cloth, textile, material ﻗﻣﺎ",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "merchants",
    "partOfSpeech": "Vocabulary",
    "arabic": "ُﺟّﺎر",
    "meaning": "traders, sellers, dealers ﺗ",
    "synonyms": [
      "traders",
      "sellers",
      "dealers ﺗ"
    ],
    "antonyms": [],
    "example": "Merchants from China traveled across Asia to sell their goods.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Ancient Trade & The Silk Road",
    "rootWord": "merchants",
    "wordFamily": [
      "merchants"
    ],
    "options": [
      "traders, sellers, dealers ﺗ",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "silk",
    "partOfSpeech": "Vocabulary",
    "arabic": "رﯾر",
    "meaning": "fine fabric, smooth cloth ﺣ",
    "synonyms": [
      "fine fabric",
      "smooth cloth ﺣ"
    ],
    "antonyms": [],
    "example": "Silk was one of the most valuable products on the ancient trade routes.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Ancient Trade & The Silk Road",
    "rootWord": "silk",
    "wordFamily": [
      "silk"
    ],
    "options": [
      "fine fabric, smooth cloth ﺣ",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "archaeologists",
    "partOfSpeech": "Vocabulary",
    "arabic": " excavators ﻋﻠﻣﺎء اﻵﺛﺎر",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "Archaeologists discovered ancient coins buried in the desert.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Ancient Trade & The Silk Road",
    "rootWord": "archaeologists",
    "wordFamily": [
      "archaeologists"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "network",
    "partOfSpeech": "Vocabulary",
    "arabic": "",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "network of trade routes.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Ancient Trade & The Silk Road",
    "rootWord": "network",
    "wordFamily": [
      "network"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "spices",
    "partOfSpeech": "Vocabulary",
    "arabic": "رات / ﺗواﺑل",
    "meaning": "seasonings, flavorings ﺑﮭﺎ",
    "synonyms": [
      "seasonings",
      "flavorings ﺑﮭﺎ"
    ],
    "antonyms": [],
    "example": "Spices like pepper and cinnamon were very expensive in Europe.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Ancient Trade & The Silk Road",
    "rootWord": "spices",
    "wordFamily": [
      "spices"
    ],
    "options": [
      "seasonings, flavorings ﺑﮭﺎ",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "vast",
    "partOfSpeech": "Vocabulary",
    "arabic": " immense واﺳﻊ / ﺷﺎﺳﻊ The desert stretches across a",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "vast area of land.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Ancient Trade & The Silk Road",
    "rootWord": "vast",
    "wordFamily": [
      "vast"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "caravan",
    "partOfSpeech": "Vocabulary",
    "arabic": "",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "goods across the desert.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Ancient Trade & The Silk Road",
    "rootWord": "caravan",
    "wordFamily": [
      "caravan"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "landlocked",
    "partOfSpeech": "Vocabulary",
    "arabic": " inland ﺣﺑﯾس اﻟﯾﺎﺑﺳﺔ",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "Mongolia is a landlocked country with no access to the sea.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Ancient Trade & The Silk Road",
    "rootWord": "landlocked",
    "wordFamily": [
      "landlocked"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "oasis",
    "partOfSpeech": "Vocabulary",
    "arabic": " watering place واﺣﺔ Travelers rested at the oasis",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "to get water and shade.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Ancient Trade & The Silk Road",
    "rootWord": "oasis",
    "wordFamily": [
      "oasis"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "skyscraper",
    "partOfSpeech": "Vocabulary",
    "arabic": " rise ﻧﺎطﺣﺔ ﺳﺣﺎب",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "The Burj Khalifa is the tallest skyscraper in the world.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Sustainable & Modern Architecture",
    "rootWord": "skyscraper",
    "wordFamily": [
      "skyscraper"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "steel",
    "partOfSpeech": "Vocabulary",
    "arabic": " alloy ﻓوﻻذ / ﺻُﻠب",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "Modern skyscrapers are built with steel frames.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Sustainable & Modern Architecture",
    "rootWord": "steel",
    "wordFamily": [
      "steel"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "function",
    "partOfSpeech": "Vocabulary",
    "arabic": "وظﯾﻔﺔ / ﻏرض",
    "meaning": "purpose, use, role",
    "synonyms": [
      "purpose",
      "use",
      "role"
    ],
    "antonyms": [],
    "example": "The main function of this building is to serve as a hospital.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Sustainable & Modern Architecture",
    "rootWord": "function",
    "wordFamily": [
      "function"
    ],
    "options": [
      "purpose, use, role",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "urban",
    "partOfSpeech": "Vocabulary",
    "arabic": "َﺿَري / ﻣُدُﻧﻲ",
    "meaning": "city, metropolitan ﺣ",
    "synonyms": [
      "city",
      "metropolitan ﺣ"
    ],
    "antonyms": [],
    "example": "Urban areas are usually crowded with people and traffic.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Sustainable & Modern Architecture",
    "rootWord": "urban",
    "wordFamily": [
      "urban"
    ],
    "options": [
      "city, metropolitan ﺣ",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "innovative",
    "partOfSpeech": "Vocabulary",
    "arabic": " inventive ﻣُﺑﺗﻛَر",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "The new smartphone has innovative features.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Iconic Architecture & Design",
    "rootWord": "innovative",
    "wordFamily": [
      "innovative"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "iconic",
    "partOfSpeech": "Vocabulary",
    "arabic": " symbolic رﻣزي / ﻣﺷﮭور",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "The Eiffel Tower is an iconic landmark of Paris.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Iconic Architecture & Design",
    "rootWord": "iconic",
    "wordFamily": [
      "iconic"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "sustainable",
    "partOfSpeech": "Vocabulary",
    "arabic": " lasting ﻣﺳﺗدام",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "Sustainable energy sources help protect the environment.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Iconic Architecture & Design",
    "rootWord": "sustainable",
    "wordFamily": [
      "sustainable"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "landmark",
    "partOfSpeech": "Vocabulary",
    "arabic": " famous place ﻣﻌﻠَم / ﻧَﺻَب Big Ben is a famous",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "landmark in London.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Iconic Architecture & Design",
    "rootWord": "landmark",
    "wordFamily": [
      "landmark"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "design",
    "partOfSpeech": "Vocabulary",
    "arabic": "م",
    "meaning": "plan, style, pattern ﺗﺻﻣﯾ",
    "synonyms": [
      "plan",
      "style",
      "pattern ﺗﺻﻣﯾ"
    ],
    "antonyms": [],
    "example": "The design of the new car is very modern.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Iconic Architecture & Design",
    "rootWord": "design",
    "wordFamily": [
      "design"
    ],
    "options": [
      "plan, style, pattern ﺗﺻﻣﯾ",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "traditional",
    "partOfSpeech": "Vocabulary",
    "arabic": " customary ﺗﻘﻠﯾدي She wore traditional",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "clothes at the wedding.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Iconic Architecture & Design",
    "rootWord": "traditional",
    "wordFamily": [
      "traditional"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "modernize",
    "partOfSpeech": "Vocabulary",
    "arabic": " improve ﯾُﺣدّ ِث / ﯾُطوّ ِر personalityھُوِ ﯾّﺔ",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "The company decided to modernize its factory. 8 identity character, individuality, Language is an important part of cultural identity.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Iconic Architecture & Design",
    "rootWord": "modernize",
    "wordFamily": [
      "modernize"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "aesthetic",
    "partOfSpeech": "Vocabulary",
    "arabic": "",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "visual ﺟﻣﺎﻟﻲ / ﻓﻧﻲ The aesthetic of the building is very elegant.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Iconic Architecture & Design",
    "rootWord": "aesthetic",
    "wordFamily": [
      "aesthetic"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "generation",
    "partOfSpeech": "Vocabulary",
    "arabic": "ل",
    "meaning": "age group, era ﺟﯾ",
    "synonyms": [
      "age group",
      "era ﺟﯾ"
    ],
    "antonyms": [],
    "example": "The young generation uses technology every day.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Research & Analysis",
    "rootWord": "generation",
    "wordFamily": [
      "generation"
    ],
    "options": [
      "age group, era ﺟﯾ",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "evolution",
    "partOfSpeech": "Vocabulary",
    "arabic": " growth ﺗطوﱡر The evolution of computers",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "has changed our lives.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Research & Analysis",
    "rootWord": "evolution",
    "wordFamily": [
      "evolution"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "characteristics",
    "partOfSpeech": "Vocabulary",
    "arabic": "ص / ﺻﻔﺎت",
    "meaning": "features, traits, qualities ﺧﺻﺎﺋ",
    "synonyms": [
      "features",
      "traits",
      "qualities ﺧﺻﺎﺋ"
    ],
    "antonyms": [],
    "example": "Honesty is one of her main characteristics.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Research & Analysis",
    "rootWord": "characteristics",
    "wordFamily": [
      "characteristics"
    ],
    "options": [
      "features, traits, qualities ﺧﺻﺎﺋ",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "perspective",
    "partOfSpeech": "Vocabulary",
    "arabic": " outlook وﺟﮭﺔ ﻧظر From her perspective, the",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "plan is a good idea.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Research & Analysis",
    "rootWord": "perspective",
    "wordFamily": [
      "perspective"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "evidence",
    "partOfSpeech": "Vocabulary",
    "arabic": "دﻟﯾل / إﺛﺑﺎت",
    "meaning": "proof, facts, support",
    "synonyms": [
      "proof",
      "facts",
      "support"
    ],
    "antonyms": [],
    "example": "The police found evidence at the crime scene.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Research & Analysis",
    "rootWord": "evidence",
    "wordFamily": [
      "evidence"
    ],
    "options": [
      "proof, facts, support",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "head",
    "partOfSpeech": "Vocabulary",
    "arabic": "رأس / ﯾرأس",
    "meaning": "leader, top, chief",
    "synonyms": [
      "leader",
      "top",
      "chief"
    ],
    "antonyms": [],
    "example": "He nodded his head in agreement.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Animal Communication",
    "rootWord": "head",
    "wordFamily": [
      "head"
    ],
    "options": [
      "leader, top, chief",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "gestures",
    "partOfSpeech": "Vocabulary",
    "arabic": " signals إﯾﻣﺎءات / إﺷﺎرات",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "She made friendly gestures with her hands.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Animal Communication",
    "rootWord": "gestures",
    "wordFamily": [
      "gestures"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "vocalizations",
    "partOfSpeech": "Vocabulary",
    "arabic": " sounds أﺻوات ﺻوﺗﯾﺔ",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "Dolphins use vocalizations to communicate underwater.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Animal Communication",
    "rootWord": "vocalizations",
    "wordFamily": [
      "vocalizations"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "chatter",
    "partOfSpeech": "Vocabulary",
    "arabic": "رﺛرة",
    "meaning": "talk, chat, babble ﺛ",
    "synonyms": [
      "talk",
      "chat",
      "babble ﺛ"
    ],
    "antonyms": [],
    "example": "The childrens chatter filled the classroom.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Animal Communication",
    "rootWord": "chatter",
    "wordFamily": [
      "chatter"
    ],
    "options": [
      "talk, chat, babble ﺛ",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "symbols",
    "partOfSpeech": "Vocabulary",
    "arabic": "رﻣوز",
    "meaning": "signs, marks, icons",
    "synonyms": [
      "signs",
      "marks",
      "icons"
    ],
    "antonyms": [],
    "example": "Symbols can represent words or ideas.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Animal Communication",
    "rootWord": "symbols",
    "wordFamily": [
      "symbols"
    ],
    "options": [
      "signs, marks, icons",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "wagging",
    "partOfSpeech": "Vocabulary",
    "arabic": " side to side ھَزّ / ﺗﺣرﯾك",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "The dog was wagging its tail happily.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Animal Communication",
    "rootWord": "wagging",
    "wordFamily": [
      "wagging"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "swagger",
    "partOfSpeech": "Vocabulary",
    "arabic": "ر",
    "meaning": "strut, walk proudly ﯾﻣﺷﻲ ﺑﺗﺑﺧﺗ",
    "synonyms": [
      "strut",
      "walk proudly ﯾﻣﺷﻲ ﺑﺗﺑﺧﺗ"
    ],
    "antonyms": [],
    "example": "He walked with a swagger after winning the match.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Animal Communication",
    "rootWord": "swagger",
    "wordFamily": [
      "swagger"
    ],
    "options": [
      "strut, walk proudly ﯾﻣﺷﻲ ﺑﺗﺑﺧﺗ",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "stand",
    "partOfSpeech": "Vocabulary",
    "arabic": " stand tallHumans stand ﯾﻘف ﻣﻧﺗﺻﺑﺎً",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "upright on two legs.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Animal Communication",
    "rootWord": "stand",
    "wordFamily": [
      "stand"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "reassure",
    "partOfSpeech": "Vocabulary",
    "arabic": " encourage ﯾُطَﻣﺋِن",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "The mother reassured her child during the storm.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Animal Communication",
    "rootWord": "reassure",
    "wordFamily": [
      "reassure"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "species",
    "partOfSpeech": "Vocabulary",
    "arabic": " of animal (ﺣﯾواﻧﯾﺔ) أﻧواع",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "Many species of birds live in the forest.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Animal Communication",
    "rootWord": "species",
    "wordFamily": [
      "species"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "pod",
    "partOfSpeech": "Vocabulary",
    "arabic": " dolphins/whales) ﻗطﯾﻊ دﻻﻓﯾن / ﺣﯾﺗﺎن A pod of dolphins",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "swam near the boat.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Animal Communication",
    "rootWord": "pod",
    "wordFamily": [
      "pod"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "mammal",
    "partOfSpeech": "Vocabulary",
    "arabic": " animal ﺣﯾوان ﺛدﯾﻲ",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "The whale is the largest mammal in the sea.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Animal Communication",
    "rootWord": "mammal",
    "wordFamily": [
      "mammal"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "species",
    "partOfSpeech": "Vocabulary",
    "arabic": "أﻧواع",
    "meaning": "type, kind",
    "synonyms": [
      "type",
      "kind"
    ],
    "antonyms": [],
    "example": "There are many species of fish in the ocean.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Describing Graphs, Charts, Tables and Diagrams",
    "rootWord": "species",
    "wordFamily": [
      "species"
    ],
    "options": [
      "type, kind",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "vocalizations",
    "partOfSpeech": "Vocabulary",
    "arabic": "أﺻوات / ﻧداءات",
    "meaning": "voice sounds, calls",
    "synonyms": [
      "voice sounds",
      "calls"
    ],
    "antonyms": [],
    "example": "The researchers recorded the vocalizations of apes.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Describing Graphs, Charts, Tables and Diagrams",
    "rootWord": "vocalizations",
    "wordFamily": [
      "vocalizations"
    ],
    "options": [
      "voice sounds, calls",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "gestures",
    "partOfSpeech": "Vocabulary",
    "arabic": "إﺷﺎرات",
    "meaning": "signals, hand movements",
    "synonyms": [
      "signals",
      "hand movements"
    ],
    "antonyms": [],
    "example": "He used gestures to explain the directions.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Describing Graphs, Charts, Tables and Diagrams",
    "rootWord": "gestures",
    "wordFamily": [
      "gestures"
    ],
    "options": [
      "signals, hand movements",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "symbol",
    "partOfSpeech": "Vocabulary",
    "arabic": "رﻣز",
    "meaning": "sign, icon, mark",
    "synonyms": [
      "sign",
      "icon",
      "mark"
    ],
    "antonyms": [],
    "example": "The dove is a symbol of peace.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Describing Graphs, Charts, Tables and Diagrams",
    "rootWord": "symbol",
    "wordFamily": [
      "symbol"
    ],
    "options": [
      "sign, icon, mark",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "dominant",
    "partOfSpeech": "Vocabulary",
    "arabic": " main ﻣُﮭَﯾﻣِن / ﺳﺎﺋد The dominant lion leads the",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "pride.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Describing Graphs, Charts, Tables and Diagrams",
    "rootWord": "dominant",
    "wordFamily": [
      "dominant"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "catch",
    "partOfSpeech": "Vocabulary",
    "arabic": " become popular ﯾﻔﮭم / ﯾﺳﺗوﻋب It took me a while to catch on",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "to the joke.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Friendship & Social Skills",
    "rootWord": "catch",
    "wordFamily": [
      "catch"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "friendliness",
    "partOfSpeech": "Vocabulary",
    "arabic": " sociability وُدّ / ﻟطف Her friendliness made",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "everyone feel welcome.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Friendship & Social Skills",
    "rootWord": "friendliness",
    "wordFamily": [
      "friendliness"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "friendly",
    "partOfSpeech": "Vocabulary",
    "arabic": "ودود",
    "meaning": "kind, warm, nice",
    "synonyms": [
      "kind",
      "warm",
      "nice"
    ],
    "antonyms": [],
    "example": "The new teacher is very friendly.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Friendship & Social Skills",
    "rootWord": "friendly",
    "wordFamily": [
      "friendly"
    ],
    "options": [
      "kind, warm, nice",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "friendships",
    "partOfSpeech": "Vocabulary",
    "arabic": "داﻗﺎت",
    "meaning": "relationships, bonds ﺻ",
    "synonyms": [
      "relationships",
      "bonds ﺻ"
    ],
    "antonyms": [],
    "example": "Strong friendships last a lifetime.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Friendship & Social Skills",
    "rootWord": "friendships",
    "wordFamily": [
      "friendships"
    ],
    "options": [
      "relationships, bonds ﺻ",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "greeting",
    "partOfSpeech": "Vocabulary",
    "arabic": "",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Friendship & Social Skills",
    "rootWord": "greeting",
    "wordFamily": [
      "greeting"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "hard",
    "partOfSpeech": "Vocabulary",
    "arabic": "ن اﻟﺻﻌب ﺗﺣدﯾده",
    "meaning": "to say difficult to know, uncertain ﻣ",
    "synonyms": [
      "to say difficult to know",
      "uncertain ﻣ"
    ],
    "antonyms": [],
    "example": "It's hard to say if it will rain tomorrow.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Friendship & Social Skills",
    "rootWord": "hard",
    "wordFamily": [
      "hard"
    ],
    "options": [
      "to say difficult to know, uncertain ﻣ",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "in",
    "partOfSpeech": "Vocabulary",
    "arabic": "اﻟظﻼم / ﻻ ﯾﻌﻠم",
    "meaning": "the dark unaware, uninformed ﻓﻲ",
    "synonyms": [
      "the dark unaware",
      "uninformed ﻓﻲ"
    ],
    "antonyms": [],
    "example": "I was kept in the dark about the surprise party.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Friendship & Social Skills",
    "rootWord": "in",
    "wordFamily": [
      "in"
    ],
    "options": [
      "the dark unaware, uninformed ﻓﻲ",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "make",
    "partOfSpeech": "Vocabulary",
    "arabic": " relationships ﯾُﻛوّ ِن ﺻداﻗﺎت It's easy to make friends at",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "school.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Friendship & Social Skills",
    "rootWord": "make",
    "wordFamily": [
      "make"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "naturally",
    "partOfSpeech": "Vocabulary",
    "arabic": " easily ﺑﺷﻛل طﺑﯾﻌﻲ She naturally became the",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "leader of the team.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Friendship & Social Skills",
    "rootWord": "naturally",
    "wordFamily": [
      "naturally"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "say",
    "partOfSpeech": "Vocabulary",
    "arabic": "ودّ ِع",
    "meaning": "goodbye farewell, bid farewell ﯾ",
    "synonyms": [
      "goodbye farewell",
      "bid farewell ﯾ"
    ],
    "antonyms": [],
    "example": "It's always hard to say goodbye to good friends.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Friendship & Social Skills",
    "rootWord": "say",
    "wordFamily": [
      "say"
    ],
    "options": [
      "goodbye farewell, bid farewell ﯾ",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "catch",
    "partOfSpeech": "Vocabulary",
    "arabic": " become popular ﯾﻧﺗﺷر / ﯾﺳﺗوﻋب",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "The new trend quickly caught on among teenagers.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Expressing Opinion",
    "rootWord": "catch",
    "wordFamily": [
      "catch"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "friendliness",
    "partOfSpeech": "Vocabulary",
    "arabic": "ّوُد",
    "meaning": "warmth, kindness",
    "synonyms": [
      "warmth",
      "kindness"
    ],
    "antonyms": [],
    "example": "He is known for his friendliness to strangers.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Expressing Opinion",
    "rootWord": "friendliness",
    "wordFamily": [
      "friendliness"
    ],
    "options": [
      "warmth, kindness",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "friendly",
    "partOfSpeech": "Vocabulary",
    "arabic": "ودود",
    "meaning": "nice, kind",
    "synonyms": [
      "nice",
      "kind"
    ],
    "antonyms": [],
    "example": "My neighbor is very friendly.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Expressing Opinion",
    "rootWord": "friendly",
    "wordFamily": [
      "friendly"
    ],
    "options": [
      "nice, kind",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "friendships",
    "partOfSpeech": "Vocabulary",
    "arabic": "داﻗﺎت",
    "meaning": "relationships ﺻ",
    "synonyms": [
      "relationships ﺻ"
    ],
    "antonyms": [],
    "example": "True friendships are built on trust.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Expressing Opinion",
    "rootWord": "friendships",
    "wordFamily": [
      "friendships"
    ],
    "options": [
      "relationships ﺻ",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "greeting",
    "partOfSpeech": "Vocabulary",
    "arabic": "",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "greeting.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Expressing Opinion",
    "rootWord": "greeting",
    "wordFamily": [
      "greeting"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "hard",
    "partOfSpeech": "Vocabulary",
    "arabic": "ب اﻟﻘول",
    "meaning": "to say difficult to tell ﯾﺻﻌ",
    "synonyms": [
      "to say difficult to tell ﯾﺻﻌ"
    ],
    "antonyms": [],
    "example": "It's hard to say who will win.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Expressing Opinion",
    "rootWord": "hard",
    "wordFamily": [
      "hard"
    ],
    "options": [
      "to say difficult to tell ﯾﺻﻌ",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "in",
    "partOfSpeech": "Vocabulary",
    "arabic": "ر ﻣُطﱠ ﻠِﻊ",
    "meaning": "the dark without knowledge ﻏﯾ",
    "synonyms": [
      "the dark without knowledge ﻏﯾ"
    ],
    "antonyms": [],
    "example": "Don't leave me in the dark about your plans.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Expressing Opinion",
    "rootWord": "in",
    "wordFamily": [
      "in"
    ],
    "options": [
      "the dark without knowledge ﻏﯾ",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "make",
    "partOfSpeech": "Vocabulary",
    "arabic": "ُﻛوّ ِن ﺻداﻗﺎت",
    "meaning": "friends form friendships ﯾ",
    "synonyms": [
      "friends form friendships ﯾ"
    ],
    "antonyms": [],
    "example": "Children make friends easily.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Expressing Opinion",
    "rootWord": "make",
    "wordFamily": [
      "make"
    ],
    "options": [
      "friends form friendships ﯾ",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "naturally",
    "partOfSpeech": "Vocabulary",
    "arabic": "طﺑﯾﻌﺔ اﻟﺣﺎل",
    "meaning": "of course, by nature ﺑ",
    "synonyms": [
      "of course",
      "by nature ﺑ"
    ],
    "antonyms": [],
    "example": "Naturally, I want the best for my family.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Expressing Opinion",
    "rootWord": "naturally",
    "wordFamily": [
      "naturally"
    ],
    "options": [
      "of course, by nature ﺑ",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "say",
    "partOfSpeech": "Vocabulary",
    "arabic": "ًﯾﻘول وداﻋﺎ",
    "meaning": "goodbye farewell",
    "synonyms": [
      "goodbye farewell"
    ],
    "antonyms": [],
    "example": "We said goodbye at the airport.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Expressing Opinion",
    "rootWord": "say",
    "wordFamily": [
      "say"
    ],
    "options": [
      "goodbye farewell",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "cyberbullying",
    "partOfSpeech": "Vocabulary",
    "arabic": " internet bullying اﻟﺗﻧﻣﱡر اﻹﻟﻛﺗروﻧﻲ",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "Cyberbullying can seriously affect a student's mental health.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Cyberbullying & Online Safety",
    "rootWord": "cyberbullying",
    "wordFamily": [
      "cyberbullying"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "victim",
    "partOfSpeech": "Vocabulary",
    "arabic": "",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "casualty ﺿﺣﯾﺔ The victim reported the crime to the police.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Cyberbullying & Online Safety",
    "rootWord": "victim",
    "wordFamily": [
      "victim"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "privacy",
    "partOfSpeech": "Vocabulary",
    "arabic": " confidentiality ﺧﺻوﺻﯾﺔ",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "Everyone has the right to online privacy.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Cyberbullying & Online Safety",
    "rootWord": "privacy",
    "wordFamily": [
      "privacy"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "hack",
    "partOfSpeech": "Vocabulary",
    "arabic": " illegally (ًإﻟﻛﺗروﻧﯾﺎ) ﯾﺧﺗرق",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "Someone tried to hack into my email account.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Cyberbullying & Online Safety",
    "rootWord": "hack",
    "wordFamily": [
      "hack"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "report",
    "partOfSpeech": "Vocabulary",
    "arabic": "ُﺑﻠّ ِﻎ / ﺗﻘرﯾر",
    "meaning": "inform, tell, notify ﯾ",
    "synonyms": [
      "inform",
      "tell",
      "notify ﯾ"
    ],
    "antonyms": [],
    "example": "You should report any suspicious activity online.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Cyberbullying & Online Safety",
    "rootWord": "report",
    "wordFamily": [
      "report"
    ],
    "options": [
      "inform, tell, notify ﯾ",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "incident",
    "partOfSpeech": "Vocabulary",
    "arabic": " occurrence ﺣﺎدث / ﺣﺎدﺛﺔ",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "The police investigated the incident at the school.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Awareness & Support",
    "rootWord": "incident",
    "wordFamily": [
      "incident"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "consequences",
    "partOfSpeech": "Vocabulary",
    "arabic": " outcomes ﻋواﻗب / ﻧﺗﺎﺋﺞ consciousnessوﻋﻲ / إدراك",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "Actions have consequences, good or bad. 3 awareness knowledge, understanding, Awareness of online safety is very important.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Awareness & Support",
    "rootWord": "consequences",
    "wordFamily": [
      "consequences"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "prevent",
    "partOfSpeech": "Vocabulary",
    "arabic": "",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "We must prevent cyberbullying in schools.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Awareness & Support",
    "rootWord": "prevent",
    "wordFamily": [
      "prevent"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "support",
    "partOfSpeech": "Vocabulary",
    "arabic": " encouragement دﻋم / ﯾدﻋم",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "Friends and family gave her great support.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Awareness & Support",
    "rootWord": "support",
    "wordFamily": [
      "support"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "mind",
    "partOfSpeech": "Vocabulary",
    "arabic": " bothered by ﯾﻣﺎﻧﻊ / ﻋﻘل I don't mind if you",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "open the window.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Art & Cultural Experiences",
    "rootWord": "mind",
    "wordFamily": [
      "mind"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "crazy",
    "partOfSpeech": "Vocabulary",
    "arabic": " about it ﻣوﻟَﻊ ﺑﮫ She's crazy about",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "classical music.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Art & Cultural Experiences",
    "rootWord": "crazy",
    "wordFamily": [
      "crazy"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "contemporary",
    "partOfSpeech": "Vocabulary",
    "arabic": " present-day ﻣﻌﺎﺻر / ﺣدﯾث strongly ﻻ ﯾطﯾﻖ / ﯾﻛره",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "The gallery shows contemporary art from local artists. 4 can't stand hate, dislike I can't stand loud noises in the morning.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Art & Cultural Experiences",
    "rootWord": "contemporary",
    "wordFamily": [
      "contemporary"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "see",
    "partOfSpeech": "Vocabulary",
    "arabic": " same opinion ﯾﺗﻔﻘﺎن ﻓﻲ اﻟرأي 6 don't care for don't like, dislike ﻻ ﯾﺣب / ﻻ ﯾﮭﺗم ﺑـ I don't care for spicy",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "We don't always see eye to eye, but we respect each other. food.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Art & Cultural Experiences",
    "rootWord": "see",
    "wordFamily": [
      "see"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "exhibit",
    "partOfSpeech": "Vocabulary",
    "arabic": " showcase ﻣﻌرض / ﯾﻌرض",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "The museum has a new exhibit on ancient Egypt.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Art & Cultural Experiences",
    "rootWord": "exhibit",
    "wordFamily": [
      "exhibit"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "trial",
    "partOfSpeech": "Vocabulary",
    "arabic": " court case ﺗﺟرﺑﺔ / ﻣﺣﺎﻛﻣﺔ The new drug is still",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "in its clinical trial.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Art & Cultural Experiences",
    "rootWord": "trial",
    "wordFamily": [
      "trial"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "series",
    "partOfSpeech": "Vocabulary",
    "arabic": " collection ﺳﻠﺳﻠﺔ / ﻣﺳﻠﺳل I'm watching a new",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "TV series this month.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Art & Cultural Experiences",
    "rootWord": "series",
    "wordFamily": [
      "series"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "museum",
    "partOfSpeech": "Vocabulary",
    "arabic": "ف",
    "meaning": "gallery, exhibit hall ﻣﺗﺣ",
    "synonyms": [
      "gallery",
      "exhibit hall ﻣﺗﺣ"
    ],
    "antonyms": [],
    "example": "The museum has many historical artifacts.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Tourism & Attractions",
    "rootWord": "museum",
    "wordFamily": [
      "museum"
    ],
    "options": [
      "gallery, exhibit hall ﻣﺗﺣ",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "statue",
    "partOfSpeech": "Vocabulary",
    "arabic": " monument ﺗﻣﺛﺎل",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "The statue in the park is 100 years old.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Tourism & Attractions",
    "rootWord": "statue",
    "wordFamily": [
      "statue"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "theater",
    "partOfSpeech": "Vocabulary",
    "arabic": " stage ﻣﺳرح",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "We went to the theater to watch a play.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Tourism & Attractions",
    "rootWord": "theater",
    "wordFamily": [
      "theater"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "Ferris",
    "partOfSpeech": "Vocabulary",
    "arabic": " observation wheelﻋﺟﻠﺔ دوّ ارة )ﻋﺟﻠﺔ ﻓﯾرﯾس(",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "The Ferris wheel offers a great view of the city.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Tourism & Attractions",
    "rootWord": "Ferris",
    "wordFamily": [
      "Ferris"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "edit",
    "partOfSpeech": "Vocabulary",
    "arabic": " modify ﯾُﺣرّ ِ ر / ﯾُﻌدّ ِل to, related to ﻣرﺗﺑط ﺑـ developmentsﺗﻘدﱡم / ﺗطوﱡرات",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "She will edit the article before publishing it. 2 associated with connected to, linked Red is often associated with love and danger. 3 advances improvements, progress, Recent advances in medicine save many lives.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Careers & Achievements",
    "rootWord": "edit",
    "wordFamily": [
      "edit"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "decade",
    "partOfSpeech": "Vocabulary",
    "arabic": " period (ﻋﺷر ﺳﻧوات) ﻋﻘد",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "Technology has changed a lot in the last decade.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Careers & Achievements",
    "rootWord": "decade",
    "wordFamily": [
      "decade"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "ambition",
    "partOfSpeech": "Vocabulary",
    "arabic": "طُﻣُوح",
    "meaning": "goal, aim, dream",
    "synonyms": [
      "goal",
      "aim",
      "dream"
    ],
    "antonyms": [],
    "example": "Her ambition is to become a doctor.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Careers & Achievements",
    "rootWord": "ambition",
    "wordFamily": [
      "ambition"
    ],
    "options": [
      "goal, aim, dream",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "enthusiastic",
    "partOfSpeech": "Vocabulary",
    "arabic": " passionate ﻣﺗﺣﻣّ ِس",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "The students were enthusiastic about the trip.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Careers & Achievements",
    "rootWord": "enthusiastic",
    "wordFamily": [
      "enthusiastic"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "apart",
    "partOfSpeech": "Vocabulary",
    "arabic": " aside from ﺑﺎﺳﺗﺛﻧﺎء / ﻓﺿﻼً ﻋن Apart from math, I",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "like all my subjects.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Careers & Achievements",
    "rootWord": "apart",
    "wordFamily": [
      "apart"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "affect",
    "partOfSpeech": "Vocabulary",
    "arabic": " change ﯾؤﺛر ﻓﻲ",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "Pollution affects our health and environment.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Careers & Achievements",
    "rootWord": "affect",
    "wordFamily": [
      "affect"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "considerable",
    "partOfSpeech": "Vocabulary",
    "arabic": " substantial ﻛﺑﯾر / ﻣُﻌﺗﺑَر",
    "meaning": "",
    "synonyms": [],
    "antonyms": [],
    "example": "The project took a considerable amount of time.",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Careers & Achievements",
    "rootWord": "considerable",
    "wordFamily": [
      "considerable"
    ],
    "options": [
      "Meaning 1",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  },
  {
    "word": "occupy",
    "partOfSpeech": "Vocabulary",
    "arabic": "ل / ﯾﺳﻛن",
    "meaning": "fill, take up, inhabit ﯾﺷﻐ",
    "synonyms": [
      "fill",
      "take up",
      "inhabit ﯾﺷﻐ"
    ],
    "antonyms": [],
    "example": "The new tenants will occupy the house next week. Rasha Aljameel VOCABULARY — Term 3 Review",
    "translation": "",
    "difficulty": "Medium",
    "unit": "Careers & Achievements",
    "rootWord": "occupy",
    "wordFamily": [
      "occupy"
    ],
    "options": [
      "fill, take up, inhabit ﯾﺷﻐ",
      "Incorrect meaning 1",
      "Incorrect meaning 2",
      "Incorrect meaning 3"
    ],
    "correctIndex": 0
  }
];

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

export interface EmsatQuestion {
  q: string;
  opts: string[];
  ans: number;
  exp: string;
}

export interface WritingTopic {
  essayType: string;
  topic: string;
  prompt: string;
  modelAnswer: string;
  vocab: string[];
}

export const READING_CENTER_DATABASE: ReadingPassage[] = [];
export const MAZE_PRACTICE_DATABASE: MazeQuestion[] = [
  {
    id: "maze_1_1",
    level: "Medium",
    textBefore: "In ",
    choices: ["antiquity", "ambition", "evidence"],
    textAfter: ", traders travelled across a vast network of routes known as the Silk Road.",
    correctIndex: 0,
    explanation: "Antiquity refers to ancient times."
  },
  {
    id: "maze_1_2",
    level: "Medium",
    textBefore: "traders travelled across a ",
    choices: ["vast", "urban", "ethnic"],
    textAfter: " network of routes known as the Silk Road.",
    correctIndex: 0,
    explanation: "Vast means huge or enormous."
  },
  {
    id: "maze_1_3",
    level: "Medium",
    textBefore: "where architects design ",
    choices: ["sustainable", "landlocked", "dominant"],
    textAfter: " skyscrapers that protect the environment and reflect the cultural identity of each region.",
    correctIndex: 0,
    explanation: "Sustainable buildings use less energy and reduce pollution."
  },
  {
    id: "maze_1_4",
    level: "Medium",
    textBefore: "Researchers have shown that recent ",
    choices: ["advances", "gestures", "consequences"],
    textAfter: " in technology have changed the way young people learn languages.",
    correctIndex: 0,
    explanation: "Advances means progress or improvements."
  },
  {
    id: "maze_1_5",
    level: "Medium",
    textBefore: "However, life on the internet is not always safe; ",
    choices: ["cyberbullying", "friendliness", "awareness"],
    textAfter: " has become a serious problem that can affect a student's mental health.",
    correctIndex: 0,
    explanation: "Cyberbullying is bullying using digital technology."
  },
  {
    id: "maze_2_1",
    level: "Medium",
    textBefore: "Long ago, ",
    choices: ["merchants", "archaeologists", "victims"],
    textAfter: " travelled in long camel caravans across the desert.",
    correctIndex: 0,
    explanation: "Merchants are traders who sell goods."
  },
  {
    id: "maze_2_2",
    level: "Medium",
    textBefore: "stopping at every ",
    choices: ["oasis", "statue", "decade"],
    textAfter: " to rest and find water.",
    correctIndex: 0,
    explanation: "An oasis is a green spot in the desert with water."
  },
  {
    id: "maze_2_3",
    level: "Medium",
    textBefore: "scientists study this period from a different ",
    choices: ["perspective", "greeting", "chatter"],
    textAfter: ", using new tools to understand how trade shaped early civilisations.",
    correctIndex: 0,
    explanation: "Perspective means point of view."
  },
  {
    id: "maze_2_4",
    level: "Medium",
    textBefore: "In modern cities, the Burj Khalifa is considered an ",
    choices: ["iconic", "ethnic", "landlocked"],
    textAfter: " landmark whose elegant design attracts tourists.",
    correctIndex: 0,
    explanation: "Iconic means famous or symbolic."
  }
];
export const EMSAT_GRAMMAR_PRACTICE: EmsatQuestion[] = [
  {
    q: "The lady _______ son won the national spelling bee contest was extremely proud.",
    opts: ["who", "whom", "whose", "which"],
    ans: 2,
    exp: "Use 'whose' to show possession of the son by the lady."
  }
];
export const WRITING_TOPICS: WritingTopic[] = [
  {
    essayType: "Opinion Essay",
    topic: "The Role of Technology in Education",
    prompt: "To what extent do you agree that technology has improved the quality of education? Provide examples and reasons.",
    modelAnswer: "Technology has undeniably transformed the landscape of modern education. In the UAE, students now have access to interactive e-learning platforms, AI-powered tutoring systems, and digital libraries that were unimaginable a decade ago. These innovations have made education more accessible and personalized. For instance, adaptive learning software can identify a student's weaknesses and tailor content accordingly, ensuring no one falls behind. Furthermore, virtual classrooms have enabled students in remote areas to receive the same quality of instruction as their urban counterparts. However, it is essential to acknowledge that technology is a tool, not a replacement for effective teaching. The human element — mentorship, inspiration, and emotional support — remains irreplaceable. In conclusion, while technology has significantly enhanced educational outcomes, its true potential can only be realized when combined with skilled educators and thoughtful implementation.",
    vocab: ["undeniably", "adaptive", "personalized", "implementation", "accessible", "innovation", "virtual", "counterparts"]
  }
];
