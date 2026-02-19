import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    subtitle?: string;
    footer?: React.ReactNode;
    noPadding?: boolean;
    overflowVisible?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, subtitle, footer, noPadding, overflowVisible }) => {
    return (
        <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${overflowVisible ? 'overflow-visible' : 'overflow-hidden'} ${className}`}>
            {(title || subtitle) && (
                <div className="px-6 py-4 border-b border-gray-50">
                    {title && <h3 className="text-lg font-bold text-brand-dark tracking-tight">{title}</h3>}
                    {subtitle && <p className="text-xs text-gray-400 font-medium italic mt-1">{subtitle}</p>}
                </div>
            )}
            <div className={`${noPadding ? '' : 'p-6'} flex-1`}>
                {children}
            </div>
            {footer && (
                <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-50">
                    {footer}
                </div>
            )}
        </div>
    );
};
