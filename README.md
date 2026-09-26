# 🎓 StudentHub Backend REST API

A robust, production-ready Node.js REST API for StudentHub built with **Express**, **Prisma ORM**, **PostgreSQL** (with automated local seed store fallback), and real external API integrations (**NewsAPI**, **YouTube Data API**, **Adzuna Jobs API**, **JoinRise**, **Arbeitnow**).

---

## 🚀 Key Features

1. **Dual-Store Architecture**: Automatically detects PostgreSQL via Prisma ORM. If PostgreSQL is offline locally, it seamlessly operates using an in-memory seeded store without crashing.
2. **External API Integrations with TTL Caching**:
   - **NewsAPI**: Placement news bulletins & tech trends.
   - **YouTube Data API v3**: Free educational course video search.
   - **Adzuna Jobs API**: Live tech job search with JoinRise & Arbeitnow public fallbacks.
3. **Deterministic Recommendation Engine**: Generates 5 personalized cards (Primary Skill, Recommended Course, Matched Internship, Target Job, Industry Trend) based on student branch, year, target role, and current skills.
4. **11-Step Opportunity Backward Planner**: Reverses job market requirements into actionable breadcrumbs, project ideas, skill gap analysis, and "What NOT to learn" focus guidance.
5. **Time-Based Timetable Generator**: Builds customizable week-by-week study plans with practical task checklists.

---

## 🛠️ Installation & Setup

```bash
# Navigate to the backend directory
cd studenthub/backend

# Install dependencies
npm install

# Start the development server (default PORT: 5000)
npm run dev

# Run automated logic test suite
npm test
```

---

## 🗄️ PostgreSQL & Prisma Database Configuration

```bash
# Push schema to local PostgreSQL database
npx prisma db push

# Seed PostgreSQL database with roles, skills, courses, projects, internships, jobs, & trends
npm run seed
```

---

## 📡 Key API Endpoints & Usage Examples

### 1. Health & Status Check
- **`GET /api/health`**
- **Response**: Returns server status, environment, DB mode, and active external API integrations.

### 2. Personalized 5-Card Recommendations
- **`GET /api/recommendations/:studentId`**
- **`POST /api/recommendations`**
- **Body**: `{ "branch": "CSE", "year": "2nd Year", "targetRole": "Data Scientist", "currentSkills": ["Python"] }`

### 3. Opportunity Backward Planner
- **`POST /api/planner`**
- **Body**: `{ "targetRole": "Data Scientist", "skills": ["Python", "SQL"] }`

### 4. "I Have X Days" Time-Based Learning Plan
- **`POST /api/learning-plan`**
- **Body**: `{ "days": 30, "hoursPerWeek": 5, "goal": "Data Scientist" }`

### 5. News & Skills
- **`GET /api/news`**: Placement news feed.
- **`GET /api/skills`**: All in-demand skills.
- **`GET /api/skills/:name/path`**: Skill to Course to Internship to Job trajectory path.

### 6. Courses & Video Search
- **`GET /api/courses?platform=Kaggle Learn&isFree=true`**
- **`GET /api/courses/videos?q=Python`**: Educational YouTube videos.

### 7. Universal Search
- **`GET /api/search?q=data`**: Searches across courses, skills, jobs, internships, and news.

---

## 🧪 Automated Testing

Execute the test suite verifying all 9 core logic engines:
```bash
npm test
```
