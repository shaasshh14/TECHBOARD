import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";

// Animated border stuff you already have
export const styles = `...`; // keep your existing styles
export const AnimatedBorderSpan = ({ position, animationClass }) => (
  <span
    className={`absolute ${position} block w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent ${animationClass}`}
  ></span>
);

export const ContactSection = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setIsSending(false);
          setStatusMessage("✅ Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          setIsSending(false);
          setStatusMessage("❌ Failed to send. Please try again later.");
          console.error(error);
        }
      );
  };

  return (
    <section
      id="contact"
      className="text-white min-h-screen flex items-center justify-center py-16 px-6 font-sans bg-transparent"
    >
      <div className="max-w-4xl mx-auto w-full">
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Contact <span className="text-[#FF1A50]">Us</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-lg mx-auto">
          Have questions or want to collaborate? Fill out the form below and we’ll get back to you shortly.
        </p>

        {/* Animated Border Container */}
        <div className="relative bg-[#2a2a2d] rounded-2xl shadow-2xl p-px overflow-hidden animated-border">
          {/* Animated lines */}
          <AnimatedBorderSpan position="top-0 left-0" animationClass="border-line-top" />
          <AnimatedBorderSpan
            position="top-0 right-0 transform rotate-90 origin-top-right"
            animationClass="border-line-right"
          />
          <AnimatedBorderSpan position="bottom-0 right-0" animationClass="border-line-bottom" />
          <AnimatedBorderSpan
            position="bottom-0 left-0 transform -rotate-90 origin-bottom-left"
            animationClass="border-line-left"
          />

          {/* Contact Form */}
          <form
            ref={form}
            onSubmit={sendEmail}
            className="relative bg-[#222225] p-8 md:p-12 rounded-[15px] space-y-8 z-10"
          >
            {/* Name Input */}
            <div className="relative">
              <input
                type="text"
                name="user_name"
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

            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                name="user_email"
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

            {/* Message Textarea */}
            <div className="relative">
              <textarea
                name="message"
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSending}
              className="w-full bg-[#FF1A50] hover:bg-indigo-700 transition-all duration-300 ease-in-out text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-50"
            >
              {isSending ? "Sending..." : "Send Message"}
            </button>

            {/* Status message */}
            {statusMessage && (
              <p className="text-center text-sm mt-4 text-gray-300">{statusMessage}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
