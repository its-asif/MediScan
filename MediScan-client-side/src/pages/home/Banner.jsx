import React from 'react';
import { Link } from 'react-router-dom';
import useActiveBanner from '../../hooks/useActiveBanner';

const Banner = () => {
    const banner = useActiveBanner();
    const activeBanner = banner[0]?.[0];

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
            backgroundImage: `url(${activeBanner?.image || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80'})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-base-100/95 via-base-100/75 to-base-100/15" />
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />

      <div className="mediscan-shell relative py-16 sm:py-20 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8 text-center lg:text-left">
            <span className="mediscan-pill justify-center lg:justify-start">Trusted diagnostic care</span>
            <div className="space-y-5">
              <h1 className="max-w-3xl text-4xl font-black leading-tight text-base-content sm:text-5xl lg:text-7xl">
                {activeBanner?.title || 'Modern diagnostic care for every patient.'}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-base-content/75 sm:text-lg">
                {activeBanner?.text || 'Book tests, track reports, and manage appointments with a calmer, cleaner experience.'}
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Link
                to={'/allTestPage'}
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-wide text-primary-content shadow-xl shadow-primary/20 transition hover:bg-primary-focus"
              >
                Explore Tests
              </Link>
              <Link
                to={'/faq'}
                className="inline-flex items-center justify-center rounded-full border border-base-300 bg-base-100/70 px-8 py-4 text-sm font-semibold uppercase tracking-wide text-base-content transition hover:bg-base-200"
              >
                Learn More
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ['24/7', 'support'],
                ['120+', 'tests'],
                ['Fast', 'reports'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-3xl border border-base-300 bg-base-100/80 px-5 py-4 text-left backdrop-blur-xl">
                  <p className="text-2xl font-black text-base-content">{value}</p>
                  <p className="text-xs uppercase tracking-[0.24em] text-base-content/60">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="mediscan-section p-5 text-base-content shadow-2xl shadow-slate-950/10 lg:p-6">
              <div className="rounded-[1.5rem] bg-base-100 p-6 backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Today&apos;s focus</p>
                <h2 className="mt-3 text-2xl font-bold">Fast booking. Clear results. Better care.</h2>
                <p className="mt-4 text-sm leading-7 text-base-content/75">
                  Manage your journey from booking to report delivery with a streamlined dashboard built for patients and staff.
                </p>
                <div className="mt-6 grid gap-3">
                  {['Book an appointment', 'Track pending reports', 'Review active tests'].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl border border-base-300 bg-base-200 px-4 py-3 text-sm text-base-content">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-content font-bold">✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
