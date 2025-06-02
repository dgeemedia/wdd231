import { temples } from "../data/temples.js"
console.log(temples)

import { url } from "../data/temples.js"
console.log(url)

// ---- GRAB A REFERENCE TO THE DIVISION WHERE WE DISPLAY THE ITEM
const showHere = document.querySelector('#showHere')

// ---- GET A REFERENCE TO THE HTML DIALOG ELEMENT
const mydialog = document.querySelector('#mydialog')
const mytitle = document.querySelector('#mydialog h2')
const myinfo = document.querySelector('#mydialog p')
const myclose = document.querySelector('#mydialog button')
myclose.addEventListener("click", () => mydialog.close())

// --- LOOP THROUGH THE ARRAY OF JSON ITEMS
function displayItems(data) {
    console.log(data)
    data.forEach(x => {
        console.log(x)
        const photo = document.createElement('img')
        photo.src=`${url}${x.path}`
        photo.alt=x.name

        //Add an event listener to each division on the page
        photo.addEventListener('click', () => showStuff(x));
        showHere.appendChild(photo)
    }) // end loop
} // end function

// START DISPLAYING ALL ITEMS IN HE JSON FILE
displayItems(temples)

//POPULATE THE DIALOG WITH INFORMATION WHEN IMAGE IS CLICKED
function showStuff(x) {
    mytitle.innerHTML = x.name;

    myinfo.innerHTML = `
        <strong>Temple Number:</strong> ${x.number}<br>
        <strong>Dedicated:</strong> ${x.dedicated}<br>
        <strong>Dedicated By:</strong> ${x.person}<br>
        <img src="${url}${x.path}" alt="${x.name}" style="width:100%; margin-top:1rem; border-radius:8px;">
    `;
    
    mydialog.showModal()
} // end function