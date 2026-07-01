'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, X } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function RxAssistChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const isOpenRef = useRef(isOpen);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    isOpenRef.current = isOpen;
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: "Hi! I'm RxAssist 👋 I can help you understand prescription terms, medicine abbreviations, and how to use RxReader tools. What would you like to know?",
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen, messages.length]);

  const handleSend = async (overrideMessage?: string) => {
    const message = overrideMessage || input.trim();
    if (!message || loading || messageCount >= 15) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    if (!overrideMessage) setInput('');
    setLoading(true);
    setMessageCount(prev => prev + 1);

    try {
      const currentHistory = messages.map(m => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/rxassist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          history: currentHistory
        }),
      });

      const data = await res.json();

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.reply || "Sorry, I couldn't process that. Please try again.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setMessageCount(prev => prev + 1);

      if (!isOpenRef.current) {
        setUnreadCount(c => c + 1);
      }

    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Network error. Please check your connection and try again.",
        timestamp: new Date()
      }]);
      if (!isOpenRef.current) {
        setUnreadCount(c => c + 1);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button — always visible */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Unread indicator — show when closed and unreadCount > 0 */}
        {!isOpen && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center z-10">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            isOpen
              ? 'bg-gray-700 dark:bg-gray-600'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
          aria-label={isOpen ? 'Close RxAssist chat' : 'Open RxAssist chat'}
        >
          {isOpen ? (
            <span className="text-white text-xl">✕</span>
          ) : (
            <span className="text-2xl">🤖</span>
          )}
        </button>
      </div>

      {/* Chat panel UI — slides up from bottom right */}
      {isOpen && (
        <div className="fixed bottom-24 right-2 left-2 sm:left-auto sm:right-6 sm:w-96 z-50 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden transition-all duration-300"
          style={{ maxHeight: '70vh' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-500 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              <div>
                <p className="text-white font-bold text-sm">RxAssist</p>
                <p className="text-blue-100 text-xs">Prescription Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-blue-200">{Math.max(0, 15 - messageCount)} msgs left</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-700 px-3 py-2">
            <p className="text-xs text-amber-800 dark:text-amber-300">
              ⚠️ RxAssist explains prescription terms only. Not a substitute for medical advice. Always consult your doctor.
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <span className="text-lg mr-2 mt-1 flex-shrink-0">🤖</span>
                )}
                <div
                  className={`max-w-[78%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-sm'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-sm'
                  }`}
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <span className="text-lg mr-2">🤖</span>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestion chips — show only when messages has only welcome message */}
          {messages.length === 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {[
                "What does BD mean?",
                "What is OD on prescription?",
                "How do I use RxReader?",
                "What does AC mean?",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setInput(suggestion);
                  }}
                  className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 px-3 py-1.5 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Message limit reached */}
          {messageCount >= 15 && (
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Session limit reached. Refresh the page to start a new conversation.
              </p>
            </div>
          )}

          {/* Input */}
          {messageCount < 15 && (
            <div className="border-t border-gray-200 dark:border-gray-700 p-3 flex gap-2 bg-white dark:bg-gray-900">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="Ask about prescriptions..."
                maxLength={500}
                className="flex-1 border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                aria-label="Type your message"
                disabled={loading}
              />
              <button
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors flex-shrink-0"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
