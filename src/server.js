const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000; // Set your desired port number

app.use(bodyParser.json());

app.post('/rasa-webhook', (req, res) => {
  const jsonData = req.body;

  // Add your logic to handle the incoming JSON data

  // Save the received JSON data to a file
  const filePath = path.join(__dirname, 'data.json');

  fs.writeFile(filePath, JSON.stringify(jsonData), (err) => {
    if (err) {
      console.error('Error saving JSON file:', err);
      res.status(500).json({ error: 'Error saving JSON file.' });
    } else {
      console.log('JSON file saved successfully.');
      res.status(200).json({ message: 'Received and processed JSON data successfully.' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
