

async function fetchServerStatus() {
    const statusText = document.getElementById('statusText');
    const statusDot = document.querySelector('.status-dot');

    try {
        const response = await fetch(`https://corsproxy.io/?https://api.policeroleplay.community/v1/server?t=${Date.now()}`, {
            headers: { 'Server-Key': API_KEY }
        });

        if (!response.ok) throw new Error('API Response Error');

        const data = await response.json();
        console.log("ER:LC API Data:", data);

        const currentPlayers = data.CurrentPlayers || 0;
        const maxPlayers = data.MaxPlayers || 40;
        const queueCount = data.Queue ?? data.JoinQueue ?? 0;

        if (currentPlayers < 8) {
            statusText.innerText = "OFFLINE";
            statusDot.classList.remove('online');
            statusDot.classList.add('offline');
        } else {
            statusText.innerHTML = `ONLINE — ${currentPlayers}/${maxPlayers} <span style="opacity: 0.5; margin-left: 5px;">(Queue: ${queueCount})</span>`;
            statusDot.classList.add('online');
            statusDot.classList.remove('offline');
        }

    } catch (error) {
        console.error('Error:', error);
        statusText.innerText = "STATUS UNAVAILABLE";
        statusDot.className = "status-dot"; 
    }
}

fetchServerStatus();

setInterval(fetchServerStatus, 30000);
