import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';
import { Readable } from 'stream';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uri = process.env.MONGO_URI;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imageSchema = new mongoose.Schema({
  url: String,
  public_id: String,
  alt: String,
  uploadedBy: String,
  createdAt: { type: Date, default: Date.now },
});

const Image = mongoose.models.Image || mongoose.model('Image', imageSchema);

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
  }
}

export async function GET() {
  await connectDB();
  const images = await Image.find().sort({ createdAt: -1 });
  return NextResponse.json({ images });
}

export async function POST(req) {
  await connectDB();
  const form = new formidable.IncomingForm();
  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        resolve(NextResponse.json({ error: 'Form parse error' }, { status: 400 }));
        return;
      }
      const file = files.file;
      if (!file) {
        resolve(NextResponse.json({ error: 'No file uploaded' }, { status: 400 }));
        return;
      }
      const stream = Readable.from(file.filepath ? require('fs').createReadStream(file.filepath) : file);
      try {
        const uploadResult = await new Promise((res, rej) => {
          const upload = cloudinary.uploader.upload_stream((error, result) => {
            if (error) return rej(error);
            res(result);
          });
          stream.pipe(upload);
        });
        const image = await Image.create({
          url: uploadResult.secure_url,
          public_id: uploadResult.public_id,
          alt: fields.alt || '',
          uploadedBy: fields.uploadedBy || '',
        });
        resolve(NextResponse.json({ image }));
      } catch (e) {
        resolve(NextResponse.json({ error: 'Cloudinary upload failed' }, { status: 500 }));
      }
    });
  });
} 