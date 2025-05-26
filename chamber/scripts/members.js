// members.js
function getMembershipLabel(level) {
  switch(level) {
    case 3: return "🥇 Gold Member";
    case 2: return "🥈 Silver Member";
    default: return "Member";
  }
}

function displayMembers(members) {
  const display = document.getElementById('directory');
  if (!display) return;

  members.forEach(m => {
    const section = document.createElement('section');
    section.innerHTML = `
      <img src="images/${m.logo}" alt="${m.name} logo" loading="lazy">
      <h3>${m.name}</h3>
      <p>${m.tagline}</p>
      <p>${m.address}</p>
      <p>${m.phone}</p>
      <p><a href="${m.website}" target="_blank">Visit Website</a></p>
      <p>${getMembershipLabel(m.level)}</p>
    `;
    display.appendChild(section);
  });
}

export async function loadMemberData() {
  if (!document.getElementById('directory')) return;
  try {
    const res = await fetch('data/members.json');
    if (!res.ok) throw new Error(res.statusText);
    const members = await res.json();
    displayMembers(members);
  } catch (err) {
    console.error("Failed to fetch members:", err);
  }
}

export function setupViewToggle() {
  const gridBtn = document.getElementById('grid');
  const listBtn = document.getElementById('list');
  const display = document.getElementById('directory');
  if (!gridBtn || !listBtn || !display) return;

  gridBtn.addEventListener('click', () => {
    display.classList.add('grid');
    display.classList.remove('list');
    gridBtn.setAttribute('aria-pressed','true');
    listBtn.setAttribute('aria-pressed','false');
  });
  listBtn.addEventListener('click', () => {
    display.classList.add('list');
    display.classList.remove('grid');
    listBtn.setAttribute('aria-pressed','true');
    gridBtn.setAttribute('aria-pressed','false');
  });
}
