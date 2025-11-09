/* app/lib/designData.ts */

export interface Design {
  id: number;
  title: string;
  type: string;
  location: string;
  area: number;
  year: number;
  image: string;
}

const locations = [
  'Merkez, Isparta',
  'Yalvaç, Isparta',
  'Eğirdir, Isparta',
  'Şarkikaraağaç, Isparta',
  'Gelendost, Isparta',
  'Keçiborlu, Isparta',
  'Senirkent, Isparta',
  'Sütçüler, Isparta',
  'Uluborlu, Isparta',
  'Atabey, Isparta',
];

const designTitles = [
  'Modern Ofis Tasarımı',
  'Lüks Villa İç Tasarımı',
  'Minimalist Yaşam Alanı',
  'Şık Restoran Tasarımı',
  'Konforlu Otel Odası',
  'Özel Tasarım Showroom',
  'Yenilikçi Konut Projesi',
  'Doğal Malzeme Kullanımı',
  'Endüstriyel Tasarım',
  'Klasik Modern Karışımı',
];

const designTypes = [
  'İç Tasarım',
  'Dış Tasarım',
  'Peyzaj',
  'Ofis Tasarımı',
  'Konut Tasarımı',
  'Ticari Mekan',
];

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Tasarım fotoğrafları için Unsplash URL'leri - Her tasarıma fotoğraf için yeterli sayıda
const designImages = [
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
];

export function generateRandomDesigns(count: number): Design[] {
  const designs: Design[] = [];
  const currentYear = new Date().getFullYear();
  
  for (let i = 1; i <= count; i++) {
    const area = getRandomNumber(50, 500);
    const year = getRandomNumber(2018, currentYear);
    
    // Her tasarıma mutlaka bir fotoğraf atanması için index kullan
    const imageIndex = (i - 1) % designImages.length;
    
    designs.push({
      id: i,
      title: getRandomItem(designTitles),
      type: getRandomItem(designTypes),
      location: getRandomItem(locations),
      area,
      year,
      image: designImages[imageIndex],
    });
  }
  
  return designs;
}
