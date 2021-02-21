function createPaginationArray(maximumNumberOfPages, n) {
   let min = 1;
   let max = maximumNumberOfPages;
   let offset_x = 1;

   if (n <= min + offset_x + 1) {
      const firstElements = _range(min, min + offset_x + 1);
      const endElements = ['...', max];
      const allElements = firstElements.concat(endElements);
      return allElements;
   }
   else if (n <= maximumNumberOfPages - offset_x - 1) {
      const firstElements = [min, '...']
      const middleElements = _range(n - offset_x, n + offset_x);
      const endElements = ['...', maximumNumberOfPages];
      const allElements = firstElements.concat(middleElements).concat(endElements);
      return allElements;
   }
   else {
      const firstElements = [1, '...'];
      const endElements = _range(maximumNumberOfPages - offset_x - 1, maximumNumberOfPages);
      const allElements = firstElements.concat(endElements);
      return allElements;
   }
   function _range(min, max) {
      let leng = max - min + 1;
      let arr = new Array(leng);
      for (let i = 0; i < leng; i++) {
         arr[i] = min + i;
      }
      return arr;
   }
}

function deleteAndCreatePagination(currentPagesNumber, currentPage) {
   let allPreviousPaginationCounter = document.querySelectorAll(".pagination__li");
   allPreviousPaginationCounter.forEach((child) => {
      child.remove();
   })

   createElementsPagination(currentPagesNumber, currentPage);

   let allCurrentPaginationCounter = document.querySelectorAll(".pagination__counter")
   allCurrentPaginationCounter.forEach((elem) => elem.onclick = (e) => {
      e.preventDefault();
      if (functionExecuted == true) {
         return;
      }
      let preloaderTabs = document.querySelector('.tabs__preloader');
      preloaderTabs.classList.remove("tabs__preloader--invisible");
      deletePreviousPerson();
      getAndCreateAllPerson(-1, elem.id);
   });
}

function createElementsPagination(currentPagesNumber) {
   let arrayNumber = 0;
   currentPagesNumber.forEach((elem) => {
      let LastLi = document.querySelector('.pagination__last-li');
      let li = document.createElement('li');
      li.classList.add('pagination__li');
      let a = document.createElement('a');
      a.classList.add('pagination__counter');
      a.innerHTML = currentPagesNumber[arrayNumber];
      if (a.innerHTML == currentPage) {
         a.classList.add('pagination__element-active');
      }
      if (currentPagesNumber[arrayNumber] == "...") {
         a.classList.add('pointer-events-active');
      }
      a.id = currentPagesNumber[arrayNumber];
      a.href = `http://swapi.dev/api/people/?page=${currentPagesNumber[arrayNumber]}`;
      li.appendChild(a);
      LastLi.before(li);
      arrayNumber++;
   })
}