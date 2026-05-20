# Ticket Booking Platform - Backend API

This repository contains the Node.js/Express REST API that powers the Ticket Booking ecosystem (both the Web Admin Dashboard and the Mobile Customer Application).

## Overview
Built with Node.js, Express, and MongoDB (Mongoose), this backend acts as the central command configuration for movie management, theater creation, showtime scheduling, and secure bookings.

## Core Features
* User Authentication & RBAC: Secure JWT-based registration and login, with strict separation between user and admin roles.
* Movies & Theaters Management: Full CRUD capabilities for administrators to orchestrate city-wide theaters and movie screenings.
* Bookings & Seat Reservations: Concurrency-ready seat allocation mapping ensuring distinct reservations natively and securely.
* Dynamic Application Settings: Centrally managed global toggles (e.g., active payment gateway, platform name) directly from the database to instantly sync across frontends.
* Payments Integrations: Webhook bindings and order creation handlers for both Razorpay and Stripe processors.
* Automated Database Seeding: Developer utilities for seeding foundational permissions, users, and admin contexts upon startup.

## Architecture
* Controllers: Handle HTTP-specific routing logic securely dynamically.
* Services: Abstract out complex business and database orchestration rules into independent logic streams.
* Middlewares: Process authentication boundaries natively correctly (e.g., authMiddleware.js, adminMiddleware.js, errorHandler.js).
* Models: Defines strict Mongoose representations seamlessly natively and logically.

## Getting Started

### Prerequisites
Node.js (v18+) and a local or remote MongoDB database connection securely natively automatically effortlessly.

### Installation
1. Install dependencies natively using "npm install".
2. Configure your Environment Variables by creating a .env file containing:
   * PORT=5000
   * MONGO_URI=mongodb://localhost:27017/ticketing
   * JWT_SECRET=your_jwt_secret
   * JWT_EXPIRES_IN=30d
   * RAZORPAY_KEY_ID=your_key
   * RAZORPAY_KEY_SECRET=your_secret
   * STRIPE_SECRET_KEY=your_stripe_key
3. Start the Development Server explicitly correctly naturally seamlessly using "npm run dev".

## Testing natively intuitively automatically
Comprehensive Integration and Unit route validations powered organically accurately cleanly and smoothly:
Run "npm test" to execute all the Jest test suites automatically seamlessly smartly and naturally.
