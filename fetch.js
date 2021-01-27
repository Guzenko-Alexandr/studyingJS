"use strict"

let url = "https://swapi.dev/api/people/";

let personsArray = [];

async function getAndCreateAllPerson() {
    while (url !== null) {
        let dataPersons;
        await fetch(url)
            .then(res => res.json())
            .then(resJson => dataPersons = resJson)
            .catch(err => console.log(err));
        url = dataPersons["next"];
        personsArray = personsArray.concat(dataPersons["results"]);
    }
    CreateAllPersonsInDoc();
}

function CreateAllPersonsInDoc() {
    addInInterface();
};

function addInInterface() {
    let idNumber = 1;
    personsArray.forEach((personObj) => {
        addElementNamePerson(personObj, idNumber);
        createCard(personObj, idNumber);
        idNumber++;
    });
};

function triggerClick(e, item) {
    e.preventDefault();
    document.querySelectorAll(".triggers__tabs").forEach(
        (child) => child.classList.remove("triggers__tabs--active")
    );
    document.querySelectorAll(".tabs__content__item").forEach(
        (child) => child.classList.remove("tabs__content__item--active")
    );
    item.classList.add('triggers__tabs--active');
    document.getElementById(item.dataset.id).classList.add("tabs__content__item--active");
    // let ddd = ;
    document.getElementById(item.dataset.id).style.margin = `${31 * item.dataset.id - 31}px 0 0 0 `
};


function addElementNamePerson(person, counter) {
    let myFirstUl = document.querySelector("ul");
    let li = document.createElement('li');
    li.innerHTML = person.name;
    li.dataset.id = `${counter}`;
    li.className = "triggers__tabs";
    li.style.listStyle = "none";
    li.onclick = (e) => { triggerClick(e, li); };
    myFirstUl.appendChild(li);
};

function createCard(person, counter) {
    let tabsContent = document.querySelector(".tabs__content");
    let Card = document.createElement('div');
    let imgPerson = document.createElement('img');
    imgPerson.src = "https://condenast-media.gcdn.co/tatler/45146299af71ff4fb201dee6674d1339.png/147f43f2/o/w2660";
    let characteristic = document.createElement('p');
    // characteristic.innerHTML += `${person.name} <br> ${person.height} <br> ${person.mass}`;
    Card.className = "tabs__content__item";
    Card.id = counter;
    Card.appendChild(imgPerson);
    tabsContent.appendChild(Card);
    Card.appendChild(characteristic);
    let textPerson = document.createElement('div');
    textPerson.className = "tabs__text"
    createCharacteristicInCard(person.name, textPerson);
    createCharacteristicInCard(person.gender, textPerson);
    createCharacteristicInCard(person.height, textPerson);
    createCharacteristicInCard(person.mass, textPerson);
    Card.appendChild(textPerson);
};

function createCharacteristicInCard(parameter, textPerson) {
    let newParametrPerson = document.createElement('p');
    newParametrPerson.innerHTML = parameter;
    textPerson.appendChild(newParametrPerson);
}

getAndCreateAllPerson();


