import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SKYKIN Technologies - Empowering Digital Transformation Globally',
  description: 'SKYKIN Technologies delivers transformative digital solutions across telecommunications, finance, healthcare, and agriculture. Building scalable infrastructure and intelligent software for the digital age.',
  keywords: 'digital transformation, IT consulting, telecommunications, fintech, healthcare technology, agriculture technology, web development, mobile apps, enterprise solutions',
  authors: [{ name: 'SKYKIN Technologies' }],
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/images/sky.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-white text-gray-900`}>
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}