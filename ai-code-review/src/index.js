import { reviewCodeWithDeepseek } from './src/deepseek-agent.js';
import axios from 'axios';

const token = process.env.INPUT_TOKEN;
const apiKey = process.env.INPUT_DEEPSEEK_API_KEY;
const prNumber = process.env.INPUT_PR_NUMBER;
const owner = process.env.INPUT_OWNER;
const repo = process.env.INPUT_REPO;

const files = await axios.get(
  `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/files`,
  {
    headers: { Authorization: `token ${token}` }
  }
);

for (const file of files.data) {
  if (!file.filename.endsWith('.js')) continue;

  const patch = file.patch;
  if (!patch) continue;

  const feedback = await reviewCodeWithDeepseek(patch, apiKey);

  await axios.post(
    `https://api.github.com/repos/${owner}/${repo}/issues/${prNumber}/comments`,
    {
      body: `💬 **AI Review for \`${file.filename}\`:**\n\n${feedback}`
    },
    {
      headers: { Authorization: `token ${token}` }
    }
  );
}
