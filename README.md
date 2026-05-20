# Movie Ticket Booking Ecosystem

A comprehensive, full-stack platform for booking movie tickets, managing theater operations, and orchestrating city-wide screenings.

This repository is structured as a mono-repo composed of three fully detached but uniquely integrated core applications:

## 1. Backend API (`/backend`)
The high-performance Node.js/Express REST API that powers the entire ticketing platform securely.
* **Data Layer:** MongoDB (Mongoose) with strict schemas for Movies, Theaters, Shows, Bookings, Users, and dynamic App Settings.
* **Security:** Role-Based Access Control (RBAC) via JWT, isolating standard `user` permissions from `admin` limits natively.
* **Integrations:** Native Payment Webhook bindings and dynamic order creation mechanisms for both **Stripe** and **Razorpay**.
* **Testing:** 100% route and integration coverage tested efficiently using Jest and Supertest.

## 2. Web Admin Dashboard (`/web`)
A sleek, Vuexy-inspired React Single Page Application (built with Vite) that provides complete management capabilities.
* **Interface:** Tailwind CSS orchestrating unified dark/light modes, Lucide-React icons, and responsive data tables.
* **State Management:** Zustand constructs for global configurations, paired with Axios interceptors for active authenticated fetches.
* **Core Functionalities:** Deep administrative CRUD operations for controlling the Movie catalog, Theater mappings, and System-wide Configuration features globally.
* **Testing:** Robust component, structural, and integration validations natively executed utilizing Vitest and React Testing Library.

## 3. Mobile Customer Application (`/app`)
A beautiful, cross-platform consumer application natively built utilizing React Native and Expo SDK 55.
* **Navigation:** Complex multi-stack bottom tab routing layouts connecting the Discovery Home, Search, Interactive Tickets, and User Profile architectures naturally.
* **Interactivity:** Fluid seat selection grids resolving directly back securely to the Backend's concurrency-safe allocation handlers.
* **Testing:** Comprehensive React Native Jest environment pipelines validating precise user navigation paths without Expo binary interruptions.

## Getting Started

Each application workspace contains its own localized `README.md` and `package.json`. Detailed setup rules and environment bounds reside within each respective sub-directory intuitively:

1. **Boot the Backend Orchestrator:** 
   ```bash
   cd backend
   npm install
   npm run dev
   ```
2. **Mount the Administrator Operations Web App:**
   ```bash
   cd web
   npm install
   npm run dev
   ```
3. **Launch the Mobile Consumer Environment:**
   ```bash
   cd app
   npm install
   npm start
   ```
