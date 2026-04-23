import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const DEFAULT_FOLDER = 'events';

const buildSignature = (params: Record<string, string>, apiSecret: string) => {
  const paramsString = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return createHash('sha1').update(`${paramsString}${apiSecret}`).digest('hex');
};

export async function POST(request: Request) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { message: 'Cloudinary environment variables are missing.' },
      { status: 500 },
    );
  }

  let folder = process.env.CLOUDINARY_UPLOAD_FOLDER ?? DEFAULT_FOLDER;

  try {
    const payload = (await request.json()) as { folder?: string };
    if (payload?.folder && payload.folder.trim().length > 0) {
      folder = payload.folder.trim();
    }
  } catch {
    // Keep default folder when request has no JSON body.
  }

  const timestamp = String(Math.floor(Date.now() / 1000));
  const signature = buildSignature({ folder, timestamp }, apiSecret);

  return NextResponse.json({
    cloudName,
    apiKey,
    folder,
    timestamp,
    signature,
  });
}
