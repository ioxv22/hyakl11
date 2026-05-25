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

    // Try endpoints in order
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

    // Fallback Mock Quiz Generator if all APIs fail or return invalid JSON
    console.log("Using robust fallback mock quiz generator for subject:", subject);
    const fallbackQuiz = generateFallbackQuiz(subject, numQuestions, finalStructure || "صورة مرفقة بالهيكل");
    return NextResponse.json(fallbackQuiz);

  } catch (err: any) {
    console.error("General error in generate-quiz API:", err);
    return NextResponse.json({ error: "Failed to generate quiz", details: err.message }, { status: 500 });
  }
}

// Helper to generate a realistic mock quiz depending on selected subject
function generateFallbackQuiz(subject: string, count: number, structure: string) {
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
    ]
  };

  const defaultList = quizzes[subject.toLowerCase()] || quizzes.english;
  
  // Create an array matching count
  const result = [];
  for (let i = 0; i < count; i++) {
    const item = defaultList[i % defaultList.length];
    result.push({
      ...item,
      question: `[محاكاة للهيكل: ${structure.slice(0, 30)}...] \n ${item.question}`
    });
  }
  return result;
}
