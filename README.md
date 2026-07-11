# Decoded 

**Decoded is the first women-owned personal financial advisor app that has it all. From decoding your first offer letter to building long-term wealth, we cover everything nobody bothered to explain.**

🌐 **Live Demo:** [decoded-ashen.vercel.app](https://decoded-ashen.vercel.app)

---

## Inspiration

Most first-year workers open their offer letter and genuinely don't know what they're looking at. What's the difference between gross and net? What does "matches up to 4%" actually mean? Is this health plan good, or just the only option? And it's not just beginners — even experienced professionals wonder how to actually claim their 401k or whether they're leaving money on the table.

These aren't dumb questions. They're questions nobody ever taught you to ask. And now you have 48 hours to sign.

No app is built for this moment. Decoded is.

---

## What It Does

Users create a profile, take a financial survey and a mentorship survey to personalize their experience, then get access to five core features:

- **Decode your offer** — upload an offer letter or paystub and get an instant plain-English breakdown of salary, taxes, and benefits, then see a projected budget breakdown showing where your paycheck could realistically go: rent, groceries, savings, debt payments, based on your timeline and cost of living
- **Compare offers** — side-by-side total compensation comparison across salary, bonus, equity, 401k match, and benefits
- **Build your profile** — a personalized onboarding flow that tailors the entire app to your financial background and goals
- **Mentor match** — matched with a recent grad in your field who's already navigated this exact stage, with direct connect and message functionality
- **Practical learning** — a structured financial literacy roadmap with interactive quizzes, drag-to-sort challenges, and fill-in-the-blank checks after every lesson

---

## How We Built It

We built Decoded as a fully interactive React and TypeScript application, bundled with Vite and deployed on Vercel. The app includes a working auth flow (sign in and sign up), a personalized survey system, a live 401k simulator with compound growth math, an offer comparator with real total compensation calculations, a mentor matching algorithm filtered by field and goal, and a chapter-based financial literacy roadmap with four question types and chapter-gated progression. We designed every screen from scratch, iterated on the color system using our yellow/pink/cream palette, and built the entire prototype over the course of the hackathon.

---

## Challenges We Ran Into

Our biggest challenge was bringing our ideas down to a realistic scale. We came in with ambitious features for every part of the app and had to actively cut things we cared about to ship something focused and polished in time. Learning to shrink a big vision without losing the heart of it was harder than any technical problem we ran into.

---

## Accomplishments We're Proud Of

The decode section ended up being our favorite feature, particularly because it's something we haven't seen before. We're also proud of the onboarding flow: the financial and mentorship surveys feed directly into a personalized profile that stores and displays your answers with an edit option.

---

## What We Learned

We learned that the best product decisions come from personal experience, not assumption — every feature in Decoded exists because one of us needed it. We learned that pushing back on ideas without being precious about your own is what makes a team actually function. Additionally, we understood that cutting features early doesn't weaken a product — it makes the features you keep significantly better.

---

## What's Next for Decoded

We plan to expand our offer comparator to capture the full picture of a job offer — including softer benefits like relocation packages and company philanthropy — and to introduce security vetting for our mentorship feature, requiring mentors to verify their identity through company emails to ensure our community remains safe and trustworthy.

---

## Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Styling:** CSS + HTML
- **Deployment:** Vercel

---

## Getting Started

```bash
git clone https://github.com/VedaKolipakula/decoded.git
npm install
npm run dev
```

---

