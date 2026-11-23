import React, { useState } from 'react';
import { Mail, MapPin, Send, Check, Copy, ExternalLink, Sparkles } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    teamName: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('pecdatascienceclub@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', teamName: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 scroll-mt-20">
      {/* Header */}
      <div className="text-center mb-14 sm:mb-18">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>DIRECT COMMUNICATIONS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3 font-display">
          Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500">Connect</span>
        </h2>
        <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto font-normal">
          Have queries about sponsorship, registrations, or event logistics? Reach out anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Premium Contact Cards */}
        <div className="lg:col-span-5 space-y-4 text-left">
          {/* Location Card */}
          <div className="bg-gradient-to-br from-[#0c192c]/90 to-[#050e1c]/95 border border-white/10 hover:border-cyan-400/40 rounded-2xl p-5 sm:p-6 backdrop-blur-md shadow-lg transition-all duration-300 group">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex-shrink-0 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                  Event Venue
                </h4>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-normal">
                  Department of Artificial Intelligence and Data Science, Panimalar Engineering College, Nazarethpet, Poonamallee, Chennai – 600123.
                </p>
              </div>
            </div>
          </div>

          {/* Email Card with 1-Click Copy */}
          <div className="bg-gradient-to-br from-[#0c192c]/90 to-[#050e1c]/95 border border-white/10 hover:border-cyan-400/40 rounded-2xl p-5 sm:p-6 backdrop-blur-md shadow-lg transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-0.5">
                    Official Email
                  </h4>
                  <a
                    href="mailto:pecdatascienceclub@gmail.com"
                    className="text-xs sm:text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-mono"
                  >
                    pecdatascienceclub@gmail.com
                  </a>
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-2 rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/50 text-white/70 hover:text-cyan-300 transition-colors flex items-center gap-1.5 text-xs font-mono"
                title="Copy email address"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                <span className="hidden sm:inline">{copiedEmail ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Google Forms CTA Card */}
          <div className="bg-gradient-to-r from-cyan-500/15 via-sky-400/10 to-blue-600/15 border border-cyan-400/40 rounded-2xl p-5 sm:p-6 backdrop-blur-md shadow-xl">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1.5">
              Ready to Register Your Team?
            </h4>
            <p className="text-xs text-white/70 mb-4">
              Fast-track your submission on the official Google Forms registration portal.
            </p>
            <a
              href="https://forms.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl font-bold text-black text-sm bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all duration-200 shadow-[0_0_25px_rgba(0,210,255,0.4)] hover:shadow-[0_0_35px_rgba(0,210,255,0.65)] hover:scale-[1.02] active:scale-95"
            >
              <span>Register via Google Forms</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Social Links Dock */}
          <div className="flex items-center gap-3 pt-2">
            <span className="text-xs uppercase tracking-widest text-white/50 font-semibold font-mono">
              Follow Us:
            </span>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400 flex items-center justify-center text-white/70 hover:text-cyan-400 transition-all hover:scale-105 shadow-md"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400 flex items-center justify-center text-white/70 hover:text-cyan-400 transition-all hover:scale-105 shadow-md"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Right Column: Premium Form Card */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="bg-gradient-to-br from-[#0c192c]/95 via-[#081325]/95 to-[#040914]/95 border border-cyan-500/25 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-4 sm:space-y-5 text-left relative overflow-hidden"
          >
            {/* Ambient Corner Accent */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Field: Name */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-white/90 mb-1.5">
                Your Full Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Alex Morgan"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-black/60 border border-white/15 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 rounded-xl px-4 py-3 text-base sm:text-sm text-white placeholder-white/40 focus:outline-none transition-all"
                required
              />
            </div>

            {/* Field: Email */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-white/90 mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                placeholder="e.g. alex.morgan@college.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-black/60 border border-white/15 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 rounded-xl px-4 py-3 text-base sm:text-sm text-white placeholder-white/40 focus:outline-none transition-all"
                required
              />
            </div>

            {/* Field: Team Name */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-white/90 mb-1.5">
                Team Name & Institution (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Neural Ninjas – MIT"
                value={formData.teamName}
                onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                className="w-full bg-black/60 border border-white/15 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 rounded-xl px-4 py-3 text-base sm:text-sm text-white placeholder-white/40 focus:outline-none transition-all"
              />
            </div>

            {/* Field: Message */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-white/90 mb-1.5">
                Message / Question
              </label>
              <textarea
                rows={4}
                placeholder="Share your inquiry, question, or project interest with our organizing committee..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-black/60 border border-white/15 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 rounded-xl px-4 py-3 text-base sm:text-sm text-white placeholder-white/40 focus:outline-none transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitted}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-black text-sm sm:text-base bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-all duration-300 shadow-[0_0_25px_rgba(0,210,255,0.45)] hover:shadow-[0_0_35px_rgba(0,210,255,0.7)] flex items-center justify-center gap-2 group active:scale-[0.99] disabled:opacity-75 cursor-pointer"
            >
              {submitted ? (
                <>
                  <Check className="w-5 h-5 text-black" />
                  <span>Message Sent Successfully!</span>
                </>
              ) : (
                <>
                  <span>Send Message to Organizers</span>
                  <Send className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
