# Roman Numerals

A full-stack web application that converts integers into Roman numerals. The solution is split into:

- **Backend** (Node.js / Express / TypeScript): Implements the `/romannumeral` API endpoint.
- **Frontend** (React / Vite / TypeScript / React Spectrum): Presents a UI where users can enter integers and view the corresponding Roman numeral output.

## Contents

1. [Overview](#overview)
2. [Directories](#directories)
3. [Running with Docker Compose](#running-with-docker-compose)
4. [Additional Notes](#additional-notes)

---

## Overview

**Key Features**:
- **HTTP API**: `GET /romannumeral?query={integer}` for 1–3999.
- **React UI**: Form + result display, with light/dark mode support (React Spectrum).
- **Containerized** with Docker and orchestrated using **docker-compose**.
- **Separate** README files in **frontend** and **backend** folders detail build/run/test instructions.

---

## Directories

- **`backend/`**
    - Contains the Node.js/Express code for the Roman numeral conversion.
    - Refer to its [README](./backend/README.md) for build/test instructions, environment variables, Dockerfile, and more.

- **`frontend/`**
    - Contains the React + TypeScript + Vite project for the user interface.
    - Refer to its [README](./frontend/README.md) for build/test instructions, environment variables, Dockerfile, and more.

---

## Running with Docker Compose

A simple `docker-compose.yml` is provided at the project root to build and launch both the **backend** and **frontend** containers.


### Steps to Run

1. **Build and Start**:
   ```bash
   docker compose up --build
   ```
2. **Access**:
    - **Backend** runs at [http://localhost:8081](http://localhost:8081).
    - **Frontend** served at [http://localhost:8082](http://localhost:8082).

> **Note**: The backend listens on port `3000` inside the container, mapped to `8081` on the host. The frontend is served via an Nginx container on port `80`, mapped to host port `8082`.

---

## Additional Notes

- **VITE_API_BASE_URL** is passed to the frontend’s Docker build via `--build-arg`, so the React app knows where to reach the API.
- If you want to run **only** the backend or **only** the frontend in Docker, you can navigate into each folder and use the respective `Dockerfile`.
- For advanced setups, both the frontend and the backend supports `.env` files.
