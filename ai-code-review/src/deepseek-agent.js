import axios from 'axios';

export async function reviewCodeWithDeepseek(code, apiKey) {
  const prompt = `
You are a world-class senior software engineer performing an in-depth code review.

Analyze the following code with a focus on:

1. ✅ **Syntax & Semantics** – Are there any syntax errors, anti-patterns, or unclear logic?
2. 🪲 **Bugs & Vulnerabilities** – Identify potential bugs, security flaws, or edge case failures.
3. 📊 **Code Quality** – Evaluate maintainability, readability, modularity, and best practices.
4. ⚡ **Performance** – Highlight any inefficient logic, loops, or calls that can be optimized.
5. 🧹 **Refactoring** – Suggest cleaner or more idiomatic ways to implement the same logic.
6. 🔧 **Fix & Improve** – Rewrite the code with improvements, clearly highlighting changes.
7. 💬 **Explain Changes** – Describe why your changes are beneficial and how they improve the code.

---
Here is the code to review:
\`\`\`javascript
${code}
\`\`\`
`;


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
