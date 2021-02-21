function getAndDeleteValuePersons(ValidationValue) {
   let preloaderTabs = document.querySelector('.tabs__preloader');
   preloaderTabs.classList.remove("tabs__preloader--invisible");
   deletePreviousPerson();
   getAndCreateAllPerson(ValidationValue);
}

function createAllPersonsInDoc() {
   let idNumber = 1;
   personsArray.forEach((personObj) => {
      addElementNamePerson(personObj, idNumber);
      createCard(personObj, idNumber);
      idNumber++;
   });
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

// Create the first 10 people in document
buttonNext.click();