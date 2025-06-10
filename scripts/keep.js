import { places } from "../data/places.mjs";
console.log(places)

const container = document.getElementById("discoverContainer");

places.forEach(place => {
  const card = document.createElement("div");
  card.classList.add("place-card");

  card.innerHTML = `
    <img src="images/${place.photo_url}" alt="${place.name}" class="place-img">
    <h3>${place.name}</h3>
    <p><strong>Address:</strong> ${place.address}</p>
    <p>${place.description}</p>
    <p><strong>Property Cost:</strong> ${place.property_cost}</p>
  `;

  container.appendChild(card);
});