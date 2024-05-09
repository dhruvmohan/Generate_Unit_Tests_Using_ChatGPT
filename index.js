require('dotenv').config();
const fs = require('fs');
const axios = require('axios');
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: 'YOUR-API_KEY', dangerouslyAllowBrowser: true
});

async function generateUnitTests(sourceFilePath) {
  const sourceCode = fs.readFileSync(sourceFilePath, 'utf-8');

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: [{ role: "user", content: `Generate unit test cases with 100% coverage in jest framework sfor the following Angular JavaScript code:\n\n${sourceCode}`}],
      temperature: 0,
      max_tokens: 1000,
    });

    const testCases = response.choices[0].message.content;
    const outputFilePath = sourceFilePath.replace('.js', '.test.js');
    fs.writeFileSync(outputFilePath, testCases);
    console.log(`Test cases written to ${outputFilePath}`);
  } catch (error) {
    console.error('Failed to generate test cases:', error);
  }
}

const filePath = process.argv[2];
if (!filePath) {
  console.log('Please provide a file path');
  process.exit(1);
}
generateUnitTests(filePath);