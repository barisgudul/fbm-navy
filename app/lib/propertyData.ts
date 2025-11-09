/* app/lib/propertyData.ts */

export interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  area: number;
  rooms: number;
  livingRoom: number;
  bathrooms: number;
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

const propertyTitles = [
  'Lüks Villa',
  'Modern Daire',
  'Geniş Rezidans',
  'Şık Penthouse',
  'Konforlu Apartment',
  'Özel Tasarım Villa',
  'Yenilenmiş Konut',
  'Deniz Manzaralı Daire',
  'Bahçeli Müstakil',
  'Kentsel Dönüşüm Dairesi',
];

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatPrice(amount: number, isRental: boolean): string {
  if (isRental) {
    return `₺${amount.toLocaleString('tr-TR')}/ay`;
  }
  return `₺${amount.toLocaleString('tr-TR')}`;
}

// Ev fotoğrafları için Unsplash URL'leri - Her ilana fotoğraf için yeterli sayıda
const propertyImages = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
];

export function generateRandomProperties(count: number, isRental: boolean = false): Property[] {
  const properties: Property[] = [];
  
  for (let i = 1; i <= count; i++) {
    const area = getRandomNumber(80, 350);
    const rooms = getRandomNumber(1, 5); // Oda sayısı (1-5)
    const livingRoom = 1; // Her zaman 1 salon
    const bathrooms = getRandomNumber(1, 3);
    
    let price: number;
    if (isRental) {
      // Kiralık: 10.000 - 150.000 TL/ay arası
      price = getRandomNumber(10000, 150000);
    } else {
      // Satılık: 2.000.000 - 25.000.000 TL arası
      price = getRandomNumber(2000000, 25000000);
    }
    
    // Her ilana mutlaka bir fotoğraf atanması için index kullan
    const imageIndex = (i - 1) % propertyImages.length;
    
    properties.push({
      id: i,
      title: getRandomItem(propertyTitles),
      location: getRandomItem(locations),
      price: formatPrice(price, isRental),
      area,
      rooms,
      livingRoom,
      bathrooms,
      image: propertyImages[imageIndex],
    });
  }
  
  return properties;
}
