// src/components/FAQSection.jsx
import React, { useState } from "react";
import { RobotSection } from "./RobotSection"; // 👈 import robot

const faqData = [
  { question: "What is Opera GX?", answer: "Opera GX is a special version of the Opera browser built specifically to complement gaming. The browser includes unique features to help you get the most out of both gaming and browsing." },
  { question: "Is Opera GX free?", answer: "Yes, Opera GX is completely free. You can download it from the official website and use all of its features without any cost." },
  { question: "What are GX Control features?", answer: "GX Control is a key feature that lets you set limits on how much RAM, CPU, and network usage your browser uses. This ensures your browser doesn't interfere with your gaming performance." },
  { question: "Can I customize the look?", answer: "Absolutely. Opera GX offers deep customization with themes, colors, wallpapers, and Razer Chroma integration to match your gaming setup." },
];

const FAQItem = ({ faq, index, toggleFAQ }) => {
  const handleClose = (e) => {
    e.stopPropagation();
    toggleFAQ(index);
  };

  return (
    <div
      className={`faq-item ${faq.open ? "open" : ""}`}
      onClick={() => toggleFAQ(index)}
    >
      <div className="faq-question">
        {faq.question}
        <div className="faq-icon">+</div>
      </div>
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
  const [faqs, setFaqs] = useState(faqData.map((faq) => ({ ...faq, open: false })));

  const toggleFAQ = (index) => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) faq.open = !faq.open;
        else faq.open = false;
        return faq;
      })
    );
  };

  return (
    <section className="relative flex flex-col md:flex-row items-start gap-8 px-6 py-12">
      {/* Robot on the left side, slightly higher to "look" at the first question */}
      {/* <div className="hidden md:block flex-shrink-0 w-40 md:w-52 -mt-8 rotate-[-10deg]">
        <RobotSection />
      </div> */}

      <div className="absolute left-0 -top-12 w-40 md:w-52 animate-bounce-slow">
      <RobotSection/>
      </div>

      {/* FAQ content */}
      <div className="faq-section-container flex-1">
        <div className="faq-title-wrapper mb-6">
          <h2 className="faq-title text-3xl md:text-4xl font-bold">
            <span className="block text-pink-500">Frequently Asked</span>
            <span className="block text-white">Questions</span>
          </h2>
        </div>
        <div className="faq-list space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem faq={faq} index={index} key={index} toggleFAQ={toggleFAQ} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
