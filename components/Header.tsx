'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';

const nav = [
    { href: '/', label: 'Home' },
    { href: '/posts', label: 'Posts' },
    { href: '/about', label: 'About' },
];

export default function Header() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const isActive = useMemo(
        () => (href: string) => (href === '/' ? pathname === '/' : pathname?.startsWith(href)),
        [pathname]
    );

    return (
        <header className="sticky top-0 z-50">
            <div className="bg-white/70 backdrop-blur border-b border-slate-200">
                <div className="container mx-auto px-4">
                    <div className="h-16 flex items-center justify-between gap-4">
                        <Link href="/" className="flex items-center gap-2 no-underline">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white font-bold shadow-sm">
                S
              </span>
                            <div className="leading-tight">
                                <div className="font-semibold text-slate-900">SSR App</div>
                                <div className="text-xs text-slate-500 -mt-0.5">Next.js • SSR/SSG</div>
                            </div>
                        </Link>

                        {/* Desktop */}
                        <nav className="hidden md:flex items-center gap-1">
                            {nav.map((item) => {
                                const active = isActive(item.href);
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={[
                                            'px-3 py-2 rounded-xl text-sm font-medium no-underline transition',
                                            active
                                                ? 'bg-slate-900 text-white'
                                                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
                                        ].join(' ')}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Mobile */}
                        <button
                            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition"
                            onClick={() => setOpen((v) => !v)}
                            aria-label="Toggle menu"
                            aria-expanded={open}
                        >
                            <span className="text-slate-900 text-lg">{open ? '✕' : '☰'}</span>
                        </button>
                    </div>

                    {open && (
                        <div className="md:hidden pb-4 absolute left-0 right-0 top-16 bg-white/90 backdrop-blur border-b border-slate-200">
                            <div className="container mx-auto px-4 py-4">
                                <div className="grid gap-2">
                                    {nav.map((item) => {
                                        const active = isActive(item.href);
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setOpen(false)}
                                                className={[
                                                    'px-3 py-3 rounded-xl text-sm font-medium no-underline transition border',
                                                    active
                                                        ? 'bg-slate-900 text-white border-slate-900'
                                                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50',
                                                ].join(' ')}
                                            >
                                                {item.label}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
