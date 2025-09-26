# SwapHub - Eksamens opgave

**Navn:** Tobias Ricther Nielsen  
**Hold:** WU12  
**Valgfri opgave:** B & C

## Sådan kommer du i gang

### Frontend  

```bash
cd projekt
npm install
npm run dev
```
Access_point: http://localhost:3000/

### Apiet  
```bash
cd api
npm install
npm start
```
Access_point: http://localhost:4000/


## Tech-stack og Alternativer

### Next.js vs. Nuxt.js / Gatsby

**Alternativer:**

- Nuxt.js (Vue-baseret)  
- Gatsby (React-baseret, men statisk site generator)

**Hvorfor Next.js er bedre:**

- Next.js tilbyder både server-side rendering (SSR) og static site generation (SSG), hvilket gør det fleksibelt til både dynamiske og statiske sider.  
- Gatsby er primært til statiske sider og kræver mere opsætning for dynamisk indhold.  
- Nuxt.js er stærkt, men kræver at du skifter til Vue – hvilket bryder med din React-baserede stack og kan skabe kompleksitet.  
- Next.js har også indbygget API routes, hvilket gør det muligt at bygge backend direkte i samme projekt – det er effektivt og sparer tid.

---

### React vs. Angular / Vue

**Alternativer:**

- Angular (Google’s framework)  
- Vue.js (progressivt framework)

**Hvorfor React er bedre:**

- React har det største community og flest ressourcer, hvilket gør det lettere at finde hjælp og moduler.  
- Angular er tungere og har en stejlere læringskurve med TypeScript og mange konventioner.  
- Vue er lettere at lære, men har mindre enterprise-adoption og færre jobmuligheder i Danmark og globalt.  
- Reacts komponentbaserede tilgang og hooks gør det nemt at bygge genbrugelige og testbare UI-elementer.

---

### Tailwind vs. Bootstrap / Material UI

**Alternativer:**

- Bootstrap (klassisk CSS framework)  
- Material UI (Google’s design system)

**Hvorfor Tailwind er bedre:**

- Tailwind giver dig fuld kontrol over design uden at tvinge dig til at følge et bestemt design-system.  
- Bootstrap kan føles begrænsende og ensformigt – mange sites ligner hinanden.  
- Material UI er tungt og kræver tilpasning for at bryde ud af Googles designfilosofi.  
- Tailwind er lettere at integrere med React og giver hurtigere udvikling med utility-klasser.

---

### Zod vs. Joi / Yup

**Alternativer:**

- Joi (validering via schema)  
- Yup (validering med inspiration fra Joi)

**Hvorfor Zod er bedre:**

- Zod er TypeScript-first, hvilket betyder at du får type-sikkerhed direkte fra dine valideringsregler.  
- Yup og Joi kræver ekstra konvertering for at få types ud af schemaet.  
- Zod er lettere at integrere med moderne React-form libraries som React Hook Form.

---

### React-icons vs. FontAwesome / Heroicons

**Alternativer:**

- FontAwesome (klassisk ikonbibliotek)  
- Heroicons (SVG-baseret, ofte brugt med Tailwind)

**Hvorfor React-icons er bedre:**

- React-icons samler mange ikonbiblioteker i ét modul, så du kan vælge frit.  
- Det er lettere at bruge i React-projekter, da ikonerne er komponenter.  
- FontAwesome kræver ofte ekstra opsætning og stylesheets.  
- Heroicons er flotte, men begrænsede i antal og variation.

---

### Git vs. SVN

**Alternativer:**

- SVN (Subversion)  
- Mercurial (alternativ til Git)

**Hvorfor Git er bedre:**

- Git er industristandard og understøttes af GitHub, GitLab og Bitbucket.  
- SVN og Mercurial er ældre og har mindre community.  
- Git giver dig branches, pull requests og nem samarbejde – perfekt til moderne udvikling.


## Kode-eksempel: Middleware-funktion
**Fil:** `src/middleware.js`

```jsx
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
      url.pathname = '/not-authorised';
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
```
I min middleware bruger jeg Next.js' `NextResponse` til at håndtere HTTP-responsen og tilføje sikkerhedsheaders til alle svar.

Jeg definerer to arrays: `PROTECTED_ROUTES` og `AUTH_ROUTES`. Disse bruges til at bestemme, hvilke sider kræver login, og hvilke sider kun skal være tilgængelige for ikke-loggede brugere.

Jeg starter med at læse den aktuelle sti (`pathname`) og forsøger at hente en adgangstoken (`sh_access_token`) fra cookies.

Derefter opretter jeg et svar-objekt (`response`) og tilføjer alle sikkerhedsheaders fra `SECURITY_HEADERS` objektet. Dette beskytter mod clickjacking, MIME-sniffing og XSS-angreb.

Dernæst tjekker jeg, om brugeren forsøger at tilgå en beskyttet route. Hvis brugeren ikke har en gyldig token, bliver de omdirigeret til `/not-authorised`.

Omvendt, hvis brugeren forsøger at tilgå login- eller register-siderne, men allerede har en token (altså er logget ind), bliver de automatisk sendt til `/dashboard` for at undgå forvirring.

Til sidst returneres svaret med de tilføjede headers, hvis ingen af de ovenstående regler har ført til en redirect.

Denne middleware sikrer, at kun autoriserede brugere kan tilgå beskyttede sider, og at sikkerhedsheaders altid er sat korrekt på alle svar.



---

## Sikkerhedsovervejelser

Middleware-funktionen er en vigtig del af applikationens sikkerhedslag. Ved at tilføje HTTP-sikkerhedsheaders som `X-Frame-Options`, `X-Content-Type-Options` og `X-XSS-Protection`, beskytter vi brugeren mod typiske angreb som clickjacking, MIME-sniffing og cross-site scripting (XSS).

Derudover sikrer token-checket, at kun autoriserede brugere kan tilgå følsomme sider som `/dashboard` og `/profile`. Det reducerer risikoen for uautoriseret adgang og datalæk.

---

## Performance-overvejelser

Middleware-funktionen er let og effektiv, da den kun udfører simple checks og header-tilføjelser.  
Den påvirker ikke selve rendering eller datahentning, og den returnerer hurtigt et svar, medmindre der skal foretages en redirect.

Ved at bruge `NextResponse.next()` og kun manipulere headers og routing, undgår vi tunge operationer og bevarer hurtig responstid.

---

## Udvidelsesmuligheder

Denne middleware kan nemt udvides med flere funktioner:

- **Rate limiting:** Begræns antallet af requests pr. IP for at undgå misbrug.
- **Logging:** Log forsøg på adgang til beskyttede sider uden token.
- **Role-based access:** Udvid token-checket til at inkludere brugerroller og tilladelser.
- **Dynamic route protection:** Hent beskyttede routes fra en database eller config-fil i stedet for hardcoded arrays.

Ved at holde strukturen modulær og enkel, er det nemt at tilføje nye sikkerhedslag uden at bryde eksisterende funktionalitet.

---



## Ændringer i designet

### Filter
De 3 filter knapper som beskrevet i designet uden valgfri opgave A,
jeg har valgt at lave om på pris filter, da vi ikke arbejder med priser.
Jeg har lavet følgende filter istedet som jeg syntes gav mening. newest, oldest, a-z, z-a.

Søge feltet kan søge både på Title, Description, users Firstname & lastname

### Login Formular.
Har valgt at fjerne "Forgot Password?", da apiet ikke understøtter det.

### Header
Har valgt at navngive contact for newsletter det gav bedre mening.
har lavet community om til my-listings


## Ændringer i Apiet
Nu tjekker API'et for om email allerede findes, når man opretter en bruger. Hvis emailen er i brug, returneres en conflict fejl (409).

```js
// /api/controllers/user.controller.js -> createSingleUser
const existingUser = await User.findOne({ where: { email: req.fields.email } });
if (existingUser) {
  return res.status(409).json({ error: "A user with this email already exists." });
}
// ... fortsæt med at oprette brugeren hvis email er unik
```