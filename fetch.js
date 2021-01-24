"use strict"


let myArray = [];

let url = "https://swapi.dev/api/people/";

let secondArray = [];

async function creatValueArray() {


    while (url !== null) {
        let lastjson;
        await fetch(url)
            .then(res => res.json())
            .then(resjson => lastjson = resjson)
            .catch(err => console.log(err));
        myArray.push(lastjson);
        url = lastjson["next"];
        // console.log(lastjson["results"]);
    }

    for (let i = 0; i < myArray.length; i++) {

        for (let j = 0; j < myArray[i].results.length; j++) {
            secondArray.push(myArray[i].results[j]);
        }
    }

    secondArray.forEach(function (i, item, secondArray) {
        // alert(i.name);
        addElement(i);
    });

    // function addElement(person) {
    //     let div = document.createElement('div');
    //     div.className = 'personStyleNew';
    //     div.style.backgroundColor = person.color;
    //     div.style.display = 'flex';
    //     div.style.justifyContent = 'space-between';
    //     div.innerHTML = ` ${person.id} 
    //                     <br> ${person.first_name} 
    //                     <br> ${person.last_name} 
    //                     <br> ${person.email} 
    //                     <br> ${person.gender} 
    //                     <br> ${person.ip_address} 
    //                     <br> ${person.color}
    //                     <br> ${person.slogan}`;
    //     div.prepend(createImg(person.avatar));
    //     document.body.appendChild(div);
    // }


    function addElement(i) {
        let myFirstUl = document.querySelector("ul");
        let li = document.createElement('li');
        li.innerHTML = i.name;
        li.className = 'classLi';
        li.id = "elem";
        li.style.background = "#2f4f4f";
        li.style.listStyle = "none";
        // li.style.width = "20%";
        myFirstUl.appendChild(li);
        li.onclick = function () {
            // for (let key in i) 
            // alert(i[key]);

            var previousElement = document.querySelector('.dataField');
            if (previousElement !== null) {
                console.log(previousElement);
                previousElement.parentNode.removeChild(previousElement);
            }

            let secondDiV = document.getElementById("secondDiv");
            let div = document.createElement('div');
            div.innerHTML = i.name;
            div.innerHTML += `<br> ${i.height}`;
            div.innerHTML += `<br> ${i.mass}`;
            div.className = "dataField";
            div.style.background = "#ff7f50";
            // div.style.width = "100%";
            secondDiV.appendChild(div);




        };

    }


};


creatValueArray();




