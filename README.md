# 🏆 Adobe Executive Jeopardy Summit Dashboard

A premium, interactive, dark-themed presentation web application designed for senior stakeholders and executive audiences. This dashboard gamifies the discovery of the Adobe Experience Cloud ecosystem using an inductive learning "Jeopardy" model mapped directly to a custom **A-D-O-B-E** conceptual framework.

---

## 🚀 Presentation Core Concept: The A-D-O-B-E Framework

The application guides the presenter and audience through an interactive guessing loop where a strategic enterprise marketing riddle is displayed alongside a high-fidelity, real-time HTML5 Canvas technical architecture simulation. The room has **15 seconds** to guess the corresponding tool before the system triggers a full-bleed corporate logo reveal and unpacks core business capabilities.

*   **A — ACTIVATION** ➡️ Adobe Real-Time CDP (SaaS Application)
*   **D — DATA** ➡️ Adobe Experience Platform / AEP (PaaS Foundation)
*   **O — ORCHESTRATION** ➡️ Adobe Campaign (Cross-Channel Lifecycle Marketing)
*   **B — BRAND** ➡️ Adobe GenStudio for Performance Marketing (AI-First Content Operations)
*   **E — EXTERNAL** ➡️ Adobe Audience Manager / AAM (Anonymous Audience Monetization)

---

## ✨ Key Technical & UX Features

*   **Premium Executive Dark Aesthetic:** Built on a sleek, high-contrast charcoal backdrop (`#06080f`) with customized vibrant neon ambient borders matching individual product accent brands.
*   **High-DPI Anti-Aliased Graphic Animations:** Fully custom HTML5 Canvas tracking vectors scaling dynamically to native screen `devicePixelRatio` metrics, ensuring text boundaries inside node circles remain razor-sharp on Retina and high-resolution projection screens.
*   **Circular Presentation Lifecycle Navigation:** Native mouse/pointer click mapping and hardware keyboard listener integrations (`ArrowRight`, `ArrowLeft`, `Spacebar`) allowing seamless infinite looping between the custom Onboarding Welcome Deck, Quiz vectors, and the Finale.
*   **Cumulative Scope Scorecard:** A synchronized bottom evaluation grid detailing the 15 portfolio active vectors. As individual answers are successfully unmasked on stage, their corresponding grid badges catch permanent glowing neon accents that lock and aggregate across the slide lifecycles.
*   **Proportional Full-Bleed Particle Finale:** A customized high-performance canvas celebration module triggering sequential multi-colored explosive particle bursts layered elegantly over an auto-centered, aspect-ratio-stable corporate backdrop.

---

## 📂 Project Architecture Structure

```text
├── config/
│   └── products.js         # Centralized product meta array & enterprise capability data strings
├── public/
│   ├── css/
│   │   └── styles.css      # Fluid responsive split-pane grid parameters & core animations
│   ├── images/
│   │   ├── Adobe.jpg       # Master identity background image file
│   │   ├── aeplogo.webp    # Anti-aliased product identity webp asset
│   │   ├── rtcdp.webp      # Anti-aliased product identity webp asset
│   │   ├── campaign.webp   # Anti-aliased product identity webp asset
│   │   ├── genstudio.webp  # Anti-aliased product identity webp asset
│   │   ├── aam.png   # Anti-aliased product identity webp asset
│   │   └── penguin-praise.gif # End-of-deck looping celebration graphic asset
│   └── js/
│       ├── main.js         # Core lifecycle state machine, clock timers, & celebration arrays
│       └── animations/
│           ├── rtcdp.js    # Real-time streaming profile sync architecture graphics loop
│           ├── aep.js      # Enterprise data lake compliance ingestion mesh graphics loop
│           ├── camp.js     # Multistep delivery cross-channel orchestration node graphics loop
│           ├── gen.js      # High-velocity localized variation generative grid graphics loop
│           └── aam.js      # Identity graph proxy network marketplace synchronization graphics loop
├── views/
│   └── index.html          # Structural frame semantic layouts & bottom token scopes
├── server.js               # Clean native Node.js static router, safe paths, & custom MIME dictionary maps
└── package.json            # Deployment manifest metadata parameters
