/* app/api/contact/route.ts */
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // propertyLink parametresini de alıyoruz
    const { name, phone, note, propertyTitle, propertyLocation, propertyLink } = body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'FBMgayrimenkul.32@gmail.com', 
      subject: `🏠 YENİ MÜŞTERİ: ${propertyTitle}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px 20px; background-color: #f0f2f5;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            
            <!-- Header - Navbar Tarzı -->
            <div style="background-color: #141e2e; padding: 40px 20px; text-align: center; border-bottom: 4px solid #bc9648;">
               <h1 style="color: #bc9648; margin: 0; font-family: 'Times New Roman', serif; font-size: 32px; letter-spacing: 4px; font-weight: bold;">FBM</h1>
               <p style="color: #ffffff; margin: 8px 0 0; font-size: 10px; letter-spacing: 4px; text-transform: uppercase; opacity: 0.8;">Gayrimenkul Değerleme & Tasarım</p>
            </div>

            <div style="padding: 40px 30px;">
              <h2 style="color: #141e2e; margin-top: 0; font-size: 22px; text-align: center; margin-bottom: 30px;">Yeni Müşteri Talebi</h2>
              
              <div style="background-color: #f8f9fa; border: 1px solid #e1e4e8; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 5px 0; color: #666; font-size: 14px;">İlan Başlığı:</td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 15px; color: #141e2e; font-weight: bold; font-size: 16px;">${propertyTitle}</td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0; color: #666; font-size: 14px;">Konum:</td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 15px; color: #141e2e; font-weight: bold; font-size: 16px;">${propertyLocation}</td>
                  </tr>
                  <tr>
                    <td style="padding-top: 10px;">
                       <a href="${propertyLink}" style="background-color: #bc9648; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: block; text-align: center; font-weight: bold; text-transform: uppercase; font-size: 14px; letter-spacing: 1px;">İlanı Görüntüle</a>
                    </td>
                  </tr>
                </table>
              </div>

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
              <p style="margin: 0;">&copy; ${new Date().getFullYear()} FBM Emlak & Tasarım</p>
              <p style="margin: 5px 0 0;">Bu e-posta web sitesi iletişim formundan gönderilmiştir.</p>
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