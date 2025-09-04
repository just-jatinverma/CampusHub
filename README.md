# CampusHub 🎓

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-v6-lightgrey)](https://www.prisma.io/)

A modern, full-featured campus management system built with TypeScript, Express.js, and Prisma ORM.

## 🚀 Features

- 👥 **User Management**

  - Role-based access control (Admin, Faculty, Student)
  - Secure authentication with JWT and refresh tokens
  - Password encryption with bcrypt

- 📚 **Academic Management**

  - Course management and enrollment
  - Attendance tracking system
  - Results/grades management
  - Study material distribution

- 📢 **Communication Tools**

  - Announcements system
  - Event management
  - Notifications system

- 🛠 **Technical Features**
  - RESTful API architecture
  - PostgreSQL database with Prisma ORM
  - API documentation with Swagger
  - Rate limiting for security
  - File uploads with ImageKit integration
  - CORS enabled

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- ImageKit account (for file uploads)

## 🔧 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/just-jatinverma/CampusHub.git
   cd CampusHub
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/campushub"
   JWT_SECRET="your-jwt-secret"
   REFRESH_TOKEN_SECRET="your-refresh-token-secret"
   IMAGEKIT_PUBLIC_KEY="your-imagekit-public-key"
   IMAGEKIT_PRIVATE_KEY="your-imagekit-private-key"
   IMAGEKIT_URL_ENDPOINT="your-imagekit-url"
   ```

4. Initialize the database:
   ```bash
   npx prisma migrate dev
   ```

## 🚀 Usage

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Generate Swagger documentation:
   ```bash
   npm run swagger-autogen
   ```

The API will be available at `http://localhost:8000` (or your configured port)
API documentation will be available at `http://localhost:8000/api-docs`

## 📚 API Documentation

The API is documented using Swagger. Once the server is running, you can access the interactive API documentation at `/api-docs` endpoint.

Major API endpoints include:

- `/api/v1/auth` - Authentication routes
- `/api/v1/admin` - Admin management
- `/api/v1/courses` - Course management
- `/api/v1/students` - Student management
- `/api/v1/events` - Event management
- `/api/v1/announcements` - Announcement system
- `/api/v1/results` - Results management
- `/api/v1/notifications` - Notification system

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Express.js](https://expressjs.com/)
- Database ORM: [Prisma](https://www.prisma.io/)
- File Storage: [ImageKit](https://imagekit.io/)
- API Documentation: [Swagger](https://swagger.io/)

---

Made with ❤️ by [just-jatinverma](https://github.com/just-jatinverma)
