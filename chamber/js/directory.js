const GRID_BTN  = document.getElementById('grid');
const LIST_BTN  = document.getElementById('list');
const DIRECTORY = document.getElementById('directory');

// toggle view
GRID_BTN.addEventListener('click', () => {
  DIRECTORY.classList.add('grid');
  DIRECTORY.classList.remove('list');
});
LIST_BTN.addEventListener('click', () => {
  DIRECTORY.classList.add('list');
  DIRECTORY.classList.remove('grid');
});

// fetch & render
async function loadMembers() {
  try {
    // adjust if your members.json is elsewhere!
    const res = await fetch('../data/members.json');
    if (!res.ok) throw new Error(res.statusText);
    const members = await res.json();
    renderMembers(members);
  } catch (err) {
    DIRECTORY.innerHTML = `<p class="error">Error loading directory: ${err.message}</p>`;
  }
}

function renderMembers(list) {
  DIRECTORY.innerHTML = '';
  list.forEach(m => {
    const card = document.createElement('section');
    card.className = 'biz-card';

    // badge
    const badge = document.createElement('div');
    badge.className = 'level-badge ' +
      (m.level===3?'gold': m.level===2?'silver':'member');
    badge.textContent = m.level===3?'Gold':
                        m.level===2?'Silver':'Member';
    card.append(badge);

    // logo (path *relative to* directory.html)
    const img = document.createElement('img');
    img.src = 'images/' + m.logo;
    img.alt = m.name + ' logo';
    card.append(img);

    // name & tagline
    const h3 = document.createElement('h3');
    h3.textContent = m.name;
    card.append(h3);

    const tag = document.createElement('p');
    tag.className = 'tagline';
    tag.textContent = m.tagline;
    card.append(tag);

    // address
    const addr = document.createElement('p');
    addr.innerHTML = `<strong>Address:</strong> ${m.address}`;
    card.append(addr);

    // phone
    const ph = document.createElement('p');
    ph.innerHTML = `<strong>Phone:</strong> ${m.phone}`;
    card.append(ph);

    // website
    const a = document.createElement('a');
    a.href = m.website;
    a.target = '_blank';
    a.textContent = 'Visit Website';
    card.append(a);

    DIRECTORY.append(card);
  });
}

loadMembers();
