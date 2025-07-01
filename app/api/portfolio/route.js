import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const uri = process.env.MONGO_URI;

const portfolioSchema = new mongoose.Schema({
  title: String,
  description: String,
  images: [String],
  category: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', portfolioSchema);

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
  }
}

export async function GET() {
  await connectDB();
  const portfolios = await Portfolio.find().sort({ createdAt: -1 });
  return NextResponse.json({ portfolios });
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const portfolio = await Portfolio.create(data);
  return NextResponse.json({ portfolio });
} 