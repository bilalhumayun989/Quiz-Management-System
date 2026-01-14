const express = require("express");
const router = express.Router();
const openai = require("../config/gen");

router.post("/", async (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "Topic is required" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Provide detailed information about: ${topic}`,
        },
      ],
      temperature: 0.7,
    });

    const text = completion.choices[0].message.content;

    res.json({ openaiResponse: text });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Failed to fetch OpenAI response" });
  }
});

module.exports = router;
