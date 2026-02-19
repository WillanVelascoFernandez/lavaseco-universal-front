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
    icon?: React.ElementType;
    showCheck?: boolean;
    variant?: 'premium' | 'simple';
}

export const Select: React.FC<SelectProps> = ({
    label,
    error,
    options,
    value,
    onChange,
    placeholder = 'Seleccionar...',
    className = '',
    icon: Icon,
    showCheck = true,
    variant = 'premium'
}) => {
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

    const isPremium = variant === 'premium';

    return (
        <div className={`flex flex-col gap-1.5 relative w-full ${className}`} ref={containerRef}>
            {label && (
                <label className={`${isPremium ? 'text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]' : 'text-sm font-semibold text-brand-dark'} mb-0.5 block px-1`}>
                    {label}
                </label>
            )}

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between w-full outline-none transition-all shadow-sm text-left relative
                    ${isPremium
                        ? `bg-gray-50 border-2 ${error ? 'border-red-500' : 'border-transparent'} ${isOpen ? 'border-brand-blue bg-white' : 'hover:border-brand-blue/30'} rounded-2xl p-4`
                        : `bg-white border ${error ? 'border-red-500' : 'border-gray-200'} ${isOpen ? 'border-brand-blue ring-2 ring-brand-blue/5' : 'hover:border-brand-blue/30'} rounded-xl p-3 px-4`
                    }
                `}
            >
                <div className="flex items-center gap-2.5 flex-1 min-w-0 overflow-hidden">
                    {Icon && <Icon size={isPremium ? 18 : 16} className={`${isOpen || selectedOption ? 'text-brand-blue' : 'text-gray-300'} transition-colors flex-shrink-0`} />}
                    <span
                        title={selectedOption?.label || placeholder}
                        className={`block truncate overflow-hidden ${!selectedOption ? 'text-gray-400' : isPremium ? 'font-bold' : 'font-medium'} ${!isPremium && 'text-[13px]'}`}
                    >
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                </div>
                <ChevronDown size={isPremium ? 18 : 16} className={`text-gray-400 transition-transform duration-200 flex-shrink-0 ml-1.5 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className={`absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-gray-100 shadow-2xl z-[100] animate-in fade-in slide-in-from-top-2 duration-300
                    ${isPremium ? 'rounded-[1.5rem] py-3' : 'rounded-xl py-2'}
                `}>
                    <div className={`max-h-60 overflow-y-auto custom-scrollbar ${isPremium ? 'px-2' : ''}`}>
                        {options.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                    onChange?.(option.value);
                                    setIsOpen(false);
                                }}
                                title={option.label}
                                className={`flex items-center justify-between w-full transition-all text-left whitespace-nowrap overflow-hidden
                                    ${isPremium
                                        ? `px-4 py-3 rounded-xl mb-1 last:mb-0 ${value === option.value ? 'bg-brand-blue/10 text-brand-blue font-black' : 'text-gray-600 hover:bg-gray-50 font-semibold'}`
                                        : `px-4 py-2 ${value === option.value ? 'bg-brand-blue/5 text-brand-blue font-bold' : 'text-gray-600 hover:bg-gray-50'}`
                                    }
                                `}
                            >
                                <span className="text-sm truncate mr-2 flex-1">{option.label}</span>
                                {showCheck && value === option.value && (
                                    <div className={isPremium ? "bg-brand-blue text-white rounded-full p-0.5 shadow-md shadow-brand-blue/20 flex-shrink-0" : "text-brand-blue flex-shrink-0"}>
                                        <Check size={isPremium ? 12 : 14} className={isPremium ? "stroke-[4px]" : ""} />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {error && (
                <p className={`${isPremium ? 'text-[10px] font-black' : 'text-xs font-medium'} text-red-500 uppercase tracking-wider px-1 mt-1`}>
                    {error}
                </p>
            )}
        </div>
    );
};
