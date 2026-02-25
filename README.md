# FinLearn - Financial Literacy & Investment Awareness Platform

A full-stack MERN (MongoDB, Express, React, Node.js) application for learning about financial markets through interactive modules, videos, and quizzes.

## ✨ Features

- **5 Interactive Learning Modules**: Stocks, Mutual Funds, Bonds, Futures & Options (F&O), IPOs
- **Video Lessons**: Embedded from Vimeo for reliable streaming
- **50 Quiz Questions**: 10 MCQs per module with instant scoring
- **Certificate Generation**: Downloadable PDF certificates for 80%+ completion
- **Progress Tracking**: Visual charts and detailed score history
- **Admin Dashboard**: Complete CRUD interface for module management
- **User Authentication**: JWT-based secure authentication with role-based access
- **Responsive Design**: Optimized for mobile, tablet, and desktop

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Node.js v16+
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

```bash
# Terminal 1: Backend Setup
cd backend
npm install
cp .env.example .env          # Update with your config
node seed.js                  # Seed initial data
npm run dev                   # Runs on http://localhost:5000

# Terminal 2: Frontend Setup
cd frontend
npm install
cp .env.example .env          # Update API URL
npm run dev                   # Runs on http://localhost:3000
```

Open **http://localhost:3000** in your browser.

## 🔐 Test Credentials

```
Admin:
  Email: admin@finlearn.com
  Password: admin123

Student:
  Email: john@example.com
  Password: password123
```

## 🛠️ Tech Stack

**Backend:**
- Node.js + Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

**Frontend:**
- React 18
- Vite (build tool)
- Redux Toolkit (state management)
- React Router v6
- Tailwind CSS
- Axios (HTTP client)
- Recharts (data visualization)
- jsPDF (certificate generation)

## 📁 Project Structure

```
FinLearn/
├── backend/
│   ├── models/              # MongoDB schemas (User, Module, Quiz, Progress)
│   ├── routes/              # API endpoints
│   ├── middleware/          # JWT authentication
│   ├── server.js            # Express entry point
│   ├── seed.js              # Database initialization
│   ├── package.json
│   ├── .env.example         # Environment template
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── pages/           # Page components
│   │   ├── components/      # Reusable UI components
│   │   ├── services/        # API service layer
│   │   ├── store/           # Redux slices
│   │   ├── utils/           # Helper functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── README.md
├── LICENSE
└── .gitignore
```

## 🌍 API Endpoints

### Authentication
```
POST   /api/auth/register       Create account
POST   /api/auth/login          Login user
GET    /api/auth/me             Get current user (protected)
```

### Modules
```
GET    /api/modules             List all modules
GET    /api/modules/:slug       Get module by slug
POST   /api/modules             Create (admin only)
PUT    /api/modules/:id         Update (admin only)
DELETE /api/modules/:id         Delete (admin only)
```

### Quizzes
```
GET    /api/quizzes/:moduleId   Get module quiz
POST   /api/quizzes/submit      Submit quiz answers
```

### Progress
```
GET    /api/progress            Get user progress
GET    /api/progress/:moduleId  Get module progress
```

## ⚙️ Development

### Available Scripts

**Backend:**
```bash
npm run dev    # Start with auto-reload
node seed.js  # Reset database with seed data
```

**Frontend:**
```bash
npm run dev    # Start dev server
npm run build  # Build for production
```

## 📝 Environment Setup

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/finlearn
JWT_SECRET=your_secure_secret_key_here
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running locally, or
- Use MongoDB Atlas cloud service
- Verify connection string in `.env`

**Port Already in Use:**
```bash
# Windows
Get-Process -Name node | Stop-Process -Force

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

**Videos Not Loading:**
- Verify Vimeo is accessible in your region
- Check console for error messages
- Hard refresh browser (Ctrl+Shift+R)

## 🚀 Deployment

### Backend (Node.js)
Deploy to: Render, Railway, Heroku, or Azure App Service
- Set environment variables on hosting platform
- Ensure MongoDB is accessible
- Deploy the backend folder

### Frontend (React)
Deploy to: Vercel, Netlify, or GitHub Pages
```bash
npm run build        # Creates dist/ folder
# Deploy dist/ to your hosting provider
```

## 📊 Key Features

### Video Processing
Automatic detection and embedding of:
- Vimeo videos
- YouTube videos
- HTML5 video files

### Quiz System
- Immediate feedback after submission
- Score tracking across attempts
- Auto-generated certificates for 80%+ scores

### Progress Dashboard
- Visual progress charts
- Module completion tracking
- Score history

### Admin Panel
- CRUD operations for modules
- Student progress monitoring
- Quiz management

## 📄 License

MIT License - Free for educational and commercial use

## 🎓 Educational Focus

This project demonstrates:
- Full-stack MERN development
- RESTful API design
- JWT authentication
- State management with Redux
- Responsive UI design
- MongoDB database design
- Component-based architecture

---

**Status**: ✅ Production Ready  
**Version**: 1.0.0  
**Last Updated**: February 25, 2026
