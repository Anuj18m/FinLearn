# FinLearn

A full-stack MERN application for learning financial markets. Includes interactive modules, quizzes, certificates, and progress tracking.

## Features

- 5 Interactive modules (Stocks, Mutual Funds, Bonds, F&O, IPOs)
- Video lessons from Vimeo
- 50 Quiz questions (10 per module)
- Auto-generated certificates for 80%+ scores
- Progress tracking with charts
- Admin dashboard for module management
- JWT authentication with role-based access
- Responsive design

## Prerequisites

- Node.js v16+
- MongoDB (local or Atlas)
- npm v9+

## Setup

Clone the repo, then run:

**Terminal 1 - Backend:**
```bash
cd backend
npm install
cp .env.example .env
node seed.js
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:3000 in your browser.

## Test Credentials

```
Admin: admin@finlearn.com / admin123
User:  john@example.com / password123
```

## Tech Stack

- Backend: Node.js, Express, MongoDB, Mongoose, JWT
- Frontend: React 18, Vite, Redux, Tailwind CSS, Recharts

## Project Structure

```
backend/
  ├── models/
  ├── routes/
  ├── middleware/
  └── server.js

frontend/
  ├── src/
  │   ├── pages/
  │   ├── components/
  │   ├── services/
  │   └── store/
  └── vite.config.js
```

## API Endpoints

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me

GET    /api/modules
GET    /api/modules/:slug
POST   /api/modules (admin)
PUT    /api/modules/:id (admin)
DELETE /api/modules/:id (admin)

GET    /api/quizzes/:moduleId
POST   /api/quizzes/submit

GET    /api/progress
GET    /api/progress/:moduleId
```

## Development

```bash
# Backend
npm run dev    # Auto-reload
node seed.js  # Reset DB with seed data

# Frontend
npm run dev    # Dev server
npm run build  # Production build
```

## Environment Variables

Copy `.env.example` to `.env` in both folders:

**Backend:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/finlearn
JWT_SECRET=your_secret_key
NODE_ENV=development
```

**Frontend:**
```
VITE_API_URL=http://localhost:5000/api
```

## Troubleshooting

**MongoDB not connecting:**
- Make sure MongoDB is running or use MongoDB Atlas
- Check connection string in .env

**Port already in use (Windows):**
```powershell
Get-Process -Name node | Stop-Process -Force
```

**npm install fails on Windows:**
```powershell
Remove-Item -Recurse -Force node_modules
npm install --force
```

**Videos not loading:**
- Check if Vimeo/YouTube is accessible
- Hard refresh browser (Ctrl+Shift+R)

## Deployment

Backend: Render, Railway, Heroku, or Azure App Service  
Frontend: Vercel, Netlify, or GitHub Pages

```bash
npm run build  # Creates dist/ folder
```

## License

MIT

---

## Contact

<a href="https://www.linkedin.com/in/anujmhatre17/" target="_blank">
  <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
</a>

<a href="mailto:anuj17m@gmail.com">
  <img src="https://img.shields.io/badge/Gmail-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail">
</a>
