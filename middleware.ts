import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Kullanıcıyı doğrula
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname

  // Admin rotaları kontrolü
  if (path.startsWith('/admin')) {
    // Login sayfası kontrolü
    if (path === '/admin/login') {
      // Eğer kullanıcı zaten giriş yapmışsa ve login sayfasına gitmeye çalışıyorsa panele yönlendir
      if (user) {
        return NextResponse.redirect(new URL('/admin/panel', request.url))
      }
      // Giriş yapmamışsa login sayfasını göster
      return response
    }

    // Diğer tüm admin sayfaları için (panel, yeni-proje vb.)
    // Eğer kullanıcı yoksa login sayfasına at
    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Tüm request yollarını eşleştir ama şunları hariç tut:
     * - _next/static (static dosyalar)
     * - _next/image (resim optimizasyon dosyaları)
     * - favicon.ico (favicon dosyası)
     * - public klasöründeki resimler (svg, png, jpg, jpeg, gif, webp)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
