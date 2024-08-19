'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';

import Header from '@/components/header/Header';
import Menus from '@/components/menus/Menus';
import Features from '@/components/features/Features';
import NewsLetter from '@/components/newsletter/NewsLetter';

const Offer = dynamic(() => import('@/components/offer/Offer'));

const HomeClient = () => {
  const containerRef = useRef<HTMLDivElement>(undefined);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(containerRef?.current);
          containerRef?.current?.onload;
        }
      });
    });

    if (containerRef?.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef?.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [containerRef]);

  return (
    <div ref={containerRef}>
      <Header />
      <Features />
      <Menus />
      <Offer />
      <NewsLetter />
    </div>
  );
};

export default HomeClient;
