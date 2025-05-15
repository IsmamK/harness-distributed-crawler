import { useState, useEffect } from 'react';

const SpiderAnimation = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div
        className="absolute h-1 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-200"
        style={{ width: `${position}%` }}
      ></div>
      <div
        className="absolute top-0 transform -translate-y-1/2 text-purple-400"
        style={{ left: `${position}%` }}
      >
        <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15l-3-3m0 0l3-3m-3 3h12" />
        </svg>
      </div>
    </div>
  );
};

export default SpiderAnimation;