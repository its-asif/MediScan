import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../shared/SectionTitle';
import Swal from 'sweetalert2';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', formData);
    setFormData({
      name: '',
      email: '',
      feedback: '',
    });
    Swal.fire({
      icon: 'success',
      title: 'Feedback Submitted!',
      text: 'Thank you for your feedback!',
    });
  };

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <Helmet>
        <title>MediScan | Send Feedback</title>
      </Helmet>

      <SectionTitle
        heading="Send Feedback"
        subHeading="We'd love to hear from you! Share your thoughts and suggestions."
      />

      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-1  gap-8">
          <div className="mx-auto w-full max-w-3xl rounded-[1.75rem] border border-base-300 bg-base-100 p-8 shadow-xl">
            <h2 className="mb-4 text-3xl font-bold text-base-content">Feedback Form</h2>
            <p className="mb-4 text-base-content/75">
              We value your feedback! Share your thoughts, suggestions, or any comments you have about our services.
            </p>

            {/* Feedback Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-base-content/75">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-base-content/75">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="feedback" className="mb-2 block text-sm font-medium text-base-content/75">Your Feedback</label>
                <textarea
                  id="feedback"
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  rows="6"
                  className="textarea textarea-bordered w-full"
                  required
                ></textarea>
              </div>

              <div>
                <button type="submit" className="btn btn-primary">Submit Feedback</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
