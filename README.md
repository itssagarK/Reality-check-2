# Reality Check AI

> **Audit your plans before reality does.**

Most AI tools tell you what you want to hear. Reality Check AI tells you what you need to know.


---

## The Problem

Most planning tools — and most AI assistants — respond with encouragement.

You say: *"I'll build a SaaS product in two months while working full-time."*  
They say: *"Great idea! Here's how to get started."*

That creates **false confidence** — the leading cause of wasted months, abandoned projects, and preventable failure.

Reality Check AI takes the opposite approach.

Instead of motivating you, it asks one honest question:

> **Given your actual constraints — is this plan realistic?**

---

## What It Does

Reality Check AI works like a **structured feasibility auditor**. You describe your plan and provide real constraints. The AI analyzes the plan and returns a clear, organized verdict — no fluff, no cheerleading.

### Output Breakdown

| Component | Description |
|---|---|
| **Reality Score** | A 0–100 feasibility score based on your constraints |
| **Failure Diagnosis** | The core structural problems undermining the plan |
| **Stop Signals** | Specific conditions that indicate when to cut your losses |
| **Decision Path Analysis** | Simpler or alternative approaches with explicit trade-offs |
| **Overengineering Detection** | Flags unnecessary complexity before it becomes a liability |
| **Risk Warnings** | Hidden assumptions and overlooked dependencies |

---

## Example Audit

**Plan:**
> *"I want to build a SaaS product in 2 months while working a full-time job."*

**Constraints provided:**
- Time available: 2 hours/day
- Budget: $200
- Skill level: Intermediate

---

**Reality Score: 35 / 100** 🔴

**Failure Diagnosis:**
- Development scope significantly exceeds available time at 2 hrs/day
- Marketing, distribution, and customer acquisition are entirely unaccounted for
- $200 budget restricts infrastructure, tooling, and testing capacity

**Stop Signal:**  
If no working MVP exists by week 8, the timeline has already failed.

**Alternative Paths:**
1. Build a single-feature product instead of a full platform
2. Launch a manual service first — validate demand before writing code
3. Extend the timeline to 6 months with reduced daily scope

---

## How to Use It

1. **Describe your plan** — your goal, project, or idea in plain language
2. **Add your constraints** — time available, budget, relevant skill level
3. **Run the Reality Check** — the AI performs a structured feasibility analysis
4. **Review the output** — score, risks, stop signals, and alternatives
5. **Iterate** — adjust constraints or strategy and re-evaluate

---

## Design Philosophy

Reality Check AI is built around three core principles:

**1. Reality over motivation**  
The system is deliberately designed to avoid encouraging responses. Constraints are treated as hard limits, not obstacles to reframe optimistically.

**2. Structured reasoning over conversation**  
Results are organized into distinct, labeled sections. No long paragraphs of generic advice — just clear, structured analysis you can act on.

**3. Simplicity over complexity**  
When in doubt, the system recommends the simpler path. Fewer dependencies, smaller scope, and validated assumptions win over ambitious architectures.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite + TypeScript |
| Styling | Tailwind CSS |
| AI | Google Gemini via AI Studio |
| Deployment | Google Cloud Run |
| Containerization | Docker + Nginx |

---

## System Architecture

```
User Input (Plan + Constraints)
        │
        ▼
Constraint Parser
        │
        ▼
Gemini AI — Structured Feasibility Analysis
        │
        ▼
Output Engine
   ├── Reality Score
   ├── Failure Diagnosis
   ├── Stop Signals
   ├── Decision Path Analysis
   └── Risk Warnings
```

The AI is not generating motivational advice. It is producing structured reasoning that the UI surfaces as an auditable report.

---

## Getting Started

**Prerequisites:** Node.js 18+, a Google Gemini API key

```bash
# Clone the repository
git clone https://github.com/yourusername/reality-check-ai.git
cd reality-check-ai

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Add your Gemini API key to .env.local:
# VITE_GEMINI_API_KEY=your_api_key_here

# Start the development server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Limitations

Reality Check AI is a **decision-support tool**, not a prediction engine.

- Analysis quality depends on the accuracy of user-provided constraints
- The system identifies feasibility patterns — it does not guarantee outcomes
- Complex external variables (market dynamics, personal circumstances, luck) are outside its scope

The goal is not perfect prediction. It is **better planning awareness** — catching structural problems before they cost you months of effort.

---

## Why This Matters

Sunk cost is real. People continue down failing paths because they've already invested time, energy, and identity into a plan.

The best time to evaluate a plan is **before** that investment begins.

Reality Check AI is an experiment in using AI not to inspire action, but to sharpen judgment — so that when action does happen, it's pointed in the right direction.

---

## Live Demo

👉 [Try Reality Check AI](https://ai.studio/apps/drive/YOUR_APP_LINK)

---

## Built By

**Sagar** — Built for the [Scaler AI Build Challenge](https://scaler.com)
