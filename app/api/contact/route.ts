/* app/api/contact/route.ts */

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Validation schema for contact form
const contactSchema = z.object({
  name: z.string()
    .min(2, 'Ad en az 2 karakter olmalı')
    .max(100, 'Ad en fazla 100 karakter olabilir')
    .regex(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'Ad sadece harf içerebilir'),
  phone: z.string()
    .regex(/^[0-9]{10,11}$/, 'Geçerli bir telefon numarası girin (10-11 rakam)'),
  note: z.string()
    .min(10, 'Mesaj en az 10 karakter olmalı')
    .max(1000, 'Mesaj en fazla 1000 karakter olabilir'),
  propertyTitle: z.string().optional(),
  propertyLocation: z.string().optional(),
  propertyLink: z.string().url('Geçerli bir URL girin').optional().or(z.literal('')),
});

// Upstash Redis rate limiting (serverless-compatible)
// Falls back gracefully if Upstash is not configured
let ratelimit: Ratelimit | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, '1 h'), // 3 requests per hour
    analytics: true,
    prefix: 'fbm-contact',
  });
}

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 'anonymous';

    // Check rate limit if Upstash is configured
    if (ratelimit) {
      try {
        const { success, limit, remaining, reset } = await ratelimit.limit(ip);

        if (!success) {
          return NextResponse.json(
            {
              success: false,
              message: 'Çok fazla istek gönderdiniz. Lütfen daha sonra tekrar deneyin.',
              resetAt: new Date(reset).toISOString()
            },
            {
              status: 429,
              headers: {
                'X-RateLimit-Limit': limit.toString(),
                'X-RateLimit-Remaining': remaining.toString(),
                'X-RateLimit-Reset': reset.toString(),
              }
            }
          );
        }
      } catch (rateLimitError) {
        console.warn('Rate limit kontrolü yapılamadı (Upstash hatası), işleme devam ediliyor:', rateLimitError);
        // Fail open: Redis hatası varsa kullanıcıyı engelleme, devam et.
      }
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((err: z.ZodIssue) => ({
        field: err.path[0]?.toString() || 'unknown',
        message: err.message
      }));

      return NextResponse.json(
        {
          success: false,
          message: 'Lütfen form alanlarını kontrol edin.',
          errors
        },
        { status: 400 }
      );
    }

    const { name, phone, note, propertyTitle, propertyLocation, propertyLink } = validationResult.data;

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
    // Verify connection configuration
    try {
      await transporter.verify();
      console.log('Nodemailer connection verified');
    } catch (verifyError) {
      console.error('Nodemailer connection failed:', verifyError);
      return NextResponse.json(
        { success: false, message: 'Mail sunucusu bağlantı hatası. Lütfen daha sonra deneyin.' },
        { status: 500 }
      );
    }

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'frhicmimar@gmail.com',
      subject: `🏠 YENİ MÜŞTERİ: ${propertyTitle || 'Genel Bilgi Talebi'}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px 20px; background-color: #f0f2f5;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background-color: #141e2e; padding: 40px 20px; text-align: center; border-bottom: 4px solid #bc9648;">
               <h1 style="color: #bc9648; margin: 0; font-family: 'Times New Roman', serif; font-size: 32px; letter-spacing: 4px; font-weight: bold;">FRH</h1>
               <p style="color: #ffffff; margin: 8px 0 0; font-size: 10px; letter-spacing: 4px; text-transform: uppercase; opacity: 0.8;">Gayrimenkul ve Tasarım</p>
            </div>

            <div style="padding: 40px 30px;">
              <h2 style="color: #141e2e; margin-top: 0; font-size: 22px; text-align: center; margin-bottom: 30px;">Yeni Müşteri Talebi</h2>
              
              ${propertyTitle ? `
              <div style="background-color: #f8f9fa; border: 1px solid #e1e4e8; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 5px 0; color: #666; font-size: 14px;">İlan Başlığı:</td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 15px; color: #141e2e; font-weight: bold; font-size: 16px;">${propertyTitle}</td>
                  </tr>
                  ${propertyLocation ? `
                  <tr>
                    <td style="padding: 5px 0; color: #666; font-size: 14px;">Konum:</td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 15px; color: #141e2e; font-weight: bold; font-size: 16px;">${propertyLocation}</td>
                  </tr>
                  ` : ''}
                  ${propertyLink ? `
                  <tr>
                    <td style="padding-top: 10px;">
                       <a href="${propertyLink}" style="background-color: #bc9648; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: block; text-align: center; font-weight: bold; text-transform: uppercase; font-size: 14px; letter-spacing: 1px;">İlanı Görüntüle</a>
                    </td>
                  </tr>
                  ` : ''}
                </table>
              </div>
              ` : ''}

              <div style="border-top: 1px solid #eee; padding-top: 20px;">
                <h3 style="color: #bc9648; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;">Müşteri Bilgileri</h3>
                
                <p style="margin: 10px 0;">
                  <strong style="color: #666; display: inline-block; width: 80px;">Ad Soyad:</strong>
                  <span style="color: #141e2e; font-weight: 500;">${name}</span>
                </p>
                <p style="margin: 10px 0;">
                  <strong style="color: #666; display: inline-block; width: 80px;">Telefon:</strong>
                  <a href="tel:${phone}" style="color: #bc9648; font-weight: bold; text-decoration: none;">${phone}</a>
                </p>
                
                <div style="margin-top: 25px;">
                  <strong style="color: #666; display: block; margin-bottom: 10px;">Mesaj:</strong>
                  <div style="background-color: #fdfbf7; border-left: 4px solid #bc9648; padding: 15px; color: #444; font-style: italic; line-height: 1.6;">
                    "${note}"
                  </div>
                </div>
              </div>
            </div>
            
            <div style="background-color: #141e2e; padding: 20px; text-align: center; color: rgba(255,255,255,0.4); font-size: 12px;">
              <p style="margin: 0;">&copy; ${new Date().getFullYear()} FRH Gayrimenkul ve Tasarım</p>
              <p style="margin: 5px 0 0;">Bu e-posta web sitesi iletişim formundan gönderilmiştir.</p>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Mesajınız başarıyla gönderildi!' });
  } catch (error) {
    console.error('Mail hatası:', error);

    // Check if it's a Zod error that wasn't caught
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Geçersiz veri formatı',
          errors: error.issues.map((e: z.ZodIssue) => ({ field: e.path[0]?.toString() || 'unknown', message: e.message }))
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin.' },
      { status: 500 }
    );
  }
}