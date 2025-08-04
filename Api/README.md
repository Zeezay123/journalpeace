# Backend API Documentation

## Overview
This is a Node.js/Express backend API for a blog application with user authentication and post management. The application uses MongoDB for data storage and JWT tokens for authentication.

## 🏗️ Architecture & Flow

### 1. APPLICATION STARTUP FLOW
```
1. index.js loads environment variables (.env file)
2. Express app is created and configured with middleware
3. Routes are mounted (/api/auth, /api/users, /api/post)
4. Error handling middleware is set up
5. Database connection is established
6. Server starts listening on port 3000
```

### 2. REQUEST FLOW
```
Client Request → Express App → Route Handler → Middleware (if needed) → Controller → Model → Database
                                                     ↓
Client Response ← Express App ← Route Handler ← Controller ← Model ← Database
```

## 📁 File Structure & Purpose

### **Entry Point**
- **`index.js`** - Main application file that:
  - Sets up Express server
  - Configures middleware (JSON parsing, cookies)
  - Mounts route handlers
  - Connects to MongoDB
  - Starts the server

### **Routes** (`/Routes/`)
Route files define API endpoints and connect them to controllers:

- **`auth.route.js`** - Authentication routes (`/api/auth`)
  - `POST /signup` - User registration
  - `POST /signin` - User login
  - `POST /google` - Google OAuth

- **`user.route.js`** - User management routes (`/api/users`)
  - `GET /test` - API health check
  - `PUT /update/:userId` - Update user profile (Protected)
  - `DELETE /delete/:userId` - Delete user account (Protected)
  - `POST /signout` - User logout

- **`post.route.js`** - Blog post routes (`/api/post`)
  - `POST /create` - Create new post (Admin only)
  - `GET /getposts` - Get posts with filtering/pagination

### **Controllers** (`/controllers/`)
Controllers contain business logic and handle requests:

- **`signup.controller.js`** - Authentication logic
  - `signup()` - Register new users with validation and password hashing
  - `signin()` - Authenticate users and generate JWT tokens
  - `google()` - Handle Google OAuth authentication

- **`user.controller.js`** - User management logic
  - `test()` - Simple health check endpoint
  - `updateUser()` - Update user profile with validation
  - `deleteUser()` - Delete user account with authorization
  - `signout()` - Clear authentication cookies

- **`post.controller.js`** - Blog post logic
  - `create()` - Create posts with slug generation (Admin only)
  - `getPosts()` - Retrieve posts with filtering and pagination

### **Models** (`/models/`)
Database schemas and models using Mongoose:

- **`user.model.js`** - User document structure
  - Fields: username, email, password, profilePhoto, isAdmin
  - Automatic timestamps (createdAt, updatedAt)

- **`post.model.js`** - Blog post document structure
  - Fields: userId, content, title, image, category, slug
  - Automatic timestamps (createdAt, updatedAt)

### **Utils** (`/utils/`)
Utility functions and middleware:

- **`error.js`** - Custom error handler utility
  - Creates standardized error objects with status codes

- **`verifyUser.js`** - JWT authentication middleware
  - Validates JWT tokens from cookies
  - Adds user info to request object for protected routes

## 🔐 Authentication Flow

### Registration Process
1. User submits username, email, password
2. Server validates required fields
3. Password is hashed using bcrypt
4. User is saved to database
5. Success response sent to client

### Login Process
1. User submits username and password
2. Server finds user in database
3. Password is verified against stored hash
4. JWT token is generated with user ID and admin status
5. Token is set as httpOnly cookie
6. User data (without password) is returned

### Google OAuth Process
1. User authenticates with Google
2. Google sends user data to our API
3. Server checks if user exists by email
4. If exists: Generate token and sign in
5. If new: Create account with Google data and sign in
6. JWT token set as cookie, user data returned

### Protected Route Access
1. Client makes request to protected endpoint
2. `verifyToken` middleware extracts JWT from cookie
3. Token is verified using JWT_SECRET
4. If valid: User info added to request, continue to controller
5. If invalid: Error response sent to client

## 📊 Database Structure

### Users Collection
```javascript
{
  _id: ObjectId,
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed, required),
  profilePhoto: String (default provided),
  isAdmin: Boolean (default: false),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Posts Collection
```javascript
{
  _id: ObjectId,
  userId: String (required),
  title: String (unique, required),
  content: String (required),
  image: String (default provided),
  category: String (default: 'uncategorized'),
  slug: String (unique, required, auto-generated),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🛡️ Security Features

### Password Security
- Passwords are hashed using bcrypt with salt rounds of 10
- Plain text passwords are never stored in database
- Password validation enforces minimum length requirements

### JWT Authentication
- Tokens expire in 1 hour for security
- Stored in httpOnly cookies (prevents XSS attacks)
- Include user ID and admin status for authorization

### Authorization Levels
- **Public Routes**: No authentication required
- **Protected Routes**: Require valid JWT token
- **Admin Routes**: Require JWT token + admin privileges

### Input Validation
- Required field validation in controllers
- Username format validation (length, characters, case)
- Password strength requirements
- Unique constraints on usernames and emails

## 🔄 API Endpoints Summary

### Authentication (`/api/auth`)
| Method | Endpoint | Purpose | Access |
|--------|----------|---------|--------|
| POST | `/signup` | Register new user | Public |
| POST | `/signin` | User login | Public |
| POST | `/google` | Google OAuth | Public |

### User Management (`/api/users`)
| Method | Endpoint | Purpose | Access |
|--------|----------|---------|--------|
| GET | `/test` | Health check | Public |
| PUT | `/update/:userId` | Update profile | Private |
| DELETE | `/delete/:userId` | Delete account | Private |
| POST | `/signout` | User logout | Public |

### Blog Posts (`/api/post`)
| Method | Endpoint | Purpose | Access |
|--------|----------|---------|--------|
| POST | `/create` | Create post | Admin |
| GET | `/getposts` | Get posts | Public |

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB database
- Environment variables configured

### Environment Variables (.env)
```
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Installation & Running
```bash
# Install dependencies
npm install

# Start the server
npm start
# or
node Api/index.js
```

The server will start on port 3000 and connect to MongoDB.

## 🔧 Key Features

### User Features
- User registration and authentication
- Profile management (update/delete)
- Google OAuth integration
- Secure password handling

### Blog Features
- Admin-only post creation
- Post categorization and tagging
- SEO-friendly URLs (slugs)
- Advanced post filtering and search
- Pagination support

### Technical Features
- RESTful API design
- JWT-based authentication
- MongoDB integration with Mongoose
- Comprehensive error handling
- Input validation and sanitization
- Automatic timestamp tracking

This backend provides a solid foundation for a blog application with user management and content creation capabilities.
