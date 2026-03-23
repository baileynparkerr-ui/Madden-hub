const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Madden sends massive amounts of data, so we tell the server to handle large files
app.use(bodyParser.json({ limit: '50mb' }));

// 1. The Home Page
app.get('/', (req, res) => {
    res.send('<h1>Madden Hub is Online</h1><p>Send your export to: /export/yourname</p>');
});

// 2. The Export Receiver (This is where the Madden App sends data)
app.post('/export/:user', (req, res) => {
    const user = req.params.user;
    const data = req.body;
    
    console.log(`Received data for ${user}`);
    
    // Logic: Here is where we will eventually save stats to a database
    // For now, we just confirm we got it.
    res.status(200).send("Data received by Madden Hub!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
