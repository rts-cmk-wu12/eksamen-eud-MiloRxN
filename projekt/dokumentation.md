# Dokumentation for 
Tobias Nielsen, WU12

# Sådan kommer du i gang

Frontend  

`npm install`

`npm run dev`

Access_point: http://localhost:3000/

Apiet  
`cd landrup-api`

`npm install`

`npm start`

Access_point: http://localhost:4000/



<!-- Jeg har lavet valgfri opgave ?

## Tech-stack
* **Next.js.**  
Et front-end framework baseret på React.js som også giver adgang til server-side komponenter og -actions, samt mappebaseret routing.
Server-side komponenter og funktioner giver en større sikkerhed, da al koden afvikles på serveren fremfor i klienten.

* **React**   
Et bibliotek der giver mig mulighed for at lave komponenter og håndtere states på en god og let måde. react har et stort og aktivt community med et stort modul-bibliotek, som er aktivt, vel-dokumenteret og vel-understøttet. Det er også det mest brugte front-end bibliotek i verden, så efterspørgslen på React-udviklere er stor.

* **Git**   
Et versionsstyringsværktøj, som lader mig lave branches og versioner af min kode, så jeg let kan gå tilbage til tidligere versioner, hvis jeg for eksempel har lavet en fejl. Jeg bruger Git sammen med GitHub.

* **Tailwind**   
Et utility-baseret mobile-first css bibliotek, som gør det simpelt og responsivt.

* **React-icons**  
Et ikon-bibliotek, som er beregnet på React.

* **Zod**  
Et valideringsBibliotek til objekter og strings. Jeg bruger Zod til blandt andet at validere bruger-input fra formularer.

## Kode-eksempel

### Middleware Funktionalitet

```javascript
// src/middleware.js
import { NextResponse } from 'next/server'

const PROTECTED_ROUTES = ['/dashboard', '/admin', '/profile']
const PUBLIC_ROUTES = ['/', '/login', '/register', '/about', '/product']

const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY', // Forhindre clickjackng ved at blokere indlejring i frames/iframes
  'X-Content-Type-Options': 'nosniff', // Forhindre MIME type sniffing, beskytter mod fx (billeder serveret som malicious kode)
  'Referrer-Policy': 'origin-when-cross-origin', // sender kun fuld url til samme origin
  'X-XSS-Protection': '1; mode=block' // Aktiverer browserens indbyggede XSS beskyttelse
}

export async function middleware(request) {
  const { pathname } = request.nextUrl
  const url = request.nextUrl.clone() // Immutability

  const response = NextResponse.next()

  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  const isProtectedRoute = PROTECTED_ROUTES.some(route =>
    pathname.startsWith(route)
  )
  
  const isPublicRoute = PUBLIC_ROUTES.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  )

  if (!isPublicRoute && !isProtectedRoute) {
    return NextResponse.rewrite(new URL('/not-found', request.url))
  }

  if (isProtectedRoute) {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      url.pathname = '/login'
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }

    // TODO: Add token validation logic here
    // const isValidToken = await validateToken(token)
    // if (!isValidToken) {
    //   url.pathname = '/login'
    //   return NextResponse.redirect(url)
    // }
  }

  const isAuthPage = pathname === '/login' || pathname === '/register'
  const hasToken = request.cookies.get('auth-token')?.value

  if (isAuthPage && hasToken) {
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return response
}

/*
 * Match all request paths except:
 * - api routes
 * - _next/* (all Next.js internal files)
 * - favicon.ico (favicon file)
 * - files with extensions (images, css, js, etc.)
 */
export const config = {
  matcher: ['/((?!api|_next|favicon.ico|.*\\.).*)']
}
```

**Middleware fungerer som en gatekeeper** der kører før alle requests når brugeren navigerer rundt på hjemmesiden. Den har tre hovedfunktioner:

**1. Sikkerhedsheaders:** Middleware tilføjer automatisk sikkerhedsheaders til alle svar fra serveren. `X-Frame-Options: DENY` forhindrer at siden kan indlejres i frames (beskytter mod clickjacking angreb). `X-Content-Type-Options: nosniff` stopper browseren i at gætte filtyper, hvilket forhindrer at fx billeder bliver fortolket som JavaScript. `Referrer-Policy` kontrollerer hvilke informationer der sendes videre når brugeren klikker på links.

**2. Route beskyttelse:** Funktionen `isProtectedRoute` tjekker om brugeren prøver at tilgå beskyttede sider som `/dashboard` eller `/admin`. Hvis brugeren ikke har en gyldig `auth-token` cookie, bliver de automatisk omdirigeret til login-siden med en `callbackUrl` parameter, så de kommer tilbage til den oprindelige side efter login.

**3. Automatisk omdirigering:** Hvis en bruger der allerede er logget ind (har auth-token) prøver at tilgå login/register siderne, bliver de automatisk sendt videre til dashboard for at undgå forvirring.

**NextResponse.rewrite()** bruges til at vise 404-siden for ukendte routes, mens **NextResponse.redirect()** sender brugeren til en ny URL. Konfigurationen med `matcher` sikrer at middleware ikke kører på API routes eller statiske filer som billeder og CSS.

---