# Firebase Authentication Implementation Plan

This plan outlines the steps to implement Firebase Authentication with Google and Phone (OTP) sign-in for the Next.js `zhivam-web` application, replacing the existing placeholder auth provider and setting up session-based authorization and protected routes.

## User Review Required

> [!WARNING]
> **Firebase Configuration & MCP Constraints:** The Firebase MCP does not have automated API capability to fully enable *Phone (OTP)* providers or easily inject Authorized Domains via CLI/Tooling. I will need you to manually verify the Google and Phone providers are enabled in your [Firebase Console](https://console.firebase.google.com/), and that the localhost/deployed urls are listed under Authorized Domains.

> [!IMPORTANT]
> Environment variables need to be correctly configured in your `.env.local`:
> - Ensure your Firebase client SDK keys are placed.
> - Ensure `FIREBASE_PRIVATE_KEY` uses actual newlines (`\n`) for the Admin SDK.

## Proposed Changes

### Configuration and Setup

#### [MODIFY] .env.local
I will configure `.env.local` to manage both Client and Admin SDK keys securely.

#### [NEW] lib/firebase.ts
I will initialize the Firebase client SDK here (singleton approach), exporting `app`, `auth`, and `db`.

#### [NEW] lib/firebase-admin.ts
I will initialize the Firebase Admin SDK here (singleton approach), exporting `adminAuth` and `adminDb` to be used for server-side verification.

---

### Authentication Context

#### [NEW] context/AuthContext.tsx
I will create the robust `AuthContext` adhering to the `AuthUser` interface and containing all auth logic (`signInWithGoogle`, `sendOTP`, `verifyOTP`, `signOut`). It will cleanly sync Firebase Auth state with Firestore documents at `/users/{uid}`.

#### [DELETE] app/components/AuthProvider.tsx
I will remove the old placeholder provider.

#### [MODIFY] app/layout.tsx
I will rename the imports to map exactly to the newly created `context/AuthContext.tsx`.

---

### UI Components and Pages

#### [MODIFY] app/components/Navbar.tsx
I will adjust the auth logic inside `Navbar.tsx` to integrate with the new `AuthContext`, displaying a skeleton while loading, rendering user's `displayName` + location alongside an Admin badge if applicable, and showing a dropdown as requested.

#### [NEW] app/auth/page.tsx
I will build a beautiful Tailwind-styled page containing two distinct tabs:
- **Tab 1: Google Login**
- **Tab 2: Phone OTP** (incorporating a `RecaptchaVerifier` instance on a hidden container).

---

### Routing & Middleware

#### [NEW] app/api/auth/session/route.ts
I will create `POST` to generate the 7-day `__session` HTTP-only cookie using the Admin SDK and `DELETE` to clear the `__session` cookie.

#### [DELETE] app/api/auth/route.ts
I will remove the old redundant session API logic that was mapping to the previous `AuthProvider` design.

#### [NEW] middleware.ts
I will create top-level middleware that inspects requests to `/admin/*`, `/checkout`, and `/orders/*`. It will verify the existence of the `__session` cookie and redirect unauthenticated users to `/auth`.

## Open Questions

> [!CAUTION]
> The prompt specifically asks to use the **Firebase MCP server** to enable the auth providers. The Firebase MCP provides `firebase_init` which allows configuring the `googleSignIn` provider, but *does not currently support automated Phone (OTP) initialization*. Do you want me to attempt to configure Google Auth via `firebase_init`, or will you configure both manually in the Firebase Console?

> [!CAUTION]
> `package.json` reveals `firebase` and `firebase-admin` are already installed and listed as dependencies. Should I still run `npm install firebase`, or proceed directly to modifying the codebase?

## Verification Plan

### Automated Tests
- Running `npm run build` to intercept Typescript definition mismatches.
- Serving `npm run dev` to access the application locally.

### Manual Verification
1. Open up `/auth` and initiate the **Google Sign-In** flow. Verify document creation in Firestore via MCP.
2. Initiate the **Phone OTP** flow with the test number (`+91 9999999999`). Receive standard response, inject `123456`, verify success.
3. Verify session cookie persistence upon reloading the application.
4. Attempt to access `/admin` and confirm it blocks/redirects correctly when not authenticated, or allows access if admin email match is confirmed.
