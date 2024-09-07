const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/post', (req, res) => {
  const filePath = path.join(__dirname, 'posts.json');
  let posts = [];

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    if (data) {
      posts = JSON.parse(data);
    }
  }
    res.render('post', { posts: posts });
});

app.get('/rules', (req, res) => {
    res.render('rules');
});

app.get('/create', (req, res) => {
    res.render('create');
});

app.post('/submit-post', (req, res) => {
  const postContent = req.body.postContent;

  if (!postContent) {
    return res.status(400).send('Post content is required');
  }


  let posts = [];
  const filePath = path.join(__dirname, 'posts.json');

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    if (data) {
      posts = JSON.parse(data);
    }
  }

  posts.push({ content: postContent, date: new Date() });

  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));

  res.redirect('/post');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
