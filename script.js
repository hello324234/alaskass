async function fetchServerStatus() {
    const statusText = document.getElementById('statusText');
    const statusDot = document.querySelector('.status-dot');

    try {
        // CHANGED: We now fetch from your own site's /api/status folder
        // This is where the secret key is hidden!
        const response = await fetch('/api/status');

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
