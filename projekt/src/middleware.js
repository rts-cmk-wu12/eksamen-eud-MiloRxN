import { NextResponse } from 'next/server';

const PROTECTED_ROUTES = ['/dashboard', '/profile', '/my-listings'];
const AUTH_ROUTES = ['/login', '/register'];

const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'origin-when-cross-origin',
  'X-XSS-Protection': '1; mode=block',
};

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('sh_access_token')?.value;
  const url = request.nextUrl.clone();

  const response = NextResponse.next();
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }

  if (PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
    if (!token) {
      url.pathname = '/not-authorized';
      return NextResponse.redirect(url);
    }
  }

  if (AUTH_ROUTES.some(route => pathname.startsWith(route))) {
    if (token) {
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }
  }

  return response;
}

// Match all routes except static files and API by
// explaining of regex how it works:
// - Negative lookahead to exclude /api, /_next, favicon.ico, and any file with an extension
// - Matches everything else
export const config = {
  matcher: ['/((?!api|_next|favicon.ico|.*\\.).*)'],
};
