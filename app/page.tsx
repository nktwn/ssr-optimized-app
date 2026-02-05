import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 60;

async function getPosts() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=9', {
        next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
}

export default async function Home() {
    const posts = await getPosts();

    return (
        <div className="container mx-auto px-4 py-10">
            {/* Hero */}
            <section className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs text-slate-700">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        SSR + SSG + Performance
                    </div>

                    <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
                        Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">SSR Optimized App</span>
                    </h1>

                    <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                        Server-side rendering, optimized images/fonts, and Core Web Vitals focused UI.
                    </p>

                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <Link
                            href="/posts"
                            className="no-underline inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-white font-semibold hover:bg-slate-800 transition"
                        >
                            Browse posts
                        </Link>
                        <Link
                            href="/posts/1"
                            className="no-underline inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 font-semibold text-slate-900 border border-slate-200 hover:bg-slate-50 transition"
                        >
                            Open example post
                        </Link>
                    </div>

                    <div className="mt-8 grid grid-cols-3 gap-3">
                        {[
                            ['LCP', 'Fast hero'],
                            ['CLS', 'Stable layout'],
                            ['SEO', 'SSR/SSG'],
                        ].map(([k, v]) => (
                            <div key={k} className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3">
                                <div className="text-sm font-semibold">{k}</div>
                                <div className="text-xs text-slate-600">{v}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-indigo-500/15 to-fuchsia-500/10 blur-2xl" />
                    <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
                        <div className="relative h-[360px]">
                            <Image
                                src="/images/hero.jpg"
                                alt="Hero"
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="p-5">
                            <div className="font-semibold">Optimized hero image</div>
                            <div className="text-sm text-slate-600">
                                Next/Image + fixed container height to prevent CLS.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Posts */}
            <section className="mt-12">
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold">Latest Posts</h2>
                        <p className="text-slate-600 mt-1">Rendered on server, updated with ISR.</p>
                    </div>
                    <Link
                        href="/posts"
                        className="hidden sm:inline-flex no-underline items-center rounded-2xl border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-900 hover:bg-slate-50 transition"
                    >
                        View all →
                    </Link>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post: any, index: number) => (
                        <article
                            key={post.id}
                            className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white/80 backdrop-blur shadow-sm hover:shadow-md transition"
                        >
                            <div className="relative h-44">
                                <Image
                                    src="/images/post.jpg"
                                    alt={post.title}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 33vw"
                                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                    priority={index < 2}
                                    loading={index < 2 ? 'eager' : 'lazy'}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />
                                <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900">
                                    Post #{post.id}
                                </div>
                            </div>

                            <div className="p-5">
                                <h3 className="text-lg font-semibold leading-snug line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                                    {post.body}
                                </p>

                                <div className="mt-4">
                                    <Link
                                        href={`/posts/${post.id}`}
                                        className="no-underline inline-flex items-center gap-2 font-semibold text-indigo-700 hover:text-indigo-900 transition"
                                    >
                                        Read more <span className="transition-transform group-hover:translate-x-0.5">→</span>
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-8 sm:hidden">
                    <Link
                        href="/posts"
                        className="no-underline inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-white font-semibold hover:bg-slate-800 transition"
                    >
                        View all posts
                    </Link>
                </div>
            </section>
        </div>
    );
}
