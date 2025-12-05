# GitHub Repository Explorer

![レコーディング 2025-12-01 131355](https://github.com/user-attachments/assets/96f1077f-0290-42b0-bb92-34f0d77c3063)


You can access this app from https://github-repository-explorer-orcin.vercel.app/

This project was developed with the goal of addressing the technical debt from my previous project (crypto-dashboard) and incorporating new technologies.

## 🚀 Tech Stack

### Core
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)

### State & Cache
![TanStack Query](https://img.shields.io/badge/-TanStack%20Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white)
![LocalStorage](https://img.shields.io/badge/LocalStorage-gray?style=for-the-badge)

### UI / Styling
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Shadcn UI](https://img.shields.io/badge/Shadcn%20UI-000000?style=for-the-badge&logo=shadcnui&logoColor=white)

### Testing
![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)

## 📝 Theme & Requirements

**Theme:** A system to search, view, and manage favorites for GitHub repositories.

**Key Requirements:**

  - Infinite Scroll
  - Theme Switching (Dark/Light mode)
  - Application involving page transitions
  - Favorites management
  - Implementation of specific algorithms (LRU for caching)
  - E2E Testing

-----
## 🏛️Main Architecture
<img width="2930" height="1542" alt="Untitled diagram-2025-11-29-043623" src="https://github.com/user-attachments/assets/5a6fb774-14ea-462c-90d1-861707643a95" />

**Feature:** 

 - store query parameters to reuse by TanStack and Zutand
 - Zustand controls the search criteria and TanStack manages the server data (separation of concerns)

-----
## 📅 Development Schedule & Journey

### Day 1: Architecture & API Research

**Focus:** Addressing security issues from the previous project where API tokens were exposed on the client side.

  - **Goal:** Implement proper API abstraction and token concealment.
  - **Challenges:** - Deciding between Personal Access Tokens and GitHub Apps for authentication.
      - Designing the file structure to optimize the data flow: `Client -> Hooks -> Route Handlers -> GitHub API`.
  - **Outcome:** The initial understanding of Next.js specs vs. GitHub API specs was challenging, but the foundation and library installation were completed.

### Day 2: Route Handlers & Type Safety

**Focus:** Implementing server-side logic and ensuring type safety.

  - **Process:** Utilized AI to clarify the Route Handler specifications and implemented `route.ts` and custom hooks.
  - **Challenge:** GitHub API responses are complex and untyped by default.
  - **Solution:** Introduced **Zod** to parse responses, ensuring a robust `Repository` type definition and preventing runtime errors.

### Day 3: Caching, Infinite Scroll, & UX Improvements

**Focus:** Enhancing user experience and performance.

  - **Caching (Zustand):** Implemented a feature to save search results and query info to `localStorage`, allowing users to access recent searches even after closing the app.
  - **Infinite Scroll:** Combined `useInView` with `useInfiniteQuery` for seamless data loading.
  - **Breadcrumbs:** Implemented logic to save query parameters during search and retrieve them on detail pages. Clicking "Home" uses these parameters to navigate back to the cached search state (leveraging the synergy between TanStack Query and Zustand).

### Day 4: Testing (E2E/Integration) & CI/CD

**Focus:** Shifting from just E2E to a full CI/CD pipeline.

  - **Goal:** Automate testing and deploy to Vercel via GitHub Actions.
  - **Challenges:** - API rate limits in the CI environment caused tests to fail.
      - Playwright cannot intercept server-side requests (Route Handlers), and setting up MSW for Server Components was too time-consuming due to Node.js dependency issues.
  - **Solution:** Implemented internal mock data and helper functions within `github.ts` to bypass external API calls during testing. Successfully deployed to Vercel after passing CI.

### Day 5: Strengthening CI/CD

**Focus:** Reliability.

  - **Issue:** Deployments were proceeding even if tests failed.
  - **Solution:** Configured **Branch Protection Rules**. Now, deployments only occur when the CI pipeline (tests) passes successfully.

-----

## 💡 Key Takeaways

### Design & Architecture

  - **API Knowledge:** Gained a deep understanding of GitHub API specifications.
  - **Route Handlers:** Understood the value of Route Handlers for hiding secrets and organizing file structures to match API endpoints.
  - **Caching Strategy:** Learned the importance of distinguishing between persistent storage (`localStorage` via Zustand) and server state/RAM caching (TanStack Query).

### Implementation

  - **Feature Development:** Acquired skills to implement common web app features like favorites, history, and infinite scroll.
  - **Algorithm Optimization:** Implemented the **LRU (Least Recently Used)** algorithm to optimize `localStorage` usage for search history.
  - **Next.js Routing:** Learned how to retrieve and utilize search parameters in `page.tsx`.

### Testing

  - **Environment Complexities:** Setting up a test environment can be a "rabbit hole." Using community-recommended templates is often the safest bet.
  - **Mocking Strategy:** Due to strict API limits in CI, server-side mocking is essential for E2E tests. If standard tools (like MSW) face configuration issues, creating an in-app mocking strategy is a valid fallback.

-----

## 🔥 Future Challenges

### Design & Implementation

  - **Architecture:** Implement Repository Pattern and Dependency Injection (DI) for better separation of concerns.
  - **CDD:** Adopt Component Driven Development using Storybook.
  - **Server Actions:** Explore Next.js Server Actions for data mutations.

### Testing

  - **Execution Environment:** Distinguish clearly between code running in the Browser, Node.js, or JSDOM to identify error causes faster.
  - **Best Practices:** Start with official recommended configurations and rely on documentation.
  - **Purity:** Use Dependency Injection to maintain the purity of application code.
  - **Mock Drift:** mitigate the risk of Mock Drift (where mocks become outdated compared to the real API) by implementing Shared Fixtures or Contract Testing.
  - **Test Design:** Organize tests using the Container/Presentational pattern and clarify testing guidelines for edge cases.

-----

## ⚙️ Refactoring 

-   - **SSR:** Delegate the processing from the Client Component to the server side, and then cache the displayed data using useQuery to achieve a hybrid architecture.(2025/12/4)

