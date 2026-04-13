# Reality Check AI

**Stop planning like it's all going to work out. Audit your plans against real-world limits.**

Reality Check AI is a planning audit tool that evaluates whether your goals are actually feasible—not whether they sound inspiring. It strips away optimism bias and motivation theater to tell you what will actually happen given time, money, skills, and human limits.

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
- Make plans that fail despite effort
- Start projects but don't finish them
- Want to understand *why* something won't work before investing months
- Have fixed constraints (job, family, rent, health) that limit your capacity
- Prefer honest feedback over encouragement

## Who This Isn't For

This tool isn't for you if you want:
- Motivation or positive affirmations
- "You got this" messages
- Success guarantees
- Validation of your ambition

If those are what you need, this will feel harsh. That's intentional.

## How It Works

### The Input
You describe:
- What you want to build or achieve
- Timeline you're thinking about
- Time and resources you can actually dedicate
- Relevant constraints or risks you know about

### The Analysis
Reality Check AI audits against six core dimensions:

1. **Clarity** — Is the goal actually defined, or is it vague?
2. **Timeline Realism** — Is the timeline compressed relative to what similar work takes?
3. **Scope vs. Capacity** — Can you fit the scope into your available hours?
4. **Dependencies** — What has to go right externally? How fragile is that?
5. **Resources** — Do you have the money, skills, or access needed?
6. **Risk Concentration** — Where could multiple failures pile up and kill the project?

### The Output
You get:
- **Feasibility Score** — A 0–100 rating based on realistic constraints, not intent
- **Failure Diagnosis** — What specifically will likely go wrong
- **Alternative Paths** — 1–2 realistic ways to approach this differently
- **Risk Analysis** — Concrete, high-probability failure modes
- **Stop Signal** — When to cut your losses and abandon this direction

All output follows a strict, repeatable structure so you can act on it immediately.

## Core Principles

**Assume Average Capacity**  
Unless you explicitly state otherwise, Reality Check AI assumes you're an average person with 2–3 hours per day to dedicate to this. Not superhuman hustle.

**Use Conservative Assumptions**  
Learning curves, iteration, coordination delays, and dependency risks are baked in. We don't assume everything goes smoothly.

**Ground in Real Patterns**  
Recommendations are based on what actually happens in the real world—typical timelines, common failure modes, documented benchmarks—not anecdotes about the one person who did it faster.

**Respect Human Limits**  
Burnout, context switching, and the cost of doing something badly are real. Plans that ignore these don't fail because you lack willpower; they fail because the math doesn't work.

**Be Honest, Even When It's Uncomfortable**  
If your plan is too ambitious, you'll hear that clearly. No softening, no sugar-coating.

## Key Features

### Structured Audit Format
Every analysis is consistent, repeatable, and actionable. No vague advice or motivational fluff.

### Decision Path Analysis
When your current approach won't work, the tool proposes alternative paths and explains why they're more realistic.

### Dependency and Risk Mapping
Identifies what has to go right externally and what could silently kill your progress.

### Scope vs. Time Trade-offs
Instead of saying "add more time," it diagnoses specifically where the crunch happens and what to cut.

### Stop Signals
Defines clear, measurable conditions for when continuing would be a waste of time or money.

## Example

**You say:** "I want to build a side project AI app in 3 months while working full-time."

**Reality Check AI analyzes:**
- Available capacity: ~450 hours over 3 months
- Typical AI project scope: 1,200–2,000 hours for a complete, production-ready app
- Learning gaps: If you've never deployed an AI app, add 100+ hours
- Dependency risk: API reliability, data quality, user feedback loops
- Burnout risk: Sustained 10+ hour weeks kill execution quality

**Output:**
- Feasibility: 22/100
- **Why it fails:** Scope is 3–4× larger than capacity. Time to build is underestimated by 60–70%.
- **What breaks first:** Testing and deployment get skipped. App ships buggy. You get frustrated.
- **Realistic alternatives:**
  1. Reduce scope to a MVP (single feature, 400–600 hours), extend timeline to 6 months
  2. Partner with someone else to split the load
- **Stop signal:** If by week 6 you have <40% of core features working, the timeline was always unrealistic. Cut scope or extend deadline now.

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

(Specific setup instructions will depend on the project structure.)



## Usage

1. **Describe your plan** — Be specific about what you want, timeline, and constraints
2. **Provide context** — How much time can you realistically dedicate? What skills do you have?
3. **Get the audit** — Receive a structured analysis with feasibility score, risks, and alternatives
4. **Act on the diagnosis** — Either adjust the plan or change direction before you waste months

## Philosophy

Most planning tools exist to motivate you. This one exists to save you time and heartache by telling you the truth early.

Failure isn't a character flaw. It's math. When you try to fit too much into too little time, the plan fails—not because you lack discipline, but because the constraints were never realistic.

Reality Check AI helps you set constraints that work for reality, not for your ambition.

## License

[Check the repository for license details]

## Contributing

Feedback, bug reports, and contributions are welcome. Open an issue or submit a pull request.

---

**Remember:** The goal isn't to approve your plan. The goal is to help you succeed by telling you which plans will actually work.
