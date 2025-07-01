import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const uri = process.env.MONGO_URI;

const contentSchema = new mongoose.Schema({
  section: String,
  title: String,
  body: String,
  images: [String],
  updatedAt: { type: Date, default: Date.now },
});

const Content = mongoose.models.Content || mongoose.model('Content', contentSchema);

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
  }
}

export async function GET() {
  await connectDB();
  const contents = await Content.find().sort({ updatedAt: -1 });
  return NextResponse.json({ contents });
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const content = await Content.create(data);
  return NextResponse.json({ content });
} 