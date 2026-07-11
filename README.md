# VyricoERP

A modern, full-stack Enterprise Resource Planning (ERP) system built with JavaScript, featuring a responsive frontend and powerful backend infrastructure.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Development](#development)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## 🎯 Overview

VyricoERP is a comprehensive Enterprise Resource Planning system designed to streamline business operations and improve organizational efficiency. The application provides an integrated platform for managing various business functions including inventory, sales, finance, and more.

## ✨ Features

- **User Authentication**: Secure JWT-based authentication and authorization
- **RESTful API**: Comprehensive backend API for all business operations
- **Responsive Frontend**: Modern, user-friendly interface built with web technologies
- **Database Management**: MongoDB integration for robust data persistence
- **Cross-Origin Support**: CORS enabled for seamless frontend-backend communication
- **Development Tools**: Nodemon for auto-reloading during development
- **Scalable Architecture**: Modular backend structure for easy expansion

## 🛠 Tech Stack

### Frontend
- **JavaScript** (66.5%)
- **HTML** (2.2%)
- **CSS** (31.3%)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Utilities**: Cookie Parser, CORS, dotenv

### Development Tools
- **Nodemon**: Automatic server restart during development
- **Version Control**: Git

## 📁 Project Structure

```
VyricoERP/
├── backend/                 # Backend server and API
│   ├── node_modules/       # Backend dependencies
│   ├── package.json        # Backend dependencies configuration
│   ├── index.js            # Main entry point
│   └── ...                 # API routes and controllers
├── frontend/               # Frontend application
│   ├── node_modules/       # Frontend dependencies
│   ├── package.json        # Frontend dependencies configuration
│   └── ...                 # React/Vue components and pages
├── .gitignore             # Git ignore rules
└── README.md              # Project documentation
```

## 📦 Prerequisites

Before setting up VyricoERP, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher) or **yarn**
- **MongoDB** (v4.4 or higher)
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/sovryxtech/VyricoERP.git
cd VyricoERP
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### Backend Configuration

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/vyricoerp

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### Frontend Configuration

Create a `.env` file in the `frontend` directory if needed:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

## 🏃 Running the Application

### Start the Backend Server

```bash
cd backend
npm start
```

The backend server will start on `http://localhost:5000` with auto-reload enabled via Nodemon.

### Start the Frontend Application

In a new terminal:

```bash
cd frontend
npm start
```

The frontend will typically run on `http://localhost:3000`.

### Full Stack Development

To run both frontend and backend simultaneously, use two terminal windows:

**Terminal 1 (Backend):**
```bash
cd backend
npm start
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

## 👨‍💻 Development

### Backend Development

- **Main Entry Point**: `backend/index.js`
- **Server Auto-Reload**: Enabled with Nodemon
- **API Base URL**: `http://localhost:5000`
- **Database**: Connected via Mongoose to MongoDB

### Frontend Development

- **Hot Reload**: Enabled for instant feedback
- **API Proxy**: Configure to point to backend server
- **Port**: 3000 (default)

### Available Scripts

**Backend:**
```bash
npm start    # Start server with Nodemon
npm test     # Run tests (if configured)
```

**Frontend:**
```bash
npm start    # Start development server
npm build    # Build for production
npm test     # Run tests (if configured)
```

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/refresh` - Refresh authentication token

### Core Endpoints

*(Specific endpoints will vary based on your implementation)*

All API requests to protected endpoints must include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 🤝 Contributing

We welcome contributions to VyricoERP! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

### Code Standards

- Follow consistent naming conventions
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes before submitting

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 📞 Support

For support and questions:

- Open an issue on GitHub
- Check existing documentation
- Review the project's discussion board

---

**Last Updated**: July 11, 2026  
**Repository**: [sovryxtech/VyricoERP](https://github.com/sovryxtech/VyricoERP)
