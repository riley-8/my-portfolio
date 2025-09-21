## Executive summary



We’re building CareerBridge — an AI-powered platform for Youth Unemployment: it parses a candidate’s resume, builds a skill profile, finds and ranks matching entry-level roles, generates a prioritized micro-learning path to close skill gaps, and offers an LLM-based interview practice + cover-letter generator. Core UX: a candidate uploads a resume, sees top job matches, gets concrete learning steps, and can practice interviews — within a clicky demo.



## MVP (must-have) in one line



Resume → Skill vector → Top-5 job matches (with match score \& gaps) → Personalized 2–4 micro-learning steps → LLM interview coach and cover letter.



## Why this exact product?



Matches the hackathon theme: AI-powered solutions for socio-economic challenges (directly helps youth find jobs).



Easy to demo (upload resume → immediate results).



Shows multiple technical competencies for hiring managers: NLP, recommender, vector search, backend/frontend, LLM integration, product thinking.



## Personas



Candidate (Job Seeker) — 18–30, early career, uploads resume, wants job matches + guidance.

Employer / Recruiter — posts entry-level jobs, sees candidate matches (optional).

Learning Partner — provider of micro-courses / links (could be external links).

Admin / Demoer — team member who controls the demo, seed data, and metrics.



Full list of user stories (complete)
---



For each: title, story (As a…, I want…, so that…), acceptance criteria (AC), priority (P1 = MVP / P2 = nice).



#### Candidate onboarding \& account



1. Sign up / Login (P2)

As a Candidate, I want to sign up/login so that I can save my progress.

AC: create account with email (or guest mode), return token; guest flow works without account.



2\. Guest demo mode (P1)

As a Candidate, I want a one-click “Demo” mode so I can try features without registering.

AC: demo resume can be loaded; all features work read-only.



#### Resume \& profile



3\. Upload Resume (P1)

As a Candidate, I want to upload my resume (PDF/DOCX/TXT) so the system can analyze it.

AC: backend accepts file, extracts text, displays parsed name/email (sensitive redaction allowed), stores raw text.



4\. Manual resume edit (P1)

As a Candidate, I want to edit extracted text to correct parsing mistakes.

AC: UI shows editable text area with Save.



5\. Skill extraction (P1)

As a Candidate, I want the app to extract skills \& give a skill vector so I can see strengths/weaknesses.

AC: UI lists skills with confidence scores; vector stored.



#### Matching \& recommendations



6\. Job match (P1)

As a Candidate, I want to see top N matching jobs with reasons so I can apply.

AC: returns top-5 jobs with match score, matched skills, and missing skills.



7\. Explainability view (P2)

As a Candidate, I want to see why each job was recommended (e.g., “match: 78% — due to Python, SQL”) so I trust the results.

AC: for each job, UI highlights matched \& missing skills and gives example phrasing.



8\. Filter \& search jobs (P2)

As a Candidate, I can filter by location/type to refine matches.

AC: filters applied client-side or via API.



#### Skill gap \& learning pathway



9\. Skill-gap analyzer (P1)

As a Candidate, I want a prioritized list of missing skills for a chosen job so I know what to learn first.

AC: shows top 3 missing skills and difficulty/time estimate.



10\. Micro-learning suggestions (P1)

As a Candidate, I want 1–3 micro-courses / resources to close each skill gap.

AC: links to YouTube/Coursera/MDN + estimated time \& a 2-step action.



11\. Personalized study plan (P2)

As a Candidate, I want a suggested 7–14 day plan combining modules so I can improve.

AC: generates day-by-day tasks.



#### Career tools



12\. Cover letter \& CV snippets (P2)

As a Candidate, I want an LLM to generate a tailored cover letter or a bullet CV improvement.

AC: output generated and editable; includes highlight of changed lines.



13\. Interview practice (P1)

As a Candidate, I want a conversational interviewer (LLM) to practice answers and get feedback.

AC: produces suggested answers, feedback on clarity/keywords, and a confidence score.



14\. Short timed mock interview (P2)

As a Candidate, I want a 10-question mock interview with scoring.

AC: records session transcript and scores.



#### Employer side (optional P2)



15\. Post job (P2)

As an Employer, I want to post an entry-level job so candidates can be matched.

AC: job stored, visible in match pool.



16\. View matched candidates (P2)

As an Employer, I want to see top matches for a job (with anonymized data) so I can contact them.

AC: lists candidates with match score.



#### Admin \& analytics



17\. Seed dataset manager (P1)

As Admin, I want to upload sample job datasets and candidate CSVs so demo data is ready.

AC: Admin UI to upload jobs; jobs appear in search.



18\. Basic analytics (P2)

As Admin, I want to see total matches, active demo users, and top missing skills so I can measure impact.

AC: dashboard shows counts.



#### Reliability \& safety



19\. Data privacy \& disclaimer (P1)

As a Candidate, I want clear privacy notice and data usage disclaimers.

AC: modal/consent banner appears before upload.



20\. Fallback \& record demo (P1)

As a Team, I want to record a 2-minute demo video to play if live demo fails.

AC: recorded video accessible from the pitch laptop.



Acceptance criteria summary (MVP must meet these)
---



Candidate can upload resume and see top-5 job matches within the demo.



Each match shows matched/missing skills, a match score, and at least one micro-learning resource.



Interview practice and cover letter generation work in demo (LLM integrated).



All data used is synthetic/public and privacy disclaimers are present.

Live demo flows are click-throughable in < 3 steps from landing page.



Tech stack (recommended, quick to spin up in a hackathon)
---



Frontend:  JavaScript (Node.js, Express.js), HTML5, CSS3



Backend: (Node.js, Express.js)



Vector search: FAISS (faiss-cpu) for local vector search OR use a hosted vector DB (Weaviate/Milvus) if familiar.



NLP / embeddings: sentence-transformers (all-mini-lm-v2) for embeddings; spaCy for parsing; transformers for any LLM tasks.



Model hosting: local process for embeddings + simple endpoints; LLM via API (OpenAI) or local (llama.cpp/llama-2) if accessible.



DB: Supabase



Deployment: Microsoft Azure or run locally.



Containerization: Docker (optional).
CI: GitHub Actions for lint + simple tests (optional).


Architecture (textual diagram)
---



Frontend (React) ↔ 2. API Gateway (FastAPI) ↔ {3a. Embedding Service (sentence-transformers + FAISS), 3b. Resume Parser (spaCy), 3c. Match Scorer (LightGBM or simple cosine scoring)} ↔ 4. DB (Postgres/SQLite).
LLM usage: FastAPI calls OpenAI / local LLM for interview \& cover-letter generation.


Data \& schema (minimal)
---



Jobs table: id, title, description, required\_skills (array), location, seniority (entry/junior), raw\_text, embedding\_vector.

Candidates table: id, name (optional), email (optional), resume\_text, skill\_list, embedding\_vector.
Matches table: candidate\_id, job\_id, match\_score, matched\_skills, missing\_skills, created\_at.



ML \& logic plan (how to implement)
---



A. Resume parsing



Use pdfminer or python-docx to extract text; then use spaCy + simple regex to extract contact info and NER for skills.



Option: use resume-parser libraries to speed up.



B. Skill extraction



Build a curated skill vocabulary (200–500 common skills) and match using fuzzy matching + spaCy NER. Output (skill, confidence).



C. Embeddings \& vector search



Use sentence-transformers to embed job descriptions and candidate resumes. Build FAISS index for jobs.



For matching, compute cosine similarity and return top-K.



D. Match scoring



Basic: weighted combination of cosine similarity + skill overlap ratio.



Optional: small logistic regression / LightGBM trained on synthetic labels (if you prepare pairs).



E. Skill-gap \& learning path



Compute missing\_skills = required\_skills - candidate\_skills. For each missing skill, map to 1–3 micro-modules from curated resource list (YouTube, free courses).



F. LLM features
For interview coach \& cover letters, call the LLM with prompts that include job title + required skills + candidate resume snippet. Keep prompts short \& instructive and include safety: “provide non-diagnostic, educational suggestions only”.



API spec (minimum endpoints)
---



1. POST /api/upload-resume



body: form-data file resume



response: { candidate\_id, parsed\_text, skills: \[{name, confidence}], summary }



2\. POST /api/match/:candidate\_id



body: { filters? }



response: { matches: \[{job\_id, title, score, matched\_skills, missing\_skills}] }



3\. GET /api/job/:job\_id → job details.



4\. POST /api/generate-cover



body: { candidate\_id, job\_id } → returns cover letter text (LLM).



5\. POST /api/interview/:candidate\_id

body: { job\_id, mode: "practice" } → returns question, accepts answer, returns feedback via LLM.






Frontend UX \& pages
---



Pages/components:



Landing / value prop



Demo quick start (one-click)



Upload resume page (drag \& drop)



Candidate dashboard (top matches, match cards)



Job match card: title, company stub, score badge, matched \& missing skills, “Get practice” and “Apply” buttons



Learning plan modal



Interview practice modal (chat UI)



Admin: seed data uploader

UX tips:



Provide clear progress states (uploading / parsing / matching).



Show matched skills with green checks and missing with empty circles.

Make demo flow 3 clicks: Upload → View matches → Click interview/coaching.





Core backend MVP (why: power of the product)
---



Implement resume upload endpoint: extract text using textract or pdfminer. Return parsed snippet.



Why: necessary for downstream ML.



How: parse file, run spaCy NER + regex for contact lines.



Implement skill extraction: use a small curated skills list and fuzzy matching (fuzzywuzzy or rapidfuzz).



Why: reliable skill detection without training.



How: token matching \& spaCy noun chunking.



Implement embeddings \& FAISS index for jobs:



Why: fastest way to compute semantic similarity between resume and jobs.



How: preload job embeddings (SentenceTransformer('all-MiniLM-L6-v2')), build FAISS index, persist.



Implement match endpoint that returns top-5 with matched/missing skills:



Why: the core demo result.



How: embed resume, query FAISS, compute overlap, format response.


Frontend MVP (why: visible demo)



Build upload UI and results page:



Why: demo must be clickable.



How: upload file → call /upload-resume → then call /match/:id and show card list.



LLM features (cover letter + interview) — quick integration



Integrate OpenAI or LLM provider for quick text generation:



Why: high “wow” factor for judges.
How: construct prompt with job title + skills + resume snippet. Use openai.ChatCompletion.create().





Learning path
---



1\.Map each missing skill to 1–3 curated resources (CSV or JSON). Implement simple lookup service.



##### Polish \& reliability



2\. Add privacy disclaimer modal.



3\. Create demo-only “seed data admin” page to control what jobs are visible during pitch (so you can demonstrate different scenarios).



4\. Prepare a recorded fallback demo video.



##### Testing \& metrics



5\. Unit test critical endpoints (upload \& match).


6\. Create example metrics: top-5 precision, average match score. Add small admin dashboard.





Data sourcing \& seeding
---



Jobs: scrape/collect 30–100 entry-level job postings (public sites or Kaggle). For hackathon, manually craft 30 canonical entries.



Resources: curate 2–3 resources per skill (YouTube, freeCodeCamp, MDN). Save as JSON mapping skill → resources.



Resumes: create 10 demo resumes (different backgrounds) as PDFs/TXT.


Metrics to show judges
---



Number of matches shown (top-5).



Example match: Sizwe Msibi → Junior Data Analyst: match score 82% (matched: SQL, Excel; missing: Tableau) + recommended 2-hour Tableau mini-course.

Potential impact model: “1 candidate with 3 recommended micro-modules increases job readiness score by X (simulated)”.




Security, privacy \& ethics checklist (must have in pitch)
---



Consent banner before upload (explain data use).



No real personal data for demo (use synthetic or consented samples).



Disclaimers: not a clinical or legal service; educational only.
Rate limit LLM to avoid cost blowouts and add caching for repetitive prompts.




README template (essential sections)
---



Project name, tagline



Demo link \& 60s demo video



Quickstart (how to run backend/frontend locally)



Architecture diagram \& tech choices



Team \& roles (who did what)



Data sources \& license



Ethics \& privacy statement



Next steps \& how to contribute

