import { Profile } from './profile.js';

let cardName = document.getElementById('cardName');
let cardGender = document.getElementById('cardGender');
let cardPosition = document.getElementById('cardPosition');
let cardPhone = document.getElementById('cardPhone');
let cardEmail = document.getElementById('cardEmail');
let cardAddress = document.getElementById('cardAddress');
let cardOrg = document.getElementById('cardOrg');

let volunteer00 = new Profile("Joyce Foster", "Female", "843-992-4460", "jfoster@echousing.org", "Myrtle Beach, SC", "ECHO", "Donation Center Director");
let volunteer01 = new Profile("Johnathan Moore", "Male", "531-239-9066", "johnathanmoore9066@gmail.com", "Myrtle Beach, SC", "ECHO", "Laborer");
let volunteerList = [volunteer00, volunteer01];

const nameList = document.getElementById('nameList');

function displayProfileList(profiles) {
    profiles.forEach(profile => {
        const listItem = document.createElement('li');
        const nameLink = document.createElement('a');
        nameLink.href = '#';
        nameLink.textContent = profile.name;
        nameLink.addEventListener('click', () => displayProfile(profile));
        listItem.appendChild(nameLink);
        nameList.appendChild(listItem);
    });
}

function displayProfile(profile) {
    cardName.innerHTML = `Name: ${profile.name}`;
    cardGender.innerHTML = `Gender: ${profile.gender}`;
    cardPosition.innerHTML = `Position: ${profile.position}`;
    cardPhone.innerHTML = `Phone: ${profile.phone}`;
    cardEmail.innerHTML = `Email: ${profile.email}`;
    cardAddress.innerHTML = `Address: ${profile.address}`;
    cardOrg.innerHTML = `Organization: ${profile.company}`;

    profile.forEach(profile => {
        listItem.style.fontWeight = 'italic';
    })
}

displayProfileList(volunteerList);