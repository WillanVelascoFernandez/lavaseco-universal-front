import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const DigitalClock: React.FC = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex items-center gap-3 px-4 py-2 bg-gray-50/50 rounded-2xl border border-gray-100 group transition-all hover:bg-white hover:shadow-sm">
            <div className="p-1.5 bg-brand-blue/10 text-brand-blue rounded-lg group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                <Clock size={16} />
            </div>
            <div className="flex flex-col">
                <span className="text-[14px] font-black text-brand-dark leading-none tabular-nums">
                    {format(time, 'HH:mm:ss')}
                </span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                    {format(time, "EEEE, d 'de' MMMM", { locale: es })}
                </span>
            </div>
        </div>
    );
};
