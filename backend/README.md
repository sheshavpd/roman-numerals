# Roman Numerals Backend

This repository provides a RESTful API that converts integers to Roman numerals. It’s organized with a **service–controller–router** pattern in TypeScript, ensuring clear separation of concerns, testability, and maintainability.

---

## Table of Contents

1. [Features](#features)
2. [Requirements](#requirements)
3. [Installation & Setup](#installation--setup)
4. [Project Scripts](#project-scripts)
5. [Project Structure](#project-structure)
6. [Engineering & Testing](#engineering--testing-methodology)
7. [Dependencies & Attribution](#dependencies--attribution)
8. [API Usage](#api-usage)
9. [Production Readiness](#production-readiness)

---

## Features

- **Convert integers to Roman numerals** using an **Express.js** endpoint.
- **Layered architecture**:
  - **Service Layer** (business logic for numeral conversion).
  - **Controller Layer** (request/response handling).
  - **Router Layer** (route definitions).
- **Logging** (using Winston) and **metrics** (using prom-client).
- **TypeScript** for improved type safety.
- **Vitest** test suite for both unit and integration testing.
- **Docker** support for easy containerization.

---

## Requirements

- **Node.js** (version 16 or above recommended)
- **npm** (or **yarn**)
- **Git** (if you’re cloning from a repo)
- **Docker** (optional, for containerization)

---

## Installation & Setup

1. **Clone the Repository** (if applicable):

   ```bash
   git clone https://github.com/sheshavpd/roman-numerals.git
   cd backend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Environment Variables** (optional):
   - If you wish to configure ports or logging levels, create a `.env` file in the root directory and define variables. For example:
     ```bash
     PORT=3000
     LOG_LEVEL=info
     ```
   - If not specified, defaults are used (port defaults to `3000`).

---

## Project Scripts

In **`package.json`**, we have the following scripts:

| Script           | Usage                                             |
| ---------------- | ------------------------------------------------- |
| `npm run build`  | Compiles TypeScript into the `dist` folder        |
| `npm run start`  | Runs the compiled code via Node (`dist/index.js`) |
| `npm run dev`    | Starts the server in development mode (using tsx) |
| `npm run test`   | Runs the Vitest test suite                        |
| `npm run format` | Formats the codebase with Prettier                |
| `npm run lint`   | Lints the project using ESLint                    |

**Examples**:

```bash
# Build the project
npm run build

# Start the compiled server
npm run start

# (Development mode)
npm run dev

# Run tests
npm run test
```

---

## Project Structure

```plaintext
roman-numerals-backend/
├── src/
│   ├── index.ts             # Server entry point (starts the HTTP server)
│   ├── controllers/
│   │   └── roman.controller.ts    # Handles logic for /romannumeral endpoint
│   ├── routes/
│   │   └── roman.router.ts        # Defines routes for Roman Numeral feature
│   ├── services/
│   │   └── roman.service.ts       # Core business logic for Roman numeral conversion
│   └── utils/
│       ├── logger.ts             # Winston logger setup
│       └── metrics.ts            # Prometheus metrics setup
├── Dockerfile                # Container build file (if using Docker)
```

**Layered Approach**:

- **Service (roman.service.ts)**: Pure business logic.
- **Controller (roman.controller.ts)**: Interprets HTTP requests, uses the service, and returns responses.
- **Router (roman.router.ts)**: Defines URL paths and HTTP methods for the controller.
- **index.ts**: Binds middleware (logs, metrics, etc.) and mounts routers and starts the listening server on the designated port.

---

## Engineering & Testing Methodology

1. **Layered Architecture** ensures each module has a single responsibility, improving maintainability and testability.
2. **TypeScript** enforces type checking and helps catch errors early.
3. **Linting & Formatting** with ESLint and Prettier ensures code consistency.
4. **Unit Tests**:
   - **Service Tests** (e.g., `roman.service.test.ts`) validate the Roman numeral conversion logic.
   - **Controller Tests** (e.g., `roman.controller.test.ts`) mock the service layer to test request/response handling.
5. **Integration Tests** can be optionally added with tools like [supertest](https://www.npmjs.com/package/supertest) to verify end-to-end behavior.

### Running Tests

This project uses **Vitest** for testing. To run the test suite:

```bash
npm run test
```

---

## Dependencies & Attribution

Key dependencies for this project:

- **[Express](https://www.npmjs.com/package/express)**: Web framework for Node.js.
- **[dotenv](https://www.npmjs.com/package/dotenv)**: Loads environment variables from `.env`.
- **[prom-client](https://www.npmjs.com/package/prom-client)**: Prometheus metrics integration.
- **[winston](https://www.npmjs.com/package/winston)**: Logging library for structured logs.
- **[TypeScript](https://www.typescriptlang.org/)**: Language for better type safety.

**Dev Dependencies**:

- **[vitest](https://vitest.dev/)**: Testing framework similar to Jest.
- **[tsx](https://www.npmjs.com/package/tsx)**: Zero-config TS executor for dev mode.
- **[eslint](https://www.npmjs.com/package/eslint)** & **[prettier](https://prettier.io/)**: For linting and code formatting.

---

## API Usage

### `GET /romannumeral?query={integer}`

**Description**: Converts an integer to its Roman numeral.

- **Query Param**: `query` (string) → must be a valid integer in the range 1–3999.
- **Success (200)**:
  ```json
  {
    "input": "10",
    "output": "X"
  }
  ```
- **Errors**:
  - **400** if query param is missing or invalid (`{"error": "Invalid input..."}`).
  - **422** if the number is out of range.

### Metrics Endpoint

- **GET /metrics**: Exposes Prometheus-formatted metrics, including default Node.js metrics and any custom counters or gauges you define in `utils/metrics.ts`.

---

## Production Readiness

### Logging

- Winston logs all incoming requests and critical events.
- Configure log levels and outputs in `logger.ts` (e.g., console, files).

### Metrics & Monitoring

- `prom-client` collects default Node.js metrics.
- **/metrics** endpoint can be scraped by Prometheus for visual dashboards (e.g., Grafana).

### Docker Support

To run the service in a Docker container:

```bash
docker build -t roman-numerals-backend .
docker run -p 3000:3000 roman-numerals-backend
```

The service will be accessible at `http://localhost:3000/`.
