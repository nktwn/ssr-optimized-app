export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-10">
            <div className="rounded-[28px] border border-slate-200 bg-white/80 backdrop-blur p-8 shadow-sm">
                <h1 className="text-3xl md:text-4xl font-bold">About</h1>
                <p className="mt-2 text-slate-600">
                    Demo app for SSR/SSG, hydration, API routes and Core Web Vitals optimization.
                </p>
            </div>
        </div>
    );
}
