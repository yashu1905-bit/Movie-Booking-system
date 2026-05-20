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
🎬 Movie Booking System

An online movie ticket booking platform where users can browse movies, view show timings, select seats, and book tickets easily.
This project is built to provide a smooth and user-friendly movie booking experience similar to platforms like BookMyShow. Inspired by modern movie ticket booking systems and MERN-based cinema platforms.

🚀 Features
🔐 User Authentication & Authorization
🎥 Browse Latest Movies
🕒 Show Timing Management
💺 Seat Selection System
🎟️ Ticket Booking Functionality
📱 Responsive UI
🛠️ Admin Dashboard
📂 Movie & Theater Management
💳 Booking Confirmation
🛠️ Tech Stack
Frontend
React.js
Tailwind CSS / CSS
Axios
Backend
Node.js
Express.js
Database
MongoDB
Other Tools
JWT Authentication
Git & GitHub
📁 Project Structure
Movie-Booking-system/
│
├── client/          # Frontend
├── server/          # Backend
├── package.json
├── README.md
└── .gitignore
⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/yashu1905-bit/Movie-Booking-system.git
2️⃣ Move into Project Folder
cd Movie-Booking-system
🔥 Backend Setup
cd server
npm install
npm run dev
🎨 Frontend Setup
cd client
npm install
npm start
🌐 Environment Variables

Create a .env file inside the server folder and add:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
📸 Screenshots

Add your project screenshots here.

Example:

![Home Page](./screenshots/home.png)
🎯 Future Improvements
🎫 Online Payment Integration
📧 Email Notifications
📱 Mobile App Version
⭐ Movie Reviews & Ratings
🎥 Trailer Integration
🤝 Contributing

Contributions are welcome!

Fork the repository
Create a new branch
Commit your changes
Push to your branch
Open a Pull Request
📄 License

This project is licensed under the MIT License.
