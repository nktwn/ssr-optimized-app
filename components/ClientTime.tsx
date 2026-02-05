'use client';

import { useState, useEffect } from 'react';

export default function ClientTime() {
    const [time, setTime] = useState<string>('');

    useEffect(() => {
        setTime(new Date().toLocaleTimeString());
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div suppressHydrationWarning>
            {time || '00:00:00'}
        </div>
    );
}