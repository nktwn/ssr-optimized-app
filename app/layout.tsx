import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';

const inter = Inter({
    subsets: ['latin', 'cyrillic'],
    display: 'swap',
    weight: ['400', '500', '600', '700'],
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: 'SSR Optimized App',
    description: 'Server-Side Rendered application with optimal performance',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru" className={inter.variable}>
        <body className={`${inter.className} antialiased text-slate-900`}>
        <Header />
        <main className="min-h-[calc(100vh-64px)]">
            {children}
        </main>

        <footer className="mt-16 border-t border-slate-200 bg-white/70 backdrop-blur">
            <div className="container mx-auto px-4 py-10">
                <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
                    <div>
                        <div className="font-semibold">SSR Optimized App</div>
                        <div className="text-sm text-slate-600">
                            Next.js SSR/SSG • Hydration • Core Web Vitals
                        </div>
                    </div>
                    <div className="text-sm text-slate-600">
                        © {new Date().getFullYear()} • Built for performance
                    </div>
                </div>
            </div>
        </footer>
        </body>
        </html>
    );
}
