import React, { useState, useEffect } from 'react';
import './BootLoader.css';

const bootLines = [
  { text: 'Initializing Techboard v1.0...', delay: 100 },
  { text: 'Booting kernel...', delay: 300 },
  { text: 'Loading core modules...', delay: 150 },
  { text: 'Verifying data integrity...', delay: 200, status: '[OK]' },
  { text: 'Calibrating network interface...', delay: 250 },
  { text: 'Establishing neural link...', delay: 400, status: '[CONNECTED]' },
];

const BootLoader = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentLine = 0;
    const timeouts = [];

    const processLine = () => {
      if (currentLine < bootLines.length) {
        const line = bootLines[currentLine];
        const timeout = setTimeout(() => {
          setLines(prev => [...prev, line]);
          currentLine++;
          processLine();
        }, line.delay);
        timeouts.push(timeout);
      } else {
        const timeout = setTimeout(() => {
          setShowProgressBar(true);
        }, 300);
        timeouts.push(timeout);
      }
    };

    processLine();

    return () => timeouts.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (showProgressBar) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(onComplete, 500);
            return 100;
          }
          return prev + 1;
        });
      }, 20);

      return () => clearInterval(interval);
    }
  }, [showProgressBar, onComplete]);

  return (
    <div className="boot-loader-background">
      <div className="boot-terminal">
        {lines.map((line, index) => (
          <div key={index} className="boot-line">
            <span className="boot-text">{line.text}</span>
            {line.status && <span className="boot-status">{line.status}</span>}
          </div>
        ))}
        {showProgressBar && (
          <div className="progress-bar-container">
            <div className="progress-bar-label">SYSTEM READY:</div>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                // --- THIS LINE IS NOW CORRECT ---
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="progress-percent">{progress}%</span>
          </div>
        )}
        <div className="caret-container">
          {!showProgressBar && <div className="boot-caret"></div>}
        </div>
      </div>
    </div>
  );
};

export default BootLoader;