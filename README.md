# 🤖 Deepseek AI Code Review GitHub Action

This GitHub Action uses [Deepseek](https://deepseek.com) AI to automatically review code changes in pull requests. It analyzes code diffs and leaves helpful feedback as comments, making your code reviews faster and smarter.

---

## 🚀 Features

- Automatically triggers on pull request events
- Sends PR file diffs to Deepseek for review
- Posts AI-generated comments back on the PR
- Easily configurable and extendable

---

## 📂 File Structure

```
ai-code-review/
├── .github/
│   └── workflows/
│       └── ai-review.yml         # GitHub workflow trigger
├── src/
│   └── deepseek-agent.js         # Handles Deepseek API call
├── action.yml                    # GitHub Action metadata
├── index.js                      # Main action logic
├── package.json                  # Dependencies (uses axios)
└── README.md                     # You're here
```

---

## ⚙️ Setup Instructions

### 1. Clone This Repo & Install Dependencies

```bash
npm install
```

### 2. Add Your Deepseek API Key

Go to your GitHub repository:

- Navigate to **Settings → Secrets and variables → Actions**
- Add a new secret:

```
Name: DEEPSEEK_API_KEY
Value: <your-deepseek-api-key>
```

### 3. Workflow File

Make sure this file exists at `.github/workflows/ai-review.yml`:

```yaml
name: Deepseek Code Review

on:
  pull_request:
    types: [opened, synchronize, reopened, ready_for_review]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run Deepseek Code Review
        uses: ./
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          deepseek_api_key: ${{ secrets.DEEPSEEK_API_KEY }}
          pr_number: ${{ github.event.number }}
          owner: ${{ github.repository.owner.login }}
          repo: ${{ github.event.repository.name }}
```

---

## 💬 What It Does

When a pull request is opened or updated, the workflow:

1. Fetches the list of changed files
2. Filters for JavaScript files (`.js` by default)
3. Sends code diffs to Deepseek API
4. Posts feedback in the PR as comments

---

## 🛠 Customize

You can modify:

- The file types to review (e.g., `.js`, `.py`, `.ts`)
- The AI prompt in `src/deepseek-agent.js`
- How and where comments are posted in `index.js`

---

## 📜 License

MIT — feel free to use and adapt.

---

## ✨ Credits

Built with 💡 and 🤖 using [Deepseek](https://deepseek.com) and [GitHub Actions](https://docs.github.com/en/actions).
