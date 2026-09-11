import React, { useState } from 'react';
import ContactSection from '../components/ContactSection';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck, Truck, PhoneCall } from 'lucide-react';
import { companyData } from '../data/company';

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'How does Pharma First Enterprises verify pharmaceutical product authenticity?',
      a: 'All inventory is procured directly through certified pharmaceutical manufacturers. Products maintain strict batch records, verifiable lot numbers, and tamper-evident packaging conforming to GDP standards.'
    },
    {
      q: 'What are your cold-chain and temperature control standards?',
      a: 'Our distribution facilities and logistics partners operate validated climate-controlled storage (ambient 15-25°C, refrigerated 2-8°C, and deep chill) with continuous digital temperature loggers.'
    },
    {
      q: 'Do you supply hospitals, retail pharmacies, and private medical practices?',
      a: 'Yes. We provide institutional wholesale accounts, consolidated batch deliveries, regular scheduled replenishment, and direct emergency dispatches for registered medical entities.'
    },
    {
      q: 'What is required to order prescription-grade medications?',
      a: 'Regulated pharmaceuticals require verification of a valid clinical practice license, institutional accreditation, or registered prescription reference prior to fulfillment.'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Contact Section Form & Office Cards */}
      <ContactSection />

      {/* Frequently Asked Questions Section */}
      <section className="py-16 bg-white border-b border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Assistance &amp; Guidelines
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Common questions regarding our pharmaceutical ordering and distribution procedures.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50/50 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left font-bold text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-100/60 text-sm sm:text-base"
                  >
                    <span className="flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-brand-600 flex-shrink-0" />
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/40 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
