const express = require('express');
const axios = require('axios'); // Tool to make requests to EA
const app = express();

app.use(express.json({ limit: '50mb' }));

// 1. HOME DASHBOARD
app.get('/', (req, res) => {
    res.send(`
        <body style="background: #121212; color: white; font-family: sans-serif; padding: 40px;">
            <h1>Snilla-Style Dashboard</h1>
            <div style="background: #1e1e1e; padding: 20px; border-radius: 10px;">
                <h3>Status: <span style="color: #4CAF50;">Connected</span></h3>
                <button onclick="location.href='/sync'" style="padding: 10px 20px; cursor: pointer;">
                    🔄 FORCE REFRESH STATS
                </button>
            </div>
            <p>Your data will appear here automatically once synced.</p>
        </body>
    `);
});

// 2. THE AUTOMATED FETCH (The Snilla Secret)
app.get('/sync', async (req, res) => {
    const MY_EA_TOKEN = "YOUR_TOKEN_HERE"; // The token you "sniffed" earlier
    
    try {
        // This is a simplified version of the call Snillabot makes to EA
        const response = await axios.get('https://madden-api.ea.com/v1/franchise/roster', {
            headers: { 'Authorization': `Bearer ${MY_EA_TOKEN}` }
        });
        
        console.log("Stats pulled successfully!");
        res.redirect('/'); // Refresh the page with new data
    } catch (err) {
        res.status(500).send("Sync Failed: EA Token may be expired.");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Dashboard live on port ${PORT}`));
