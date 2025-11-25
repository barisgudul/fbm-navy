/* app/admin/panel/page.tsx */
'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/app/lib/supabaseBrowser';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Edit, Trash2, Plus, LogOut } from 'lucide-react';

interface Property {
  id: number;
  title: string;
  price: string;
  location: string;
  image_urls: string[];
  type: string;
  status: string;
  created_at: string;
}

interface Design {
  id: number;
  title: string;
  type: string;
  location: string;
  area: number;
  year: number;
  image_urls: string[];
  created_at: string;
}

type TabType = 'properties' | 'designs';

export default function AdminPanelPage() {
  const [supabase] = useState(() => createClient());
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('properties');
  const [properties, setProperties] = useState<Property[]>([]);
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = useCallback(async () => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error('Hata:', error);
    else setProperties(data || []);
  }, [supabase]);

  const fetchDesigns = useCallback(async () => {
    const { data, error } = await supabase
      .from('designs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error('Hata:', error);
    else setDesigns(data || []);
  }, [supabase]);

  // Oturum Kontrolü ve Veri Çekme
  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
        return;
      }
      await Promise.all([fetchProperties(), fetchDesigns()]);
      setLoading(false);
    };
    checkAuthAndFetch();
  }, [router, supabase, fetchProperties, fetchDesigns]);

  // Tab değiştiğinde veriyi yenile
  useEffect(() => {
    if (loading) return;
    
    const loadData = async () => {
      if (activeTab === 'properties') {
        await fetchProperties();
      } else {
        await fetchDesigns();
      }
    };

    loadData();
  }, [activeTab, loading, fetchProperties, fetchDesigns]);

  // İlan Silme
  const handleDeleteProperty = async (id: number) => {
    if (!window.confirm('Bu ilanı silmek istediğinize emin misiniz?')) return;

    const { error } = await supabase.from('properties').delete().eq('id', id);

    if (error) {
      alert('Silme başarısız: ' + error.message);
    } else {
      setProperties(prev => prev.filter(p => p.id !== id));
    }
  };

  // Proje Silme
  const handleDeleteDesign = async (id: number) => {
    if (!window.confirm('Bu projeyi silmek istediğinize emin misiniz?')) return;

    const { error } = await supabase.from('designs').delete().eq('id', id);

    if (error) {
      alert('Silme başarısız: ' + error.message);
    } else {
      setDesigns(prev => prev.filter(d => d.id !== id));
    }
  };

  // Durum Değiştirme (Aktif <-> Satıldı)
  const toggleStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'aktif' 
      ? (properties.find(p => p.id === id)?.type === 'satilik' ? 'satildi' : 'kiralandi')
      : 'aktif';

    const { error } = await supabase
      .from('properties')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      alert('Durum güncellenemedi');
    } else {
      setProperties(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
    }
  };

  // Çıkış Yap
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (loading) return <div className="min-h-screen bg-fbm-navy-900 flex items-center justify-center text-fbm-gold-400">Yükleniyor...</div>;

  return (
    <main className="min-h-screen pt-40 md:pt-48 px-4 pb-20 bg-fbm-navy-900 text-white font-sans">
      <div className="container mx-auto max-w-7xl">
        
        {/* Üst Başlık ve Butonlar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-serif text-fbm-gold-400">Yönetim Paneli</h1>
          <div className="flex gap-4">
            {activeTab === 'properties' ? (
            <Link 
              href="/admin/yeni-ilan" 
              className="flex items-center gap-2 bg-fbm-gold-400 text-fbm-navy-900 px-4 py-2 rounded font-bold hover:bg-fbm-bronze-400 hover:text-white transition-colors"
            >
              <Plus size={18} /> Yeni İlan Ekle
            </Link>
            ) : (
              <Link 
                href="/admin/yeni-proje" 
                className="flex items-center gap-2 bg-fbm-gold-400 text-fbm-navy-900 px-4 py-2 rounded font-bold hover:bg-fbm-bronze-400 hover:text-white transition-colors"
              >
                <Plus size={18} /> Yeni Proje Ekle
              </Link>
            )}
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/20 text-red-400 border border-red-500/50 px-4 py-2 rounded hover:bg-red-500 hover:text-white transition-colors"
            >
              <LogOut size={18} /> Çıkış
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6 border-b border-white/10">
          <button
            onClick={() => setActiveTab('properties')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'properties'
                ? 'text-fbm-gold-400 border-b-2 border-fbm-gold-400'
                : 'text-white/60 hover:text-white'
            }`}
          >
            İlanlar
          </button>
          <button
            onClick={() => setActiveTab('designs')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'designs'
                ? 'text-fbm-gold-400 border-b-2 border-fbm-gold-400'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Projeler
          </button>
        </div>

        {/* İlan Listesi Tablosu */}
        {activeTab === 'properties' && (
        <div className="bg-fbm-denim-750 rounded-xl border border-white/10 overflow-hidden overflow-x-auto shadow-xl">
          <table className="w-full text-left text-sm text-white/80">
            <thead className="bg-fbm-navy-900 text-fbm-gold-400 uppercase tracking-wider text-xs border-b border-white/10">
              <tr>
                <th className="p-4">Görsel</th>
                <th className="p-4">Başlık</th>
                <th className="p-4">Fiyat</th>
                <th className="p-4">Tip</th>
                <th className="p-4 text-center">Durum</th>
                <th className="p-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {properties.map((property) => (
                <tr key={property.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="relative w-32 h-24 rounded overflow-hidden border border-white/10 bg-fbm-navy-900/50">
                      <Image 
                        src={property.image_urls?.[0] || '/logo.png'} 
                        alt={property.title} 
                        fill 
                        className={property.image_urls?.[0] ? "object-cover" : "object-contain p-2"}
                      />
                    </div>
                  </td>
                  <td className="p-4 font-medium text-white">{property.title}</td>
                  <td className="p-4">{property.price}</td>
                  <td className="p-4 capitalize">{property.type}</td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => toggleStatus(property.id, property.status || 'aktif')}
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        property.status === 'aktif' 
                          ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                          : 'bg-red-500/20 text-red-400 border-red-500/30'
                      }`}
                    >
                      {property.status === 'aktif' ? 'Yayında' : 'Satıldı/Pasif'}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link 
                        href={`/admin/duzenle/${property.id}`} 
                        className="text-blue-400 hover:text-white transition-colors"
                        title="Düzenle"
                      >
                        <Edit size={18} />
                      </Link>
                      <button 
                          onClick={() => handleDeleteProperty(property.id)} 
                        className="text-red-400 hover:text-red-200 transition-colors"
                        title="Sil"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {properties.length === 0 && (
            <div className="p-8 text-center text-white/50">Henüz hiç ilan eklenmemiş.</div>
          )}
        </div>
        )}

        {/* Proje Listesi Tablosu */}
        {activeTab === 'designs' && (
          <div className="bg-fbm-denim-750 rounded-xl border border-white/10 overflow-hidden overflow-x-auto shadow-xl">
            <table className="w-full text-left text-sm text-white/80">
              <thead className="bg-fbm-navy-900 text-fbm-gold-400 uppercase tracking-wider text-xs border-b border-white/10">
                <tr>
                  <th className="p-4">Görsel</th>
                  <th className="p-4">Başlık</th>
                  <th className="p-4">Tip</th>
                  <th className="p-4">Konum</th>
                  <th className="p-4">Alan</th>
                  <th className="p-4">Yıl</th>
                  <th className="p-4 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {designs.map((design) => (
                  <tr key={design.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                    <div className="relative w-32 h-24 rounded overflow-hidden border border-white/10 bg-fbm-navy-900/50">
                        <Image 
                          src={design.image_urls?.[0] || '/logo.png'} 
                          alt={design.title} 
                          fill 
                          className={design.image_urls?.[0] ? "object-cover" : "object-contain p-2"}
                        />
                      </div>
                    </td>
                    <td className="p-4 font-medium text-white">{design.title}</td>
                    <td className="p-4">{design.type}</td>
                    <td className="p-4">{design.location}</td>
                    <td className="p-4">{design.area} m²</td>
                    <td className="p-4">{design.year}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link 
                          href={`/admin/duzenle-proje/${design.id}`} 
                          className="text-blue-400 hover:text-white transition-colors"
                          title="Düzenle"
                        >
                          <Edit size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDeleteDesign(design.id)} 
                          className="text-red-400 hover:text-red-200 transition-colors"
                          title="Sil"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {designs.length === 0 && (
              <div className="p-8 text-center text-white/50">Henüz hiç proje eklenmemiş.</div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
