import { NextRequest, NextResponse } from "next/server";

const QUIZ_API_ENDPOINTS = [
  { url: "https://g4f.space/v1/chat/completions", model: "auto" },
  { url: "https://g4f.space/api/gemini/chat/completions", model: "auto" },
  { url: "https://qwen.ai.unturf.com/v1/chat/completions", model: "auto" },
  { url: "https://hermes.ai.unturf.com/v1/chat/completions", model: "auto" }
];

export async function POST(request: NextRequest) {
  try {
    const { structure, subject, numQuestions = 5, difficulty = "متوسط", image, fileContent } = await request.json();

    const finalStructure = fileContent ? `${structure}\n\n[محتوى الملف المرفق]:\n${fileContent}` : structure;

    if (!finalStructure && !image) {
      return NextResponse.json({ error: "Structure text or screenshot image is required" }, { status: 400 });
    }

    const systemPrompt = `You are a professional educational assessment AI designed for the UAE Ministry of Education (MOE) curriculum.
Your task is to generate a simulated multiple-choice quiz (MCQ) based on the user's exam structure/syllabus text or attached screenshot.

You MUST respond with a valid JSON array of questions. Return ONLY a raw JSON array.
Do not include any markdown formatting, do not include \`\`\`json or \`\`\` blocks, just return a raw JSON array of objects.
Each question object in the array MUST have this exact schema:
{
  "question": "The question text (clear, academic, matching the structure, bilingual or matching subject language)",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "answerIndex": 0, 
  "explanation": "Detailed explanation of why this answer is correct, written in Arabic"
}

Create exactly ${numQuestions} multiple-choice questions. The difficulty must be "${difficulty}".
Ensure the questions are highly relevant, challenging, and strictly follow the provided structure: "${finalStructure}".`;

    let responseText = "";
    let success = false;

    // 1. Try official Gemini API if key is available
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      console.log("Using official Gemini API with key...");
      try {
        responseText = await callOfficialGeminiAPI(geminiKey, systemPrompt, finalStructure || "صورة مرفقة بالهيكل", image, numQuestions, subject, difficulty);
        if (responseText && responseText.trim().length > 20) {
          success = true;
        }
      } catch (err) {
        console.error("Failed using official Gemini API:", err);
      }
    }

    // 2. Try free proxy endpoints as a backup if official API failed or isn't configured
    if (!success) {
      console.log("Attempting free proxy endpoints...");
      for (const endpoint of QUIZ_API_ENDPOINTS) {
        try {
          const messages: any[] = [
            { role: "system", content: systemPrompt }
          ];

          if (image) {
            messages.push({
              role: "user",
              content: [
                { type: "text", text: `Generate a simulated exam with exactly ${numQuestions} questions for the subject "${subject}" based on the text structure and the attached image screenshot.` },
                { type: "text", text: `Structure / Syllabus Notes: ${finalStructure}` },
                {
                  type: "image_url",
                  image_url: {
                    url: image // base64 data URL
                  }
                }
              ]
            });
          } else {
            messages.push({
              role: "user",
              content: `Generate a simulated exam with exactly ${numQuestions} questions for the subject "${subject}" based on this structure:\n${finalStructure}`
            });
          }

          const response = await fetch(endpoint.url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              model: endpoint.model,
              temperature: 0.8,
              max_tokens: 3000,
              messages
            }),
            signal: AbortSignal.timeout(22000) // 22 seconds timeout per endpoint
          });

          if (response.ok) {
            const data = await response.json();
            if (data.choices && data.choices[0] && data.choices[0].message) {
              responseText = data.choices[0].message.content.trim();
              if (responseText && responseText.length > 20) {
                success = true;
                break;
              }
            }
          }
        } catch (e) {
          console.error(`Failed calling quiz generator endpoint ${endpoint.url}:`, e);
        }
      }
    }

    // Clean up potential markdown code block wrappers
    if (success) {
      // Regex match to extract JSON array
      const jsonMatch = responseText.match(/\[\s*\{[\s\S]*\}\s*\]/);
      if (jsonMatch) {
        responseText = jsonMatch[0];
      } else {
        responseText = responseText.replace(/^```json\s*/i, "");
        responseText = responseText.replace(/^```\s*/, "");
        responseText = responseText.replace(/\s*```$/, "");
        responseText = responseText.trim();
      }

      try {
        const parsedQuiz = JSON.parse(responseText);
        if (Array.isArray(parsedQuiz) && parsedQuiz.length > 0) {
          return NextResponse.json(parsedQuiz);
        }
      } catch (jsonErr) {
        console.error("Failed to parse AI response as JSON:", responseText, jsonErr);
      }
    }

    // 3. Fallback Smart Custom Quiz Generator if all APIs fail
    console.log("Using smart dynamic fallback quiz generator for subject:", subject);
    const fallbackQuiz = generateFallbackQuiz(subject, numQuestions, finalStructure || "صورة مرفقة بالهيكل");
    return NextResponse.json(fallbackQuiz);

  } catch (err: any) {
    console.error("General error in generate-quiz API:", err);
    return NextResponse.json({ error: "Failed to generate quiz", details: err.message }, { status: 500 });
  }
}

// Official Gemini API content generator
async function callOfficialGeminiAPI(geminiKey: string, systemPrompt: string, structureText: string, imageBase64: string | null, numQuestions: number, subject: string, difficulty: string) {
  // Try gemini-2.5-flash first (most modern default), then fallback to gemini-1.5-flash
  const models = ["gemini-2.5-flash", "gemini-1.5-flash"];
  let lastError = null;

  const parts: any[] = [
    { text: `${systemPrompt}\n\nSubject: ${subject}\nDifficulty: ${difficulty}\nNumber of Questions: ${numQuestions}\n\nTask: Generate the quiz based on the provided documents/images.` },
    { text: `Structure / Syllabus Context:\n${structureText}` }
  ];

  if (imageBase64) {
    const match = imageBase64.match(/^data:(image\/\w+);base64,(.+)$/);
    if (match) {
      parts.push({
        inlineData: {
          mimeType: match[1],
          data: match[2]
        }
      });
    }
  }

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts
            }
          ],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  question: { type: "STRING" },
                  options: {
                    type: "ARRAY",
                    items: { type: "STRING" }
                  },
                  answerIndex: { type: "INTEGER" },
                  explanation: { type: "STRING" }
                },
                required: ["question", "options", "answerIndex", "explanation"]
              }
            }
          }
        }),
        signal: AbortSignal.timeout(25000)
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text && text.trim().length > 20) {
          return text;
        }
      } else {
        const errText = await response.text();
        console.warn(`Failed calling official Gemini model ${model}:`, errText);
      }
    } catch (e) {
      console.warn(`Error calling official Gemini model ${model}:`, e);
      lastError = e;
    }
  }

  throw lastError || new Error("Failed to generate content with all Gemini models");
}

// Shuffles an array and returns correct item's index
function shuffleArray(array: string[], correctItem: string) {
  const arr = [...new Set(array.map(s => s.trim()))].filter(Boolean);
  // Ensure we have exactly 4 options
  while (arr.length < 4) {
    arr.push(`خيارات مكملة للاختبار النهائي لمادة الدراسية`);
  }
  // If correct item was filtered out or missing, insert it
  if (!arr.includes(correctItem.trim())) {
    arr[0] = correctItem.trim();
  }

  // Shuffle using Fisher-Yates
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  const correctIndex = arr.indexOf(correctItem.trim());
  return { array: arr, correctIndex: correctIndex === -1 ? 0 : correctIndex };
}

// Helper to generate a realistic mock quiz depending on selected subject or uploaded file contents
function generateFallbackQuiz(subject: string, count: number, structure: string) {
  const result: Array<{ question: string; options: string[]; answerIndex: number; explanation: string }> = [];

  // Parse lines to build custom content-aware questions if structure is available
  const cleanStructure = structure.replace(/\[ملف.*?\]/g, "").replace(/\[محتوى.*?\]/g, "").trim();
  
  if (cleanStructure.length > 30) {
    const lines = cleanStructure
      .split(/\n+/)
      .map(l => l.trim())
      .filter(l => l.length > 12 && !l.startsWith("http"));

    const extractedPairs: Array<{ concept: string; definition: string }> = [];
    const keyStatements: string[] = [];

    // Common indicators for definitions in Arabic and English
    const indicators = [
      { sep: " هو ", ar: true },
      { sep: " هي ", ar: true },
      { sep: " عبارة عن ", ar: true },
      { sep: " يعني ", ar: true },
      { sep: " يعرف بأنه ", ar: true },
      { sep: " : ", ar: null },
      { sep: " - ", ar: null },
      { sep: " is defined as ", ar: false },
      { sep: " refers to ", ar: false },
      { sep: " is ", ar: false }
    ];

    for (const line of lines) {
      let matched = false;
      for (const ind of indicators) {
        if (line.includes(ind.sep)) {
          const parts = line.split(ind.sep);
          if (parts.length >= 2) {
            const concept = parts[0].replace(/^[\d.-]+\s*/, "").replace(/^[*•#-]\s*/, "").trim();
            const definition = parts.slice(1).join(ind.sep).trim();
            if (concept.length >= 2 && concept.length <= 40 && definition.length >= 10) {
              extractedPairs.push({ concept, definition });
              matched = true;
              break;
            }
          }
        }
      }
      if (!matched && line.length > 25 && line.length < 160) {
        keyStatements.push(line);
      }
    }

    // 1. Generate definition lookup questions
    const usedConcepts = new Set<string>();
    for (const pair of extractedPairs) {
      if (result.length >= count) break;
      if (usedConcepts.has(pair.concept.toLowerCase())) continue;
      usedConcepts.add(pair.concept.toLowerCase());

      const questionText = `بناءً على الهيكل الدراسي والمستند المرفق، ما هو التعريف الدقيق لـ (${pair.concept})؟`;
      const correctOption = pair.definition;

      // Extract up to 3 other definitions as distractors
      const otherDefs = extractedPairs
        .filter(p => p.concept.toLowerCase() !== pair.concept.toLowerCase())
        .map(p => p.definition);

      // Add default placeholders if we lack dynamic options
      while (otherDefs.length < 3) {
        otherDefs.push(
          `أحد المفاهيم المرتبطة بدرس ${pair.concept} للوحدات الدراسية المقررة.`,
          `العلاقة الرياضية أو المفهوم النظري الذي يربط متغيرات الدرس المذكور.`,
          `المصطلح الأكاديمي المناسب لبنود الهيكل النهائي المعتمد.`
        );
      }

      const options = [correctOption, otherDefs[0], otherDefs[1], otherDefs[2]];
      const shuffled = shuffleArray(options, correctOption);

      result.push({
        question: questionText,
        options: shuffled.array,
        answerIndex: shuffled.correctIndex,
        explanation: `التعريف الصحيح والواضح لـ (${pair.concept}) هو: ${pair.definition}`
      });
    }

    // 2. Generate fill-in-the-blank questions
    for (const statement of keyStatements) {
      if (result.length >= count) break;

      const words = statement.split(/\s+/).map(w => w.replace(/[.,;:!?()]/g, "")).filter(w => w.length > 4);
      if (words.length < 5) continue;

      // Pick a keyword from the middle of the statement
      const keywordIdx = Math.floor(words.length / 2);
      const keyword = words[keywordIdx];
      if (!keyword || keyword.length < 3) continue;

      const blankText = statement.replace(new RegExp(`\\b${keyword}\\b`, "g"), "_______");
      if (!blankText.includes("_______")) continue;

      const questionText = `أكمل الفراغ في العبارة التالية وفقاً لما ورد في الملف الدراسي المرفق:\n\n"${blankText}"`;
      const correctOption = keyword;

      const otherWords = words.filter(w => w !== keyword);
      while (otherWords.length < 3) {
        otherWords.push("المركب", "العملية", "القانون", "النسبة", "المتغير", "القيمة");
      }

      const options = [correctOption, otherWords[0], otherWords[1], otherWords[2]];
      const shuffled = shuffleArray(options, correctOption);

      result.push({
        question: questionText,
        options: shuffled.array,
        answerIndex: shuffled.correctIndex,
        explanation: `العبارة الصحيحة والكاملة هي: "${statement}"`
      });
    }
  }

  // 3. Keep standard premium questions fallback database to guarantee complete count
  const quizzes: Record<string, Array<{ question: string; options: string[]; answerIndex: number; explanation: string }>> = {
    english: [
      {
        question: "Choose the correct form to complete the sentence: 'By the time the exam starts, we _______ all the grammar structures.'",
        options: ["will have reviewed", "will review", "have reviewed", "reviewed"],
        answerIndex: 0,
        explanation: "نستخدم المستقبل التام (will have + V3) للتعبير عن حدث سوف يكتمل قبل وقت محدد في المستقبل."
      },
      {
        question: "Select the sentence with correct punctuation:",
        options: [
          "Although the test was difficult, Hamad scored full marks.",
          "Although the test was difficult Hamad, scored full marks.",
          "Although, the test was difficult Hamad scored full marks.",
          "Although the test was difficult Hamad scored full marks"
        ],
        answerIndex: 0,
        explanation: "عند البدء بجملة شرطية أو تابعة (Although)، يجب وضع فاصلة (comma) بعد انتهاء هذه الجملة وقبل البدء بالجملة الرئيسية."
      },
      {
        question: "Identify the synonym of the underlined word: 'The teacher gave a COMPREHENSIVE review before the final exam.'",
        options: ["Thorough and complete", "Brief and quick", "Complicated", "Unfair"],
        answerIndex: 0,
        explanation: "كلمة Comprehensive تعني شامل وتفصيلي، ومرادفها الدقيق هو Thorough and complete."
      },
      {
        question: "Choose the correct relative pronoun: 'The student _______ project won first place was highly praised by the principal.'",
        options: ["whose", "who", "which", "whom"],
        answerIndex: 0,
        explanation: "نستخدم ضمير الملكية (whose) للربط بين المالك (The student) والمملوك (project)."
      },
      {
        question: "Complete the conditional sentence: 'If I _______ harder last term, I would have achieved a better grade.'",
        options: ["had studied", "studied", "would study", "have studied"],
        answerIndex: 0,
        explanation: "هذه الحالة الشرطية الثالثة (Third Conditional) للتعبير عن الندم في الماضي، والتركيبة هي: If + Past Perfect -> would have + Past Participle."
      }
    ],
    math: [
      {
        question: "أوجد طول المتجه v الذي مركباته (3, 4):",
        options: ["5", "7", "25", "1"],
        answerIndex: 0,
        explanation: "نطبق قانون طول المتجه: |v| = √(vx² + vy²) = √(3² + 4²) = √(9 + 16) = √25 = 5."
      },
      {
        question: "ما هي القيمة الصغرى للدالة f(x) = x² - 4x + 5؟",
        options: ["1", "5", "2", "-4"],
        answerIndex: 0,
        explanation: "الدالة تربيعية، القيمة الصغرى تقع عند الرأس x = -b/(2a) = 4/2 = 2. بالتعويض: f(2) = 2² - 4(2) + 5 = 4 - 8 + 5 = 1."
      },
      {
        question: "ما هي المشتقة الأولى للدالة f(x) = x²؟",
        options: ["2x", "x", "2", "2x²"],
        answerIndex: 0,
        explanation: "باستخدام قاعدة القوة للاشتقاق: مشتقة x^n هي n*x^(n-1). إذن مشتقة x² هي 2x."
      },
      {
        question: "أوجد قيمة محددة المصفوفة الثنائية [[2, 3], [1, 5]]:",
        options: ["7", "13", "10", "3"],
        answerIndex: 0,
        explanation: "قانون محددة المصفوفة الثنائية ad - bc = (2 * 5) - (3 * 1) = 10 - 3 = 7."
      },
      {
        question: "أوجد الضرب النقطي (Dot Product) للمتجهين u(1, 2) و v(3, -1):",
        options: ["1", "5", "7", "-1"],
        answerIndex: 0,
        explanation: "الضرب النقطي u · v = ux*vx + uy*vy = (1 * 3) + (2 * -1) = 3 - 2 = 1."
      }
    ],
    physics: [
      {
        question: "إذا أثرت قوة مقدارها 20 N على جسم وحركته مسافة 5 m في اتجاه القوة، فما مقدار الشغل المبذول؟",
        options: ["100 J", "4 J", "25 J", "15 J"],
        answerIndex: 0,
        explanation: "الشغل = القوة × الإزاحة = W = F × d = 20 × 5 = 100 جول."
      },
      {
        question: "ما هو قانون طاقة الحركة (Kinetic Energy) لجسم كتلته m وسرعته v؟",
        options: ["1/2 m v²", "m g h", "m v", "1/2 m v"],
        answerIndex: 0,
        explanation: "قانون طاقة الحركة المعتمد هو: KE = 0.5 * m * v²."
      },
      {
        question: "ما هي وحدة قياس التسارع (Acceleration) في النظام الدولي للوحدات؟",
        options: ["m/s²", "m/s", "N", "J"],
        answerIndex: 0,
        explanation: "التسارع هو معدل تغير السرعة بالنسبة للزمن، ووحدته هي متر لكل ثانية مربعة (m/s²)."
      },
      {
        question: "أي القوانين التالية يمثل قانون نيوتن الثاني للحركة؟",
        options: ["F = m * a", "W = F * d", "P = W / t", "p = m * v"],
        answerIndex: 0,
        explanation: "قانون نيوتن الثاني ينص على أن القوة تساوي الكتلة ضرب التسارع (F = ma)."
      },
      {
        question: "ما هو قانون القدرة الكهربائية أو الميكانيكية (Power)؟",
        options: ["P = W / t", "P = W * t", "P = F * d", "P = m * g"],
        answerIndex: 0,
        explanation: "القدرة هي معدل بذل الشغل بالنسبة للزمن: P = Work / time."
      }
    ],
    chemistry: [
      {
        question: "ما هو الاسم النظامي IUPAC للمركب CH3-CH2-OH؟",
        options: ["الإيثانول", "الميثانول", "البروبانول", "ثنائي ميثيل إيثر"],
        answerIndex: 0,
        explanation: "سلسلة من ذرتي كربون (إيثان) متصلة بمجموعة هيدروكسيل (-OH) المميزة للكحولات، لذا يسمى إيثانول."
      },
      {
        question: "ما هي التسمية العامة للمركبات الهيدروكربونية التي تحتوي على رابطة ثنائية واحدة على الأقل بين ذرات الكربون؟",
        options: ["الألكينات (Alkenes)", "الألكانات (Alkanes)", "الألكاينات (Alkynes)", "الاسترات (Esters)"],
        answerIndex: 0,
        explanation: "المركبات ذات الروابط الأحادية هي ألكانات، والروابط الثنائية هي ألكينات، والروابط الثلاثية هي ألكاينات."
      },
      {
        question: "ما هي الصيغة الكيميائية لمركب كربونات الصوديوم؟",
        options: ["Na2CO3", "NaHCO3", "NaCl", "NaOH"],
        answerIndex: 0,
        explanation: "كربونات الصوديوم تتكون من شق الصوديوم الموجب (Na+) وشق الكربونات الثنائي السالب (CO3²-) فتكون الصيغة Na2CO3."
      },
      {
        question: "ما هي المجموعة الوظيفية المميزة للأحماض الكربوكسيلية؟",
        options: ["-COOH", "-OH", "-CHO", "-COO-"],
        answerIndex: 0,
        explanation: "تتميز الأحماض الكربوكسيلية بوجود مجموعة الكربوكسيل (-COOH) المتصلة بالسلسلة الهيدروكربونية."
      },
      {
        question: "ما هي نواتج الاحتراق الكامل لأي مركب هيدروكربوني في وجود وفرة من غاز الأكسجين؟",
        options: ["ثاني أكسيد الكربون وبخار الماء", "أول أكسيد الكربون والهيدروجين", "غاز الكربون والأكسجين", "الماء والكربونات"],
        answerIndex: 0,
        explanation: "الاحتراق الكامل للهيدروكربونات ينتج دائماً غاز ثاني أكسيد الكربون (CO2) وبخار الماء (H2O) مع انطلاق طاقة."
      }
    ],
    biology: [
      {
        question: "ما هو خط الدفاع الأول الأساسي في الجهاز المناعي للإنسان ضد مسببات الأمراض؟",
        options: ["الجلد والأغشية المخاطية", "خلايا الدم البيضاء", "الأجسام المضادة", "العقد الليمفاوية"],
        answerIndex: 0,
        explanation: "الجلد والأغشية المخاطية تمثل حواجز فيزيائية وكيميائية تمنع دخول مسببات الأمراض، وهي جزء من المناعة غير المتخصصة."
      },
      {
        question: "في أي عضية خلوية تحدث عملية التنفس الخلوي لإنتاج طاقة الـ ATP؟",
        options: ["الميتوكوندريا", "البلاستيدات الخضراء", "جهاز جولجي", "الريبوسومات"],
        answerIndex: 0,
        explanation: "الميتوكوندريا هي مصانع الطاقة في الخلية وحيث يحدث التنفس الخلوي الهوائي."
      },
      {
        question: "ما هي التسمية العلمية لعملية نسخ الحمض النووي لتكوين نسخة مطابقة تماماً؟",
        options: ["تضاعف الـ DNA (Replication)", "النسخ (Transcription)", "الترجمة (Translation)", "الانقسام المنصف"],
        answerIndex: 0,
        explanation: "عملية صنع نسخة مطابقة من الـ DNA تسمى عملية التضاعف (Replication)."
      },
      {
        question: "ماذا يسمى الكائن أو العامل الحيوي الذي يسبب حدوث المرض للجسم؟",
        options: ["مسبب المرض (Pathogen)", "المستضد (Antigen)", "الجسم المضاد (Antibody)", "اللقاح (Vaccine)"],
        answerIndex: 0,
        explanation: "مسببات الأمراض (Pathogens) تشمل البكتيريا، الفيروسات، الفطريات، والطفيليات التي تسبب أضراراً حيوية للجسم."
      },
      {
        question: "أين تنضج وتتميز الخلايا التائية (T-cells) في جهاز المناعة البشري؟",
        options: ["الغدة الزعترية (Thymus)", "نخاع العظم", "الطحال", "العقد الليمفاوية"],
        answerIndex: 0,
        explanation: "تنتج الخلايا التائية في نخاع العظم ولكنها تهاجر لتنضج وتتميز في الغدة الزعترية (Thymus)."
      }
    ],
    arabic: [
      {
        question: "حدد الفاعل في الجملة التالية: 'يحرصُ الطالبُ المجتهدُ على المراجعةِ اليومية.'",
        options: ["الطالبُ", "المجتهدُ", "يحرصُ", "المراجعةِ"],
        answerIndex: 0,
        explanation: "الفاعل هو من قام بالفعل، وفي الجملة الطالبُ هو الذي يقوم بالحرص، وعلامة رفعه الضمة الظاهرة."
      },
      {
        question: "ما هو المحسن البديعي في قوله تعالى: 'وَتَحْسَبُهُمْ أَيْقَاظًا وَهُمْ رُقُودٌ'؟",
        options: ["طباق", "جناس", "سجع", "تورية"],
        answerIndex: 0,
        explanation: "الطباق هو الجمع بين الشيء وضده في الكلام، والجمع بين (أيقاظاً) و(رقود) هو طباق إيجاب."
      },
      {
        question: "أعرب الكلمة المخطوطة في الجملة: 'كان الامتحانُ سـهلاً جداً.'",
        options: ["خبر كان منصوب", "اسم كان مرفوع", "مبتدأ مرفوع", "صفة منصوبة"],
        answerIndex: 0,
        explanation: "الامتحانُ هو اسم كان مرفوع بالضمة، و(سهلاً) هو خبر كان منصوب وعلامة نصبه الفتحة."
      }
    ],
    islamic: [
      {
        question: "ما هو المد المتصل من المدود الفرعية التالية؟",
        options: [
          "أن يقع الهمز بعد حرف المد في كلمة واحدة",
          "أن يقع الهمز بعد حرف المد في كلمتين منفصلتين",
          "أن يقع السكون الأصلي بعد حرف المد",
          "أن يقع السكون العارض بعد حرف المد"
        ],
        answerIndex: 0,
        explanation: "المد الفرعي المتصل هو أن يأتي حرف المد وتليه الهمزة في كلمة واحدة (مثل: السماء، جيء)."
      },
      {
        question: "في أي سنة هجرية وقعت غزوة بدر الكبرى؟",
        options: ["2 هـ", "3 هـ", "5 هـ", "8 هـ"],
        answerIndex: 0,
        explanation: "وقعت غزوة بدر الكبرى في السابع عشر من شهر رمضان في السنة الثانية من الهجرة النبوية."
      },
      {
        question: "ما هو أصح كتاب بعد كتاب الله تعالى في الأحاديث النبوية الشريفة؟",
        options: ["صحيح البخاري", "صحيح مسلم", "سنن الترمذي", "موطأ مالك"],
        answerIndex: 0,
        explanation: "اتفق علماء الأمة على أن صحيح الإمام البخاري هو أصح الكتب المصنفة في الحديث النبوية الشريفة."
      }
    ],
    social: [
      {
        question: "في أي عام تم إعلان قيام دولة الإمارات العربية المتحدة رسمياً؟",
        options: ["1971 م", "1972 م", "1970 م", "1975 م"],
        answerIndex: 0,
        explanation: "تم إعلان الاتحاد وقيام دولة الإمارات العربية المتحدة رسمياً في الثاني من ديسمبر عام 1971 ميلادية."
      },
      {
        question: "من هو المؤسس الأول لدولة الإمارات العربية المتحدة طيب الله ثراه؟",
        options: [
          "الشيخ زايد بن سلطان آل نهيان",
          "الشيخ راشد بن سعيد آل مكتوم",
          "الشيخ خليفة بن زايد آل نهيان",
          "الشيخ محمد بن راشد آل مكتوم"
        ],
        answerIndex: 0,
        explanation: "المؤسس والأب الباني للدولة هو المغفور له بإذن الله الشيخ زايد بن سلطان آل نهيان، طيب الله ثراه."
      },
      {
        question: "ما هي عاصمة دولة الإمارات العربية المتحدة؟",
        options: ["أبوظبي", "دبي", "الشارقة", "العين"],
        answerIndex: 0,
        explanation: "أبوظبي هي العاصمة الاتحادية الرسمية لدولة الإمارات العربية المتحدة ومقر رئيس الدولة والحكومة."
      }
    ],
    other: [
      {
        question: "ما هي أفضل طريقة للاستعداد للاختبار الوزاري النهائي لصف 11 متقدم؟",
        options: [
          "مراجعة الهياكل الرسمية وحل الكويزات التفاعلية والـ PDFs بانتظام",
          "حفظ القوانين دون تطبيق عملي",
          "السهر ليلة الامتحان دون نوم كافٍ",
          "الاعتماد على التوقعات غير الرسمية"
        ],
        answerIndex: 0,
        explanation: "أفضل ممارسة دراسية هي المذاكرة المنظمة للبنود الرسمية للهيكل مع التدريب بحل الكويزات والامتحانات السابقة."
      },
      {
        question: "كيف يمكنك تنظيم وقتك للدراسة بمرونة عالية؟",
        options: [
          "استخدام مؤقت بومودورو بجدولة 25 دقيقة تركيز و5 دقائق استراحة",
          "الدراسة لساعات طويلة متواصلة دون أي راحة",
          "الدراسة فقط عند الشعور بالحماس المفاجئ",
          "مذاكرة جميع المواد في وقت واحد"
        ],
        answerIndex: 0,
        explanation: "تقسيم وقت الدراسة بأسلوب بومودورو يزيد التركيز ويمنع التشتت والإرهاق بشكل علمي."
      }
    ]
  };

  const subKey = subject ? subject.toLowerCase() : "english";
  const defaultList = quizzes[subKey] || quizzes.english;
  
  // Fill remaining questions using customized default templates
  let index = 0;
  while (result.length < count) {
    const item = defaultList[index % defaultList.length];
    
    // Customize the question slightly to mention context from user structure if available
    let customQuestion = item.question;
    if (cleanStructure.length > 10) {
      const snippet = cleanStructure.slice(0, 45).replace(/\n/g, " ").trim();
      customQuestion = `[محاكاة للهيكل: ${snippet}...] \n ${customQuestion}`;
    }
    
    // Prevent exact duplicate questions
    const isDuplicate = result.some(r => r.question === customQuestion);
    if (!isDuplicate) {
      result.push({
        ...item,
        question: customQuestion
      });
    }
    index++;
    
    // Failsafe break to avoid infinite loop if count is huge
    if (index > 100) {
      result.push({
        ...item,
        question: `${item.question} (#${result.length + 1})`
      });
    }
  }

  return result.slice(0, count);
}

