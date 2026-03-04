/* SEO Configuration */

type ServiceSchema = {
  '@type': 'Service';
  name: string;
  serviceType: string;
  description: string;
  areaServed: {
    '@type': 'AdministrativeArea';
    name: string;
  };
  provider: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
  audience: {
    '@type': 'Audience';
    audienceType: string;
  };
};

export const seoConfig = {
  brandName: 'Ferah Tabak Gayrimenkul ve Tasarım',
  alternateBrandName: 'FRH Gayrimenkul ve Tasarım',
  siteName: 'Ferah Tabak Gayrimenkul ve Tasarım',
  siteUrl: 'https://ferahtabakgayrimenkul.com',
  defaultTitle:
    'Isparta Emlak, Gayrimenkul, İnşaat, Mimar ve İç Mimar Hizmetleri | Ferah Tabak',
  defaultDescription:
    'Isparta merkezli Ferah Tabak Gayrimenkul ve Tasarım; satılık-kiralık emlak, inşaat proje danışmanlığı, mimar ve iç mimar çözümleri ile gayrimenkul yatırım danışmanlığı sunar.',

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
      country: 'TR',
    },
  },

  // Coğrafi Koordinatlar
  geo: {
    latitude: 37.7648,
    longitude: 30.5566,
  },

  // Hizmet Verilen Bölgeler
  serviceAreas: [
    'Isparta Merkez',
    'Eğirdir',
    'Yalvaç',
    'Keçiborlu',
    'Gönen',
    'Şarkikaraağaç',
    'Senirkent',
    'Gelendost',
    'Uluborlu',
    'Burdur',
    'Dinar',
  ],

  // Çalışma Saatleri
  openingHours: {
    weekdays: { opens: '09:00', closes: '19:00' },
    saturday: { opens: '09:00', closes: '19:00' },
    sunday: 'Kapalı',
  },

  // Ana Anahtar Kelimeler
  mainKeywords: [
    'Isparta emlak',
    'Isparta gayrimenkul',
    'Isparta inşaat',
    'Isparta mimar',
    'Isparta iç mimar',
    'Isparta emlak danışmanlığı',
    'Isparta gayrimenkul danışmanlığı',
    'Isparta yatırım danışmanlığı',
    'Isparta gayrimenkul yatırım',
    'Isparta inşaat proje danışmanlığı',
    'Isparta satılık daire',
    'Isparta satılık ev',
    'Isparta kiralık daire',
    'Isparta kiralık ev',
    'Isparta mimarlık',
    'Isparta iç mimarlık',
    'Isparta mimari tasarım',
    'Isparta mekan tasarımı',
    'Isparta dekorasyon',
    'Isparta iç mimar ofisi',
    'Isparta mimar ofisi',
    'Ferah Tabak gayrimenkul',
    'FRH Gayrimenkul ve Tasarım',
  ],

  // Sosyal Medya
  social: {
    instagram: 'https://www.instagram.com/frhgayrimenkul_tasarim/',
  },

  // Google Analytics & Tag Manager
  analytics: {
    googleAnalyticsId: 'G-9PT35J603B',
    googleTagManagerId: 'GTM-WJ2V53MC',
    googleSiteVerification: 'Ba2C0l0HUrc3WLaxtMxDUJkie5CCIoq-HeJuZhmh3WI',
  },

  // Logo ve Görseller
  logo: '/logo-transparent.png',
  ogImage: '/logo-transparent.png',
};

export function getAbsoluteUrl(path = '') {
  if (!path) return seoConfig.siteUrl;
  if (path.startsWith('http')) return path;
  return `${seoConfig.siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

// Yapısal Veri (Schema) Helpers
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${seoConfig.siteUrl}#organization`,
    name: seoConfig.siteName,
    alternateName: seoConfig.alternateBrandName,
    url: seoConfig.siteUrl,
    logo: getAbsoluteUrl(seoConfig.logo),
    email: seoConfig.contact.email,
    telephone: seoConfig.contact.phone,
    sameAs: [seoConfig.social.instagram],
    address: {
      '@type': 'PostalAddress',
      streetAddress: seoConfig.contact.address.street,
      addressLocality: seoConfig.contact.address.city,
      addressRegion: seoConfig.contact.address.city,
      postalCode: seoConfig.contact.address.postalCode,
      addressCountry: seoConfig.contact.address.country,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: seoConfig.contact.phone,
      contactType: 'customer service',
      areaServed: 'TR',
      availableLanguage: ['Turkish'],
    },
    knowsAbout: seoConfig.mainKeywords,
  };
}

export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'RealEstateAgent', 'Architect', 'InteriorDesigner', 'ConstructionCompany'],
    '@id': `${seoConfig.siteUrl}#localbusiness`,
    name: seoConfig.siteName,
    alternateName: seoConfig.alternateBrandName,
    image: getAbsoluteUrl(seoConfig.logo),
    logo: getAbsoluteUrl(seoConfig.logo),
    url: seoConfig.siteUrl,
    telephone: seoConfig.contact.phone,
    email: seoConfig.contact.email,
    priceRange: '₺₺',
    description: seoConfig.defaultDescription,
    address: {
      '@type': 'PostalAddress',
      streetAddress: seoConfig.contact.address.street,
      addressLocality: seoConfig.contact.address.city,
      addressRegion: seoConfig.contact.address.city,
      postalCode: seoConfig.contact.address.postalCode,
      addressCountry: seoConfig.contact.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: seoConfig.geo.latitude,
      longitude: seoConfig.geo.longitude,
    },
    hasMap: `https://www.google.com/maps?q=${encodeURIComponent(
      `${seoConfig.contact.address.street}, ${seoConfig.contact.address.city}`
    )}`,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: seoConfig.openingHours.weekdays.opens,
        closes: seoConfig.openingHours.weekdays.closes,
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: seoConfig.openingHours.saturday.opens,
        closes: seoConfig.openingHours.saturday.closes,
      },
    ],
    sameAs: [seoConfig.social.instagram],
    areaServed: seoConfig.serviceAreas.map((area) => ({
      '@type': 'AdministrativeArea',
      name: area,
    })),
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Isparta Emlak Danışmanlığı',
          serviceType: 'Satılık ve kiralık gayrimenkul danışmanlığı',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Isparta Mimarlık ve İç Mekan Tasarımı',
          serviceType: 'Mimari tasarım ve iç mekan tasarımı',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Isparta Gayrimenkul Yatırım Danışmanlığı',
          serviceType: 'Yatırım odaklı gayrimenkul analiz ve danışmanlık',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Isparta İnşaat, Mimar ve İç Mimar Danışmanlığı',
          serviceType: 'İnşaat proje planlama, mimar ve iç mimar danışmanlığı',
        },
      },
    ],
  };
}

export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${seoConfig.siteUrl}#website`,
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    inLanguage: 'tr-TR',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${seoConfig.siteUrl}/satilik?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getServiceSchemas(): ServiceSchema[] {
  return [
    {
      '@type': 'Service',
      name: 'Isparta Emlak Danışmanlığı',
      serviceType: 'Emlak ve gayrimenkul danışmanlığı',
      description:
        'Isparta satılık ve kiralık daire, ev, villa ve arsa ihtiyaçları için profesyonel emlak danışmanlığı.',
      areaServed: { '@type': 'AdministrativeArea', name: 'Isparta' },
      provider: { '@type': 'Organization', name: seoConfig.siteName, url: seoConfig.siteUrl },
      audience: { '@type': 'Audience', audienceType: 'Ev sahibi ve yatırımcılar' },
    },
    {
      '@type': 'Service',
      name: 'Isparta Mimarlık ve Tasarım Hizmetleri',
      serviceType: 'Mimarlık ve iç mekan tasarımı',
      description:
        'Isparta merkezli mimari proje, iç mimarlık, mekan planlama ve uygulama öncesi tasarım danışmanlığı.',
      areaServed: { '@type': 'AdministrativeArea', name: 'Isparta' },
      provider: { '@type': 'Organization', name: seoConfig.siteName, url: seoConfig.siteUrl },
      audience: { '@type': 'Audience', audienceType: 'Ev sahipleri ve ticari işletmeler' },
    },
    {
      '@type': 'Service',
      name: 'Isparta Gayrimenkul Yatırım Danışmanlığı',
      serviceType: 'Gayrimenkul yatırım analizi ve danışmanlığı',
      description:
        'Isparta bölgesinde konut ve arsa yatırımı için lokasyon, getiri potansiyeli ve bütçe odaklı danışmanlık.',
      areaServed: { '@type': 'AdministrativeArea', name: 'Isparta' },
      provider: { '@type': 'Organization', name: seoConfig.siteName, url: seoConfig.siteUrl },
      audience: { '@type': 'Audience', audienceType: 'Bireysel ve kurumsal yatırımcılar' },
    },
    {
      '@type': 'Service',
      name: 'Isparta İnşaat Proje Danışmanlığı',
      serviceType: 'İnşaat planlama ve proje danışmanlığı',
      description:
        'Isparta inşaat süreçlerinde arsa potansiyeli, proje planlama ve yatırım fizibilitesi odaklı danışmanlık.',
      areaServed: { '@type': 'AdministrativeArea', name: 'Isparta' },
      provider: { '@type': 'Organization', name: seoConfig.siteName, url: seoConfig.siteUrl },
      audience: { '@type': 'Audience', audienceType: 'Arsa sahipleri ve yatırımcılar' },
    },
    {
      '@type': 'Service',
      name: 'Isparta Mimar ve İç Mimar Hizmetleri',
      serviceType: 'Mimar ve iç mimar hizmetleri',
      description:
        'Isparta bölgesinde mimar ve iç mimar desteği ile konut ve ticari alanlarda estetik-fonksiyonel tasarım çözümleri.',
      areaServed: { '@type': 'AdministrativeArea', name: 'Isparta' },
      provider: { '@type': 'Organization', name: seoConfig.siteName, url: seoConfig.siteUrl },
      audience: { '@type': 'Audience', audienceType: 'Ev sahipleri ve işletmeler' },
    },
  ];
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.url),
    })),
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function getServiceSchema(service: {
  name: string;
  description: string;
  areaServed: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: seoConfig.siteName,
      url: seoConfig.siteUrl,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: service.areaServed,
    },
  };
}
