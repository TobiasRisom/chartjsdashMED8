const express = require('express');
const bodyParser = require('body-parser');
const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000; // Set your desired port number



app.use(bodyParser.json());

app.post('/rasa-webhook', (req, res) => {
  const { file_type, file_content } = req.body;

  // Add your logic to handle the incoming JSON data based on file_type
  // Save the received JSON data to a file in the same directory as server.js
  const decompressedContent = zlib.unzipSync(Buffer.from(file_content, 'base64')).toString();


  const fileName = file_type === "args" ? 'args.json' : 'data.json';
  const filePath = path.join(__dirname, fileName);

  fs.writeFile(filePath, decompressedContent, (err) => {
    if (err) {
      console.error(`Error saving ${fileName}:`, err);
      res.status(500).json({ error: `Error saving ${fileName}.` });
    } else {
      console.log(`${fileName} saved successfully.`);
      res.status(200).json({ message: `Received and processed ${fileName} successfully.` });
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
