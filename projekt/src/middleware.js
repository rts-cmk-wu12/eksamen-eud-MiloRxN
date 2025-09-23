// // Taget fra tidligere opgave.

// import { NextResponse } from 'next/server'

// const PROTECTED_ROUTES = ['/dashboard', '/admin', '/profile']
// const PUBLIC_ROUTES = ['/', '/login', '/register', '/about', '/product']

// const SECURITY_HEADERS = {
//   'X-Frame-Options': 'DENY', // Forhindre clickjackng ved at blokere indlejring i frames/iframes
//   'X-Content-Type-Options': 'nosniff', // Forhindre MIME type sniffing, beskytter mod fx (billeder serveret som malicious kode)
//   'Referrer-Policy': 'origin-when-cross-origin', // sender kun fuld url til samme origin
//   'X-XSS-Protection': '1; mode=block' // Aktiverer browserens indbyggede XSS beskyttelse
// }

// export async function middleware(request) {
//   const { pathname } = request.nextUrl
//   const url = request.nextUrl.clone() // Immutability

//   const response = NextResponse.next()

//   Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
//     response.headers.set(key, value)
//   })

//   const isProtectedRoute = PROTECTED_ROUTES.some(route =>
//     pathname.startsWith(route)
//   )
  
//   const isPublicRoute = PUBLIC_ROUTES.some(route => 
//     pathname === route || pathname.startsWith(route + '/')
//   )

//   if (!isPublicRoute && !isProtectedRoute) {
//     return NextResponse.rewrite(new URL('/not-found', request.url))
//   }

//   if (isProtectedRoute) {
//     const token = request.cookies.get('auth-token')?.value

//     if (!token) {
//       url.pathname = '/login'
//       url.searchParams.set('callbackUrl', pathname)
//       return NextResponse.redirect(url)
//     }

//     // TODO: Add token validation logic here
//     // const isValidToken = await validateToken(token)
//     // if (!isValidToken) {
//     //   url.pathname = '/login'
//     //   return NextResponse.redirect(url)
//     // }
//   }

//   const isAuthPage = pathname === '/login' || pathname === '/register'
//   const hasToken = request.cookies.get('auth-token')?.value

//   if (isAuthPage && hasToken) {
//     url.pathname = '/dashboard'
//     return NextResponse.redirect(url)
//   }

//   return response
// }

// /*
//  * Match all request paths except:
//  * - api routes
//  * - _next/* (all Next.js internal files)
//  * - favicon.ico (favicon file)
//  * - files with extensions (images, css, js, etc.)
//  */
// export const config = {
//   matcher: ['/((?!api|_next|favicon.ico|.*\\.).*)']
// }
import { NextResponse } from 'next/server';

export function middleware(request) {
  return NextResponse.next();
}