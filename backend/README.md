# QuickPost KADA Backend

Express.js backend with MongoDB integration for the QuickPost KADA application.

## Features

- RESTful API for posts CRUD operations
- MongoDB integration with Mongoose ODM
- CORS enabled for frontend integration
- Security middleware (Helmet)
- Request logging (Morgan)
- Environment variable configuration
- Database seeding script

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

## Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

   - Copy `config.env` and modify as needed
   - Update `MONGODB_URI` to point to your MongoDB instance

3. Start MongoDB:
   - Local: Make sure MongoDB is running on your machine
   - Atlas: Use your MongoDB Atlas connection string

## Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

### Seed Database

```bash
npm run seed
```

## API Endpoints

### Posts

- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post by ID
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Health Check

- `GET /api/health` - Server health status

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Environment (development/production)

## Database Schema

### Post Model

```javascript
{
  title: String (required, max 100 chars),
  body: String (required),
  userId: Number (required),
  imageUrl: String (optional),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## Frontend Integration

The backend is configured to accept requests from `http://localhost:5173` (Vite dev server). Update the CORS configuration in `server.js` if needed.
