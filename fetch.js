"use strict"

window.onload = function () {
    let preloader = document.querySelector('.preloader');
    window.setTimeout(function () {
        preloader.style.display = "none";
    }, 500);
}

let url = "https://swapi.dev/api/people/";

let counterVisual = 0;
let personsArray = [];
let resultCount = 0;
let urlForCounterStart;
let maximumNumberOfPages = 0;
let functionExecuted = false;
let counterList = 0;
let newMaximumNumberOfPages = 0;
let toCreatePagination = 0;
let createMaxNumberofPages = 0;

let pagginationArray = [];

let previousClick;
async function getAndCreateAllPerson(ValidationValue, secondValue) {
    console.log(secondValue);
    functionExecuted = true;
    if (ValidationValue == 1) {
        counterList += 1;
        changeMeaningPagination(true);
    }
    if (previousClick == undefined) {
        previousClick = "http://swapi.dev/api/people/?page=9";
        counterList = 2;
    }
    if (ValidationValue == 0) {
        url = previousClick;
        counterList -= 1;
        changeMeaningPagination(false);
    }
    if (secondValue !== undefined) {
        url = secondValue;
        if (typeof secondValue !== null) {
            url = `http://swapi.dev/api/people/?page=${secondValue}`;
        }
    }
    console.log(url);
    personsArray = [];
    let dataPersons;
    await fetch(url)
        .then(res => res.json())
        .then(resJson => dataPersons = resJson)
        .catch(err => console.log(err));
    for (; 1 > createMaxNumberofPages;) {
        maximumNumberOfPages = Math.ceil(dataPersons["count"] / 10);
        ++createMaxNumberofPages;
    };
    url = dataPersons["next"];
    previousClick = dataPersons["previous"];

    // if (dataPersons["previous"] == null) {

    // }
    if (dataPersons["previous"] == null) {
        pagginationArray[0] = 'http://swapi.dev/api/people/?page=9';
    }

    for (; toCreatePagination == 0; toCreatePagination++) {
        createPagination(maximumNumberOfPages);
    };

    if (dataPersons["next"] == null) {
        url = "https://swapi.dev/api/people/";
        counterList = maximumNumberOfPages;
    }
    if (previousClick == undefined) {
        counterList = 1;
    }
    personsArray = personsArray.concat(dataPersons["results"]);
    CreateAllPersonsInDoc();
    pagination();
    // changeMeaningPagination();
    let preloaderTabs = document.querySelector('.tabs__preloader');
    preloaderTabs.classList.add("tabs__preloader--invisible");
    functionExecuted = false;
}



function createPagination() {
    for (let i = 1; i < 5 + 1; i++) {
        // console.log(pagginationArray[i])
        let paginationLastLi = document.querySelector('.pagination__last-li');
        let li = document.createElement('li');
        let a = document.createElement('a');
        li.appendChild(a);
        a.id = i;
        a.className = `pagination__counter`;
        a.innerHTML = `${i}`;
        if (i == 1) {
            a.dataset.id = 1;
        }
        if (i == 2) {
            a.innerHTML = 2;
        }
        if (i == 3) {
            a.innerHTML = 3;
            a.dataset.id = 3;
        }
        if (i == 4) {
            a.innerHTML = '...';
            // a.className = "";
            a.classList += "pointer-events-active";
        }
        if (i == 5) {
            a.innerHTML = maximumNumberOfPages;
            a.id = maximumNumberOfPages;
            // a.classList.add("maximumNumberOfPages");
            a.dataset.id = "maximumNumberOfPages";
        }
        paginationLastLi.before(li);
    }
}

function pagination() {
    // let allPreviousPaginationCounter = document.querySelectorAll(".pagination__counter");
    // allPreviousPaginationCounter.forEach((child) => {
    // child.remove();
    // })

    let allCurrentPaginationCounter = document.querySelectorAll(".pagination__counter")
    allCurrentPaginationCounter.forEach((elem) => elem.onclick = (e) => {
        e.preventDefault();
        let preloaderTabs = document.querySelector('.tabs__preloader');
        preloaderTabs.classList.remove("tabs__preloader--invisible");
        if (functionExecuted == true) {
            return;
        }
        deletePreviousPerson();
        getAndCreateAllPerson(-1, elem.id);
    });
}

function changeMeaningPagination(checkValue) {
    let allMeaningPagination = document.querySelectorAll('.pagination__counter');
    if (checkValue == true) {
        allMeaningPagination.forEach((child) => {
            if (child.dataset.id == "maximumNumberOfPages") {
                return;
            }
            else {
                child.id = +child.id + 1;
                child.innerHTML = +child.innerHTML + 1;
            }
        })
    }
    else if (checkValue == false) {
        allMeaningPagination.forEach((child) => {
            if (child.dataset.id == "maximumNumberOfPages") {
                return;
            }
            child.id = +child.id - 1;
            child.innerHTML = +child.innerHTML - 1;
        })
    }
    else {


    }
    // var desiredValues = allMeaningPagination.filter(function (key) {
    //     return key < 9;
    // });
    // console.log(desiredValues)

}


function getValuePersons(ValidationValue) {
    let preloaderTabs = document.querySelector('.tabs__preloader');
    preloaderTabs.classList.remove("tabs__preloader--invisible");
    deletePreviousPerson();
    getAndCreateAllPerson(ValidationValue);
}

let buttonPrevious = document.querySelector(".pagination__first-item");
buttonPrevious.onclick = (e) => {
    if (functionExecuted == true) {
        return;
    }
    getValuePersons(0);
}

let getPersonButton = document.querySelector(".pagination__last-item");
getPersonButton.onclick = (e) => {
    if (functionExecuted == true) {
        return;
    }
    getValuePersons(1);

}

getPersonButton.click();

function deletePreviousPerson() {
    functionExecuted = true;
    let allPreviousPerson = document.querySelectorAll(".triggers__tabs");
    let allPreviousPersonCard = document.querySelectorAll(".tabs__content__item");
    allPreviousPersonCard.forEach(element => {
        element.remove();
    });
    allPreviousPerson.forEach(element => {
        element.remove();
    });
    functionExecuted = false;
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
    // paginator();
    e.preventDefault();
    document.querySelectorAll(".triggers__tabs").forEach(
        (child) => child.classList.remove("triggers__tabs--active")
    );
    document.querySelectorAll(".tabs__content__item").forEach(
        (child) => child.classList.remove("tabs__content__item--active")
    );
    item.classList.add('triggers__tabs--active');
    document.getElementById(item.dataset.id).classList.add("tabs__content__item--active");
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
    Card.className = "tabs__content__item";
    Card.id = counter;
    Card.appendChild(imgPerson);
    tabsContent.appendChild(Card);
    Card.appendChild(characteristic);
    let textPerson = document.createElement('div');
    textPerson.className = "tabs__text"
    createCharacteristicInCard('', person.name, textPerson);
    createCharacteristicInCard("Gender:", person.gender, textPerson);
    createCharacteristicInCard("Height:", person.height, textPerson);
    createCharacteristicInCard("Mass:", person.mass, textPerson);
    Card.appendChild(textPerson);
};

function createCharacteristicInCard(nameParametr, parameter, textPerson) {
    let newParametrPerson = document.createElement('p');
    newParametrPerson.innerHTML = `${nameParametr} ${parameter} `;
    textPerson.appendChild(newParametrPerson);
}
