function updateClocks() {
    const timezones = {
        'pakistan': 'Asia/Karachi',
        'jerusalem': 'Asia/Jerusalem',
        'saudi-arabia': 'Asia/Riyadh',
        'iran': 'Asia/Tehran',
        'turkey': 'Europe/Istanbul',
        'london': 'Europe/London',
        'new-york': 'America/New_York',
        'tokyo': 'Asia/Tokyo'
    };

    for (const [id, timezone] of Object.entries(timezones)) {
        const card = document.getElementById(id);
        if (!card) continue;

        const now = new Date();
        const options = {
            timeZone: timezone,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false
        };

        const formatter = new Intl.DateTimeFormat([], options);
        const parts = formatter.formatToParts(now);

        let hours = 0, minutes = 0, seconds = 0;
        for (const part of parts) {
            if (part.type === 'hour') hours = parseInt(part.value, 10);
            if (part.type === 'minute') minutes = parseInt(part.value, 10);
            if (part.type === 'second') seconds = parseInt(part.value, 10);
        }

        const hourDeg = (hours % 12) * 30 + minutes * 0.5;
        const minuteDeg = minutes * 6;
        const secondDeg = seconds * 6;

        const hourHand = card.querySelector('.hour');
        const minuteHand = card.querySelector('.minute');
        const secondHand = card.querySelector('.second');
        const digitalDisplay = card.querySelector('.digital-time');

        if (hourHand) hourHand.style.transform = `rotate(${hourDeg}deg)`;
        if (minuteHand) minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
        if (secondHand) secondHand.style.transform = `rotate(${secondDeg}deg)`;

        if (digitalDisplay) {
            const pad = (num) => String(num).padStart(2, '0');
            digitalDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        }
    }
}

updateClocks();
setInterval(updateClocks, 1000);