// src/components/Footer.jsx
import React from "react";
import { FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-[#0d0d14] text-gray-300 py-12 mt-24">
      {/* We add mt-24 (margin-top) to the footer to make space for the logo circle which sits above it */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
        {/* Features */}
        <div>
          <h3 className="font-semibold text-white mb-4">Features</h3>
          <ul className="space-y-2 text-sm">
            <li>Events</li>
            <li>Workshops</li>
            <li>Hackathons</li>
            <li>Networking</li>
            <li>More Features →</li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold text-white mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>Projects</li>
            <li>Mentorship</li>
            <li>Community</li>
            <li>Resources</li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="font-semibold text-white mb-4">Help</h3>
          <ul className="space-y-2 text-sm">
            <li>FAQs</li>
            <li>Contact</li>
            <li>Support</li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="font-semibold text-white mb-4">About Tehboard</h3>
          <p className="text-sm leading-relaxed mb-4">
            Tehboard is the official tech club of our college. Innovate, learn,
            and collaborate with passionate peers.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#1a1a26] rounded-lg hover:bg-[#0077b5] transition"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#1a1a26] rounded-lg hover:bg-pink-500 transition"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#1a1a26] rounded-lg hover:bg-sky-400 transition"
            >
              <FaTwitter size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Logo Circle */}
      <div className="absolute -top-24 left-1/2 transform -translate-x-1/2">
        <div className="w-48 h-48 rounded-full bg-[#0d0d14] border-4 border-yellow-400 flex items-center justify-center overflow-hidden shadow-lg">
          {/* --- MODIFIED IMAGE TAG --- */}
          <img
            src="/logo.jpg" // Make sure this path and extension are correct!
            alt="Club Logo"
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
