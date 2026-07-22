'use client';

import BreadcrumbProvider from '@/components/BreadcrumbProvider';
import LinkButton from '@/components/LinkButton';
import Layout from '@/components/ui/Layout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, HelpCircle, Mail, MessageSquare, Receipt } from 'lucide-react';
import Link from 'next/link';

const faqs = [
  {
    question: 'How do I change or cancel a booking?',
    answer:
      'Open My Bookings, find a confirmed trip, and use Cancel booking. Eligible payments are refunded to your original payment method.',
  },
  {
    question: 'When will I receive a refund?',
    answer:
      'Stripe usually returns funds in 5–10 business days, depending on your bank. You will see the booking marked Cancelled immediately.',
  },
  {
    question: 'How do wishlists work?',
    answer:
      'Tap the heart on a stay, car, or experience to save it. Your saved places live under Wishlists in your account menu.',
  },
  {
    question: 'Can I leave a review?',
    answer:
      'Yes. After you book a listing, open the product page and use Add a review. Hosts see reviews on their profile.',
  },
];

const topics = [
  {
    title: 'Bookings & refunds',
    description: 'View trips, cancel confirmed bookings, and track refunds.',
    href: '/my-bookings',
    icon: Receipt,
  },
  {
    title: 'Messages',
    description: 'Reach hosts and other travelers about an upcoming trip.',
    href: '/messages',
    icon: MessageSquare,
  },
  {
    title: 'Account help',
    description: 'Update profile details, security, and notification preferences.',
    href: '/account-settings',
    icon: HelpCircle,
  },
];

const SupportPage = () => {
  return (
    <>
      <Separator className='dark:bg-dark_russian mb-4 bg-[#E6E8EC]' />

      <Layout className='lg:px-20 px-8 pb-24'>
        <div className='flex justify-between pb-12'>
          <LinkButton href='/' label='Go Home'>
            <ChevronLeft className='h-5 w-5 mr-2' />
          </LinkButton>
          <BreadcrumbProvider backRoute='/' originRoute='support' />
        </div>

        <div className='max-w-3xl'>
          <h1 className='text-4xl sm:text-5xl font-bold mb-3'>Support</h1>
          <p className='text-gray_text font-poppins text-base sm:text-lg'>
            Answers for bookings, payments, and your account — plus ways to get help when you need a person.
          </p>
        </div>

        <div className='grid md:grid-cols-3 gap-6 mt-12'>
          {topics.map((topic) => (
            <Link
              key={topic.href}
              href={topic.href}
              className='rounded-3xl border dark:border-gray_border p-6 hover:border-blue transition-colors group'
            >
              <topic.icon className='w-6 h-6 text-blue mb-4' />
              <h2 className='font-bold text-lg mb-2 group-hover:text-blue transition-colors'>{topic.title}</h2>
              <p className='text-sm text-gray_text'>{topic.description}</p>
            </Link>
          ))}
        </div>

        <section className='mt-16 max-w-3xl'>
          <h2 className='text-2xl font-bold mb-6'>Frequently asked questions</h2>
          <div className='flex flex-col gap-4'>
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className='rounded-2xl border dark:border-gray_border p-5 group open:bg-[#F4F5F6] dark:open:bg-dark_russian'
              >
                <summary className='font-semibold cursor-pointer list-none flex justify-between gap-4'>
                  {faq.question}
                  <span className='text-gray_text group-open:rotate-45 transition-transform text-xl leading-none'>
                    +
                  </span>
                </summary>
                <p className='text-sm text-gray_text mt-3 leading-relaxed'>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className='mt-16 rounded-3xl border dark:border-gray_border p-8 sm:p-10 max-w-3xl'>
          <div className='flex items-start gap-4'>
            <Mail className='w-6 h-6 text-blue shrink-0 mt-1' />
            <div>
              <h2 className='text-2xl font-bold mb-2'>Still need help?</h2>
              <p className='text-gray_text text-sm mb-6'>
                Email us and include your booking reference if you have one. We typically reply within one business day.
              </p>
              <Button asChild className='rounded-full bg-blue hover:bg-blue-hover text-white font-bold'>
                <a href='mailto:support@roamerradar.com'>Email support@roamerradar.com</a>
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default SupportPage;
