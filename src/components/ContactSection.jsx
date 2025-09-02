import React from "react";

// The CSS for the border animation is included here as a style tag.
// In a larger React project, this would typically go into a separate CSS file.
export const styles = `
  @keyframes animate-border-top {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  @keyframes animate-border-right {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
  }
  @keyframes animate-border-bottom {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }
  @keyframes animate-border-left {
    0% { transform: translateY(100%); }
    100% { transform: translateY(-100%); }
  }

  .animated-border .border-line-top { animation: animate-border-top 2s linear infinite; }
  .animated-border .border-line-right { animation: animate-border-right 2s linear infinite; animation-delay: 1s; }
  .animated-border .border-line-bottom { animation: animate-border-bottom 2s linear infinite; }
  .animated-border .border-line-left { animation: animate-border-left 2s linear infinite; animation-delay: 1s; }
`;

export const AnimatedBorderSpan = ({ position, animationClass }) => (
  <span
    className={`absolute ${position} block w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent ${animationClass}`}
  ></span>
);


export const ContactSection = () => {
  return (
    <section id="contact" className=" text-white min-h-screen flex items-center justify-center py-16 px-6 font-sans bg-transparent">
      <div className="max-w-4xl mx-auto w-full">
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Contact <span className="text-indigo-500">Us</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-lg mx-auto">
          Have questions or want to collaborate? Fill out the form below and we’ll get back to you shortly.
        </p>

        {/* Animated Border Container */}
        <div className="relative bg-[#2a2a2d] rounded-2xl shadow-2xl p-px overflow-hidden animated-border">
          {/* Animated lines */}
          <AnimatedBorderSpan position="top-0 left-0" animationClass="border-line-top" />
          <AnimatedBorderSpan position="top-0 right-0 transform rotate-90 origin-top-right" animationClass="border-line-right" />
          <AnimatedBorderSpan position="bottom-0 right-0" animationClass="border-line-bottom" />
          <AnimatedBorderSpan position="bottom-0 left-0 transform -rotate-90 origin-bottom-left" animationClass="border-line-left" />

          {/* Contact Form */}
          <form className="relative bg-[#222225] p-8 md:p-12 rounded-[15px] space-y-8 z-10">
            {/* Name Input with Floating Label */}
            <div className="relative">
              <input
                type="text"
                id="name"
                className="block w-full px-4 py-3 rounded-lg bg-transparent border-2 border-gray-600 focus:border-indigo-500 text-white outline-none peer transition-all duration-300"
                placeholder=" " 
                required
              />
              <label
                htmlFor="name"
                className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#222225] px-2 left-2
                peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1.5
                peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-indigo-400"
              >
                Your Name
              </label>
            </div>

            {/* Email Input with Floating Label */}
            <div className="relative">
              <input
                type="email"
                id="email"
                className="block w-full px-4 py-3 rounded-lg bg-transparent border-2 border-gray-600 focus:border-indigo-500 text-white outline-none peer transition-all duration-300"
                placeholder=" "
                required
              />
              <label
                htmlFor="email"
                className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#222225] px-2 left-2
                peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1.5
                peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-indigo-400"
              >
                Your Email
              </label>
            </div>

            {/* Message Textarea with Floating Label */}
            <div className="relative">
              <textarea
                id="message"
                rows="5"
                className="block w-full px-4 py-3 rounded-lg bg-transparent border-2 border-gray-600 focus:border-indigo-500 text-white outline-none peer transition-all duration-300 resize-none"
                placeholder=" "
                required
              ></textarea>
              <label
                htmlFor="message"
                className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#222225] px-2 left-2
                peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1.5
                peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-indigo-400"
              >
                Your Message
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 ease-in-out text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};