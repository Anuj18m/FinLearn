import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Welcome to <span className="text-primary">FinLearn</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Master Financial Literacy & Investment Awareness
          </p>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Learn about Stocks, Mutual Funds, Bonds, F&O, and IPOs through interactive 
            modules, videos, and quizzes. Earn certificates upon completion!
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/register"
              className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-secondary transition"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-white text-primary px-8 py-3 rounded-lg text-lg font-semibold border-2 border-primary hover:bg-gray-50 transition"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-primary transition">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">5 Core Modules</h3>
            <p className="text-gray-600">
              Comprehensive learning materials on Stocks, Mutual Funds, Bonds, F&O, and IPOs
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-primary transition">
            <div className="text-4xl mb-4">🎥</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Video Learning</h3>
            <p className="text-gray-600">
              Watch curated YouTube videos to reinforce your understanding
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-primary transition">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Interactive Quizzes</h3>
            <p className="text-gray-600">
              Test your knowledge with 10 MCQs per module, score 80%+ to pass
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Track Your Progress & Earn Certificates
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Monitor your learning journey with detailed progress charts and download 
            certificates for completed modules to showcase your achievements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
