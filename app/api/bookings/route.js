import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const uri = process.env.MONGO_URI;

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  service: String,
  date: Date,
  message: String,
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
  }
}

export async function GET() {
  await connectDB();
  const bookings = await Booking.find().sort({ createdAt: -1 });
  return NextResponse.json({ bookings });
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const booking = await Booking.create(data);
  return NextResponse.json({ booking });
} 