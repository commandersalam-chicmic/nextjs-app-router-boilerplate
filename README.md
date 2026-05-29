# Next.js App Router Boilerplate

Standalone Next.js 16 App Router boilerplate with auth, guards, ACL, services, and shared conventions. No MUI.

---

## Tech stack

| Category  | Choice                                                                                                                               |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Framework | **Next.js 16.2** (App Router, React Server Components, Turbopack)                                                                    |
| UI        | **React 19**, **TypeScript 5**, **Tailwind CSS 3** (CSS variables, light/dark)                                                       |
| State     | **Zustand** (module-specific stores, e.g. `auth-store`)                                                                              |
| Forms     | **React Hook Form** + **Zod** + **@hookform/resolvers**                                                                              |
| HTTP      | **Axios** (`axiosInstance` with interceptors + typed helpers)                                                                        |
| Other     | **next-themes**, **Sonner** (toast), **i18next** + **react-i18next**, **Lucide React**, **clsx** + **tailwind-merge**, **DOMPurify** |

---

## Routes

| Path      | Group      | Description                  |
| --------- | ---------- | ---------------------------- |
| `/`       | `(common)` | Home (auth-required)         |
| `/login`  | `(auth)`   | Sign in (guest-only)         |
| `/forget` | `(auth)`   | Forgot password (guest-only) |

Route groups do not affect the URL: `(auth)/login` → `/login`, `(common)/page` → `/`.

---

## Project structure

- **Barrel-only index files** – `index.ts` only re-exports; no implementation.
- **Hyphenated file names** – All source files use **kebab-case** (e.g. `login-form.tsx`, `auth-guard.tsx`).

```
src/
├── app/
│   ├── (auth)/                 # Public auth routes
│   │   ├── layout.tsx          # export default withGuestGuard(Layout)
│   │   ├── login/page.tsx      # /login
│   │   └── forget/page.tsx     # /forget
│   ├── (common)/               # Protected route group (authenticated shell)
│   │   ├── layout.tsx          # export default withAuthGuard(Layout)
│   │   ├── template.tsx        # Route transition wrapper (page enter animation)
│   │   ├── loading.tsx         # `<SplashScreen variant="segment" />` while segment pending
│   │   └── page.tsx            # Home (/)
│   ├── api/                    # Example API routes (can be replaced by real backend)
│   │   ├── auth/login/route.ts
│   │   ├── auth/logout/route.ts
│   │   ├── health/route.ts
│   │   └── user/me/route.ts
│   ├── globals.css
│   └── layout.tsx              # html/body + RootLayout from layouts/root
├── locales/                    # `en.json`, `hi.json` — single namespace; loaded in root i18n provider
├── styles/
│   └── theme/                  # `themePalette` (hex) + barrel; Tailwind `palette-*` colors in `tailwind.config.ts`
├── components/                 # Atomic design (atoms → molecules → organisms)
│   ├── atoms/                  # Button, Label, FormLabel, Input, Textarea, Form*, ErrorMessage
│   ├── molecules/              # Card, FormField, FormFieldTextarea
│   ├── organisms/              # AppHeader, Form, LoginForm
│   ├── providers/              # ThemeProvider (next-themes)
│   ├── custom/                 # splash-screen, when, toast, require-permission, **dev-tool-overlay** (API log + **Copy cURL**), language-switcher
│   └── index.ts
├── layouts/                    # App shells (route-group layouts compose from here)
│   ├── root/                   # RootLayout: theme, i18n, `GlobalLoadingOverlay`, toast, **DevToolOverlay** (network log + cURL copy)
│   ├── public/                 # PublicLayout (guest auth chrome)
│   ├── private/                # MainLayout → DynamicLayout → VerticalLayout
│   └── auth/                   # card/, container/ — optional auth page wrappers
├── section/                      # Page/area sections (e.g. home/*)
│   └── home/                     # nav, hero, footer, stack-section, … + index.ts barrel
├── constants/                  # app.ts, assets.ts, ui.ts (routes, scroll ids, i18n codes) — no theme colors
├── helpers/                    # validation, format, remove-empty-keys, generate-payload-query, index.ts
├── lib/
│   ├── security/               # csp.ts (CSP header), sanitize.ts (DOMPurify helpers), index.ts
│   ├── errors/                 # handlers.ts (handleServerError + helpers), index.ts
│   ├── toast.ts                # Re-export Sonner toast for services
│   └── utils.ts                # Shared library-level helpers
├── regex/                      # patterns.ts (EMAIL, SLUG, etc.), index.ts
├── services/
│   ├── api/                    # auth.service, user.service, health.service (domain-specific APIs)
│   ├── urls/                   # API_BASE_URL, API_VERSION, API_BASE_PATH, API_ENDPOINTS
│   ├── axios.ts                # axiosInstance + interceptors (CSRF, 401 handling, abort, logging)
│   ├── common.ts               # httpGet/httpPost/httpPut/httpPatch/httpDelete helpers
│   └── local-storage.ts        # StorageTypes enum + LocalStorage helper (localStorage/cookies/session)
├── store/                      # auth-store, **dev-tool-store** (Axios traffic log + generated cURL for DevToolOverlay)
├── types/                      # common.ts, api.ts, index.ts
├── utils/                      # cn.ts (clsx + tailwind-merge), index.ts
├── routes/                     # paths.ts (ROUTES), path-builders.ts (paths.*), config.ts (guards, PROTECTED_PATHS, etc.), index.ts
├── guards/                     # auth-guard, guest-guard, index.ts
├── hocs/                       # with-auth-guard, with-guest-guard, index.ts
├── hooks/                      # use-acl (ROLES, PERMISSIONS, useRole, useAcl, useHasPermission)
└── middleware.ts               # Protects routes by token cookie; redirects to login with returnTo
```

---

## Conventions & practices

### Naming

- **Files:** kebab-case only (e.g. `login-form.tsx`, `auth-guard.tsx`).
- **Components / exports:** PascalCase for components, camelCase for functions and hooks (e.g. `LoginForm`, `useHasPermission`).

### Imports & types

- Use **explicit React types** from `"react"` (e.g. `import type { ReactNode, ReactElement, ComponentType } from "react"`) instead of `React.*` globals.
- **Component props** are typed as `Readonly<Props>` where applicable (Sonar-friendly).
- No unused imports; consolidate type imports when possible.

### Paths & routing

- **`@/routes`** – `ROUTES` constants, `paths.home`, `paths.login({ returnTo })`, `paths.forget()`, `buildPath()`, and route config: `PROTECTED_PATHS`, `GUEST_ONLY_PATHS`, `isProtectedPath()`, `isGuestOnlyPath()`.
- **Middleware** – Redirects protected paths to `/login` when `token` cookie is missing; sets `returnTo` for post-login redirect.

### Guards & HOCs

- **AuthGuard** – Renders children only when authenticated; otherwise redirects to login. Used only via **`withAuthGuard`** in `(common)/layout.tsx`.
- **GuestGuard** – Renders children only when not authenticated; otherwise redirects home. Used only via **`withGuestGuard`** in `(auth)/layout.tsx`.
- **withAuthGuard(Component)**, **withGuestGuard(Component)** – Layout-level HOCs that wrap the inner layout component with the corresponding guard.

### ACL (access control)

- **Hooks:** `useRole()`, `useAcl()`, **`useHasPermission(permission)`** from `src/hooks/use-acl.ts`. These expose `ROLES`, `PERMISSIONS`, `ROLE_PERMISSIONS`, and `hasPermission(role, permission)` from one place.
- **RequirePermission** – UI component in `components/custom/require-permission.tsx` that renders children only when the user has the given permission; optional `fallback`. Prefer `useHasPermission(permission)` inside components for conditional UI.
- User role comes from `auth-store.user?.role`; there is no separate ACL guard/HOC – routing protection is handled by route config + middleware + auth guards.

### Services & store

- **Services** own all API calls and **toast** usage for success/error. Components call store actions (e.g. `login(payload)`); stores call services. No API toasts in components.
- **Axios** – Single `axiosInstance` in `src/services/axios.ts`:
  - Base URL and versioning from `API_BASE_PATH` in `src/services/urls`.
  - Request interceptors add CSRF token/header (via `setCSRFToken`), enable `withCredentials`, attach `AbortController`, and track start time.
  - Response interceptors compute request duration, log basic info, handle cancellations, and on `401` clear auth state via `auth-store` and redirect to `paths.login({ returnTo })`.
- **Common HTTP helpers** – `httpGet/httpPost/httpPut/httpPatch/httpDelete` in `src/services/common.ts` wrap `axiosInstance` and return typed `response.data`.
- **Local storage** – `src/services/local-storage.ts` centralizes access to `localStorage`, cookies, and session storage via `StorageTypes` and `LocalStorage`.

### Developer tooling (network & cURL)

- **`DevToolOverlay`** (`src/components/custom/dev-tool-overlay.tsx`) — floating control in the root shell opens a drawer of recent **`axiosInstance`** traffic (wired in `src/services/axios.ts`).
- **`src/store/dev-tool-store.ts`** — **`useDevToolStore`** keeps a capped list of **`NetworkRequestLog`** entries (method, URL, headers, body, status, duration). Interceptors **`addRequest`** / **`updateRequest`** on each call.
- Every log row shows a **generated cURL** (`generateCurl` in the same store: `-X`, quoted URL, `-H` lines, `-d` for JSON/primitives with safe shell quoting). Use **Copy cURL** on a row to paste into a terminal for debugging or handoffs.

### Errors

- **`handleServerError(error, suppressToastIfFieldErrors?, fullSuppress?)`** – Centralized handler in `src/lib/errors/handlers.ts` that:
  - Parses Axios error responses into `{ message?: string; errors?: FieldError[] }`.
  - Optionally shows a toast (via `@/lib/toast`) when appropriate.
  - Returns `{ message, errors }` for callers (services, stores, forms) to use.
- **Form helpers** – `applyServerErrorsToRHForm` and `mapServerKeyToFormKey` to map server-side field errors onto React Hook Form fields.

### Security

- **CSP** – `src/lib/security/csp.ts` defines a strict Content Security Policy _without_ `unsafe-inline` or `unsafe-eval` for scripts/styles. Extend per-environment as needed.
- **Headers** (in `next.config.ts`): CSP from `src/lib/security/csp.ts`, plus `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`.
- **Sanitization:** `sanitizeHtml(html, config?)` and `sanitizeText(html)` in `src/lib/security/sanitize.ts` for user-generated content (XSS prevention).

### Forms

- **Atoms:** Button, Label, FormLabel, Input, Textarea, FormControl, FormHelperText, ErrorMessage. **Molecules:** FormField, FormFieldTextarea, Card. **Organisms:** Form, LoginForm.
- **Form** – `<Form form={form} onSubmit={onSubmit}>` with RHF; validation via Zod + `zodResolver`. LoginForm calls `login(data)` from store only; no direct store writes in the form.
- **Button** – Optional **`hoverAnimation`** (default `false`): lift/shadow on hover. Use for primary CTAs (e.g. sign-in submit). **`iconOnly`** skips motion even when `hoverAnimation` is set.

### Theming

- Brand colors live in **`src/styles/theme/palette.ts`** as **`themePalette`** (exported from `src/styles/theme/index.ts`).
- Use Tailwind utilities **`palette-*`** (e.g. `bg-palette-charcoal`, `text-palette-sandstone`) — do not duplicate hex values in components.

### i18n

- Copy in **`src/locales/*.json`**; components use **`useTranslation()`** from `react-i18next`.
- **Splash / loading** titles are neutral (not “welcome”) so they work for sign-in, sign-out, or any busy state — keys under `splash.*`.

### UI helpers

- **When** – `<When condition={x}>{() => <Content />}</When>` for conditional render (render function supports code-splitting). Define conditional content as separate components and pass data via props; use `When` with a render function as children. Lives in `components/custom/when.tsx`.
- **Toast** – Import `toast` from `@/lib/toast` in services; from `@/components` (which re-exports from `components/custom/toast`) in UI when needed. The `ToastProvider` component (Sonner `<Toaster />`) lives under `components/custom/toast`.

### Helpers

- **removeEmptyKeys(obj, options?)** – Removes `null`, `undefined`, `""`; optional `removeEmptyArrays` / `removeEmptyObjects`.
- **generatePayloadQuery(params)** – Builds query string; skips null/undefined/empty. Use with `removeEmptyKeys` for API query params.
- **isValidEmail**, **formatDisplayDate** – From `@/helpers`.

### Linting & formatting

- **ESLint** – Root `.eslintrc.json` extends:
  - `next/core-web-vitals`, `eslint:recommended`, `plugin:@typescript-eslint/recommended`
  - `plugin:import/recommended`, `plugin:import/typescript`
  - `plugin:jsx-a11y/recommended`, `plugin:sonarjs/recommended`, `prettier`
- **Plugins** – `@typescript-eslint`, `import`, `jsx-a11y`, `unused-imports`, `sonarjs`.
- **Key rules**:
  - Enforced import order (`@/**` treated as internal), no unused imports, prefer `Readonly<Props>` for React component props.
  - Strict TypeScript settings with isolated modules and bundler module resolution.
- **Prettier** – `.prettierrc` with 2-space indentation, `printWidth: 100`, `semi: true`, `trailingComma: "all"`. Run via IDE format-on-save or CLI.

---

## Scripts

| Command              | Description                                      |
| -------------------- | ------------------------------------------------ |
| `npm run dev`        | Dev server (Turbopack)                           |
| `npm run build`      | Production build                                 |
| `npm run start`      | Production server                                |
| `npm run lint`       | ESLint                                           |
| `npm run test`       | Vitest (unit / component tests)                  |
| `npm run test:watch` | Vitest watch mode                                |
| `npm run test:e2e`   | Playwright (`e2e/`); starts dev server if needed |

## Testing

- **Vitest** – `src/**/*.test.tsx` (e.g. `Button`, `LoginForm`). Run `npm run test`.
- **Playwright** – `e2e/*.spec.ts`. Run `npm run test:e2e` (uses `playwright.config.ts` **webServer** to run `npm run dev` unless `CI` / reuse is set).
- Prefer **accessible locators** (`getByRole`, `getByLabel`) and **case-insensitive name regex** where copy comes from i18n (e.g. `/sign out/i` vs hard-coded `"Sign Out"`).

---

## Setup

1. `cd nextjs-app-router-boilerplate && npm install`
2. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_API_URL` if using an external API.
3. `npm run dev` → http://localhost:3000

For **E2E**, install browsers once: `npx playwright install` (Chromium is enough for the default project), then `npm run test:e2e`.

---

## Share message (for teams / channels)

Copy the block below when sharing this boilerplate:

---

**Next.js App Router Boilerplate**

We’re sharing a **Next.js 16 App Router** boilerplate you can use as a starting point for new apps. Here’s what it includes and how we expect it to be used.

**Stack:** Next.js 16.2, React 19, TypeScript, Tailwind CSS, Zustand, next-themes, Sonner, i18next, React Hook Form + Zod + @hookform/resolvers, Axios. No MUI.

**Features**

- **Routes:** Home (`/`), Login, Forgot password. Route groups `(auth)` (guest-only) and `(common)` (auth-required); URL paths unchanged.
- **Auth:** Auth store (`user`, `loading`, `setLoading`, `login`, `fetchUser`, …); `GlobalLoadingOverlay` in root shows `SplashScreen` while `loading` is true; segment `loading.tsx` uses `SplashScreen variant="segment"`. Splash copy is generic (`splash.*` in locales). Dummy API routes for login, logout, user/me, health.
- **Public auth layout:** `PublicLayout` keeps outer `select-none` but **`select-text`** on `<main>` so login/forgot text and demo credentials stay selectable/copyable.
- **Guards & HOCs:** `AuthGuard` / `GuestGuard` are used **only inside** `withAuthGuard` / `withGuestGuard` in `src/hocs/`; segment layouts export `withAuthGuard(Layout)` or `withGuestGuard(Layout)`. Middleware redirects protected paths to login when token cookie is missing (with `returnTo`).
- **ACL:** Roles and permissions in config; hooks `useRole()`, `useAcl()`, **`useHasPermission(permission)`**; optional **RequirePermission** component for permission-gated UI.
- **Services:** Single Axios client with interceptors; auth, user, health services. **Toasts only in services** for API success/error; components don’t trigger API toasts.
- **Dev tools:** **DevToolOverlay** + **dev-tool-store** capture outgoing Axios requests and expose a **Copy cURL** command per request for local debugging.
- **Errors:** `getErrorMessage()` for any error shape; `handleServerError` / `handleApiError` in catch blocks with optional notify.
- **Security:** CSP and hardening headers in next.config; DOMPurify for sanitizing user-generated HTML.
- **Forms:** Atomic components (Button with optional `hoverAnimation`, Input, Label, …); Zod + RHF.
- **Helpers:** `removeEmptyKeys`, `generatePayloadQuery`, validation/format helpers; centralized regex patterns.

**Conventions & rules**

- **File names:** **Hyphenated (kebab-case)** only (e.g. `login-form.tsx`, `auth-guard.tsx`).
- **Barrel-only index files:** No logic in `index.ts`; only re-exports.
- **Explicit React types:** Use `ReactNode`, `ReactElement`, `ComponentType` from `"react"` instead of global `React`. Component props as `Readonly<Props>` where it makes sense.
- **No unused imports;** keep a single naming style (kebab-case for files).
- **When component:** Use `<When condition={x}>{() => <Component />}</When>` for conditional UI; define components at module level and pass data as props. Named handlers in JSX where it helps readability.

Use this as the base for new projects and keep these conventions so we stay consistent across repos.

---

**Developed by Commander Salam (Mark CNS)**
