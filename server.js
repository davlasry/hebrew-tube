
const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require("body-parser");
const http = require('http');
const path = require('path');
const passport = require('passport');
const cors = require('cors');
const lodash = require('lodash');

const Database = require('./server/core/database.core');
const AuthCore = require('./server/core/auth.core');

app.use(cors());

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Word.remove({});


// require('./models/User');
// require('./config/passport');

// Initialize passport
app.use(passport.initialize());

app.use(AuthCore.getUserID());

// // Import routes
// const wordsRoutes = require('./routes/words');
// const sessionsRoutes = require('./routes/sessions');
// const usersRoutes = require('./routes/users');
// const authRoutes = require('./routes/auth');
// const videosRoutes = require('./routes/videos');

// // Use routes
// app.use('/api/words', wordsRoutes);
// app.use('/api/sessions', sessionsRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/videos', videosRoutes);
// app.use('/api/users', passport.authenticate('jwt', { session: false }), usersRoutes);

// // Static Angular Build
// app.use(express.static(path.join(__dirname, '../dist/')))

// // Serve the index.html Angular file
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../dist/index.html'));
// })


function createServer() {
  // const port = Number(process.env.PORT || 4600);
  const port = process.env.PORT || 4600;
    app.set('port', port);

    // Create the http Server
    const server = http.createServer(app);

    server.listen(port, (req, res) => {
        console.log(`RUNNING on port ${port}`);
    });
  // app.listen(port, function () {
  //   console.log('Listening on ' + port);
  // });
}


connectMongo();


async function checkInternet(cb) {
  const isConnected = await Database.init();
  cb(isConnected);

}

function connectMongo() {

  checkInternet(function (isConnected) {
    if (isConnected === true) {
      console.log('Connection to Mongo OK');
      createServer();
    } else {
      console.log('Not connected to mongo....');
      setTimeout(connectMongo, 3000);
    }
  });
}

app.get('/toto', function(req, res) {
    return res.status(200).send("totoot");
})


// On ewport l'app
exports.app = app;

// On charge les routes
require('./server/web/index');



// Handling Errors
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

// Handling Errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});