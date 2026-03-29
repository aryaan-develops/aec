import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Review } from '@/models';

export async function GET() {
    try {
        await dbConnect();
        const reviews = await Review.find({}).sort({ createdAt: -1 });
        return NextResponse.json(reviews);
    } catch (err) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const res = await Review.create(body);
        return NextResponse.json(res);
    } catch (err) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        await dbConnect();
        const id = new URL(req.url).searchParams.get('id');
        await Review.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const { id, ...updateData } = body;
        const res = await Review.findByIdAndUpdate(id, updateData, { new: true });
        return NextResponse.json(res);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
    }
}
