require('dotenv').config()

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./db');
app.use(bodyParser.json());

app.route('/api/:userID/scripts')
  .get(function(req, res, next) {
    connection.query(
      "SELECT * FROM scripts WHERE username = ?", req.params.userID,
      function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
  });

app.route('/api/:userID/scripts/add')
  .post(function(req, res, next) {
    var title = req.body.title.toString();
    var content = req.body.content.toString();
    var lastUsed = req.body.lastUsed.toString();
    connection.query(
      "INSERT INTO scripts (title, content, lastUsed, username) VALUES (?,?,?,?)", [title,content,lastUsed,req.params.userID],
      function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
  });

app.route('/api/:userID/scripts/:scriptID')
  .get(function(req, res, next) {
    connection.query(
      "SELECT * FROM scripts WHERE username = ? AND id = ?", [req.params.userID, req.params.scriptID],
      function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
  })
  .post(function(req, res, next) {
    var title = req.body.title.toString();
    var content = req.body.content.toString();
    var lastUsed = req.body.lastUsed.toString();
    connection.query(
      "UPDATE scripts SET title = ?, content = ?, lastUsed = ? WHERE username = ? AND id = ?", [title,content,lastUsed,req.params.userID, req.params.scriptID],
      function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
  })
  .put(function(req, res, next) {
    connection.query(
      "DELETE FROM scripts WHERE username = ? AND id = ?", [req.params.userID, req.params.scriptID],
      function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
  });

app.route('/api/:userID/metrics')
.get(function(req, res, next) {
  connection.query(
    "SELECT * FROM metrics WHERE username = ?", req.params.userID,
    function(error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});

app.route('/api/:userID/metrics/add')
  .post(function(req, res, next) {
    var scriptID = req.body.scriptID;
    var duration = req.body.duration;
    var wordsPerMinute = req.body.wordsPerMinute;
    var speechFinished = req.body.speechFinished;
    var saveTime = req.body.saveTime.toString();
    connection.query(
      "INSERT INTO metrics (scriptID, duration, wordsPerMinute, speechFinished, saveTime, username) VALUES (?,?,?,?,?,?)", [scriptID, duration, wordsPerMinute, speechFinished, saveTime,req.params.userID],
      function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
  });

app.route('/api/:userID/metrics/:metricID')
  .get(function(req, res, next) {
    connection.query(
      "SELECT * FROM metrics WHERE username = ? AND id = ?", [req.params.userID, req.params.metricID],
      function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
  });

app.get('/api/status', (req, res) => res.send('Working!'));

app.listen(8080,() => console.log("Listening on port 8080!"));