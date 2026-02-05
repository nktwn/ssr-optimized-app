import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = searchParams.get('limit') || '10';

        const res = await fetch(
            `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`,
            {
                next: { revalidate: 60 },
            }
        );

        if (!res.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch posts' },
                { status: res.status }
            );
        }

        const posts = await res.json();

        return NextResponse.json({
            success: true,
            data: posts,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body.title || !body.body) {
            return NextResponse.json(
                { error: 'Title and body are required' },
                { status: 400 }
            );
        }

        const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();

        return NextResponse.json({
            success: true,
            data,
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}