import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

type Comment = {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
};

export async function generateStaticParams() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        next: { revalidate: 60 },
    });

    const posts: Post[] = await res.json();

    return posts.map((post) => ({
        id: post.id.toString(),
    }));
}

async function getPost(id: string): Promise<Post | null> {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    return res.json();
}

async function getComments(id: string): Promise<Comment[]> {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
        {
            next: { revalidate: 60 },
        }
    );

    if (!res.ok) return [];
    return res.json();
}

export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const post = await getPost(id);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: `${post.title} | SSR Optimized App`,
        description: post.body.substring(0, 160),
    };
}

export default async function PostPage({
                                           params,
                                       }: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const [post, comments] = await Promise.all([getPost(id), getComments(id)]);

    if (!post) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Link
                href="/posts"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
            >
                ← Back to all posts
            </Link>

            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative w-full h-96">
                    <Image
                        src="/images/hero.jpg"
                        alt={post.title}
                        fill
                        priority
                        sizes="(max-width: 1200px) 100vw, 1200px"
                        className="object-cover"
                    />
                </div>

                <div className="p-8">
                    <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

                    <div className="flex items-center text-gray-600 mb-6">
                        <span>Post ID: {post.id}</span>
                        <span className="mx-2">•</span>
                        <span>User ID: {post.userId}</span>
                    </div>

                    <div className="prose max-w-none mb-8">
                        <p className="text-lg leading-relaxed">{post.body}</p>
                    </div>
                </div>
            </article>

            <section className="mt-12">
                <h2 className="text-3xl font-bold mb-6">
                    Comments ({comments.length})
                </h2>

                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div key={comment.id} className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-start mb-2">
                                <div className="flex-shrink-0 mr-4">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                        {comment.name.charAt(0).toUpperCase()}
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg">{comment.name}</h3>
                                    <p className="text-sm text-gray-600">{comment.email}</p>
                                </div>
                            </div>

                            <p className="text-gray-700 mt-2">{comment.body}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
