## Executive summary

We’re building **LearnBridge** — an AI-powered platform for **Access to Education**: it adapts learning resources to a learner’s level, provides low-bandwidth/offline access, recommends personalized content, and supports multiple languages. Core UX: a student logs in or uses guest mode, takes a short diagnostic quiz or uploads past results, then receives a learning path with micro-lessons, quizzes, and accessible offline content.

## MVP (must-have) in one line

Diagnostic quiz → Learner profile → Personalized micro-lessons (2–4 modules) → Offline/low-bandwidth support → Gemini AI tutor chatbot.

## Why this exact product?

- Matches hackathon theme: solving **educational inequality** using AI.
- Demonstrates **NLP, adaptive learning algorithms, multilingual support**.
- Easy to demo: student answers a few questions, gets a learning path immediately.
- Strong employer/portfolio signal: EdTech + AI personalization + inclusive UX.

## Personas

- **Student (Learner)** — primary user, seeks content matched to their level.
- **Teacher** — monitors learners, recommends modules.
- **Parent** — wants progress tracking.
- **Admin/Demoer** — seeds courses, manages users, controls demo.

---

## Full list of user stories

#### Learner onboarding

1. **Guest demo mode (P1)**
   - As a Learner, I want to try the app without registering so I can quickly test it.
   - AC: guest profile auto-created.

2. **Signup/login (P2)**
   - As a Learner, I want to register with email/OAuth so my progress saves.

#### Diagnostics & learning path

3. **Take diagnostic quiz (P1)**
   - As a Learner, I want to answer short questions so the system can estimate my level.
   - AC: score → mapped to level A/B/C.

4. **Upload results (P2)**
   - As a Learner, I want to upload past exam/grades so AI can factor it in.

5. **Personalized path (P1)**
   - As a Learner, I want AI to generate a learning path based on my level & goals.
   - AC: path includes 3–5 modules, estimated completion time.

#### Lessons & practice

6. **Micro-lesson viewer (P1)**
   - As a Learner, I want to view adaptive micro-lessons.
   - AC: mobile-friendly, works offline.

7. **Quiz per module (P1)**
   - As a Learner, I want to practice via quizzes after each module.
   - AC: results update learner profile.

8. **Gemini AI tutor (P1)**
   - As a Learner, I want to ask questions in natural language.
   - AC: Gemini chatbot answers contextually with simple explanations.

#### Progress tracking

9. **Dashboard (P1)**
   - As a Learner, I want to see my progress, skills mastered, and time spent.

10. **Teacher dashboard (P2)**
   - As a Teacher, I want to see class progress to intervene.

---

## Acceptance criteria summary

- Guest or registered learner can take a quiz, get learning path.  
- Lessons accessible offline.  
- AI tutor responds to at least 3–5 queries.  
- Dashboard shows modules completed & next steps.

---

## Tech stack

- **Frontend:** HTML5, CSS3, JavaScript (responsive PWA).  
- **Backend:** Node.js + Express.js REST API.  
- **Database:** Supabase/PostgreSQL for learners, lessons, quiz results.  
- **AI:** Gemini AI for tutoring & text simplification.  
- **Auth/Security:** JWT, Google OAuth for accounts.  
- **Cloud:** Azure deployment + GitHub Actions (CI/CD).

---

## Architecture

1. Frontend PWA (education dashboard).  
2. API Gateway (Express.js).  
3. Learning Engine (diagnostic + personalization logic).  
4. Gemini AI Tutor (external integration).  
5. Supabase/Postgres (user data, lessons, quiz results).

---

## Data & schema

**Learners table**: id, name, email, level, progress_json.  
**Lessons table**: id, title, difficulty, subject, content_url, offline_flag.  
**QuizResults**: learner_id, lesson_id, score, timestamp.

---

## ML & logic plan

- **Diagnostics:** Map quiz answers → difficulty level (basic algorithm).  
- **Personalization:** Recommend lessons 1 level above current.  
- **AI tutor:** Gemini for Q&A and simplification.  
- **Multilingual support:** Gemini translation API for lessons.

---

## API spec

- POST /api/quiz/submit → returns learner level.  
- GET /api/lessons/:level → returns recommended lessons.  
- POST /api/lesson/:id/quiz → stores result.  
- POST /api/ask-ai → forwards query to Gemini.

---

## Frontend UX & pages

- Landing page: value prop.  
- Diagnostic quiz page.  
- Learning path dashboard.  
- Lesson viewer (offline capable).  
- Gemini AI tutor chat modal.  
- Teacher dashboard (P2).

---

## Backend MVP

- Quiz submission endpoint (basic scoring).  
- Lesson recommendation service.  
- AI tutor endpoint (proxy Gemini).  
- Store quiz results in Supabase.  

---

## Learning/education flows

- Diagnostic → personalized path → micro-lesson → quiz → dashboard updates.  
- AI tutor available across lessons.

---

## Polish & reliability

- Offline cache with service workers.  
- Progress sync when back online.  
- Privacy notice + data usage disclaimer.

---

## Testing & metrics

- Unit test quiz scoring.  
- Verify API responses.  
- Metrics: quiz accuracy improvement, lesson completion rates.

---

## Data sourcing & seeding

- Seed with 20–30 sample lessons (math, coding basics).  
- Curate quizzes per lesson.  
- Map each lesson to difficulty level.

---

## Security & ethics checklist

- No personal financial/health data stored.  
- Anonymize learner data.  
- Add disclaimers: “Educational purposes only.”

---

## README template (sections)

- Project name + tagline.  
- Demo link & screenshots.  
- Quickstart guide.  
- Architecture diagram.  
- Data sources & licenses.  
- Ethics statement.  
- Contribution guide.

---

## Pitch/demo guide

1. Show landing → guest demo.  
2. Take diagnostic quiz → show learning path.  
3. Open a lesson, ask Gemini AI tutor a question.  
4. Show progress dashboard.  
5. Wrap with impact statement: “AI-enabled personalized education for all.”
