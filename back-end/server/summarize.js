const OpenAI = require("openai");
require('dotenv').config()
const ai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function summarize(text) {
    
    let prompt = "Please give a thorough summary of this text: " + text;
    const completion = await ai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant designed to ouput consistent results in Markdown format with headings.",
          },
          { role: "user", content: prompt },
        ],
        model: "gpt-3.5-turbo-1106",
        //response_format: { type: "json_object" },
      });
  

    return completion;
}

module.exports = summarize;