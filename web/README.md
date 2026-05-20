# Ticket Booking Platform - Admin Dashboard (Web)

This repository contains the Web Client built for Administrators to manage the Ticket Booking ecosystem securely and elegantly.

## Overview
Built with React, Vite, Tailwind CSS, and Zustand, this Vuexy-inspired dark/light Admin dashboard provides complete operational controls.

## Core Features
* Authenticated Administrator Routing: Protected dashboard routes validating JWT tokens before mounting screens.
* Movie & Theater Management: Interactive forms and Data Tables for maintaining city-wide catalogs.
* Payment Configurations: Dynamic active/inactive toggle switches to instantly flip between Stripe and Razorpay globally across all connected platforms.
* Settings Management: Configure Platform Name globally directly from the dashboard seamlessly.
* Real-time Layouts: Vuexy-inspired collapsible sidebars, dynamic header layouts, and toast notifications.

## Technologies
* React + Vite (Fast compilation, Hot Module Reloading)
* Tailwind CSS (Utility-first atomic styling, precise dark mode orchestration)
* Zustand (Lightweight global state and caching)
* React Hot Toast (Graceful flash messaging)
* Lucide React (Beautiful vector iconography natively)

## Getting Started
1. Install dependencies: "npm install"
2. Create environment constraints inside ".env": 
   VITE_API_URL=http://localhost:5000/api
3. Start local development natively securely: "npm run dev"

## Testing Environment
Powered natively by Vitest and React Testing Library perfectly dynamically. Run "npm test" to validate the frontend logic organically. 
