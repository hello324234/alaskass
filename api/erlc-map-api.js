export default async function handler(req, res) {
    const API_KEY = process.env.ERLC_API_KEY; 

    if (!API_KEY) {
        console.error("❌ ERROR: ERLC_API_KEY is not defined in Environment Variables.");
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
        // v2 requires specific query parameters to see players/locations
        const url = `https://api.policeroleplay.community/v2/server?Players=true&Vehicles=true&t=${Date.now()}`;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: { 
                'server-key': API_KEY, // Must be lowercase for v2
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`❌ API Error: ${response.status} - ${errorText}`);
            return res.status(response.status).json({ error: 'ERLC API Rejected Request' });
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("❌ Connection Error:", error);
        res.status(500).json({ error: 'Failed to connect to ERLC' });
    }
}
