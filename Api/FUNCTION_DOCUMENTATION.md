f# Backend Functions Documentation

This file contains detailed explanations of all functions in the backend codebase, organized by file.

## 📁 Controllers

### `Api/controllers/signup.controller.js`

#### `signup(req, res, next)`
**Purpose**: Handles user registration with email and password  
**Route**: POST /api/auth/signup  
**Access**: Public (no authentication required)

**Registration Flow**:
1. Extract user data from request body (username, email, password)
2. Validate required fields - check if all fields are provided and not empty strings
3. Hash the password for secure storage using bcrypt with salt rounds of 10
4. Create new user object with the provided data and hashed password
5. Save user to database
6. Return success response with user data

**Expected Request Body**:
```javascript
{
  "username": "string",
  "email": "string", 
  "password": "string"
}
```

**Security Features**:
- Passwords are hashed using bcrypt (never stored in plain text)
- Input validation for required fields
- Database handles duplicate username/email errors

---

#### `signin(req, res, next)`
**Purpose**: Handles user authentication with username and password  
**Route**: POST /api/auth/signin  
**Access**: Public (no authentication required)

**Authentication Flow**:
1. Extract login credentials from request body (username, password)
2. Validate required fields
3. Find user in database by username
4. Verify password against stored hash using bcrypt.compareSync()
5. Generate JWT token with user ID and admin status, expires in 1 hour
6. Remove password from response for security
7. Set secure httpOnly cookie and return user data

**Expected Request Body**:
```javascript
{
  "username": "string",
  "password": "string"
}
```

**Security Features**:
- Password verification using bcrypt
- JWT token with expiration (1 hour)
- HttpOnly cookies (prevents XSS attacks)
- Password never sent to client

---

#### `google(req, res, next)`
**Purpose**: Handles authentication via Google OAuth  
**Route**: POST /api/auth/google  
**Access**: Public (no authentication required)

**Google Auth Flow**:
1. Extract Google user data from request body (name, email, googlePhotoUrl)
2. Check if user already exists in database by email
3a. **If exists**: Generate JWT token and sign them in
3b. **If new**: Create account with Google data and sign them in
4. Set secure cookie and return user data

**For New Users**:
- Generate random password (since they use Google OAuth)
- Create unique username from display name + random numbers
- Hash the generated password
- Save user with Google profile photo

**Expected Request Body**:
```javascript
{
  "name": "string",
  "email": "string",
  "googlePhotoUrl": "string"
}
```

---

### `Api/controllers/user.controller.js`

#### `test(req, res, next)`
**Purpose**: Simple test endpoint to verify the API is working  
**Route**: GET /api/users/test  
**Access**: Public (no authentication required)

**Response**: `{ "message": "Test route is working" }`  
**Use Case**: Health check, API testing, development debugging

---

#### `updateUser(req, res, next)`
**Purpose**: Allows authenticated users to update their own profile information  
**Route**: PUT /api/users/update/:userId  
**Access**: Private (requires authentication via verifyToken middleware)

**Validation Flow**:
1. **Authorization check**: Ensure user can only update their own profile (req.user comes from JWT token)
2. **Password validation** (if password is being updated):
   - Check minimum password length (6 characters)
   - Hash the new password before storing (salt rounds = 10)
3. **Username validation** (if username is being updated):
   - Check username length requirements (7-20 characters)
   - Check for spaces in username (not allowed)
   - Ensure username is lowercase
   - Check that username only contains letters and numbers
4. **Update user in database** using MongoDB's findByIdAndUpdate
5. **Remove password from response** for security

**Expected Request Body** (all optional):
```javascript
{
  "username": "string",
  "email": "string",
  "password": "string",
  "profilePhoto": "string"
}
```

**Security**: Users can only update their own profile (checked in controller)

---

#### `deleteUser(req, res, next)`
**Purpose**: Allows authenticated users to delete their own account  
**Route**: DELETE /api/users/delete/:userId  
**Access**: Private (requires authentication via verifyToken middleware)

**Flow**:
1. **Authorization check**: Ensure user can only delete their own account
2. **Delete user from database** using findByIdAndDelete
3. **Send success response**

**Security**: Users can only delete their own account (checked in controller)  
**WARNING**: This permanently removes the user from the database

---

#### `signout(req, res, next)`
**Purpose**: Logs out the current user by clearing their authentication cookie  
**Route**: POST /api/users/signout  
**Access**: Public (no authentication required, but cookie must exist)

**Flow**:
1. Clear the 'access_token' cookie from the client
2. Return success message

**Note**: This doesn't require authentication because we're just clearing cookies

---

### `Api/controllers/post.controller.js`

#### `create(req, res, next)`
**Purpose**: Allows admin users to create new blog posts  
**Route**: POST /api/post/create  
**Access**: Private (requires authentication + admin privileges)

**Validation Flow**:
1. **Admin authorization check**: Only admin users can create posts (req.user comes from JWT token via verifyToken middleware)
2. **Validate required fields**: Both title and content are mandatory for creating a post
3. **Generate URL-friendly slug from title**:
   - Split title into words
   - Join with hyphens
   - Convert to lowercase
   - Remove special characters (keeping only letters, numbers, and hyphens)
4. **Create new post object** with all request data plus generated slug and userId
5. **Save post to database**

**Expected Request Body**:
```javascript
{
  "title": "string" (required),
  "content": "string" (required),
  "image": "string" (optional),
  "category": "string" (optional, defaults to "uncategorized")
}
```

**Security**: Only admin users can create posts (checked in controller)  
**Process**: Generates URL-friendly slug from title automatically

---

#### `getPosts(req, res, next)`
**Purpose**: Retrieves posts with optional filtering, searching, and pagination  
**Route**: GET /api/post/getposts  
**Access**: Public (no authentication required)

**Query Parameters** (all optional):
- `startIndex`: Starting point for pagination (default: 0)
- `limit`: Number of posts to return (default: 9)
- `order`: Sort order 'asc' or 'desc' (default: desc)
- `userId`: Filter posts by specific user ID
- `category`: Filter posts by category
- `postId`: Get specific post by ID
- `slug`: Get specific post by slug
- `searchTerm`: Search in post title and content (case-insensitive)

**Flow**:
1. **Parse query parameters** with default values
2. **Build dynamic filter object** using conditional spread operator to include filters only if query params exist
3. **Execute database query** with filters, sorting, and pagination
4. **Get total count** for pagination info
5. **Count recent posts** (created in last month)
6. **Return comprehensive response**

**Example URLs**:
- `GET /api/post/getposts` → Get latest 9 posts
- `GET /api/post/getposts?limit=5&startIndex=10` → Pagination
- `GET /api/post/getposts?category=technology` → Filter by category
- `GET /api/post/getposts?searchTerm=javascript` → Search posts
- `GET /api/post/getposts?slug=my-post-title` → Get specific post

**Response**:
```javascript
{
  "posts": [...],           // Array of post objects
  "totalPosts": number,     // Total posts in database
  "lastMonthPosts": number  // Posts created in last month
}
```

---

## 📁 Utils

### `Api/utils/verifyUser.js`

#### `verifyToken(req, res, next)`
**Purpose**: Middleware function to verify JWT tokens  
**Usage**: Checks if a user is authenticated before allowing access to protected routes

**Flow**:
1. **Extract JWT token** from the 'access_token' cookie
2. **Check if token exists** - if no token, user is not authenticated
3. **Verify the token** using the JWT_SECRET from environment variables
4. **Handle verification results**:
   - If token verification fails (expired, invalid, or wrong secret), return error
   - If token is valid, extract user information from token payload
5. **Add user info to request object** (req.user) for use in controllers
6. **Call next()** to proceed to the next middleware or route handler

**Security Features**:
- Validates token integrity and expiration
- Prevents access to protected routes without valid authentication
- Adds authenticated user info to request for authorization checks

---

### `Api/utils/error.js`

#### `errorHandler(statusCode, message)`
**Purpose**: Error handling utility function  
**Usage**: Creates standardized error objects with status code and message

**Parameters**:
- `statusCode`: HTTP status code (400, 401, 403, 404, 500, etc.)
- `message`: Error message to display

**Returns**: Error object with statusCode property for consistent error handling

---

## 📁 Models

### `Api/models/user.model.js`

**Purpose**: Defines the MongoDB schema and model for user documents

**Schema Fields**:
- `username`: Unique identifier for user login (String, required, unique)
- `email`: User's email address (String, required, unique)
- `password`: Hashed password for authentication (String, required)
- `profilePhoto`: URL to user's profile image (String, default provided)
- `isAdmin`: Boolean flag for admin privileges (Boolean, default: false)
- `createdAt`: Auto-generated timestamp (Date, auto)
- `updatedAt`: Auto-generated timestamp (Date, auto)

**Usage Examples**:
- `User.findOne({ username: 'john' })` - Find user by username
- `User.findById(userId)` - Find user by ID
- `new User({ username, email, password })` - Create new user instance
- `user.save()` - Save user to database

---

### `Api/models/post.model.js`

**Purpose**: Defines the MongoDB schema and model for blog post documents

**Schema Fields**:
- `userId`: ID of the user who created the post (String, required)
- `content`: Main body/content of the blog post (String, required)
- `title`: Post title, unique across all posts (String, required, unique)
- `image`: Featured image URL for the post (String, default provided)
- `category`: Post category for organization (String, default: 'uncategorized')
- `slug`: URL-friendly version of title for SEO (String, required, unique)
- `createdAt`: Auto-generated timestamp (Date, auto)
- `updatedAt`: Auto-generated timestamp (Date, auto)

**Usage Examples**:
- `Post.find({ category: 'technology' })` - Find posts by category
- `Post.findOne({ slug: 'my-post' })` - Find post by slug
- `new Post({ title, content, userId })` - Create new post instance
- `post.save()` - Save post to database
- `Post.countDocuments()` - Count total posts

---

## 📁 Routes

### `Api/Routes/auth.route.js`
**Base URL**: `/api/auth`

**Routes**:
- `POST /signup` → `signup()` controller - User registration
- `POST /signin` → `signin()` controller - User login  
- `POST /google` → `google()` controller - Google OAuth

**Access**: All routes are PUBLIC (no authentication middleware required)

---

### `Api/Routes/user.route.js`
**Base URL**: `/api/users`

**Routes**:
- `GET /test` → `test()` controller - API health check (Public)
- `PUT /update/:userId` → `updateUser()` controller - Update user profile (Private)
- `DELETE /delete/:userId` → `deleteUser()` controller - Delete user account (Private)
- `POST /signout` → `signout()` controller - Sign out user (Public)

**Middleware**: `verifyToken` used on protected routes

---

### `Api/Routes/post.route.js`
**Base URL**: `/api/post`

**Routes**:
- `POST /create` → `create()` controller - Create new blog post (Private - Admin only)
- `GET /getposts` → `getPosts()` controller - Get posts with filtering/pagination (Public)

**Middleware**: `verifyToken` used on create route for admin authentication

---

## 🔄 Application Flow

### Startup Sequence:
1. `index.js` loads environment variables
2. Express app created and configured with middleware
3. Routes mounted (`/api/auth`, `/api/users`, `/api/post`)
4. Error handling middleware set up
5. Database connection established
6. Server starts listening on port 3000

### Request Processing:
1. Client sends request → Express app
2. Route handler matches URL → Controller function
3. Middleware (if needed) → Validates authentication
4. Controller → Processes request, interacts with database
5. Model → Handles database operations
6. Response sent back to client

This documentation provides comprehensive details about every function while keeping the actual code files clean and readable.
