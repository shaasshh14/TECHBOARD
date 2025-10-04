import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Updated YouTube video ID from the provided URL
const YOUTUBE_VIDEO_ID = 'Hb9QvSODBPY';
const YOUTUBE_EMBED_URL = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=0&loop=1&playlist=${YOUTUBE_VIDEO_ID}`;

const VideoPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-[#101216] p-4"
    >
      {/* Video Card */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="relative w-full max-w-4xl bg-[#1A1D24] rounded-2xl shadow-2xl shadow-[#3a86ff]/30 border border-[#3a86ff]/50 overflow-hidden p-4 md:p-6"
      >
        {/* YouTube Video Player Wrapper for Aspect Ratio */}
        <div className="w-full aspect-video rounded-lg overflow-hidden bg-black">
          <iframe
            src={YOUTUBE_EMBED_URL}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-full object-contain"
          ></iframe>
        </div>

        {/* Go Back Button */}
        <div className="mt-6 text-center">
          <motion.button
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.05, backgroundColor: "#ff9a3c", color: "#1A1D24" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-[#3a86ff] text-white rounded-full py-2 px-6 font-bold cursor-pointer transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Go Back
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VideoPage;
