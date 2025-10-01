// src/components/FAQSection.jsx
import React, { useState } from "react";
import { RobotSection } from "./RobotSection"; // Optional robot section

// FAQ data
const faqData = [
  {
    question: "What is Opera GX?",
    answer:
      "Opera GX is a special version of the Opera browser built specifically to complement gaming. The browser includes unique features to help you get the most out of both gaming and browsing.",
  },
  {
    question: "Is Opera GX free?",
    answer:
      "Yes, Opera GX is completely free. You can download it from the official website and use all of its features without any cost.",
  },
  {
    question: "What are GX Control features?",
    answer:
      "GX Control is a key feature that lets you set limits on how much RAM, CPU, and network usage your browser uses. This ensures your browser doesn't interfere with your gaming performance.",
  },
  {
    question: "Can I customize the look?",
    answer:
      "Absolutely. Opera GX offers deep customization with themes, colors, wallpapers, and Razer Chroma integration to match your gaming setup.",
  },
];

// Individual FAQ Item
const FAQItem = ({ faq, index, toggleFAQ }) => {
  const handleClose = (e) => {
    e.stopPropagation(); // Prevent triggering toggleFAQ when clicking close button
    toggleFAQ(index);
  };

  return (
    <div
      className={`faq-item ${faq.open ? "open" : ""}`}
      onClick={() => toggleFAQ(index)}
    >
      {/* Question Section */}
      <div className="faq-question">
        {faq.question}
        <div className="faq-icon" style={{ color: "#FF1A50" }}>{faq.open ? "-" : "+"}</div>
      </div>

      {/* Answer Section */}
      <div className="faq-answer-wrapper">
        <div className="faq-answer-content">
          <p>{faq.answer}</p>
          <button className="faq-close-btn" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [faqs, setFaqs] = useState(
    faqData.map((faq) => ({ ...faq, open: false }))
  );

  // Toggle FAQ open/close
  const toggleFAQ = (index) => {
    setFaqs(
      faqs.map((faq, i) => ({
        ...faq,
        open: i === index ? !faq.open : false, // Close others when opening one
      }))
    );
  };

  return (
    <section className="relative flex flex-col md:flex-row items-start gap-8 px-4 sm:px-6 lg:px-12 py-12 max-w-[1280px] mx-auto">
      {/* Optional Robot Section */}
      {/* <div className="hidden md:block flex-shrink-0 w-28 sm:w-40 md:w-52 -mt-8 rotate-[-10deg]">
        <RobotSection />
      </div> */}

      {/* FAQ Main Content */}
      <div className="faq-section-container w-full">
        <div className="faq-title-wrapper mb-6">
          {/* Desktop View */}
          <h2 className="hidden md:block faq-title text-3xl md:text-4xl font-bold">
            <span className="block " style={{color:"#FF1A50"}}>Frequently Asked</span>
            <span className="block text-white">Questions</span>
          </h2>

          {/* Mobile & Tablet View */}
          <h2 className="block md:hidden text-center text-3xl sm:text-4xl font-bold leading-tight">
            <span className="block " style={{color:"#FF1A50"}}>Frequently Asked</span>
            <span className="block text-white">Questions</span>
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="faq-list space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              faq={faq}
              index={index}
              key={index}
              toggleFAQ={toggleFAQ}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
