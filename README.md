# Freelance Marketplace App

A full-stack freelance marketplace platform connecting clients with skilled freelancers. This application provides a seamless experience for posting jobs, submitting proposals, managing projects, and handling payments.

## 🚀 Features

- **User Authentication** - Secure signup and login for both clients and freelancers
- **Job Posting** - Clients can post new job opportunities with detailed requirements
- **Proposal System** - Freelancers can submit proposals for available jobs
- **Project Management** - Track project progress and communicate within the platform
- **Secure Payments** - Integrated payment processing using Stripe
- **Responsive Design** - Works on desktop and mobile devices.

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 13+ (React)
- **UI Components**: Radix UI Primitives
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Form Handling**: React Hook Form
- **HTTP Client**: Axios
- **Icons**: Lucide Icons

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Processing**: Stripe API
- **Environment Management**: dotenv

## 📦 Prerequisites

- Node.js (v16 or later)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance
- Stripe account for payment processing

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/freelance-marketplace-app.git
cd freelance-marketplace-app
```

### 2. Set Up Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### 3. Set Up Frontend

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the frontend directory with:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Project Structure

```
frei-lance-marketplace-app/
├── backend/               # Backend server code
│   ├── middleware/        # Express middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   └── server.js          # Main server file
├── frontend/              # Frontend Next.js application
│   ├── app/               # App router pages
│   ├── components/        # Reusable UI components
│   ├── contexts/          # React contexts
│   ├── lib/               # Utility functions
│   └── public/            # Static files
└── README.md              # This file
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- Built with ❤️ for the 6th semester Software Construction and Deployment course
- Special thanks to all contributors and open-source projects that made this possible
