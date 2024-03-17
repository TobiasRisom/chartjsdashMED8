const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 4000; // Choose your desired port number

// Enable CORS middleware
app.use(cors());

// Body parsing middleware
app.use(express.json());

// Define a route to serve the data.json file
app.post('/data-webhook', (req, res) => {
  const fileNames = ['args', 'data'];

  const jsonData = {};
  let filesProcessed = 0;

  fileNames.forEach(filename => {

    const filePath = path.join(__dirname, '..', 'data', `${filename}.json`);

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading ${filename}.json:`, err);
        return res.status(500).json({ error: `Error reading ${filename}.json` });
      } else {
        jsonData[filename] = JSON.parse(data);
        filesProcessed++;

        if (filesProcessed === fileNames.length) {
          return res.status(200).json(jsonData);
        }
      }
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
