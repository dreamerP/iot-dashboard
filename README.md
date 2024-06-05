# IoT Sensor Management App

## Description

This project is an Internet of Things (IoT) sensor management application built using React, Vite, Express for the backend, NATS, and Tailwind CSS. It serves as a platform for managing sensors and their data in IoT environments.

## Installation

To install and run this project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/dreamerP/iot-dashboard.git
   ```
2. **Navigate to the project directory:**

     ```bash
      cd iot-dashboard
     ```
3. **Install dependencies:**

   ```bash
    npm install
   ```
4. **Navigate to the backend folder and install dependencies:**

     ```bash
      cd backend
      npm install
     ```

5. **Return to parent folder (iot-dashboard) and start the development server:**

   ```bash
    cd ..
    npm run start
   ```
This will start both the frontend and backend servers concurrently. Open http://localhost:3000 in your browser to view the app.

**If you only want to start the frontend, you can use:**

   ```bash
   npm run frontend
   ```
**And if you only want to start the backend:**

   ```bash
   npm run backend
   ```
> [!CAUTION]
> Note: Ensure that NATS is running on port 8080 for the application to work correctly. 🔴

## Usage

- Once the development server is running, you can access the IoT sensor management application in your web browser.
- Use the application to manage sensors, view sensor data, and perform various actions related to IoT sensor management.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- Vite: A fast frontend build tool that provides instant server start and hot module replacement (HMR) during development.
- NATS: A lightweight and high-performance messaging system for building distributed systems.
- Tailwind CSS: A utility-first CSS framework for building custom designs without having to leave your HTML.
- Jest: A delightful JavaScript Testing Framework with a focus on simplicity.
- Express: A minimalist web framework for Node.js used for building a minimal backend.
