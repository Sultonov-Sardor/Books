const elInput = document.querySelector('.js-input');
const elModeBtn = document.querySelector('.js-mode');
const elList = document.querySelector('.js-list');
const elForm = document.querySelector('.js-form');
// select 
const elAlfabit = document.querySelector('.js-select');
const elLang = document.querySelector('.js-selectLang');
const elPage = document.querySelector('.js-selectPage');
const elYear = document.querySelector('.js-selectYear');
const elAuthor = document.querySelector('.js-selectAuthor');

// render

function renderBooks(array,node){
  node.innerHTML = '';

  for(book of array){

    let item = document.createElement('li');
    let title = document.createElement('h2');
    let img = document.createElement('img');
    let year = document.createElement('span');
    let author = document.createElement('span');

    img.src = `./books/${book.imageLink}`;
    title.textContent = book.title.toUpperCase();
    author.textContent  = book.author;
    year.textContent  = book.year;

    img.style.width = '400px';
    img.style.height = '500px';

    item.append(img);
    item.append(title);
    item.append(author);
    item.append(year);

    item.setAttribute('class', 'books-item');
    title.setAttribute('class', 'books-title');
    author.setAttribute('class', 'books-span');
    year.setAttribute('class', 'books-span');

    node.appendChild(item);
  }
}

renderBooks(books,elList); 


// select code 

// Author sort
let authorSet = new Set();
books.forEach((element) => {
  authorSet.add(element.author);
});
authorSet.forEach((element) => {
  let newOpt = document.createElement("option");
  newOpt.setAttribute("value", element);
  newOpt.textContent = element;
  elAuthor.appendChild(newOpt);
});

// Author change sort
let authorArr = [];
elAuthor.addEventListener("change", () => {
  authorArr = [];
  if (elAuthor.value !== "All") {
    books.forEach((element) => {
      if (element.author.includes(elAuthor.value)) {
        authorArr.push(element);
      }
    });
    renderBooks(authorArr, elList)
  }
  else{
    renderBooks(books,elList); 
  }
});

// Year sort
let yearSet = new Set();
books.forEach((el) => {
  yearSet.add(el.year);
});

yearSet.forEach((el) => {
  let newOpt = document.createElement("option");
  newOpt.setAttribute("class", el);
  newOpt.textContent = el;
  elYear.appendChild(newOpt);
});

// Year change sort
let yearArr = [];
elYear.addEventListener("change", () => {
  yearArr = [];
  if (elYear.value !== "All") {
    books.forEach((element) => {
      if (element.year == elYear.value) {
        yearArr.push(element);
      }
    });
    renderBooks(yearArr , elList)
  }else{
    renderBooks(books,elList); 
  }
});

// Page sort
let pageSet = new Set();
books.forEach((el) => {
  pageSet.add(el.pages);
});

pageSet.forEach((el) => {
  let newOpt = document.createElement("option");
  newOpt.setAttribute("value", el);
  newOpt.textContent = el;
  elPage.appendChild(newOpt);
});

let pageArr = [];
elPage.addEventListener("change", () => {
  pageArr = [];
  if (elPage.value !== "All") {
    books.forEach((el) => {
      if (el.pages == elPage.value) {
        pageArr.push(el);
      }
    });
    renderBooks(pageArr, elList);
  }
  else{
    renderBooks(books,elList); 
  }
});

// Language sort
let langSet = new Set();
books.forEach((el) => {
  langSet.add(el.language);
});

langSet.forEach((el) => {
  let newOpt = document.createElement("option");
  newOpt.setAttribute("value", el);
  newOpt.textContent = el;
  elLang.appendChild(newOpt);
});

let langArr = [];
elLang.addEventListener("change", (evt) => {
  langArr = [];
  if (elLang.value !== "All") {
    books.map((element) => {
      if (element.language.includes(elLang.value)) {
        langArr.push(element);
      }
    });
    renderBooks(langArr, elList);
  }else{
    renderBooks(books,elList); 
  }
});

// dark mode 

let theme = false;

elModeBtn.addEventListener('click',() => {
  theme =! theme;
  const bg = theme ? 'dark' : 'light';
  window.localStorage.setItem('theme',bg);
  ChangeTheme();
});

function ChangeTheme(){
  if(window.localStorage.getItem('theme') == 'dark'){
    document.querySelector('body').classList.add('dark');
  }else{
    document.querySelector('body').classList.remove('dark');
  }
}

ChangeTheme();

// sort a-z z-a

elAlfabit.addEventListener('change', () => {

  if(elAlfabit.value == "All"){
    window.location.reload();
  }

  if(elAlfabit.value == "A-Z"){
    const booksSort = books.sort((a,b) =>{
      if(a.title > b.title){
        return 1;
      }
      if(a.title < b.title){
        return -1;
      }
      return 0;
    });
    renderBooks(booksSort,elList);
  }

  if(elAlfabit.value == "Z-A"){
    const booksSort = books.sort((a,b) =>{
      if(a.title > b.title){
        return -1;
      }
      if(a.title < b.title){
        return 1;
      }
      return 0;
    });
    renderBooks(booksSort,elList);
  }
})

// search 

let searchResult = [];

elForm.addEventListener('input', (evt) => {
  elList.innerHTML = '';
  evt.preventDefault();
  let elInputvalue = elInput.value.toLocaleLowerCase();
  books.forEach( el => {
    if(el.title.toLocaleLowerCase().includes(elInputvalue)){
      searchResult.push(el);
    }
  });
  renderBooks(searchResult,elList);
  searchResult = []
});

