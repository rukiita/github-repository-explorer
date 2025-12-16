## 🔄 Migration Report: Next.js to Hono + Vite (Monorepo Strategy)

### 🛡️ Background & Motivation
In response to the reported vulnerability **CVE-2025-55182** concerning React Server Components (RSC), we have strategically migrated the `GithubRepositoryExplorer` application from Next.js to a decoupled architecture using **Hono (Backend)** and **Vite (Frontend)**.

This migration eliminates the dependency on the affected RSC layer, improves security governance, and transitions the application into a lightweight, edge-compatible stack.

### 🏗️ Migration Process

We adopted a Monorepo structure to strictly separate concerns between the Client and the API Server.

#### 1. Architecture Restructuring (Monorepo Setup)
* **Directory Structure:** Established an `apps/` directory to manage `frontend` (Vite) and `backend` (Hono) independently within the same repository.
* **Decoupling:** Moved away from Next.js API Routes to a standalone Hono server, enabling potential deployment to Edge environments (e.g., Cloudflare Workers).

#### 2. Backend Implementation (Hono)
* **Server Setup:** Initialized the Hono server and configured middleware (CORS, Logger, Security Headers).
* **Schema Validation:** Integrated **Zod** to validate request/response payloads, ensuring type safety matches the frontend expectations.
* **Environment Variables:** Migrated server-side secrets to Hono's `Context` adapter pattern.

#### 3. Frontend Implementation (Vite + React)
* **Asset Migration:** Ported components, hooks, global contexts, and Zustand stores from the Next.js project.
* **Routing System:** Replaced file-system routing (Next.js) with **React Router v6.4+ (Data Router)**.
    * Converted `next/link` and `next/router` to `react-router-dom` equivalents.
* **Data Fetching Strategy:**
    * Implemented **Loaders** for "Render-as-You-Fetch" performance.
    * Clarified the separation of duties: **Loaders** handle initial prefetching, while **TanStack Query** manages caching and background updates.

#### 4. Optimization & Final Adjustments
* **Query Optimization:** Extracted query configurations to dedicated files for better maintainability.
* **Production Readiness:** Configured strict environment variable handling for production builds and finalized the build pipeline.

---

### ⚠️ Key Challenges & Technical Considerations

During the migration, several Next.js-specific features required careful adaptation. Developers working on this repo should be aware of the following:

#### 1. Environment Variables Syntax
* **Change:** `process.env.NEXT_PUBLIC_*` ➡️ `import.meta.env.VITE_*`
* **Note:** Vite exposes environment variables on the special `import.meta.env` object. Accessing `process.env` in the client code will cause runtime errors.

#### 2. Routing Logic & Data Loading
* **Change:** `getServerSideProps` / `useEffect` ➡️ **React Router Loaders**
* **Note:** We no longer fetch initial data inside components. Data fetching is hoisted to the Route definition level using `loader`. This prevents "waterfall" fetching and improves UX.

#### 3. Next.js Specific Components
* **`<Image />`**: Removed Next.js image optimization. Replaced with standard `<img>` tags (or a custom optimization wrapper if needed).
* **`<Head />`**: Replaced Next.js head management with standard HTML title/meta manipulation (or `react-helmet-async`).

#### 4. CORS & Proxy Development
* Since the frontend (Port 5173) and backend (Port 3000/8787) now run on different ports during development, appropriate CORS headers were configured on the Hono server to allow cross-origin requests.

#### 5. Strict Mode & Hydration
* Moving to a pure SPA (Single Page Application) architecture removed hydration mismatch errors common in SSR, but required stricter handling of `useEffect` cleanup and initial state definitions in strict mode.