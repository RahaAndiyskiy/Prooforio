import { NextResponse } from 'next/server';
import sharp from 'sharp';
import { generateReviewImage } from '@/features/share-review/export/generateReviewImage';
import type { ReviewExportRequest } from '@/features/share-review/export/types';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const body = (await request.json()) as ReviewExportRequest;

  if (!body || !body.author || !body.text || !body.profileName) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  try {
    const format = body.format === 'jpeg' ? 'jpeg' : 'png';
    const presetId = body.presetId ?? body.templateId ?? 'minimal';
    const png = await generateReviewImage(
      {
        author: body.author,
        text: body.text,
        rating: Number(body.rating ?? 0),
        createdAt: body.createdAt,
        profileName: body.profileName,
      },
      presetId
    );

    const output =
      format === 'jpeg'
        ? await sharp(Buffer.from(png)).flatten({ background: '#ffffff' }).jpeg({ quality: 92 }).toBuffer()
        : Buffer.from(png);

    return new NextResponse(output, {
      headers: {
        'Content-Type': format === 'jpeg' ? 'image/jpeg' : 'image/png',
        'Content-Disposition': `attachment; filename=prooforio-review.${format === 'jpeg' ? 'jpg' : 'png'}`,
      },
    });
  } catch (error) {
    console.error('Review export error:', error);
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}
