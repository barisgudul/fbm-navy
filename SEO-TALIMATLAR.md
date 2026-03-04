# 🎯 FRH Gayrimenkul SEO Talimatları

## ✅ YAPILAN İYİLEŞTİRMELER

### 1. Teknik SEO Optimizasyonları ✓
- ✅ Sitemap.xml yapılandırması
- ✅ Robots.txt optimizasyonu
- ✅ Meta tags ve açıklamalar
- ✅ Open Graph ve Twitter kartları
- ✅ Canonical URL'ler
- ✅ Schema.org yapısal verileri
- ✅ Google Analytics entegrasyonu
- ✅ Google Tag Manager entegrasyonu
- ✅ FAQ Schema markup
- ✅ LocalBusiness Schema
- ✅ Breadcrumb yapılandırması
- ✅ Güvenlik headers

### 2. Yerel SEO (Isparta Odaklı) ✓
- ✅ Hizmet verilen tüm bölgeler anahtar kelimelere eklendi
- ✅ Yerel schema markup (LocalBusiness, RealEstateAgent)
- ✅ Coğrafi koordinatlar eklendi
- ✅ Çalışma saatleri bilgisi

### 3. Performans Optimizasyonları ✓
- ✅ Next.js Image optimization
- ✅ Font display: swap
- ✅ Lazy loading
- ✅ Compression aktif

---

## 🚨 KRİTİK: ŞİMDİ YAPMANIZ GEREKENLER

### 1. Google Search Console Kurulumu (ACİL!)

**Adım 1:** [Google Search Console](https://search.google.com/search-console)'a gidin
**Adım 2:** Sitenizi ekleyin: `https://ferahtabakgayrimenkul.com`
**Adım 3:** Doğrulama kodunu alın
**Adım 4:** Bu kodu `/app/config/seo.ts` dosyasındaki şu satıra yapıştırın:

```typescript
googleSiteVerification: 'BURAYA_KODU_YAPIŞTIRIN',
```

**Adım 5:** Sitemap'i Search Console'a gönderin: 
- URL: `https://ferahtabakgayrimenkul.com/sitemap.xml`

### 2. Google Analytics Kurulumu (ÖNEMLİ!)

**Adım 1:** [Google Analytics](https://analytics.google.com) hesabı oluşturun
**Adım 2:** Yeni bir özellik (property) oluşturun: "FRH Gayrimenkul"
**Adım 3:** Ölçüm ID'sini alın (örn: G-XXXXXXXXXX)
**Adım 4:** Bu ID'yi `/app/config/seo.ts` dosyasına ekleyin:

```typescript
googleAnalyticsId: 'G-BURAYA_ID_YAPIŞTIRIN',
```

### 3. Google Tag Manager (İsteğe Bağlı)

**Adım 1:** [Google Tag Manager](https://tagmanager.google.com) hesabı oluşturun
**Adım 2:** Konteyner ID'sini alın (örn: GTM-XXXXXXX)
**Adım 3:** Bu ID'yi `/app/config/seo.ts` dosyasına ekleyin:

```typescript
googleTagManagerId: 'GTM-BURAYA_ID_YAPIŞTIRIN',
```

### 4. Google My Business Kaydı (ZORUNLU - Yerel SEO için!)

**ÖNEMLİ:** Bu, Isparta'da en üst sıralarda çıkmanız için **MUTLAKA** gerekli!

**Adım 1:** [Google My Business](https://www.google.com/business/) sayfasına gidin
**Adım 2:** İşletme bilgilerinizi ekleyin:
- İşletme Adı: FRH Gayrimenkul
- Kategori: Emlak Danışmanlığı / Real Estate Agency
- Adres: Fatih, 201. Cadde Yener İş Merkezi no:59/61, 32200 Merkez/Isparta
- Telefon: +90 543 591 09 32
- Web Sitesi: https://ferahtabakgayrimenkul.com
- Çalışma Saatleri: Pzt-Cmt: 09:00-19:00, Pazar Kapalı

**Adım 3:** İşletmenizi doğrulayın (Posta veya telefon ile)
**Adım 4:** Fotoğraflar ekleyin (ofis, logo, ilanlar)
**Adım 5:** Hizmet alanlarını ekleyin:
  - Isparta Merkez
  - Eğirdir
  - Yalvaç
  - Burdur
  - Dinar
  - Keçiborlu

**Adım 6:** Düzenli olarak güncelleyin ve yorumlara cevap verin!

### 5. Bing Webmaster Tools Kurulumu

**Adım 1:** [Bing Webmaster Tools](https://www.bing.com/webmasters) hesabı oluşturun
**Adım 2:** Sitenizi ekleyin: `https://ferahtabakgayrimenkul.com`
**Adım 3:** Sitemap gönderin: `https://ferahtabakgayrimenkul.com/sitemap.xml`

### 6. Sosyal Medya Optimizasyonu

**Instagram:**
- ✅ Zaten mevcut: @fbm_gayrimenkul
- 🔸 Düzenli gönderi yapın (günde 1-2 ilan)
- 🔸 Stories kullanın
- 🔸 Hashtag'leri kullanın: #IspartaEmlak #IspartaGayrimenkul #BurdurEmlak

**Facebook Business Sayfası:**
- ❌ Henüz yok - OLUŞTURUN!
- İşletme sayfası açın
- Google My Business ile bağlantılandırın

**YouTube:**
- 🔸 Video turları çekin (360° ev turları)
- 🔸 Drone çekimleri yapın
- 🔸 YouTube kanalı açın

---

## 📊 HAFTALIK YAPILMASI GEREKENLER

### İçerik Üretimi (SEO için KRİTİK!)

**1. Yeni İlanlar Ekleyin:**
- Her yeni ilan için SEO dostu başlıklar kullanın
- Detaylı açıklamalar yazın (min 200 karakter)
- Kaliteli fotoğraflar ekleyin (min 5 adet)
- Video turları ekleyin

**2. Müşteri Yorumları Toplayın:**
- Google My Business'a yorum yapmaları için müşterilerinize ricada bulunun
- Yorumlara mutlaka cevap verin

---

## 🔗 ÖNEMLİ LİNKLER

### Backlink Stratejisi (SEO Sıralaması için Kritik!)

**Yerel Dizinlere Kayıt Olun:**
1. [sahibinden.com](https://www.sahibinden.com) - İşletme kaydı
2. [hepsiemlak.com](https://www.hepsiemlak.com) - Emlakçı kaydı
3. [zingat.com](https://www.zingat.com) - Ofis kaydı
4. [hurriyet.com.tr/emlak](https://www.hurriyet.com.tr/emlak)
5. [enuygun.com/emlak](https://www.enuygun.com/emlak)
6. [foursquare.com](https://tr.foursquare.com) - İşletme kaydı
7. [turizm.com](https://www.turizm.com) - Isparta gezilecek yerler bölümü
8. Isparta yerel haberler siteleri
9. Isparta ticaret odası web sitesi

**Sosyal Medya Linkleri:**
- Instagram'da site linki
- Facebook Business sayfasında site linki
- YouTube kanalında site linki

---

## 📈 PERFORMANS TAKİBİ

### Her Hafta Kontrol Edin:

1. **Google Search Console:**
   - Hangi anahtar kelimelerden trafik geldiğini görün
   - Hataları kontrol edin
   - Sıralamadaki değişiklikleri takip edin

2. **Google Analytics:**
   - Ziyaretçi sayıları
   - En çok görüntülenen ilanlar
   - Dönüşüm oranları (telefon aramaları, form göndermeleri)

3. **Google My Business:**
   - Görüntüleme sayıları
   - Telefon aramaları
   - Yol tarifi istekleri
   - Yorumlar

### Hedef KPI'lar (3 Ay İçinde):

- 🎯 Google'da "Isparta Gayrimenkul" için ilk 3'te olmak
- 🎯 Google'da "Isparta Emlak" için ilk 5'te olmak
- 🎯 Aylık 5.000+ organik ziyaretçi
- 🎯 Google My Business'ta 50+ pozitif yorum
- 🎯 10+ backlink

---

## 🚀 GELİŞMİŞ SEO STRATEJİLERİ

### 1. Video SEO

- YouTube kanalı açın
- Her ilan için video turu çekin
- Video'lara zengin açıklamalar ekleyin
- Video'larda site linki paylaşın

### 2. Yerel Arama Optimizasyonu

**Anahtar Kelime Örnekleri:**
- "Isparta [Mahalle Adı] satılık daire"
- "Isparta [Mahalle Adı] kiralık ev"
- "[İlçe Adı] emlak ilanları"

**Önemli Mahalleler:**
- Isparta Merkez: Fatih, Karaağaç, Modernevler, Bahçelievler, Gülcü
- Eğirdir: Merkez, Yakaköy
- Yalvaç: Merkez

### 3. Teknik İyileştirmeler (Devam Eden)

- ✅ SSL sertifikası (HTTPS) - Mevcut
- ✅ Mobil uyumlu tasarım - Mevcut
- ✅ Sayfa hızı optimizasyonu - Yapıldı
- 🔸 AMP (Accelerated Mobile Pages) - İleride eklenebilir
- 🔸 PWA (Progressive Web App) - İleride eklenebilir

---

## 📞 DESTEK

Sorularınız için:
- Developer: Baris
- Email: [Sizin email adresiniz]

---

## ⚠️ ÖNEMLİ NOTLAR

1. **Google Search Console kurulumu MUTLAKA yapılmalı** - Yoksa site Google'da düzgün indexlenmez!
2. **Google My Business kaydı ZORUNLU** - Yerel SEO için en önemli faktör!
3. **Düzenli içerik üretimi gerekli** - Her hafta en az 2-3 yeni ilan
4. **Müşteri yorumları toplayın** - Güvenilirlik için kritik
5. **Backlink'ler önemli** - Yerel dizinlere mutlaka kayıt olun
6. **Sosyal medya aktif olmalı** - Instagram düzenli güncellensin

---

## 🎉 SONUÇ

Bu talimatları takip ederseniz, **3 ay içinde** Isparta'da emlak konusunda Google'da **ilk 3'te** yer alabilirsiniz!

**Başarılar! 🚀**

