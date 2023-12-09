# MediScan - Diagnostic Center Management System

## Overview

MediScan is a full-stack web application designed for managing diagnostic center operations efficiently. It provides a comprehensive solution for appointment scheduling, patient records management, test results tracking, and administrative tasks. The application is built using modern web technologies to ensure a seamless user experience.

## Features

- **User Authentication:** Secure user registration and login system with JWT-based authentication.

- **Role-Based Access Control:** Differentiates between general users and administrators, granting specific privileges accordingly.

- **Diagnostic Tests Management:** Allows administrators to add, edit, and delete diagnostic tests with details such as name, price, slots, details, image, and date.

- **Banner Management:** Enables administrators to add banners with activation and deactivation functionality.

- **User Profile Management:** Users can view and edit their profiles, including name, blood group, district, upazila, and photo URL.

- **Appointment Booking:** Users can view upcoming appointments and book diagnostic tests.

- **Payment Integration:** Integration with Stripe for creating payment intents and handling payment transactions.

- **Blog, FAQ, Feedback, Symptom Checker:** Additional features include health tips blog, FAQ page, feedback submission, and a symptom checker.


## Tech Stack

- **Frontend**: React.js, React Router, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Payment Integration**: Stripe

## Installation

### Client-side

1. Navigate to the `MediScan-client-side` directory:

   ```bash
   cd MediScan-client-side
   ```
2. Install dependencies:
    ```bash
    npm install react-router-dom localforage match-sorter sort-by
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    npm i -D daisyui@latest
    npm install
    ```
3. Run the development server:
    ```bash
    npm run dev
    ```

### Server-side
1. Navigate to the MediScan-server directory:

```bash
cd MediScan-server
```

2. Install dependencies:

```bash
npm install express cors mongodb dotenv
```

3. Update the start script in package.json:

```json
"scripts": {
  "start": "node index.js"
}
```

4. Run the server using nodemon:

```bash
nodemon start
```  


## Usage
1. Visit the MediScan Website in your browser.

2. Explore the features based on your role:

* General User: Schedule appointments, view test results, and manage your profile.
* Admin User: Access admin dashboard, manage users, tests, and reservations.



Feel free to ask if you have any further requests or modifications!
