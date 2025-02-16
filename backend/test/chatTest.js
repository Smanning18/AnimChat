const OpenAI = require("openai");
const { getCharacterPrompt } = require("../characters");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testWaifuResponse() {
  const testConversationHistory = [
    { role: "assistant", content: "Hello, how can I brighten your day?" },
  ];
  const testUserMessage = "Tell me something lovely about art.";
  const testCharacterId = "aiko"; // Testing with Aiko who loves art

  try {
    // Get the system prompt
    const systemPrompt = getCharacterPrompt(testCharacterId);

    // Construct messages array
    const messages = [
      { role: "system", content: systemPrompt },
      ...testConversationHistory,
      { role: "user", content: testUserMessage },
    ];

    console.log("Test Configuration:");
    console.log("Character ID:", testCharacterId);
    console.log("System Prompt:", systemPrompt);
    console.log("Full Messages Array:", JSON.stringify(messages, null, 2));

    // Make the API call
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.8,
      max_tokens: 150,
    });

    const aiResponse = completion.choices[0].message.content;
    console.log("\nAI Response:", aiResponse);

    // Basic validation
    const artRelatedWords = [
      "art",
      "painting",
      "gallery",
      "artist",
      "beautiful",
      "creative",
    ];
    const containsArtReference = artRelatedWords.some((word) =>
      aiResponse.toLowerCase().includes(word),
    );

    console.log("\nValidation Results:");
    console.log("Contains art reference:", containsArtReference);
    console.log("Response length:", aiResponse.length);

    return aiResponse;
  } catch (error) {
    console.error("Test Error:", error);
    throw error;
  }
}

// Run the test
console.log("Starting Waifu Response Test...\n");
testWaifuResponse()
  .then(() => {
    console.log("\nTest completed.");
  })
  .catch((error) => {
    console.error("Test failed:", error);
  });
