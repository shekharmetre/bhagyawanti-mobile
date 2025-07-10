import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next()
  return response;

//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         get(name: string) {
//           return request.cookies.get(name)?.value
//         },
//         set(name: string, value: string, options: any) {
//           response.cookies.set({ name, value, ...options })
//         },
//         remove(name: string, options: any) {
//           response.cookies.set({ name, value: '', ...options })
//         },
//       },
//     }
//   )

//   const {
//     data: { session },
//   } = await supabase.auth.getSession()

//   const protectedRoutes = ['/dashboard', '/checkout', '/profile']
//   const isProtected = protectedRoutes.some((route) =>
//     request.nextUrl.pathname.startsWith(route)
//   )

//   if (isProtected && !session) {
//     const redirectUrl = new URL('/login', request.url)
//     redirectUrl.searchParams.set('redirect', request.nextUrl.pathname)
//     return NextResponse.redirect(redirectUrl)
//   }

//   return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/checkout/:path*', '/profile/:path*'],
}

