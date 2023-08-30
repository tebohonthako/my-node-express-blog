// We setting up our basic Express server here in our server.js file 
// server.js is the entry point of our server

// importing express module 
const express = require('express');

// initilizing express by creating Express app & calling the express function.  
const app = express();
const PORT = process.env.PORT || 5000;

// Defining a route to respond to GET Request at Root URL ("/")
app.get("/", (req,res) => {
    res.send('Welcome to my Express server!')
})

// STARTS THE SERVER
app.listen(PORT, () => {
    console.log('Server is running on PORT ${PORT}')
});

////////////////////////////////////////////////////////

// Define routes for :
// * retrieving, 
// * adding, 
// * and deleting 
// * blog posts 

const fs = require('fs');
const path = require('path');

const POSTS_FILE_PATH = path.join(__dirname, 'data/posts.json');

app.get('/api/posts', (req, res) => {
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE_PATH, 'utf8'));
  res.json(posts);
});

app.post('/api/posts', express.json(), (req, res) => {
  const { title, content } = req.body;
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE_PATH, 'utf8'));
  const newPost = { id: Date.now(), title, content, comments: [] };
  posts.push(newPost);
  fs.writeFileSync(POSTS_FILE_PATH, JSON.stringify(posts, null, 2));
  res.status(201).json(newPost);
});

// Implement deletion endpoint if needed
  