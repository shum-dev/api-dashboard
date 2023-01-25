require('dotenv').config();
const express = require('express'),
      app = express();
      cors = require('cors'),
      bodyParser = require('body-parser'),
      errorHandler = require('./handlers/error'),
      authRoutes = require('./routes/auth'),
      request = require('request');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);

// PROXY for avoid CORS policy
app.get('/nagerdate', (req, res) => {
  request(
    { url: 'https://date.nager.at/Api/v2/PublicHolidays/2019/RU' }, (error, response, body) => {
      if(error || response.statusCode !== 200) {
        return res.status(500).json({type: 'error', message: error.message });
      }
      res.json(JSON.parse(body));
    }
  )
});

app.get('/trivia', (req, res) => {
  request(
    { url: 'https://opentdb.com/api.php?amount=10' }, (error, response, body) => {
      if(error || response.statusCode !== 200) {
        return res.status(500).json({type: 'error', message: error.message });
      }
      res.json(JSON.parse(body));
    }
  )
});

app.get('/breakingbad', (req, res) => {
  request(
    { url: 'https://api.breakingbadquotes.xyz/v1/quotes/5' }, (error, response, body) => {
      if(error || response.statusCode !== 200) {
        return res.status(500).json({type: 'error', message: error.message });
      }
      res.json(JSON.parse(body));
    }
  )
});

app.get('/publicapis', (req, res) => {
  request(
    { url: 'https://api.publicapis.org/entries' }, (error, response, body) => {
      if(error || response.statusCode !== 200) {
        return res.status(500).json({type: 'error', message: error.message });
      }
      res.json(JSON.parse(body));
    }
  )
});

app.get('/jikanapi', (req, res) => {
  request(
    { url: 'https://api.jikan.moe/v4/top/people' }, (error, response, body) => {
      if(error || response.statusCode !== 200) {
        return res.status(500).json({type: 'error', message: error.message });
      }
      res.json(JSON.parse(body));
    }
  )
});

// Any error handling
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Server is starting on port: ', PORT);
  console.log('Environment variables is: ', process.env.MONGO_HOST);

})
