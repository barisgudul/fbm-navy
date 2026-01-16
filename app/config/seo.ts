/* SEO Configuration */

export const seoConfig = {
  siteName: 'FRH Gayrimenkul ve Tasarım',
  siteUrl: 'https://www.fbmgayrimenkul.com',
  defaultTitle: 'FRH Gayrimenkul ve Tasarım Isparta | Satılık & Kiralık Ev, Daire, Villa, Arsa',
  defaultDescription: 'Isparta ve Burdur\'un en güvenilir gayrimenkul danışmanlığı. FRH Gayrimenkul ve Tasarım ile Merkez, Eğirdir, Yalvaç, Burdur, Dinar ve Keçiborlu\'da satılık ev, kiralık daire, villa, arsa ve profesyonel mimari tasarım hizmetleri.',

  // İletişim Bilgileri
  contact: {
    phone: '+905435910932',
    email: 'frhicmimar@gmail.com',
    whatsapp: '905435910932',
    instagram: 'https://www.instagram.com/frhgayrimenkul_tasarim/',
    address: {
      street: 'Fatih, 201. Cadde Yener İş Merkezi no:59/61',
      city: 'Isparta',
      district: 'Merkez',
      postalCode: '32200',
      country: 'TR'
    }
  },

  // Coğrafi Koordinatlar
  geo: {
    latitude: 37.7648,
    longitude: 30.5566
  },

  // Hizmet Verilen Bölgeler
  serviceAreas: [
    'Isparta Merkez',
    'Eğirdir',
    'Yalvaç',
    'Burdur',
    'Dinar',
    'Keçiborlu',
    'Gönen',
    'Şarkikaraağaç',
    'Senirkent',
    'Gelendost',
    'Uluborlu'
  ],

  // Çalışma Saatleri
  openingHours: {
    weekdays: { opens: '09:00', closes: '19:00' },
    saturday: { opens: '09:00', closes: '19:00' },
    sunday: 'Kapalı'
  },

  // Ana Anahtar Kelimeler (Local SEO için)
  mainKeywords: [
    'Isparta Gayrimenkul',
    'Isparta Emlak',
    'Burdur Gayrimenkul',
    'Burdur Emlak',
    'Isparta Satılık Daire',
    'Isparta Kiralık Ev',
    'FRH Gayrimenkul ve Tasarım',
    'Isparta Emlakçı',
    'Isparta Mekan Tasarım'
  ],

  // Sosyal Medya
  social: {
    instagram: 'https://www.instagram.com/frhgayrimenkul_tasarim/',
  },

  // Google Analytics & Tag Manager
  analytics: {
    googleAnalyticsId: 'G-9PT35J603B', // Google Analytics aktif ✓
    googleTagManagerId: 'GTM-WJ2V53MC', // Google Tag Manager aktif ✓
    googleSiteVerification: 'Ba2C0l0HUrc3WLaxtMxDUJkie5CCIoq-HeJuZhmh3WI', // Google Search Console doğrulandı ✓
  },

  // Logo ve Görseller
  logo: '/FRH-logo.png',
  ogImage: '/FRH-logo.png',
};

// Yapısal Veri (Schema) Helpers
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": seoConfig.siteName,
    "alternateName": "FRH Gayrimenkul & Tasarım",
    "image": `${seoConfig.siteUrl}${seoConfig.logo}`,
    "logo": `${seoConfig.siteUrl}${seoConfig.logo}`,
    "url": seoConfig.siteUrl,
    "telephone": seoConfig.contact.phone,
    "email": seoConfig.contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": seoConfig.contact.address.street,
      "addressLocality": seoConfig.contact.address.city,
      "addressRegion": seoConfig.contact.address.city,
      "postalCode": seoConfig.contact.address.postalCode,
      "addressCountry": seoConfig.contact.address.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": seoConfig.geo.latitude,
      "longitude": seoConfig.geo.longitude
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": seoConfig.openingHours.weekdays.opens,
        "closes": seoConfig.openingHours.weekdays.closes
      }
    ],
    "sameAs": [
      seoConfig.social.instagram
    ],
    "areaServed": seoConfig.serviceAreas.map(area => ({
      "@type": "City",
      "name": area
    })),
    "priceRange": "₺₺",
    "description": seoConfig.defaultDescription,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "50",
      "bestRating": "5",
      "worstRating": "1"
    }
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${seoConfig.siteUrl}${item.url}`
    }))
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function getServiceSchema(service: {
  name: string;
  description: string;
  areaServed: string;
  provider: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "RealEstateAgent",
      "name": service.provider
    },
    "areaServed": {
      "@type": "City",
      "name": service.areaServed
    },
    "serviceType": "Gayrimenkul Danışmanlığı"
  };
}

