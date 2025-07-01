import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const uri = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['admin', 'user'], default: 'admin' },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
  }
}

export async function POST(req) {
  await connectDB();
  const { action, name, email, password } = await req.json();
  if (action === 'register') {
    const existing = await User.findOne({ email });
    if (existing) return NextResponse.json({ error: 'Email already registered.' }, { status: 400 });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    return NextResponse.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } else if (action === 'login') {
    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: 'Invalid credentials.' }, { status: 400 });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return NextResponse.json({ error: 'Invalid credentials.' }, { status: 400 });
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    return NextResponse.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } else {
    return NextResponse.json({ error: 'Invalid action.' }, { status: 400 });
  }
} 