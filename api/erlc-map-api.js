export default async function handler(req, res) {
    const API_KEY = process.env.ERLC_API_KEY; 

    try {
        // v2 API URL - requesting Players, Vehicles, and Logs
        const url = `https://api.policeroleplay.community/v2/server?Players=true&Vehicles=true&t=${Date.now()}`;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: { 
                'server-key': API_KEY, 
                'Accept': 'application/json'
            }
        });

        if (!response.ok) throw new Error('ERLC API Error');

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch map data' });
    }
}
