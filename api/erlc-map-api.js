export default async function handler(req, res) {
    const API_KEY = process.env.ERLC_API_KEY; 

    try {
        const response = await fetch(`https://api.policeroleplay.community/v2/server?Players=true&Vehicles=true`, {
            headers: { 
                'server-key': API_KEY, // Must be lowercase 'server-key' for v2
                'Accept': 'application/json'
            }
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
