import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, helperText, className = '', ...props }) => {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && <label className="text-sm font-semibold text-brand-dark">{label}</label>}
            <input
                className={`bg-gray-50 border ${error ? 'border-red-500' : 'border-gray-200'} text-gray-900 text-sm rounded-xl focus:ring-brand-blue focus:border-brand-blue block p-2.5 outline-none transition-all hover:bg-white focus:bg-white shadow-sm ${className}`}
                {...props}
            />
            {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
            {helperText && !error && <p className="text-xs text-gray-500 italic">{helperText}</p>}
        </div>
    );
};

interface SelectProps {
    label?: string;
    error?: string;
    options: { value: string; label: string }[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export const Select: React.FC<SelectProps> = ({ label, error, options, value, onChange, placeholder = 'Seleccionar...', className = '' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`flex flex-col gap-1.5 relative w-full ${className}`} ref={containerRef}>
            {label && <label className="text-sm font-semibold text-brand-dark">{label}</label>}

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between w-full bg-white border ${error ? 'border-red-500' : 'border-gray-200'} text-brand-dark text-sm rounded-xl p-3 outline-none transition-all hover:border-brand-blue/30 shadow-sm text-left`}
            >
                <span className={!selectedOption ? 'text-gray-400' : 'font-medium'}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown size={18} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-gray-100 rounded-xl shadow-xl z-[100] py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="max-h-60 overflow-y-auto custom-scrollbar">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                    onChange?.(option.value);
                                    setIsOpen(false);
                                }}
                                className={`flex items-center justify-between w-full px-4 py-2.5 text-sm transition-colors hover:bg-brand-blue/5 text-left
                                    ${value === option.value ? 'bg-brand-blue/5 text-brand-blue font-bold' : 'text-gray-600'}
                                `}
                            >
                                <span>{option.label}</span>
                                {value === option.value && <Check size={14} />}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
        </div>
    );
};
