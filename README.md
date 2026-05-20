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

//Screenshots
<img width="1428" height="906" alt="Screenshot 2026-05-20 115826" src="https://github.com/user-attachments/assets/6778d3c0-a93e-4c43-ba38-d0b8725b2e2c" />
<img width="1417" height="896" alt="Screenshot 2026-05-20 115737" src="https://github.com/user-attachments/assets/24f9547c-22d0-48a9-9818-4e02c06e9970" />
<img width="1412" height="923" alt="Screenshot 2026-05-20 115638" src="https://github.com/user-attachments/assets/7023b2bb-a7fc-43ee-abbc-456c571915c9" />
<img width="1412" height="778" alt="Screenshot 2026-05-20 115532" src="https://github.com/user-attachments/assets/846409cb-009b-4b86-97d4-b76f2b2ada8a" />
<img width="1422" height="890" alt="Screenshot 2026-05-20 115034" src="https://github.com/user-attachments/assets/c2902033-080e-463c-bb58-45ab80ce6a9c" />
<img width="1920" height="1080" alt="Screenshot (424)" src="https://github.com/user-attachments/assets/b4670d6c-4493-427f-a7ff-0d72ee6d62e6" />
<img width="1920" height="1080" alt="Screenshot (422)" src="https://github.com/user-attachments/assets/c3e93242-d490-4ad0-8fe1-168b488a7140" />
<img width="1920" height="1080" alt="Screenshot (421)" src="https://github.com/user-attachments/assets/dd727cd4-6dc7-4f25-8c4b-e09b95e637b5" />
<img width="1920" height="1080" alt="Screenshot (420)" src="https://github.com/user-attachments/assets/ee0544a8-2b2b-48c6-bce7-dcc5c1e267b5" />
<img width="1920" height="1080" alt="Screenshot (419)" src="https://github.com/user-attachments/assets/1da227c8-ee46-43e9-afda-76f6e624e00d" />









