const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const env = require('dotenv');
const passport = require('./strategies/sql.localstrategy');
const sessionConfig = require('./modules/session-middleware');

env.config();



// Route includes
const userRouter = require('./routes/user.router');
const speechRouter = require('./routes/speech.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Passport Session Configuration
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/speech', speechRouter);

// Serve static files
app.use(express.static('server/public'));

const PORT = process.env.PORT || 9000;

/** Listen * */
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
