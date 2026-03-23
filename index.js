const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Madden sends massive files, so we set a 50mb limit
app.use(bodyParser.json({ limit: '50mb' }));

// The Home Page (What you see when you visit the URL)
app.get('/', (req, res) => {
    res.send(`
        <div style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h1>🏈 Madden Hub is Online</h1>
            <p>Your Export URL is below. Paste this into your Madden Companion App:</p>
            <code style="background: #eee; padding: 10px; border-radius: 5px;">
                https://${req.get('host')}/export/league1
            </code>
        </div>
    `);
});

// The Receiver (Where the Madden App sends the data)
app.post('/export/:user', (req, res) => {
    const user = req.params.user;
    const data = req.body;
    
    console.log(`--- Data Received for ${user} ---`);
    console.log("Player Count:", data.rosterInfoList?.length || "No Roster Found");
    
    // This sends a "Thank You" back to the Madden App
    res.status(200).send("Success");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
