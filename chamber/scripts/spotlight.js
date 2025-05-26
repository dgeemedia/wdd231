// spotlight.js
export async function fetchSpotlights() {
  const container = document.getElementById('spotlightContainer');
  if (!container) return;

  try {
    const res     = await fetch('data/members.json');
    const members = await res.json();
    // only levels 1 & 2
    const pool = members.filter(m => m.level <= 2);
    const picks = [];

    while (picks.length < 3 && pool.length) {
      const i = Math.floor(Math.random() * pool.length);
      picks.push(pool.splice(i, 1)[0]);
    }

    container.innerHTML = '';
    picks.forEach(m => {
      const card = document.createElement('div');
      card.className = 'spotlight-card';
      card.innerHTML = `
        <img src="images/${m.logo}" alt="${m.name} logo">
        <h3>${m.name}</h3>
        <p><strong>Level:</strong> ${m.level}</p>
        <p><strong>Phone:</strong> ${m.phone}</p>
        <p><strong>Address:</strong> ${m.address}</p>
        <p><a href="${m.website}" target="_blank">Visit Website</a></p>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error('Spotlight Fetch Error:', err);
  }
}
