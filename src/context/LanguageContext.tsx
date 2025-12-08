'use client';

// Context for managing language state across the application

import React, { createContext, useContext, useState, ReactNode } from 'react';
import en from '../data/en.json';
import it from '../data/it.json';

type Language = 'en' | 'it';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    content: typeof en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    const content = language === 'en' ? en : it;

    return (
        <LanguageContext.Provider value={{ language, setLanguage, content }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
