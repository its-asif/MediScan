import React from 'react';
import { Link } from 'react-router-dom';

const benefits = [
  {
    title: 'Certified Lab Network',
    detail: 'All diagnostics are processed through verified partner labs with quality-control standards.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7 4h10l1 3v4c0 5-3.5 8.5-7 9-3.5-.5-7-4-7-9V7l1-3z" />
      </svg>
    ),
  },
  {
    title: 'Smart Booking Experience',
    detail: 'Book tests in minutes, select a date, and track appointment status from one dashboard.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Clear, Actionable Reports',
    detail: 'Access report history, understand key values, and make timely health decisions.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-8 4h10" />
      </svg>
    ),
  },
  {
    title: 'Secure Payments',
    detail: 'Complete payments with confidence through secure gateway integrations and clear receipts.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h2m2 0h6M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" />
      </svg>
    ),
  },
];

const journey = [
  {
    step: '01',
    title: 'Choose Your Test',
    detail: 'Browse categories and pick the right test package based on your need.',
  },
  {
    step: '02',
    title: 'Reserve a Slot',
    detail: 'Select date and location, confirm booking, and get instant appointment status.',
  },
  {
    step: '03',
    title: 'Track Results',
    detail: 'View updates and report summaries from your dashboard anytime.',
  },
];

const HomeShowcase = () => {
  return (
    <section className="mediscan-shell py-10 sm:py-14">
      <div className="relative overflow-hidden rounded-[2rem] border border-base-300 bg-base-100 px-5 py-10 shadow-2xl shadow-slate-950/10 sm:px-8 lg:px-10">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-10 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative">
          <div className="max-w-3xl">
            <p className="mediscan-pill">Complete care experience</p>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-base-content sm:text-4xl">
              One platform for diagnostics, appointments, and follow-up confidence.
            </h2>
            <p className="mt-4 text-sm leading-7 text-base-content/75 sm:text-base">
              MediScan is built to reduce friction at every step. From first booking to final report, patients and admins get a reliable flow with visibility, speed, and trust.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {benefits.map((item) => (
              <article key={item.title} className="rounded-3xl border border-base-300 bg-base-200/70 p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-base-content">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-base-content/75">{item.detail}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-base-300 bg-base-100 p-6">
              <h3 className="text-2xl font-black tracking-tight text-base-content">How Your Care Journey Works</h3>
              <div className="mt-6 space-y-4">
                {journey.map((item) => (
                  <div key={item.step} className="flex gap-4 rounded-2xl border border-base-300 bg-base-200/60 p-4">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-black text-primary-content">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="font-bold text-base-content">{item.title}</h4>
                      <p className="mt-1 text-sm text-base-content/70">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-3xl border border-base-300 bg-gradient-to-br from-base-200 to-base-100 p-6">
              <h3 className="text-xl font-black text-base-content">Need help choosing tests?</h3>
              <p className="mt-3 text-sm leading-7 text-base-content/75">
                Explore FAQs, health tips, and symptom support to make a more informed decision before booking.
              </p>
              <div className="mt-6 space-y-3">
                <Link to="/allTestPage" className="btn btn-primary w-full rounded-full">Browse Tests</Link>
                <Link to="/symptomChecker" className="btn btn-outline w-full rounded-full">Use Symptom Checker</Link>
                <Link to="/blogs" className="btn btn-ghost w-full rounded-full">Read Health Tips</Link>
              </div>
              <div className="mt-6 rounded-2xl border border-base-300 bg-base-100 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-base-content/60">Trust indicators</p>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-base-200 px-3 py-2 text-center">
                    <p className="text-lg font-black text-base-content">120+</p>
                    <p className="text-base-content/60">Tests</p>
                  </div>
                  <div className="rounded-xl bg-base-200 px-3 py-2 text-center">
                    <p className="text-lg font-black text-base-content">24/7</p>
                    <p className="text-base-content/60">Support</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeShowcase;
