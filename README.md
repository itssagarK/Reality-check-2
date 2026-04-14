# Reality Check AI

**Stop planning like it's all going to work out. Audit your plans against real-world limits.**

Reality Check AI is a planning audit tool that evaluates whether your goals are actually feasible—not whether they sound inspiring. It strips away optimism bias and motivation theater to tell you what will actually happen given time, money, skills, and human limits.

> **Built during Google for Startups: Prompt to Prototype** — A hands-on program where I learned, explored, and built a product that matters.
---
## Screenshots

Get a visual overview of Reality Check AI:

| Describe your plan and constraints | Get the feasibility analysis |
|-------------|--------------|
| <img src="https://github.com/user-attachments/assets/f8ce33a1-7dfc-4ec2-9c50-7b00fda1b71a" width="100%"/> | <img src="https://github.com/user-attachments/assets/93816438-2f72-4041-8627-77cc535dbc49" width="100%"/> |

| Understand when to stop and pivot | Review risks and alternative paths |
|-------|-------------|
| <img src="https://github.com/user-attachments/assets/5c31657a-5172-4203-b3f1-b2f19217861f" width="100%"/> | <img src="https://github.com/user-attachments/assets/b3fca002-e5aa-48e2-b706-6b38bbdb531f" width="100%"/> |erstand when to stop and pivot</em></p>
</div>

---
## What This Does

Most planning fails silently. You start with ambition, ignore constraints, and months later you're burnt out with half-finished projects. Reality Check AI stops that early by auditing your plan before failure happens.

Instead of asking:
- Does this sound good?
- Are you motivated enough?
- Do you believe in yourself?

It asks:
- Given 24 hours in a day and real commitments, is this timeline realistic?
- How much time will execution actually take?
- What dependencies could derail this?
- Where does risk pile up?

## Who This Is For

You should use Reality Check AI if you:
- Make plans that fail despite putting in real effort
- Start projects but never seem to finish them
- Want to understand why something won't work before investing months of time
- Have fixed constraints—a job, family, rent, health issues—that limit your actual capacity
- Prefer straight truth over cheerleading

## Who This Isn't For

This tool isn't for you if you're looking for:
- Motivation or positive affirmations
- "You got this" messages
- Success guarantees
- Validation of your ambition

If those are what you need, this will feel harsh. That's on purpose.

## How It Works

### The Input
You tell the tool:
- What you want to build or achieve
- Your timeline—how fast you're thinking
- How much time and resources you can actually dedicate
- Any constraints or risks you already know about

### The Analysis
Reality Check AI audits your plan across six core dimensions:

1. **Clarity** — Is the goal actually defined, or is it still fuzzy?
2. **Timeline Realism** — Is the timeline compressed compared to how long similar work actually takes?
3. **Scope vs. Capacity** — Can you realistically fit the scope into your available hours?
4. **Dependencies** — What has to go right outside your control? How fragile is that?
5. **Resources** — Do you actually have the money, skills, or access you need?
6. **Risk Concentration** — Where could multiple problems pile up and kill the project?

### The Output
You get back:
- **Feasibility Score** — A 0–100 rating based on realistic constraints, not wishful thinking
- **Failure Diagnosis** — What specifically will likely go wrong and why
- **Alternative Paths** — 1–2 realistic ways to approach this differently
- **Risk Analysis** — Concrete, high-probability failure modes
- **Stop Signal** — Clear conditions for when you should cut your losses

Everything follows a strict, repeatable format so you can actually act on it instead of ignoring it.

## Core Principles

**Assume Average Capacity**  
Unless you tell us otherwise, Reality Check AI assumes you're a normal person with 2–3 hours per day available. Not somebody running on superhuman hustle.

**Use Conservative Assumptions**  
Learning curves, iteration, waiting for feedback, coordination delays—these are all baked in. We don't assume everything goes smoothly or that you'll figure things out faster than normal.

**Ground in Real Patterns**  
Recommendations are based on what actually happens in the real world—typical timelines, common failure modes, documented benchmarks—not stories about the one exceptional person who did it faster.

**Respect Human Limits**  
Burnout is real. Context switching kills focus. Doing something badly wastes more time than doing it right. Plans that ignore these don't fail because you're lazy; they fail because the math doesn't work.

**Be Honest, Even When It's Uncomfortable**  
If your plan is too ambitious, you'll hear that clearly. No softening. No sugar-coating.

## Key Features

### Structured Audit Format
Every analysis is consistent, repeatable, and actionable. No vague advice or motivational fluff—just diagnostic clarity.

### Decision Path Analysis
When your current approach won't work, the tool proposes alternative paths and explains specifically why they're more realistic.

### Dependency and Risk Mapping
Identifies what has to go right externally and what could silently kill your progress before you realize it.

### Scope vs. Time Trade-offs
Instead of just saying "add more time," it diagnoses exactly where the crunch happens and what you need to cut.

### Stop Signals
Defines clear, measurable conditions for when continuing would be a waste of time or money.

## Example

**You say:** "I want to build a side project AI app in 3 months while working full-time."

**Reality Check AI analyzes:**
- Available capacity: ~450 hours over 3 months (assuming 2–3 hours per day)
- Typical AI project scope: 1,200–2,000 hours for a complete, production-ready app
- Learning gaps: If you've never deployed an AI app before, add 100+ hours
- Dependency risk: API reliability, data quality, user feedback loops outside your control
- Burnout risk: Sustained 10+ hour weeks destroy execution quality and motivation

**Output:**
- **Feasibility Score:** 22/100
- **Why it fails:** Scope is 3–4× your actual capacity. Build time is underestimated by 60–70%.
- **What breaks first:** Testing and deployment get skipped. App ships with bugs. You get frustrated and abandon it.
- **Realistic alternatives:**
  1. Reduce scope to a true MVP (single feature, 400–600 hours), extend timeline to 6 months
  2. Partner with someone else to split the workload and dependencies
- **Stop signal:** If by week 6 you have less than 40% of core features working, the timeline was unrealistic from the start. Either cut scope or extend the deadline now—don't keep pretending you're ahead of schedule.


## Installation

Clone the repository:
```bash
git clone https://github.com/itssagarK/Reality-check-2.git
cd Reality-check-2
```

Install dependencies:
```bash
npm install
```

Run the tool:
```bash
npm start
```

(Specific setup instructions depend on your project structure. Update as needed.)

## Usage

1. **Describe your plan** — Be specific about what you want to build, your timeline, and your constraints
2. **Provide context** — How much time can you realistically dedicate? What skills do you already have? What's missing?
3. **Get the audit** — Receive a structured analysis with feasibility score, risks, and alternative approaches
4. **Act on the diagnosis** — Either adjust the plan or change direction before you waste months

## Philosophy

Most planning tools exist to pump you up and keep you motivated. This one exists to save you time and heartache by telling you the truth early.

Failure isn't a character flaw or a sign you're not disciplined enough. It's math. When you try to fit too much into too little time, the plan fails—not because you lack willpower, but because the constraints were never realistic to begin with.

Reality Check AI helps you build constraints that actually match reality, not just your ambition.

## About This Project

Reality Check AI was built as part of **Google for Startups: Prompt to Prototype**, a hands-on program that taught me to learn fast, explore bold ideas, and build products that solve real problems. This tool is the result of that learning—a product designed to help people make smarter decisions about their goals and timelines.

The certification and support from Google for Startups and Scaler pushed me to think deeper about what actually helps people succeed, rather than what makes them feel good in the moment.

## Contributing

Found a bug? Have feedback? Want to improve the logic? Contributions are welcome.

Open an issue or submit a pull request. Let's build something better together.

---

**Remember:** The goal isn't to approve your plan or make you feel good about it. The goal is to help you succeed by telling you clearly which plans will actually work in the real world.
