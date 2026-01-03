<div align="center">
  <img width="1200" height="475" alt="Reality Check AI Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Reality Check AI

Reality Check AI is a feasibility auditing tool that helps people evaluate plans against real-world constraints such as time, scope, resources, and human limits.

Instead of motivating or encouraging ambition, the system focuses on **diagnosing why plans fail**, identifying risk concentration, and suggesting **simpler, more realistic alternatives**.

The goal is not optimism — the goal is better decisions.

---

## Why this project exists

Most planning tools and AI assistants validate ideas without questioning feasibility.

In real life, this often leads to:
- Burnout
- Wasted effort
- Half-finished projects
- Poor trade-offs made too late

Reality Check AI takes the opposite approach.  
It audits a plan the way an experienced analyst would — calmly, conservatively, and based on common failure patterns.

---

## What the app does

When a user enters a plan, the system:

- Evaluates feasibility using time, budget, skill level, and dependencies
- Assigns a **Reality Score (0–100)** based on practical constraints
- Explains *why* the plan struggles or fails
- Highlights high-risk assumptions
- Defines a clear **stop signal** to prevent wasted effort
- Proposes up to two **alternative paths** with explicit trade-offs
- Flags overengineering and unnecessary complexity

The output is structured and readable — not a long chat response.

---

## How AI is used

The app uses **Google Gemini** for structured reasoning.

The model operates under a strict system instruction that enforces:
- Evidence-based analysis
- Conservative assumptions
- No motivational language
- No validation of ambition
- Structured JSON output

Gemini is not used as a chatbot.  
It is used as an **analysis engine** that produces consistent, auditable results.

---

## UI & UX approach

The interface is designed to feel like a **decision console**, not a chat app.

Key principles:
- Dark, distraction-free layout
- Clear visual hierarchy (score → diagnosis → alternatives)
- Minimal scrolling
- Glassmorphism panels for focus without clutter
- Separate input, analysis, and decision sections
- History and parameter controls for iteration

The goal is clarity, not decoration.

---

## Live Demo

You can try the working prototype here:

👉 **Live App:**  
https://ai.studio/apps/drive/1e9PoVZeDfk--Y7oltgHAN4SnT2KMBE6x

---

## Tech Stack

- **Frontend:** React + Vite + TypeScript  
- **Styling:** Tailwind CSS  
- **AI:** Google Gemini (via AI Studio)  
- **Deployment:** Google Cloud Run  
- **Build:** Docker + Nginx  

---

## Run the project locally

### Prerequisites
- Node.js (v18+ recommended)

### Steps

1. Install dependencies
   ```bash
   npm install
   VITE_GEMINI_API_KEY=your_api_key_here

