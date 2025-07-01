import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const uri = process.env.MONGO_URI;

const testimonialSchema = new mongoose.Schema({
  name: String,
  content: String,
  image: String,
  rating: { type: Number, min: 1, max: 5, default: 5 },
  createdAt: { type: Date, default: Date.now },
});

const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
  }
}

export async function GET() {
  await connectDB();
  const testimonials = await Testimonial.find().sort({ createdAt: -1 });
  return NextResponse.json({ testimonials });
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const testimonial = await Testimonial.create(data);
  return NextResponse.json({ testimonial });
} 