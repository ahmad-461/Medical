'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionItemProps {
  question: string;
  answer: string;
}

export function AccordionItem({ question, answer }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="font-semibold text-slate-900 dark:text-white">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-slate-500 dark:text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-500 dark:text-gray-400" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-slate-600 dark:text-gray-400 border-t border-gray-50 dark:border-gray-700 pt-3">
          {answer}
        </div>
      )}
    </div>
  );
}
