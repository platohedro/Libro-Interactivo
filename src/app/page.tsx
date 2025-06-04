'use client';

import { useState, useEffect } from 'react';
import Book from '@/components/Book';

export default function Home() {
  // Default book dimensions
  const defaultWidth = 500;
  const defaultHeight = 700;
  
  // State for responsive dimensions
  const [dimensions, setDimensions] = useState({
    width: defaultWidth,
    height: defaultHeight
  });

  // Function to update dimensions based on window size
  const updateDimensions = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 640) { // mobile
        setDimensions({
          width: Math.min(320, width - 30),
          height: Math.min(450, (width - 30) * 1.4)
        });
      } else if (width < 1024) { // tablet
        setDimensions({
          width: 400,
          height: 560
        });
      } else { // desktop
        setDimensions({
          width: defaultWidth,
          height: defaultHeight
        });
      }
    }
  };

  // Set dimensions on first render and window resize
  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-sky-100 to-sky-200">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-8">Mi Aventura Mágica</h1>
      
      <div className="relative w-full flex justify-center">
        <Book width={dimensions.width} height={dimensions.height} />
      </div>

      <footer className="mt-12 text-center text-gray-600">
        <p>© 2025 Libro Infantil Digital Interactivo - Platohedro</p>
      </footer>
    </main>
  );
}
