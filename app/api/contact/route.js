import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const uri = process.env.MONGO_URI;

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  service: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
  }
}

export async function GET() {
  await connectDB();
  const contacts = await Contact.find().sort({ timestamp: -1 });
  return NextResponse.json({ contacts });
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const contact = await Contact.create(data);
  return NextResponse.json({ contact });
} 