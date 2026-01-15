
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = "relative font-bold transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";

  const sizes = {
    sm: "px-4 py-2.5 text-sm rounded-xl",
    md: "px-6 py-3.5 rounded-2xl",
    lg: "px-8 py-4 text-lg rounded-2xl"
  };

  const variants = {
    primary: "bg-gradient-to-l from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800 shadow-lg shadow-teal-600/25 hover:shadow-xl hover:shadow-teal-600/30 hover:-translate-y-0.5",
    secondary: "bg-gradient-to-l from-slate-700 to-slate-800 text-white hover:from-slate-800 hover:to-slate-900 shadow-lg shadow-slate-600/20",
    outline: "border-2 border-teal-600 text-teal-700 hover:bg-teal-50 hover:border-teal-700",
    ghost: "text-teal-700 hover:bg-teal-50/80 hover:text-teal-800",
    gold: "bg-gradient-to-l from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-lg shadow-amber-500/25"
  };

  return (
    <button
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = false, glass = false }) => (
  <div className={`
    ${glass ? 'bg-white/70 backdrop-blur-xl' : 'bg-white'}
    rounded-3xl
    border border-slate-100/80
    ${hover ? 'transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200/50' : 'shadow-xl shadow-slate-200/40'}
    overflow-hidden
    ${className}
  `}>
    {children}
  </div>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, icon, error, className = '', ...props }) => (
  <div className="space-y-2.5 text-right">
    {label && (
      <label className="block text-sm font-semibold text-slate-700 pr-1">
        {label}
      </label>
    )}
    <div className="relative">
      {icon && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>
      )}
      <input
        className={`
          w-full px-5 py-4
          ${icon ? 'pr-12' : ''}
          rounded-2xl
          bg-slate-50/80
          border-2 border-slate-100
          focus:border-teal-500 focus:bg-white
          focus:ring-4 focus:ring-teal-500/10
          outline-none
          transition-all duration-300
          text-right text-slate-800
          placeholder:text-slate-400
          ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : ''}
          ${className}
        `}
        {...props}
      />
    </div>
    {error && (
      <p className="text-red-500 text-sm pr-1">{error}</p>
    )}
  </div>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: string[];
}

export const Select: React.FC<SelectProps> = ({ label, options, className = '', ...props }) => (
  <div className="space-y-2.5 text-right">
    {label && (
      <label className="block text-sm font-semibold text-slate-700 pr-1">
        {label}
      </label>
    )}
    <select
      className={`
        w-full px-5 py-4
        rounded-2xl
        bg-slate-50/80
        border-2 border-slate-100
        focus:border-teal-500 focus:bg-white
        focus:ring-4 focus:ring-teal-500/10
        outline-none
        transition-all duration-300
        text-right text-slate-800
        cursor-pointer
        appearance-none
        ${className}
      `}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left 1rem center',
        backgroundSize: '1.5rem'
      }}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, className = '', ...props }) => (
  <div className="space-y-2.5 text-right">
    {label && (
      <label className="block text-sm font-semibold text-slate-700 pr-1">
        {label}
      </label>
    )}
    <textarea
      className={`
        w-full px-5 py-4
        rounded-2xl
        bg-slate-50/80
        border-2 border-slate-100
        focus:border-teal-500 focus:bg-white
        focus:ring-4 focus:ring-teal-500/10
        outline-none
        transition-all duration-300
        text-right text-slate-800
        min-h-[140px]
        resize-none
        placeholder:text-slate-400
        ${className}
      `}
      {...props}
    />
  </div>
);

// Badge Component
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'gold' | 'success' | 'neutral' | 'purple';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary', size = 'md' }) => {
  const variants = {
    primary: 'bg-gradient-to-l from-teal-500 to-teal-600 text-white',
    gold: 'bg-gradient-to-l from-amber-400 to-amber-500 text-white',
    success: 'bg-gradient-to-l from-emerald-500 to-emerald-600 text-white',
    neutral: 'bg-slate-100 text-slate-600',
    purple: 'bg-gradient-to-l from-purple-500 to-purple-600 text-white'
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm'
  };

  return (
    <span className={`inline-flex items-center font-semibold rounded-full shadow-sm ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
};
