# FinLearn 📚

> Financial Literacy & Investment Awareness Platform

A full-stack **MERN** application for learning financial markets through interactive modules, videos, and quizzes.

---

## ✨ Features

- 🎓 **5 Interactive Modules**: Stocks, Mutual Funds, Bonds, F&O, IPOs
- 🎬 **Video Lessons**: Embedded from Vimeo for reliable streaming  
- ❓ **50 Quiz Questions**: 10 MCQs per module with instant scoring
- 🏆 **Certificates**: Auto-generated PDFs for 80%+ completion
- 📊 **Progress Tracking**: Visual charts & score history
- 👨‍💼 **Admin Dashboard**: Complete module management
- 🔐 **JWT Auth**: Secure authentication with role-based access
- 📱 **Responsive**: Optimized for all devices

---

## 🚀 Quick Start

### Prerequisites
- Node.js v16+ (tested with v24.13.0)
- MongoDB (local or Atlas)
- npm v9+ or yarn

### Setup (2 Terminals)

**Backend:**
```bash
cd backend
npm install
cp .env.example .env
node seed.js
npm run dev  # Runs on http://localhost:5000
```

**Frontend:**
```bash
cd frontend
npm install  # Use --force flag on Windows if needed
cp .env.example .env
npm run dev  # Runs on http://localhost:3000
```

Open **http://localhost:3000** in your browser.

---

## 🔐 Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@finlearn.com` | `admin123` |
| Student | `john@example.com` | `password123` |

---

## 🛠️ Tech Stack

**Backend** | **Frontend**
---|---
Node.js + Express | React 18 + Vite
MongoDB + Mongoose | Redux Toolkit
JWT + bcryptjs | React Router v6
CORS | Tailwind CSS + Recharts

---

## 📁 Project Structure

```
FinLearn/
├── backend/
│   ├── models/       # MongoDB schemas
│   ├── routes/       # API endpoints
│   ├── middleware/   # JWT auth
│   └── server.js
│
├── frontend/
│   └── src/
│       ├── pages/       # Page components
│       ├── components/  # UI components
│       ├── services/    # API service
│       └── store/       # Redux slices
│
└── README.md
```

---

## 🌍 API Endpoints

**Auth**
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
```

**Modules**
```
GET    /api/modules
GET    /api/modules/:slug
POST   /api/modules          (admin only)
PUT    /api/modules/:id      (admin only)
DELETE /api/modules/:id      (admin only)
```

**Quizzes & Progress**
```
GET    /api/quizzes/:moduleId
POST   /api/quizzes/submit
GET    /api/progress
```

---

## ⚙️ Development

```bash
# Backend
npm run dev    # Start with auto-reload
node seed.js  # Reset database

# Frontend  
npm run dev    # Start dev server
npm run build  # Build for production
```

---

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running
- For Atlas: `MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/finlearn`

**Port in Use (Windows):**
```powershell
Get-Process -Name node | Stop-Process -Force
```

**npm Install Issues (Windows Rollup Error):**
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install --force
```

**Videos Not Loading:**
- Check Vimeo/YouTube accessibility
- Hard refresh: `Ctrl+Shift+R`

---

## 📦 Environment Variables

Create `.env` files from `.env.example` in both folders:

**Backend (.env)**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/finlearn
JWT_SECRET=your_secret_key
NODE_ENV=development
```

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:5000/api
```

⚠️ **Never commit `.env` files to GitHub** (added to `.gitignore`)

---

## 🚀 Deployment

**Backend:** Render, Railway, Heroku, Azure App Service  
**Frontend:** Vercel, Netlify, GitHub Pages

```bash
npm run build  # Creates dist/ folder
```

---

## 📄 License

MIT License - Free for educational and commercial use

---

**Status:** ✅ Production Ready | **v1.0.0** | Updated: Feb 25, 2026  
**Tested:** Node.js v24.13.0 • Windows 10/11 • MongoDB Local & Atlas
