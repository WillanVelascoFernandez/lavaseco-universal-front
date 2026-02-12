import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = 'md'
}) => {
    if (!isOpen) return null;

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
    };

    return (
        <div className="fixed inset-0 z-[60] overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={onClose}>
                    <div className="absolute inset-0 bg-brand-dark opacity-75 backdrop-blur-sm"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className={`inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full ${sizes[size]}`}>
                    <div className="bg-white px-6 py-4 flex justify-between items-center border-b border-gray-100">
                        <h3 className="text-xl font-bold text-brand-dark">{title}</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-brand-dark transition-colors p-1 rounded-full hover:bg-gray-100"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="bg-white px-6 py-6">
                        {children}
                    </div>

                    {footer && (
                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
