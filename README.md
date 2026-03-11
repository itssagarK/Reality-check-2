# Reality Check AI — Audit Your Plans Before Reality Does

> *Most plans fail not because people are lazy, but because the plan itself was unrealistic.*

**Reality Check AI** is an AI-powered feasibility auditing tool that evaluates plans against real-world constraints such as time, resources, skills, and complexity.

Most AI assistants encourage ambition.  
This project explores the opposite approach.

Instead of motivating users, Reality Check AI asks:

**“Given the constraints, is this plan actually realistic?”**

The goal is simple: **help people make better decisions before they invest months of effort in the wrong direction.**

This project was built for the **Scaler AI Build Challenge**, exploring how AI can support **structured decision-making rather than generic advice.**

---

# Live Demo

Try the working prototype:

👉 https://ai.studio/apps/drive/YOUR_APP_LINK

---

# Why This Project Exists

Planning tools and AI assistants usually respond with encouragement.

Examples of common plans:

- “I will build a SaaS product in two months.”
- “I will master full-stack development while preparing for interviews.”
- “I will replace my income in six months.”

Most tools validate these ideas instead of evaluating feasibility.

That creates a problem: **false confidence.**

Reality Check AI was built to explore a different idea:

> What if AI behaved like a critical analyst instead of a motivational coach?

By auditing plans early, users can:

- avoid unrealistic goals  
- identify hidden risks  
- simplify their strategy  
- reduce wasted effort

---

# What Is Reality Check AI?

Reality Check AI works like a **decision auditor**.

A user enters a plan and provides a few constraints such as available time, resources, or skill level.

The system evaluates the plan and produces a structured analysis including:

- **Reality Score**
- **Failure Diagnosis**
- **Stop Signals**
- **Decision Path Analysis**
- **Risk Warnings**

Instead of long chat responses, results are presented in a clear structured format.

---

# Key Features

### Reality Score
A score from **0–100** estimating the feasibility of the plan.

### Failure Diagnosis
Explains the main structural problems with the plan.

### Stop Signals
Defines clear conditions that indicate when continuing the plan would likely waste time or resources.

### Decision Path Analysis
Suggests simpler or alternative approaches with explicit trade-offs.

### Overengineering Detection
Flags when complexity is unnecessary or unrealistic.

### Constraint-Based Evaluation
Plans are analyzed using time, budget, and skill limitations instead of optimism.

---

# How It Works

1. **Describe your plan**  
   Enter the goal or idea you want to evaluate.

2. **Add constraints**  
   Provide details such as available time, budget, or skill level.

3. **Run the Reality Check**  
   The AI performs a structured feasibility audit.

4. **Review the analysis**  
   See your score, risks, stop signals, and suggested alternatives.

5. **Refine your approach**  
   Adjust constraints or strategies and test again.

---

# Example Audit

Plan:  
“I want to build a SaaS product in 2 months while working a full-time job.”

Constraints:
- Time available: 2 hours per day  
- Budget: $200  
- Skill level: Intermediate  

Result:

**Reality Score:** 35 / 100

Failure Diagnosis:
- Development scope exceeds available time.
- Marketing and customer acquisition are not accounted for.
- Limited budget restricts infrastructure and testing.

Stop Signal:
If no working MVP exists after 8 weeks.

Alternative Paths:
- Launch a smaller single-feature product first.
- Offer a service-based version before building full software.

---

# Tech Stack

**Frontend**  
React + Vite + TypeScript

**Styling**  
Tailwind CSS

**AI Integration**  
Google Gemini via AI Studio

**Deployment**  
Google Cloud Run

**Containerization**  
Docker + Nginx

---

# System Architecture

Reality Check AI follows a structured evaluation pipeline:

User Plan  
→ Constraint Input (time, resources, skills)  
→ Gemini AI Analysis  
→ Structured Feasibility Output  
→ UI Visualization of Results

The AI does not generate motivational advice.  
Instead, it produces structured reasoning that powers the interface.

The UI then converts this analysis into:

- Reality Score
- Failure Diagnosis
- Stop Signals
- Decision Path Analysis
- Risk Warnings

---

# Design Philosophy

Reality Check AI is built around three principles.

### Reality Over Motivation
The system avoids motivational responses and focuses on practical constraints.

### Structured Reasoning
AI outputs are organized into clear sections instead of long conversational text.

### Simplicity Over Complexity
The system favors strategies that reduce coordination, dependencies, and overengineering.

---

# Limitations

Reality Check AI is designed as a **decision-support tool**, not a prediction system.

Some limitations include:

- The analysis depends on the accuracy of user-provided constraints.
- The system evaluates feasibility patterns, not guaranteed outcomes.
- Complex real-world factors such as market dynamics or personal circumstances may not be fully captured.

The goal is not perfect prediction, but **better planning awareness**.

---

# Running Locally

Clone the repository:

```bash
git clone https://github.com/yourusername/reality-check-ai.git
cd reality-check-ai
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

Run the development server:

```bash
npm run dev
```

---

# Project Vision

Reality Check AI explores a different role for artificial intelligence.

Not inspiration.  
Not motivation.

**Reality checking.**

If AI can help people challenge their assumptions before committing to a plan, it can prevent months of wasted effort and lead to better decisions.

---

# Author

**Sagar**  
GitHub: https://github.com/itssagarK
