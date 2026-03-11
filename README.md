# Reality Check AI — Audit Your Plans Before Reality Does

> *Most plans fail not because people are lazy, but because the plan itself was unrealistic.*

**Reality Check AI** is an AI-powered feasibility auditing tool that helps people evaluate their plans against real-world constraints like time, resources, and skill level. Instead of motivating users or validating ambition, the system analyzes whether a plan is **actually realistic**.

The goal is simple: **force reality into the planning process before months of effort are wasted.**

This project was built for the **Scaler AI Build Challenge**, exploring how AI can assist with **structured decision-making rather than generic advice.**

---

# What Is Reality Check AI?

Reality Check AI works like a **decision auditor**.

You describe a plan — for example starting a startup, learning a new skill, building a project, or changing your financial habits. Then you provide a few constraints such as available time and resources.

The system evaluates the plan and returns a structured analysis including:

- a **Reality Score**
- the main **failure risks**
- a clear **stop signal**
- and **alternative paths** that may be more realistic

It’s not a chatbot. It’s a tool designed to **challenge assumptions and reveal hidden risks in planning.**

---

# Key Features

- **Reality Score (0–100)**  
  Quantifies how realistic a plan is under given constraints.

- **Failure Diagnosis**  
  Explains the main reasons a plan might fail or struggle.

- **Stop Signals**  
  Defines measurable conditions that indicate when continuing the plan would likely waste time or resources.

- **Decision Path Analysis**  
  Suggests simpler alternative strategies and highlights trade-offs.

- **Constraint-Based Evaluation**  
  Every plan is analyzed using real-world factors such as time availability, skill level, and resource limits.

- **Structured Output**  
  Results are organized into clear sections rather than long conversational responses.

---

# How It Works

1. **Describe your plan**  
   Enter the idea or goal you want to evaluate.

2. **Add constraints**  
   Provide details such as time availability, budget, or skill level.

3. **Run the Reality Check**  
   The system evaluates feasibility using structured AI reasoning.

4. **Review the analysis**  
   See your Reality Score, risks, stop signals, and alternative paths.

5. **Refine your plan**  
   Adjust constraints and test different approaches.

---

# Why This Project Exists

Many AI tools focus on **encouragement and optimism**.  
While this can be motivating, it often ignores the limits of time, energy, and resources.

Reality Check AI explores a different question:

> *What if AI could act like a critical analyst instead of a motivational coach?*

By auditing plans early, users can:

- avoid unrealistic goals
- reduce burnout
- identify simpler strategies
- make better long-term decisions

---

# Tech Stack

**Frontend**  
React + Vite + TypeScript  

**Styling**  
Tailwind CSS  

**AI Integration**  
Google Gemini (via AI Studio)  

**Deployment**  
Google Cloud Run  

**Containerization**  
Docker + Nginx  

---

# Run Locally

Clone the repository

```bash
git clone https://github.com/yourusername/reality-check-ai.git
cd reality-check-ai
