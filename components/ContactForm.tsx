'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading' || status === 'success') return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        setStatus('error');
        setErrorMsg(data.error ?? 'Something went wrong.');
        return;
      }

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');

      // Reset after 8s
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setStatus('idle'), 8000);
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  };

  const inputClass =
    'w-full bg-[#07111f]/80 border border-border hover:border-primary/50 focus:border-primary rounded-md px-4 py-3 text-sm text-foreground placeholder-slate-600 outline-none transition-colors focus:ring-1 focus:ring-primary/30';

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-xs font-medium text-slate-400 mb-1.5">Name</label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            maxLength={100}
            className={inputClass}
            disabled={status === 'loading' || status === 'success'}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-xs font-medium text-slate-400 mb-1.5">Email</label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            maxLength={200}
            className={inputClass}
            disabled={status === 'loading' || status === 'success'}
          />
        </div>
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between text-xs font-medium">
          <label htmlFor="contact-message" className="text-slate-400">Message</label>
          <span id="contact-message-count" className="text-slate-600">{message.length}/2000</span>
        </div>
        <textarea
          id="contact-message"
          aria-describedby="contact-message-count"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me about your project or idea..."
          required
          maxLength={2000}
          rows={5}
          className={`${inputClass} resize-none`}
          disabled={status === 'loading' || status === 'success'}
        />
      </div>

      <AnimatePresence mode="wait">
        {status === 'error' && (
          <motion.div
            key="error"
            role="alert"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-md px-4 py-3"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            {errorMsg}
          </motion.div>
        )}

        {status === 'success' && (
          <motion.div
            key="success"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-md px-4 py-3"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            Message sent! I&apos;ll get back to you soon.
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary/80 disabled:bg-primary/40 disabled:cursor-not-allowed text-[#03111c] rounded-md font-bold text-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending…
          </>
        ) : status === 'success' ? (
          <>
            <CheckCircle2 className="w-4 h-4" />
            Sent!
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
