import React, { useState, useRef, useEffect } from 'react';

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const OtpModal: React.FC<OtpModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      inputRefs.current[0]?.focus();
    }
  }, [isOpen]);
  
  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join("");
    // In a real app, you'd verify this against a backend.
    // For this demo, we'll just check if it's 6 digits.
    if (enteredOtp.length === 6) {
      onSuccess();
    } else {
      alert("Please enter a valid 6-digit OTP.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold mb-2">Enter Verification Code</h2>
        <p className="text-gray-400 mb-6">A 6-digit code has been sent to your phone.</p>
        
        <div className="flex justify-center gap-2 mb-6">
          {otp.map((data, index) => {
            return (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={data}
                // Fix: The ref callback should not return a value. Using a block body for the arrow function ensures it implicitly returns undefined, which is compatible with the expected void return type.
                ref={el => { inputRefs.current[index] = el; }}
                onChange={e => handleChange(e.target, index)}
                onKeyDown={e => handleKeyDown(e, index)}
                onFocus={e => e.target.select()}
                className="w-12 h-14 text-center text-2xl font-semibold bg-gray-700 rounded-lg border border-gray-600 focus:border-yellow-400 focus:ring-yellow-400 focus:outline-none"
              />
            );
          })}
        </div>

        <button onClick={handleSubmit} className="w-full bg-yellow-400 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 transition duration-300 mb-4">
          Verify
        </button>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OtpModal;