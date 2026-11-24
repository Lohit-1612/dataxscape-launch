import React, { useState } from 'react';
import { FAQ_LEFT, FAQ_RIGHT, FaqItem } from '../data/faqData';
import { ChevronDown, Sparkles, HelpCircle } from 'lucide-react';

export const Faq: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const renderFaqColumn = (items: FaqItem[], startNum: number) => (
    <div className="space-y-4">
      {items.map((item, idx) => {
        const isOpen = openId === item.id;
        const indexNumber = String(startNum + idx).padStart(2, '0');

        return (
          <div
            key={item.id}
            className={`rounded-2xl transition-all duration-300 backdrop-blur-md overflow-hidden ${
              isOpen
                ? 'bg-gradient-to-br from-[#0c192c]/95 to-[#050e1c]/95 border border-cyan-400/50 shadow-[0_10px_30px_rgba(0,210,255,0.15)]'
                : 'bg-[#061122]/70 hover:bg-[#0a1b35]/80 border border-white/10 hover:border-cyan-400/30 shadow-lg'
            }`}
          >
            <button
              onClick={() => toggleAccordion(item.id)}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left group focus:outline-none"
            >
              <div className="flex items-center gap-3 sm:gap-4 pr-3">
                <span className={`text-xs sm:text-sm font-mono font-bold transition-colors ${
                  isOpen ? 'text-cyan-400' : 'text-white/40 group-hover:text-cyan-300'
                }`}>
                  {indexNumber}
                </span>
                <span
                  className={`text-sm sm:text-base font-bold transition-colors duration-200 ${
                    isOpen ? 'text-cyan-400' : 'text-white/90 group-hover:text-white'
                  }`}
                >
                  {item.question}
                </span>
              </div>
              <div className={`p-1.5 rounded-full border transition-all duration-300 flex-shrink-0 ${
                isOpen ? 'bg-cyan-400/20 border-cyan-400 text-cyan-400 rotate-180' : 'border-white/15 text-white/50 group-hover:text-white'
              }`}>
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {/* Answer Drawer */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out px-4 sm:px-5 ${
                isOpen ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 pb-0 opacity-0'
              }`}
            >
              <div className="pl-7 sm:pl-9 border-t border-white/5 pt-3">
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-normal">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <section id="faq" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10 scroll-mt-20">
      {/* Header */}
      <div className="text-center mb-14 sm:mb-18">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>CLARITY & DETAILS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3 font-display">
          Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500">Questions</span>
        </h2>
        <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto font-normal">
          Everything you need to know about eligibility, team formation, hospitality, and rules.
        </p>
      </div>

      {/* 2-Column Responsive Glass Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {renderFaqColumn(FAQ_LEFT, 1)}
        {renderFaqColumn(FAQ_RIGHT, 5)}
      </div>

      {/* Quick Inquiries Callout */}
      <div className="mt-10 sm:mt-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-xs text-white/60">
          <HelpCircle className="w-4 h-4 text-cyan-400" />
          <span>Have an unanswered question? Reach out to us through our contact channels in the footer below.</span>
        </div>
      </div>
    </section>
  );
};
