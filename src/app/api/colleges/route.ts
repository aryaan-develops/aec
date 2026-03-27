import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { College } from '@/models';

export async function GET() {
    try {
        await dbConnect();
        const res = await College.find({}).sort({ createdAt: -1 });
        return NextResponse.json(res);
    } catch (err) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const res = await College.create(body);
        return NextResponse.json(res);
    } catch (err) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        await dbConnect();
        const id = new URL(req.url).searchParams.get('id');
        await College.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
