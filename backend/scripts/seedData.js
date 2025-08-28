import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Post from '../models/Post.js';

dotenv.config({ path: '../config.env' });

const samplePosts = [
  {
    title: 'Getting Started with React',
    body: 'React is a powerful JavaScript library for building user interfaces. It allows you to create reusable UI components and manage state efficiently.',
    userId: 1,
    imageUrl: 'https://picsum.photos/400/300?random=1'
  },
  {
    title: 'Understanding Redux Toolkit',
    body: 'Redux Toolkit is the official, opinionated, batteries-included toolset for efficient Redux development. It simplifies common Redux use cases.',
    userId: 1,
    imageUrl: 'https://picsum.photos/400/300?random=2'
  },
  {
    title: 'Building REST APIs with Express',
    body: 'Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.',
    userId: 2,
    imageUrl: 'https://picsum.photos/400/300?random=3'
  },
  {
    title: 'MongoDB Best Practices',
    body: 'MongoDB is a popular NoSQL database that stores data in flexible, JSON-like documents. Here are some best practices for working with MongoDB.',
    userId: 2,
    imageUrl: 'https://picsum.photos/400/300?random=4'
  },
  {
    title: 'Modern JavaScript Features',
    body: 'ES6+ introduced many powerful features like arrow functions, destructuring, async/await, and modules that make JavaScript development more efficient.',
    userId: 3,
    imageUrl: 'https://picsum.photos/400/300?random=5'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing posts
    await Post.deleteMany({});
    console.log('Cleared existing posts');

    // Insert sample posts
    const createdPosts = await Post.insertMany(samplePosts);
    console.log(`Seeded ${createdPosts.length} posts`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 