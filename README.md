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

- **Node.js** (v14 or higher)
- **MongoDB** (local or MongoDB Atlas)

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/quickpost-kada.git
   cd quickpost-kada/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy `config.env` and modify as needed:
     ```bash
     cp config.env config.env.local
     ```
   - Update `MONGODB_URI` to point to your MongoDB instance.

4. **Start MongoDB:**
   - Local: Make sure MongoDB is running on your machine.
   - Atlas: Use your MongoDB Atlas connection string.

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

- `GET    /api/posts`        — Get all posts
- `GET    /api/posts/:id`    — Get single post by ID
- `POST   /api/posts`        — Create new post
- `PUT    /api/posts/:id`    — Update post
- `DELETE /api/posts/:id`    — Delete post

### Health Check

- `GET /api/health` — Server health status

## Environment Variables

- `PORT`         — Server port (default: 5000)
- `MONGODB_URI`  — MongoDB connection string
- `NODE_ENV`     — Environment (development/production)

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

## Project Structure

```
backend/
  config.env
  package.json
  server.js
  config/
    database.js
  models/
    Post.js
  routes/
    posts.js
  scripts/
    seedData.js
```

## Frontend Integration

The backend is configured to accept requests from `http://localhost:5173` (Vite dev server).  
To change allowed origins, update the CORS configuration in `server.js`.

Demo: https://kadablog.netlify.app/