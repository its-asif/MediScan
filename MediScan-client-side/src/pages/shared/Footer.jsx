import React from 'react';

const Footer = () => {
    return (
        <footer className="mt-16 border-t border-base-300 bg-base-200 text-base-content">
            <div className="mediscan-shell py-14">
                <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr_0.8fr]">
                    <div className="space-y-5">
                        <div className="inline-flex items-center gap-3 rounded-full border border-base-300 bg-base-100 px-4 py-2">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-primary-content font-black">M</span>
                            <div>
                                <p className="text-xs uppercase tracking-[0.24em] text-primary">MediScan</p>
                                <p className="text-sm text-base-content/70">Diagnostic center management</p>
                            </div>
                        </div>
                        <p className="max-w-xl text-sm leading-7 text-base-content/70">
                            Simplifying appointments, test management, and patient records with a clearer experience for users and administrators.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Services</h3>
                        <ul className="mt-4 space-y-3 text-sm text-base-content/70">
                            <li>Appointments & reservations</li>
                            <li>Test reports and delivery</li>
                            <li>Admin dashboard workflows</li>
                            <li>Health tips and symptom checker</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Connect</h3>
                        <div className="mt-4 flex items-center gap-4 text-base-content/70">
                            <a className="rounded-full border border-base-300 bg-base-100 p-3 hover:bg-base-300" href="#" aria-label="Facebook">F</a>
                            <a className="rounded-full border border-base-300 bg-base-100 p-3 hover:bg-base-300" href="#" aria-label="YouTube">Y</a>
                            <a className="rounded-full border border-base-300 bg-base-100 p-3 hover:bg-base-300" href="#" aria-label="LinkedIn">in</a>
                        </div>
                        <p className="mt-6 text-sm text-base-content/60">Providing reliable diagnostic center support since 2002.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;