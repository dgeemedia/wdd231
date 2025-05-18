// 1. URL of the JSON data
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

// 2. Grab the <div id="cards"> where we'll inject our “cards”
const cards = document.querySelector('#cards');

// 3. Fetch the data, parse it, and hand it off to displayProphets()
async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  console.table(data.prophets);
  displayProphets(data.prophets);
}

getProphetData();

// 4. Build and inject one “card” per prophet
const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    // a) Create the card and its children
    let card     = document.createElement('section');
    let fullName = document.createElement('h2');
    let portrait = document.createElement('img');

    // b) Fill in the heading with first + last name
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    // c) Build the <img> using the prophet’s image URL + attributes
    portrait.setAttribute('src',     prophet.imageurl);
    portrait.setAttribute('alt',     `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width',   '340');
    portrait.setAttribute('height',  '440');

    // d) Assemble: put the <h2> and <img> inside the <section>
    card.appendChild(fullName);
    card.appendChild(portrait);

    // e) Finally, append the card into the <div id="cards">
    cards.appendChild(card);
  });
};
