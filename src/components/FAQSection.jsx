// src/components/FAQSection.jsx
import React, { useState } from 'react';

const faqData = [
    { question: 'What is Opera GX?', answer: 'Opera GX is a special version of the Opera browser built specifically to complement gaming. The browser includes unique features to help you get the most out of both gaming and browsing.' },
    { question: 'Is Opera GX free?', answer: 'Yes, Opera GX is completely free. You can download it from the official website and use all of its features without any cost.' },
    { question: 'What are GX Control features?', answer: 'GX Control is a key feature that lets you set limits on how much RAM, CPU, and network usage your browser uses. This ensures your browser doesn\'t interfere with your gaming performance.' },
    { question: 'Can I customize the look?', answer: 'Absolutely. Opera GX offers deep customization with themes, colors, wallpapers, and Razer Chroma integration to match your gaming setup.' },
];

const FAQItem = ({ faq, index, toggleFAQ }) => {
    return (
        <div className={`faq-item ${faq.open ? 'open' : ''}`} onClick={() => toggleFAQ(index)}>
            <div className="faq-question">
                {faq.question}
                <div className="faq-icon">+</div>
            </div>
            <div className="faq-answer-wrapper">
                <div className="faq-answer-content">
                    <p>{faq.answer}</p>
                </div>
            </div>
        </div>
    );
};

const FAQSection = () => {
    const [faqs, setFaqs] = useState(
        faqData.map(faq => ({ ...faq, open: false }))
    );

    const toggleFAQ = index => {
        setFaqs(
            faqs.map((faq, i) => {
                if (i === index) {
                    faq.open = !faq.open;
                } else {
                    faq.open = false; // Optional: close other FAQs when one is opened
                }
                return faq;
            })
        );
    };

    return (
        <section>
            <div className="faq-section-container">
                <div className="faq-title-wrapper">
                    <h2 className="faq-title">Frequently Asked Questions</h2>
                </div>
                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <FAQItem faq={faq} index={index} key={index} toggleFAQ={toggleFAQ} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;