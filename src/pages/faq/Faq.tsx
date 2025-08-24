import { useState, useMemo } from 'react';
import { Search, HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const faqs = [
    {
      id: "1",
      question: "How do I request a ride?",
      answer: "Simply open the app, enter your pickup and destination locations, and tap 'Request Ride'. Available drivers nearby will see your request and can accept it."
    },
    {
      id: "2",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, PayPal, Apple Pay, Google Pay, and our proprietary digital wallet. You can add multiple payment methods in your account settings."
    },
    {
      id: "3",
      question: "How are fares calculated?",
      answer: "Fares are calculated based on base fare, distance traveled, time duration, and current demand. You'll always see the estimated fare before confirming your ride."
    },
    {
      id: "4",
      question: "Can I schedule a ride in advance?",
      answer: "Yes, you can schedule rides up to 30 days in advance. Use the 'Schedule' feature in the app to set your pickup time and date."
    },
    {
      id: "5",
      question: "How do I become a driver?",
      answer: "To become a driver, download the driver app, complete the registration form, submit required documents (license, insurance, vehicle registration), and pass a background check."
    },
    {
      id: "6",
      question: "What if I leave something in the car?",
      answer: "Use the 'Contact Driver' feature in your ride history to message the driver directly. If unsuccessful, contact our support team with details about your ride and lost item."
    },
    {
      id: "7",
      question: "How do driver ratings work?",
      answer: "After each ride, both riders and drivers can rate each other from 1 to 5 stars. Drivers must maintain an average rating above 4.6 to remain active on the platform."
    },
    {
      id: "8",
      question: "Is there a cancellation fee?",
      answer: "If you cancel more than 2 minutes after requesting a ride, you may be charged a cancellation fee. Drivers can also cancel without penalty if the rider isn't at the pickup location within 5 minutes."
    },
    {
      id: "9",
      question: "How do I report an issue with my ride?",
      answer: "Go to 'Ride History', select the relevant ride, and tap 'Help'. You can report issues through the app or contact our 24/7 support team directly."
    },
    {
      id: "10",
      question: "Are there any safety features?",
      answer: "Yes, we offer GPS tracking, in-app emergency button, driver background checks, real-time ride sharing with trusted contacts, and anonymized phone numbers for communication."
    }
  ];

  const filteredFaqs = useMemo(() => {
    if (!searchTerm) return faqs;
    
    const term = searchTerm.toLowerCase();
    return faqs.filter(faq => 
      faq.question.toLowerCase().includes(term) || 
      faq.answer.toLowerCase().includes(term)
    );
  }, [searchTerm, faqs]);

  return (
    <div className="min-h-screen">
      <div className="max-w-[1300px] mx-auto px-4 pb-20 pt-28 md:pb-32 md:pt-40">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <HelpCircle className="h-12 w-12 text-[#004AAD]" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
            Find answers to common questions about our ride-sharing service
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-10">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search questions..."
              className="block w-full pl-10 pr-3 py-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#004AAD] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq) => (
                <AccordionItem 
                  key={faq.id} 
                  value={faq.id} 
                  className="border-b border-gray-200 dark:border-gray-700 py-4"
                >
                  <AccordionTrigger className="py-2 text-left text-lg font-medium text-gray-900 dark:text-white hover:no-underline hover:text-[#004AAD] dark:hover:text-blue-400 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-300 pb-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-500 dark:text-gray-400">
                No questions found matching "{searchTerm}"
              </div>
              <button
                className="mt-4 text-[#004AAD] hover:text-blue-700 dark:hover:text-blue-400 font-medium"
                onClick={() => setSearchTerm('')}
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Our support team is available 24/7 to help you
          </p>
          <div className="inline-flex rounded-md shadow">
            <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#004AAD] hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;