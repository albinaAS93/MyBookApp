import _ from 'lodash';
import '../css/style.css';
import { bookList } from './index.js';
import { getBookDescription } from './getBookDescription.js';


export async function getBookList(subject) {
    try {

        let bookItem = document.createElement("div");
        bookItem.classList.add("book-item");
        bookList.appendChild(bookItem);

        let res = await fetch(`https://openlibrary.org/subjects/${subject}.json`);
        let data = await res.json();
        let books = _.get(data, "works", []);

        if (books.length === 0) {
            throw Error;
        }

        books.forEach((book) => {

            let item = document.createElement("div");
                item.classList.add("item");
            bookItem.appendChild(item);

            let title = book.title;
                let bookTitle = document.createElement("h4");
                bookTitle.innerHTML = title;
            item.appendChild(bookTitle);

            let author = book.authors[0].name;
                let bookAuthor = document.createElement("h6");
                bookAuthor.innerHTML = `<span>Written by:</span> ${author}.`;
            item.appendChild(bookAuthor);

            let key = book.key;
            item.setAttribute("key", key);

            let descriptionBtn = document.createElement("button");
                descriptionBtn.innerText = "More details";
                descriptionBtn.classList.add("book-description-btn");
            item.appendChild(descriptionBtn);
            descriptionBtn.addEventListener("click", () => getBookDescription(key));
        });
    }
    catch (e) {
        bookList.innerHTML = "";

        let notFound = document.createElement("p");
        notFound.innerText = "Book not found. Type something else.";
        notFound.classList.add("not-found");
        bookList.appendChild(notFound);
    }
}