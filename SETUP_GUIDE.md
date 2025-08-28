# QuickPost KADA - Full Stack Setup Guide

This guide will help you set up the complete full-stack application with React frontend and Express.js backend with MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Git

## Project Structure

```
quickpost-kada/
├── src/                    # React frontend
│   ├── components/         # React components
│   ├── features/          # Redux slices
│   ├── api/              # API functions
│   └── ...
├── backend/               # Express.js backend
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── config/           # Configuration files
│   └── scripts/          # Database scripts
└── ...
```

## Step 1: Backend Setup

### 1.1 Install Backend Dependencies

```bash
cd backend
npm install
```

### 1.2 Configure MongoDB

**Option A: Local MongoDB**

1. Install MongoDB on your machine
2. Start MongoDB service
3. The default connection string in `config.env` should work: `mongodb://localhost:27017/quickpost-kada`

**Option B: MongoDB Atlas**

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `backend/config.env`:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quickpost-kada
```

### 1.3 Start the Backend Server

```bash
cd backend
npm run dev
```

The server will start on `http://localhost:5000`

### 1.4 Seed the Database (Optional)

```bash
cd backend
npm run seed
```

This will populate the database with sample posts.

## Step 2: Frontend Setup

### 2.1 Install Frontend Dependencies

```bash
# From the root directory
npm install
```

### 2.2 Start the Frontend Development Server

```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## Step 3: Verify the Setup

1. **Backend Health Check**: Visit `http://localhost:5000/api/health`

   - Should return: `{"status":"OK","message":"Server is running"}`

2. **Frontend**: Visit `http://localhost:5173`

   - Should display your React application

3. **API Integration**: The frontend should now fetch posts from your local backend instead of the external API

## Step 4: Testing the Full Stack

### Create a New Post

1. Use the create post functionality in your React app
2. Check the MongoDB database to see the new post
3. Verify the post appears in the post list

### API Endpoints to Test

- `GET http://localhost:5000/api/posts` - Get all posts
- `POST http://localhost:5000/api/posts` - Create a post
- `GET http://localhost:5000/api/posts/:id` - Get a specific post
- `PUT http://localhost:5000/api/posts/:id` - Update a post
- `DELETE http://localhost:5000/api/posts/:id` - Delete a post

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**

   - Ensure MongoDB is running
   - Check the connection string in `config.env`
   - Verify network connectivity for Atlas

2. **CORS Errors**

   - The backend is configured to accept requests from `http://localhost:5173`
   - If using a different port, update the CORS configuration in `backend/server.js`

3. **Port Already in Use**

   - Change the port in `backend/config.env`
   - Update the frontend API base URL in `src/api/posts.js`

4. **Module Import Errors**
   - Ensure you're using Node.js v14+ for ES modules
   - Check that all dependencies are installed

### Development Workflow

1. **Backend Changes**: The server will auto-restart with nodemon
2. **Frontend Changes**: Vite provides hot module replacement
3. **Database Changes**: Restart the backend server after schema changes

## Production Deployment

### Backend Deployment

1. Set `NODE_ENV=production` in environment variables
2. Use a process manager like PM2
3. Set up proper MongoDB connection (Atlas recommended)
4. Configure CORS for your production domain

### Frontend Deployment

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Update the API base URL for production

## Additional Features to Implement

- User authentication
- Image upload functionality
- Pagination for posts
- Search and filtering
- Real-time updates with WebSocket
- Rate limiting
- Input validation middleware

## Support

If you encounter any issues:

1. Check the console logs for both frontend and backend
2. Verify all environment variables are set correctly
3. Ensure MongoDB is running and accessible
4. Check that all dependencies are installed
