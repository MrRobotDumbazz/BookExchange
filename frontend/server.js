// server.js
const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (like CSS and JS)
app.use(express.static(path.join(__dirname, 'public')));

// Initialize session middleware
app.use(session({
    secret: 'your_secret_key', // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
}));

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Route for the home page
app.get('/', (req, res) => {
    res.render('index', {
        title: 'BookExchange',
        bannerTitle: 'Welcome to BookExchange',
        bannerText: 'Discover, exchange, and discuss books with fellow readers!',
        books: [
            {
                title: 'Book Title 1',
                image: 'https://via.placeholder.com/150',
                description: 'Description of Book Title 1',
            },
            {
                title: 'Book Title 2',
                image: 'https://via.placeholder.com/150',
                description: 'Description of Book Title 2',
            },
            // Add more book objects as needed
        ],
    });
});

// routing
// Route for the registration page
app.get('/register', (req, res) => {
    res.render('register');
});

// Route to handle registration form submission
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    // Handle registration logic here
    res.redirect('/login'); // Redirect to login page after successful registration
});

// Route for the login page
app.get('/login', (req, res) => {
    res.render('login');
});

// Route to handle login form submission
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Handle login logic here
    // For demonstration, we'll set a session variable
    req.session.user = { email };
    res.redirect('/'); // Redirect to home page or user profile after successful login
});

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    console.log('Middleware: Checking authentication'); // Debugging line
    if (req.session.user) {
        console.log('User authenticated'); // Debugging line
        next();
    } else {
        console.log('User not authenticated, redirecting to /register'); // Debugging line
        res.redirect('/register');
    }
};

// Route for the user's shelves (requires authentication)
app.get('/shelves', isAuthenticated, (req, res) => {
    console.log('Route: /shelves accessed'); // Debugging line
    res.render('shelves');
  });

// Route for the books page
app.get('/books', (req, res) => {
    res.render('books', { title: 'Обмен Книгами' });
});

// Route for the discussions page
app.get('/discussions', (req, res) => {
    res.render('discussions', { title: 'Обсуждения' });
});

// Route for the recommendations page
app.get('/recommendations', (req, res) => {
    res.render('recommendations', { title: 'Рекомендации' });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
