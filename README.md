# FlowState

FlowState is a smart study planner that creates personalized schedules and dynamically adapts them as users complete tasks, miss sessions, or add new work.

## Features

* Secure user authentication (JWT + bcrypt)
* Task creation and management
* Smart daily study schedule generation
* Deadline-based prioritization
* Productivity analytics and study streak tracking
* Interactive dashboard with charts

## Tech Stack

**Frontend**

* React
* TypeScript
* Vite
* Tailwind CSS
* Recharts

**Backend**

* FastAPI
* SQLAlchemy
* PostgreSQL
* JWT Authentication

**Deployment**

* Vercel (Frontend)
* Render (Backend)
* Neon PostgreSQL (Database)

## Local Setup

```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend
cd frontend
npm install
npm run dev
```

## What I Learned

* Full-stack application development
* REST API design
* Authentication and authorization
* Database design with SQLAlchemy
* Cloud deployment and debugging

## Live Demo

Frontend: [https://panic-planner.vercel.app/]

## Future Improvements
AI-powered study recommendations
Burnout detection
Calendar integration
Pomodoro timer intergration
