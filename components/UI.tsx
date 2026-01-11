
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-emerald-700 text-white hover:bg-emerald-800 shadow-lg shadow-emerald-700/20",
    secondary: "bg-amber-600 text-white hover:bg-amber-700",
    outline: "border-2 border-emerald-700 text-emerald-700 hover:bg-emerald-50",
    ghost: "text-emerald-700 hover:bg-emerald-50",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden ${className}`}>
    {children}
  </div>
);

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string }> = ({ label, className = '', ...props }) => (
  <div className="space-y-2 text-right">
    {label && <label className="block text-sm font-medium text-emerald-900 pr-1">{label}</label>}
    <input 
      className={`w-full px-4 py-3 rounded-xl border border-emerald-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-200 text-right ${className}`}
      {...props} 
    />
  </div>
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string; options: string[] }> = ({ label, options, className = '', ...props }) => (
  <div className="space-y-2 text-right">
    {label && <label className="block text-sm font-medium text-emerald-900 pr-1">{label}</label>}
    <select 
      className={`w-full px-4 py-3 rounded-xl border border-emerald-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none bg-white transition-all duration-200 text-right ${className}`}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }> = ({ label, className = '', ...props }) => (
  <div className="space-y-2 text-right">
    {label && <label className="block text-sm font-medium text-emerald-900 pr-1">{label}</label>}
    <textarea 
      className={`w-full px-4 py-3 rounded-xl border border-emerald-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-200 text-right min-h-[120px] ${className}`}
      {...props} 
    />
  </div>
);
