import axios from 'axios';

export async function reviewCodeWithDeepseek(code, apiKey) {
  const prompt = `You are an expert developer. Please review the following code and provide helpful, constructive feedback:\n\n${code}`;

  const response = await axios.post(
    'https://api.deepseek.com/chat/completions',
    {
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }]
    },
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.choices?.[0]?.message?.content || 'No feedback returned.';
}
