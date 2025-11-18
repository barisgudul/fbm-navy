/* app/api/contact/route.ts */
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // propertyLink parametresini de alıyoruz
    const { name, phone, note, propertyTitle, propertyId, propertyLocation, propertyLink } = body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'mehmetbarisgudul@gmail.com', 
      subject: `🏠 YENİ MÜŞTERİ: ${propertyTitle}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; padding: 30px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            
            <div style="background-color: #1b2838; padding: 20px; text-align: center;">
               <h2 style="color: #bc9648; margin: 0; font-size: 24px;">Yeni Müşteri Talebi</h2>
            </div>

            <div style="padding: 30px;">
              <p style="font-size: 16px; color: #333;">Aşağıdaki ilan için yeni bir talep oluşturuldu:</p>
              
              <div style="background-color: #f9f9f9; border-left: 5px solid #bc9648; padding: 15px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>🏠 İlan:</strong> ${propertyTitle}</p>
                <p style="margin: 5px 0;"><strong>📍 Konum:</strong> ${propertyLocation}</p>
                <p style="margin: 5px 0;"><strong>🔢 Sistem ID:</strong> #${propertyId}</p>
                <p style="margin: 15px 0 5px 0;">
                   <a href="${propertyLink}" style="background-color: #bc9648; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">İlanı Görüntüle</a>
                </p>
              </div>

              <h3 style="color: #1b2838; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 30px;">👤 Müşteri Bilgileri</h3>
              <p><strong>Ad Soyad:</strong> ${name}</p>
              <p><strong>Telefon:</strong> <a href="tel:${phone}" style="color: #1b2838; font-weight: bold;">${phone}</a></p>
              
              <p><strong>Mesaj:</strong></p>
              <blockquote style="background: #fff8e1; padding: 15px; border-radius: 5px; color: #555; margin: 0;">
                "${note}"
              </blockquote>
            </div>
            
            <div style="background-color: #eee; padding: 15px; text-align: center; font-size: 12px; color: #888;">
              Bu mesaj FBM Emlak web sitesinden gönderilmiştir.
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Mail gönderildi' });
  } catch (error) {
    console.error('Mail hatası:', error);
    return NextResponse.json({ success: false, message: 'Mail gönderilemedi' }, { status: 500 });
  }
}