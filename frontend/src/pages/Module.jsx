import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentModule } from '../store/moduleSlice';
import { moduleService } from '../services/apiService';
import { getVideoEmbedUrl } from '../utils/helpers';

const Module = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentModule } = useSelector((state) => state.modules);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModule();
  }, [slug]);

  const fetchModule = async () => {
    try {
      const data = await moduleService.getModuleBySlug(slug);
      dispatch(setCurrentModule(data));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching module:', error);
      setLoading(false);
    }
  };

  const handleStartQuiz = () => {
    navigate(`/quiz/${currentModule._id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!currentModule) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Module not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-primary hover:text-secondary mb-4 flex items-center"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {currentModule.title}
          </h1>
          <p className="text-gray-600 text-lg">{currentModule.description}</p>
        </div>

        {/* Video Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📹 Watch Video Lesson</h2>
          {currentModule?.videoUrl ? (
            <>
              {(() => {
                const videoEmbed = getVideoEmbedUrl(currentModule.videoUrl);

                // If it's an object (HTML5 video)
                if (videoEmbed && typeof videoEmbed === 'object') {
                  return (
                    <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                      <video
                        className="absolute top-0 left-0 w-full h-full"
                        controls
                        controlsList="nodownload"
                      >
                        <source src={videoEmbed.src} type="video/mp4" />
                        Your browser does not support HTML5 video.
                      </video>
                    </div>
                  );
                }

                // If it's a string (iframe URL)
                return videoEmbed ? (
                  <div className="relative w-full bg-black rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full border-0"
                      src={videoEmbed}
                      title={currentModule.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div className="w-full h-64 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
                    <p className="text-gray-700 font-semibold mb-2">⚠️ Video Unavailable</p>
                    <p className="text-gray-500 text-sm text-center">
                      The video for this module cannot be played.<br/>
                      URL: {currentModule.videoUrl}
                    </p>
                  </div>
                );
              })()}
            </>
          ) : (
            <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">No video available for this module</p>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Learning Content</h2>
          <div className="prose max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {currentModule.content}
            </div>
          </div>
        </div>

        {/* Quiz Button */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Test Your Knowledge?</h2>
          <p className="text-gray-600 mb-6">
            Take the quiz to test your understanding. You need to score at least 80% to pass.
          </p>
          <button
            onClick={handleStartQuiz}
            className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-secondary transition"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Module;
