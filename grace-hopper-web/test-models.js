const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("Error: GEMINI_API_KEY is not defined in the environment.");
  process.exit(1);
}
const genAI = new GoogleGenerativeAI(apiKey);

const modelsToTest = [
  "gemini-2.5-flash-lite",
  "gemini-flash-latest",
  "gemini-2.5-flash", // We know it worked, let's see if it still 503s or works now
  "gemini-3.1-flash-lite"
];

async function main() {
  for (const modelName of modelsToTest) {
    try {
      console.log(`Testing model: ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const response = await model.generateContent("Hello! Say 'OK' if you can read this.");
      console.log(`✅ Success with ${modelName}! Response:`, response.response.text().trim());
    } catch (err) {
      console.error(`❌ Error with ${modelName}:`, err.message || err);
    }
    console.log("------------------------");
  }
}

main();
