import React, { useState } from 'react';

interface CounterProps {
  initialValue?: number;
  className?: string;
}

const Counter: React.FC<CounterProps> = ({ initialValue = 0, className = "" }) => {
  const [count, setCount] = useState(initialValue);

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        Interactive React Component
      </h3>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCount(count - 1)}
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          -
        </button>
        <span className="text-2xl font-bold text-gray-800 min-w-[3rem] text-center">
          {count}
        </span>
        <button
          onClick={() => setCount(count + 1)}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          +
        </button>
      </div>
      <p className="text-sm text-gray-600 mt-3">
        This demonstrates hot module replacement and React integration working correctly.
      </p>
    </div>
  );
};

export default Counter;
