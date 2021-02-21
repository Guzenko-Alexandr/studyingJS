"use strict"

window.onload = function () {
    let preloader = document.querySelector('.preloader');
    window.setTimeout(function () {
        preloader.style.display = "none";
    }, 500);
}

let url = "https://swapi.dev/api/people/";
let personsArray = [];
let maximumNumberOfPages = 0;
let functionExecuted = false;
let currentPage = 0;
let createMaxNumberofPages = 0;
let pagginationArray = [];
let previousClick;
async function getAndCreateAllPerson(ValidationValue, secondValue) {
    functionExecuted = true;
    // click on the next button
    if (ValidationValue == 1) {
        currentPage += 1;
    }
    // for a situation when one cycle passes
    if (previousClick == undefined) {
        previousClick = "http://swapi.dev/api/people/?page=9";
        currentPage = 2;
    }
    // click on the previous button 
    if (ValidationValue == 0) {
        url = previousClick;
        currentPage -= 1;
    }
    // for preloader work
    if (secondValue !== undefined) {
        url = `http://swapi.dev/api/people/?page=${secondValue}`;
        currentPage = +secondValue;
    }
    personsArray = [];
    let dataPersons;
    await fetch(url)
        .then(res => res.json())
        .then(resJson => dataPersons = resJson)
        .catch(err => console.log(err));

    for (; 1 > createMaxNumberofPages;) {
        // 10 obj per page
        maximumNumberOfPages = Math.ceil(dataPersons["count"] / 10);
        ++createMaxNumberofPages;
    };

    url = dataPersons["next"];
    previousClick = dataPersons["previous"];

    if (dataPersons["previous"] == null) {
        pagginationArray[0] = `http://swapi.dev/api/people/?page=${maximumNumberOfPages}`;
    }
    // for the correct operation of the counter
    if (previousClick == undefined) {
        currentPage = 1;
    }
    // for the preloader to work after the last value, creating a cycle
    if (dataPersons["next"] == null) {
        url = "https://swapi.dev/api/people/";
        currentPage = maximumNumberOfPages;
    }

    personsArray = personsArray.concat(dataPersons["results"]);
    createAllPersonsInDoc();
    const arrayСurrentPagination = createPaginationArray(maximumNumberOfPages, currentPage);
    deleteAndCreatePagination(arrayСurrentPagination, currentPage);
    let preloaderTabs = document.querySelector('.tabs__preloader');
    preloaderTabs.classList.add("tabs__preloader--invisible");
    functionExecuted = false;
}


let buttonPrevious = document.querySelector(".pagination__first-item");
buttonPrevious.onclick = (e) => {
    if (functionExecuted == true) {
        return;
    }
    getAndDeleteValuePersons(0);
}

let buttonNext = document.querySelector(".pagination__last-item");
buttonNext.onclick = (e) => {
    if (functionExecuted == true) {
        return;
    }
    getAndDeleteValuePersons(1);
}



