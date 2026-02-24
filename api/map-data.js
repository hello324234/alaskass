export default async function handler(req, res) {
    const API_KEY = process.env.ERLC_API_KEY; 

    try {
        // v2/server with Players and Vehicles enabled
        const apiUrl = `https://api.policeroleplay.community/v2/server?Players=true&Vehicles=true&t=${Date.now()}`;

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: { 
                'server-key': API_KEY, // v2 requires 'server-key'
                'Accept': 'application/json'
            }
        });

        if (!response.ok) throw new Error(`PRC API returned ${response.status}`);

        const data = await response.json();

        // We only send the frontend exactly what it needs to stay fast
        res.status(200).json({
            Players: data.Players || [],
            Vehicles: data.Vehicles || []
        });

    } catch (error) {
        res.status(500).json({ error: 'Server Error', message: error.message });
    }
}
