const axios = require('axios');
const { default: OpenAI } = require('openai');

const userConversations = {};

console.log(process.env.OPENAI_API_KEY);
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
});
  async function chatGPTCall(userId, newMessage) {
    const conversationHistory = userConversations[userId] || [{ role: 'system', content: 'You are a helpful assistant.' }];
    
    // Add the user's new message to the conversation
    conversationHistory.push({ role: 'user', content: newMessage });
    const stream = await openai.beta.chat.completions.stream({
      model: 'gpt-4-1106-preview',
      messages: conversationHistory,
      stream: true,
    });
  
    
    const chatCompletion = await stream.finalChatCompletion();
    
    conversationHistory.push({ role: 'system', content: chatCompletion.choices[0].message.content })
    userConversations[userId] = conversationHistory;
    console.log(chatCompletion); 

    return chatCompletion;
  }

  module.exports = {chatGPTCall};
  