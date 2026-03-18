export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const API_KEY = process.env.ERLC_API_KEY;
    const { userId } = req.body;

    if (!userId) return res.status(400).json({ error: 'Missing userId' });

    try {
        const response = await fetch('https://api.policeroleplay.community/v1/server/bans', {
            method: 'POST',
            headers: {
                'Server-Key': API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ PlayerId: Number(userId) })
        });

        if (!response.ok) {
            const err = await response.json();
            return res.status(response.status).json({ error: err });
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
