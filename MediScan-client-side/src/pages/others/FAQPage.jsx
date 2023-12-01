import React from 'react';
import SectionTitle from '../shared/SectionTitle';

const faqData = [
    {
      question: "How do I book an appointment for a medical test?",
      answer: "You can easily book an appointment by logging into your account, navigating to the 'All Tests' page, selecting the desired test, and clicking on the 'Book Now' button. Follow the on-screen instructions to complete the booking process.",
    },
    {
      question: "Can I view my upcoming appointments?",
      answer: "Yes, once you log in, you can go to your user dashboard and click on 'My Upcoming Appointments.' Here, you will find a list of all the appointments you have booked, along with key details such as the test name, date, and time.",
    },
    {
      question: "How can I check my test results?",
      answer: "To view your test results, go to your user dashboard and click on the 'Test Results' section. Here, you can access and download your delivered test reports for your records.",
    },
    {
      question: "What information is available on the 'All Tests' page?",
      answer: "The 'All Tests' page displays a comprehensive list of available tests, including images, available dates, available slots, titles, and short descriptions. You can use the search feature to filter tests by date.",
    },
    {
      question: "How can I edit my profile information?",
      answer: "In your user dashboard, navigate to the 'My Profile' section. Here, you can view your profile details and make any necessary edits to your information.",
    },
    {
      question: "How do I contact customer support?",
      answer: "For any assistance or queries, please reach out to our customer support team through the 'Contact Us' page. We are here to help you with any concerns or issues.",
    },
    
  ];
  

  

const FAQPage = () => {
  return (
    <div className="space-y-4 m-10 mt-20">
        <SectionTitle heading="Frequently Asked Questions" />

      {faqData.map((faq, index) => (
        <details
          key={index}
          className="group rounded-lg bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
            <h2 className="font-medium">{faq.question}</h2>
            <span className="relative h-5 w-5 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </summary>
          <p className="mt-4 leading-relaxed text-gray-700">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
};

export default FAQPage;
