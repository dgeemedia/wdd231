
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("#directory");

// Toggle views
gridbutton.addEventListener("click", () => {
	display.classList.add("grid");
	display.classList.remove("list");
});

listbutton.addEventListener("click", showList);

function showList() {
	display.classList.add("list");
	display.classList.remove("grid");
}

// Load and display JSON data
const url = 'data/members.json';

async function loadMemberData() {
	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error(response.statusText);
		const members = await response.json();
		displayMembers(members);
	} catch (error) {
		console.error("Failed to fetch members:", error);
	}
}

function displayMembers(members) {
	members.forEach(member => {
		const section = document.createElement("section");

		// Logo
		const img = document.createElement("img");
		img.src = `images/${member.logo}`;
		img.alt = `${member.name} logo`;
		img.loading = "lazy";

		// Name
		const name = document.createElement("h3");
		name.textContent = member.name;

		// Tagline
		const tagline = document.createElement("p");
		tagline.textContent = member.tagline;

		// Address
		const address = document.createElement("p");
		address.textContent = member.address;

		// Phone
		const phone = document.createElement("p");
		phone.textContent = member.phone;

		// Website
		const website = document.createElement("a");
		website.href = member.website;
		website.textContent = "Visit Website";
		website.target = "_blank";

		// Membership Level
		const level = document.createElement("p");
		level.textContent = getMembershipLabel(member.level);

		// Append elements to the section
		section.appendChild(img);
		section.appendChild(name);
		section.appendChild(tagline);
		section.appendChild(address);
		section.appendChild(phone);
		section.appendChild(website);
		section.appendChild(level);

		display.appendChild(section);
	});
}

// Membership level to label
function getMembershipLabel(level) {
	switch(level) {
		case 3: return "🥇 Gold Member";
		case 2: return "🥈 Silver Member";
		default: return "Member";
	}
}

// Load data when page loads
loadMemberData();

// Mobile nav toggle with animation
const menuButton = document.getElementById('menu-button');
const navMenu = document.getElementById('nav-menu');

menuButton.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  menuButton.classList.toggle('open');
  navMenu.classList.toggle('hidden');
  menuButton.setAttribute('aria-expanded', menuButton.classList.contains('open'));
});

// Set ARIA attributes for accessibility
menuButton.setAttribute('aria-controls', 'nav-menu');
menuButton.setAttribute('aria-expanded', 'false');

// Last modified
document.getElementById('mod-date').textContent = document.lastModified;