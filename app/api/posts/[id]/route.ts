import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const res = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${params.id}`,
            { next: { revalidate: 60 } }
        );

        if (!res.ok) {
            return NextResponse.json(
                { error: 'Post not found' },
                { status: 404 }
            );
        }

        const post = await res.json();

        return NextResponse.json({
            success: true,
            data: post,
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}