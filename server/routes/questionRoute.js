const express = require("express");
const router = express.Router();
const openai = require("../config/gen"); // OpenAI instance

router.post("/", async (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "Topic is required" });
  }

  const prompt = `
Generate 10 multiple-choice questions about "${topic}". 
Each question must include 1 correct answer and 3 wrong options.

Return ONLY valid JSON in the following format:
[
  {
    "question": "What is ...?",
    "options": ["A", "B", "C", "D"],
    "answer": "A"
  }
]
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const text = completion.choices[0].message.content;

    // Extract JSON safely
    const jsonStart = text.indexOf("[");
    const jsonEnd = text.lastIndexOf("]") + 1;
    const jsonString = text.slice(jsonStart, jsonEnd);

    const questions = JSON.parse(jsonString);

    res.json({ questions });
  } catch (err) {
    console.error("OpenAI Error:", err);
    res.status(500).json({ error: "Failed to generate questions" });
  }
});

router.post("/more", async (req, res) => {
  const { topic, exclude = [] } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "Topic is required" });
  }

  const prompt = `
Generate 15 multiple-choice questions about "${topic}". 
Each question must include 1 correct answer and 3 wrong options.

Return ONLY valid JSON in the following format:
[
  {
    "question": "What is ...?",
    "options": ["A", "B", "C", "D"],
    "answer": "A"
  }
]

Ensure all questions are unique and different from this list:
${JSON.stringify(exclude, null, 2)}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const text = completion.choices[0].message.content;

    const jsonStart = text.indexOf("[");
    const jsonEnd = text.lastIndexOf("]") + 1;
    const jsonString = text.slice(jsonStart, jsonEnd);

    let newQuestions = JSON.parse(jsonString);

    // Server-side safety filter
    newQuestions = newQuestions.filter(
      (q) => !exclude.includes(q.question.trim())
    );

    res.json({ questions: newQuestions.slice(0, 10) });
  } catch (err) {
    console.error("OpenAI Error:", err);
    res.status(500).json({ error: "Failed to generate new questions" });
  }
});

module.exports = router;
