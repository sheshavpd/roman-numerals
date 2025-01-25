# Roman Numerals Frontend

A React + TypeScript client application that interacts with the **Roman Numerals** backend to convert integers into Roman numerals. Built with **Vite**, **React Spectrum** for theming, and **Axios** for API requests.

---

## Table of Contents

1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Dependencies & Attribution](#dependencies--attribution)
4. [Building & Running](#building--running)
5. [Engineering & Testing Methodology](#engineering--testing-methodology)
6. [Observability in Production](#observability-in-production)

---

## Overview

This frontend application:

- Presents a **simple form** for the user to input an integer.
- Calls the **roman-numerals-backend** REST endpoint: `GET /romannumeral?query={integer}`.
- Displays the **Roman numeral** or an **error message**.
- Utilizes **React Spectrum** for consistent theming and accessibility (auto-detect light/dark mode).
- Fetches the **API base URL** from an environment variable (`VITE_API_BASE_URL`) at build time.

---

## Project Structure

```
roman-numerals-frontend/
├── public/                   # Static assets (if any)
├── src/
│   ├── api/
│   │   └── apiClient.ts      # Configured Axios instance
│   ├── features/             # Modular features encapsulating React components.
│   │   ├── roman-numerals/   # Roman Numerals feature
│   │   ├── RomanNumeralForm.tsx
│   │   ├── RomanNumeralResult.tsx
│   ├── App.tsx               # Main application
│   ├── main.tsx              # Entry point (renders App)
├── .env                      # Environment variables
├── Dockerfile                # Docker build file for production
├── tsconfig.json             # TypeScript configuration
├── package.json
```

## Dependencies & Attribution

Below are the **primary libraries** used:

- **[React](https://reactjs.org/)** (v18.x) – Core library for building the user interface.
- **[React Spectrum](https://react-spectrum.adobe.com/) (Adobe)** – Provides accessible, themable UI components.
- **[Axios](https://axios-http.com/)** – Handles HTTP requests to the backend.
- **[Vite](https://vitejs.dev/)** – Fast dev server and build tool.
- **[TypeScript](https://www.typescriptlang.org/)** – Adds static typing to JavaScript for better maintainability.

**Dev Dependencies**:

- **[Vitest](https://vitest.dev/)** – A lightweight test runner.
- **[Testing Library](https://testing-library.com/docs/react-testing-library/intro/)** – For rendering components and simulating user interactions in tests.
- **[ESLint](https://eslint.org/)** & **[Prettier](https://prettier.io/)** – Ensure code consistency and formatting.

---

## Building & Running

### Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Set environment variable**: Set the backend URL `VITE_API_BASE_URL=http://localhost:8081` in `.env`.
3. **Start the dev server**:
   ```bash
   npm run dev
   ```
   - Opens on [http://localhost:5173](http://localhost:5173) by default.

### Production Build

1. **Build**:
   ```bash
   npm run build
   ```
   - Generates optimized static files in `dist/`.
2. **Preview** (optional):
   ```bash
   npm run preview
   ```
   - Local server to test the production build at [http://localhost:4173](http://localhost:4173).

### Docker

A **`Dockerfile`** is provided for containerizing the React app with **Nginx**.

```bash
docker build -t roman-numerals-frontend .
docker run -p 8080:80 roman-numerals-frontend
```

- App served at [http://localhost:8080](http://localhost:8080).
- Ensure the **backend** URL in `.env` is correct at build time.

---

## Engineering & Testing Methodology

1. **Layered Architecture**:

   - **API Client**: Centralizes all HTTP calls with Axios. In complex projects, we can make use of state management solutions like **redux** and **rtk-query** for react-ifying API calls.
   - **Features**: Application is divided into top-level features, with `roman-numerals` being the only feature implemented as of now.
   - **App**: Integrates features/routing and theming via React Spectrum.

2. **TypeScript**:

   - Minimizes runtime errors by catching type issues at compile time.
   - Improves maintainability and self-documentation.

3. **Code Quality**:

   - **ESLint** ensures code consistency and highlights potential issues.
   - **Prettier** enforces a uniform formatting style.

4. **Testing Strategy**:

   - **Unit Testing** with **Vitest** + React Testing Library:
     - Each component tested in isolation (e.g., `RomanNumeralForm.test.tsx`) to verify rendering, events, error states, etc.
   - **Integration Testing** (optional):
     - Could use [MSW](https://mswjs.io/) to mock API requests or real backend integration to ensure end-to-end functionality.

5. **Continuous Integration** (optional):
   - Could run `npm run lint && npm run test && npm run build` in a CI pipeline (e.g., GitHub Actions) to ensure code quality on every commit.

### Running Tests

This project uses **Vitest** for testing. To run the test suite:

```bash
npm run test
```

---

## Observability in Production

Currently, **no monitoring, logging, or observability** solutions are implemented on the frontend. In production, we can consider:

- **Client-Side Error Logging**: Tools like [Sentry](https://sentry.io/) or [LogRocket](https://logrocket.com/) to capture frontend errors in real-time.
- **Performance Monitoring**: Collect [Web Vitals](https://web.dev/vitals/) to measure page load times, first input delay, etc.
- **Analytics**: Integrate user analytics (e.g., Google Analytics, Segment) to track usage patterns and identify potential issues or bottlenecks.
