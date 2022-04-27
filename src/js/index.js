import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import _ from 'lodash';
import '../css/style.css';
import { getBookList } from './getBookList.js';



export const bookList = document.querySelector(".book-container");
const bookSearchBtn = document.querySelector("#search-btn");
const inputSearch = document.querySelector("#input-search");

bookSearchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    bookList.innerHTML = "";

    let search = inputSearch.value;
    search = search.toLowerCase().trim();

    getBookList(search);

    inputSearch.value = "";
    inputSearch.focus();
});

