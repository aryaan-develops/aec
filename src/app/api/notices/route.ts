import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Notice } from '@/models';

export async function GET() {
    try {
        await dbConnect();
        const notices = await Notice.find({}).sort({ createdAt: -1 });
        return NextResponse.json(notices);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const notice = await Notice.create(body);
        return NextResponse.json(notice);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        await dbConnect();
        const id = new URL(req.url).searchParams.get('id');
        await Notice.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const { id, ...updateData } = body;
        const res = await Notice.findByIdAndUpdate(id, updateData, { new: true });
        return NextResponse.json(res);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
    }
}
