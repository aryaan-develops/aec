import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Counsellor } from '@/models';

export async function GET() {
    await dbConnect();
    const data = await Counsellor.find({}).sort({ createdAt: -1 });
    return NextResponse.json(data);
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const data = await Counsellor.create(body);
        return NextResponse.json(data);
    } catch (e) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        await dbConnect();
        const { id, ...data } = await req.json();
        const updated = await Counsellor.findByIdAndUpdate(id, data, { new: true });
        return NextResponse.json(updated);
    } catch (e) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        await Counsellor.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
 
