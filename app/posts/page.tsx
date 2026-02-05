import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-static';

async function getAllPosts() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        cache: 'force-cache',
    });
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
}

export async function generateMetadata() {
    return {
        title: 'All Posts | SSR Optimized App',
        description: 'Browse all posts in our SSR optimized application',
    };
}

export default async function PostsPage() {
    const posts = await getAllPosts();

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="rounded-[28px] border border-slate-200 bg-white/80 backdrop-blur p-8 shadow-sm">
                <h1 className="text-3xl md:text-4xl font-bold">All Posts</h1>
                <p className="mt-2 text-slate-600">
                    This page is statically generated (SSG) for maximum performance.
                </p>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {posts.map((post: any) => (
                    <article
                        key={post.id}
                        className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white/80 backdrop-blur shadow-sm hover:shadow-md transition"
                    >
                        <div className="relative h-36">
                            <Image
                                src="/images/post.jpg"
                                alt={post.title}
                                fill
                                sizes="(max-width: 1280px) 50vw, 25vw"
                                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />
                            <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900">
                                Post #{post.id}
                            </div>
                        </div>

                        <div className="p-4">
                            <h2 className="text-sm font-semibold leading-snug line-clamp-2">
                                {post.title}
                            </h2>
                            <p className="mt-2 text-xs text-slate-600 line-clamp-3">
                                {post.body}
                            </p>

                            <Link
                                href={`/posts/${post.id}`}
                                className="mt-3 inline-flex no-underline items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-900 transition"
                            >
                                Read more <span className="transition-transform group-hover:translate-x-0.5">→</span>
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
