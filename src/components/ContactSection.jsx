import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Building,
  ShieldCheck
} from 'lucide-react';
import { companyData } from '../data/company';
import { useToast } from '../context/ToastContext';

export default function ContactSection() {
  const { addToast } = useToast();
  const { contact } = companyData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Wholesale / Distribution Inquiry',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name or entity name.';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid email format.';
    }
    if (!formData.phone.trim()) errs.phone = 'Contact phone number is required.';
    if (!formData.message.trim() || formData.message.trim().length < 15) {
      errs.message = 'Please provide message details (minimum 15 characters).';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        setSubmitted(true);
        addToast('Message dispatched! Our pharmaceutical team will contact you shortly.', 'success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'Wholesale / Distribution Inquiry',
          message: '',
        });
      }, 1000);
    } else {
      addToast('Please complete all highlighted fields before sending.', 'error');
    }
  };

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200/60 relative overflow-hidden" id="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
            Direct Communication
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            Connect with Pharma First Enterprises
          </h2>
          <p className="text-slate-600 text-base mt-2">
            Reach out for clinical supply contracts, institutional inquiries, bulk wholesale orders, or order support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Official Contact & Company Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
                <Building className="w-5 h-5 text-brand-600" />
                Distribution Headquarters
              </h3>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-brand-50 text-brand-600 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 block uppercase">Phone Inquiries</span>
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-sm sm:text-base font-bold text-slate-800 hover:text-brand-600 transition-colors"
                  >
                    {contact.phoneDisplay}
                  </a>
                  <span className="block text-xs text-slate-500 mt-0.5">
                    Toll-Free Institutional Dispatch
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-sky-50 text-sky-600 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 block uppercase">Official Email</span>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-sm sm:text-base font-bold text-slate-800 hover:text-brand-600 transition-colors"
                  >
                    {contact.email}
                  </a>
                  <span className="block text-xs text-slate-500 mt-0.5">
                    Orders: {contact.ordersEmail}
                  </span>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 block uppercase">Logistics Facility</span>
                  <p className="text-sm font-semibold text-slate-800 leading-snug">
                    {contact.address}
                  </p>
                  <p className="text-xs text-slate-500">{contact.cityStateZip}</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-purple-50 text-purple-600 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 block uppercase">Operational Hours</span>
                  <p className="text-sm font-semibold text-slate-800">{contact.businessHours}</p>
                  <p className="text-xs text-emerald-600 font-medium mt-0.5">
                    {contact.emergencyDistribution}
                  </p>
                </div>
              </div>
            </div>

            {/* Regulatory compliance reassurance box */}
            <div className="p-5 rounded-2xl bg-brand-900 text-white flex items-start gap-3 shadow-lg">
              <ShieldCheck className="w-6 h-6 text-brand-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <span className="font-bold block text-sm mb-1 text-sky-200">
                  Verified Pharmaceutical Protocol
                </span>
                All supply inquiries undergo automated verification for regulated products. Rest assured that our distribution conforms strictly with GDP standards.
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Send an Official Message</h3>
            <p className="text-xs text-slate-500 mb-6">
              Fill out the form below. For urgent hospital batches, please phone our dispatch center directly.
            </p>

            {submitted && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm mb-6 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Thank you for your message!</span>
                  <span>
                    Your inquiry has been logged in the Pharma First Enterprises CRM. A representative will reach out to you within standard business hours.
                  </span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Your Name / Organization <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Arthur Vance / Apex Clinic"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full text-sm px-4 py-3 rounded-xl border ${
                      errors.name ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                    } focus:outline-none focus:ring-2 focus:ring-brand-500`}
                  />
                  {errors.name && <span className="text-xs text-rose-500 mt-1 block">{errors.name}</span>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="contact@facility.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full text-sm px-4 py-3 rounded-xl border ${
                      errors.email ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                    } focus:outline-none focus:ring-2 focus:ring-brand-500`}
                  />
                  {errors.email && <span className="text-xs text-rose-500 mt-1 block">{errors.email}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full text-sm px-4 py-3 rounded-xl border ${
                      errors.phone ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                    } focus:outline-none focus:ring-2 focus:ring-brand-500`}
                  />
                  {errors.phone && <span className="text-xs text-rose-500 mt-1 block">{errors.phone}</span>}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Inquiry Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full text-sm px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                  >
                    <option value="Wholesale / Distribution Inquiry">Wholesale / Distribution Inquiry</option>
                    <option value="Clinic / Pharmacy Supply Account">Clinic / Pharmacy Supply Account</option>
                    <option value="Cold-Chain Logistics Inquiries">Cold-Chain Logistics Inquiries</option>
                    <option value="Existing Order Tracking">Existing Order Tracking</option>
                    <option value="General Information">General Information</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Message Details <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Detail your requirements, batch sizes, or delivery timelines..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full text-sm p-4 rounded-xl border ${
                    errors.message ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                  } focus:outline-none focus:ring-2 focus:ring-brand-500`}
                />
                {errors.message && (
                  <span className="text-xs text-rose-500 mt-1 block">{errors.message}</span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-600/20 transition-all flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <span>Dispatching Message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
