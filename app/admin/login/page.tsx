'use client';

import { useState } from 'react';
import { supabase } from '@/app/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert('Giriş başarısız: ' + error.message);
      setLoading(false);
    } else {
      router.push('/admin/yeni-ilan');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-fbm-navy-900 px-4">
      <div className="bg-fbm-denim-750 p-8 rounded-xl border border-fbm-gold-400/30 w-full max-w-md shadow-2xl">
        <h1 className="text-2xl font-serif text-fbm-gold-400 mb-6 text-center">Yetkili Girişi</h1>
        
        <form onSubmit={handleLogin} className="space-y-4 font-sans">
          <div>
            <label className="block text-xs text-fbm-gold-400 mb-1">E-posta</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 text-white focus:border-fbm-gold-400 outline-none transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-xs text-fbm-gold-400 mb-1">Şifre</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-fbm-navy-900 p-3 rounded border border-white/10 text-white focus:border-fbm-gold-400 outline-none transition-colors"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 rounded font-bold text-fbm-navy-900 bg-fbm-gold-400 
            border-2 border-fbm-gold-400 
            hover:bg-fbm-navy-900 hover:text-fbm-gold-400 
            hover:shadow-[0_0_20px_rgba(188,150,72,0.4)] 
            hover:-translate-y-1 hover:scale-[1.02] 
            active:scale-95 active:shadow-none
            transition-all duration-300 ease-out
            disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Kontrol Ediliyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </main>
  );
}