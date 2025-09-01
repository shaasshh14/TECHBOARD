// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    // The extra top margin is no longer needed, so mt-24 is removed.
    <footer id="contact" className="bg-[#0d0d14] text-gray-300 py-12">
    {" "}
      <div className="max-w-7xl mx-auto px-6">
        {" "}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
           {/* --- CONTACT FORM SECTION --- */}{" "}
          <div className="md:col-span-2">
            {" "}
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            {" "}
            <form
              className="space-y-4 text-sm"
              onSubmit={(e) => e.preventDefault()}
            >
              {" "}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {" "}
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-[#1a1a26] p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
                {" "}
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-[#1a1a26] p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
               {" "}
              </div>
              {" "}
              <input
                type="tel"
                placeholder="Contact Number (Optional)"
                className="w-full bg-[#1a1a26] p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              {" "}
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full bg-[#1a1a26] p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              ></textarea>
              {" "}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition"
              >
                Send Message {" "}
              </button>
              {" "}
            </form>
            {" "}
          </div>
           {/* --- MODIFIED "ABOUT" SECTION --- */}{" "}
          <div className="md:col-span-2">
            {" "}
            <h3 className="font-semibold text-white mb-4">About Tehboard</h3>
            {" "}
            <p className="text-sm leading-relaxed mb-4">
              Tehboard is the official tech club of our college.
              Innovate, learn,  and collaborate with passionate
              peers.{" "}
            </p>
            {" "}
            {/* New container to align social icons and the small logo */}
            {" "}
            <div className="flex items-center justify-between mt-6">
               {/* Social Icons Group */}{" "}
              <div className="flex space-x-4">
               {" "}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-[#1a1a26] rounded-lg hover:bg-[#0077b5] transition"
                >
                  {" "}
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                     <title>LinkedIn</title>
                    {" "}
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  {" "}
                  </svg>
                  {" "}
                </a>
               {" "}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-[#1a1a26] rounded-lg hover:bg-pink-500 transition"
                >
                {" "}
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                     <title>Instagram</title>
                    {" "}
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.314.935 20.644.523 19.86.227c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.06 1.17-.249 1.805-.413 2.227-.217.562-.477.96-.896 1.382-.42.419-.82.679-1.38.896-.423.164-1.06.36-2.23.413-1.266.057-1.646.07-4.85.07s-3.585-.015-4.85-.074c-1.17-.06-1.805-.249-2.227-.413-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.82-1.381-.896-.164-.423-.36-1.06-.413-2.23-.057-1.266-.07-1.646-.07-4.85s.015-3.585.07-4.85c.055-1.17.249-1.805.413-2.227.217-.562.477.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.057-.36 2.227-.413C8.415 2.175 8.797 2.16 12 2.16zm0 5.482A4.36 4.36 0 1 0 12 16.32a4.36 4.36 0 0 0 0-8.676zm0 7.318A2.96 2.96 0 1 1 12 9.04a2.96 2.96 0 0 1 0 5.882zm6.361-8.404a1.08 1.08 0 1 0 0-2.16 1.08 1.08 0 0 0 0 2.16z" />
                   {" "}
                  </svg>
                 {" "}
                </a>
               {" "}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-[#1a1a26] rounded-lg hover:bg-sky-400 transition"
                >
                  {" "}
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                   <title>X</title>
                    {" "}
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                    {" "}
                  </svg>
                  {" "}
                </a>
                {" "}
              </div>
               {/* New Small Logo */}
              {" "}
              <img
                src="/logo.jpg"
                alt="Tehboard Club Small Logo"
                className="w-24 h-auto rounded-full"
              />
             {" "}
            </div>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </div>
     {" "}
    </footer>
  );
};

export default Footer;
