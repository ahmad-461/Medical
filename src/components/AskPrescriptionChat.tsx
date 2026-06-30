'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PrescriptionResult } from '@/types/prescription';
import Spinner from '@/components/Spinner';

interface AskPrescriptionChatProps {
  prescriptionContext: PrescriptionResult;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const MAX_MESSAGES = 10;

export default function AskPrescriptionChat({ prescriptionContext }: AskPrescriptionChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (expanded) {
      scrollToBottom();
    }
  }, [messages, expanded]);

  const reachedLimit = messages.length >= MAX_MESSAGES;

  const handleSend = async () => {
    const question = input.trim();
    if (!question || loading || reachedLimit) return;

    setMessages(prev => [...prev, { role: 'user', content: question }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ask-prescription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, prescriptionContext }),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "Sorry, I couldn't process that question. Please try again."
        }]);
        return;
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Network error. Please check your connection and try again."
      }]);
    } finally {
      setLoading(false);
    }
  };

  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="w-full flex items-center justify-center gap-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-[#2563EB] dark:text-blue-400 font-medium py-3 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors mt-4"
      >
        💬 Ask a Question About This Prescription
      </button>
    );
  }

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl mt-4 overflow-hidden bg-white dark:bg-gray-900 shadow-sm">
      {/* Header */}
      <div className="bg-[#2563EB] px-4 py-3 flex items-center justify-between">
        <span className="text-white font-medium text-sm flex items-center gap-2">
          💬 Ask About This Prescription
        </span>
        <button
          onClick={() => setExpanded(false)}
          className="text-white/80 hover:text-white text-sm"
          aria-label="Close chat"
        >
          ✕
        </button>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800 px-4 py-2">
        <p className="text-xs text-amber-800 dark:text-amber-300">
          ⚠️ This assistant only explains details from your prescription results above. It cannot give medical advice.
        </p>
      </div>

      {/* Messages */}
      <div className="max-h-80 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-6">
            Ask things like &quot;What does BD mean here?&quot; or &quot;Why is this taken after meals?&quot;
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-xl px-4 py-2 text-sm ${
              msg.role === 'user'
                ? 'bg-[#2563EB] text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-2">
              <Spinner size="sm" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={reachedLimit ? "Question limit reached" : "Ask about your prescription..."}
            maxLength={300}
            disabled={loading || reachedLimit}
            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-50 dark:disabled:bg-gray-950 disabled:text-gray-400"
            aria-label="Ask a question about your prescription"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim() || reachedLimit}
            className="bg-[#2563EB] text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm font-medium"
            aria-label="Send question"
          >
            Send
          </button>
        </div>
        {reachedLimit && (
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
            You&apos;ve reached the question limit for this session. Upload a new prescription to ask more questions.
          </p>
        )}
      </div>
    </div>
  );
}
