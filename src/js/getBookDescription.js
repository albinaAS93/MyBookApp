import _ from 'lodash';
import '../css/style.css';

export async function getBookDescription(key) {
    try {
       
        let item = document.querySelector(`[key="${key}"]`);
        
        if (!item.querySelector(".book-desc")) {
            let res = await fetch(`https://openlibrary.org${key}.json`);
            let data = await res.json();

            let desc = _.get(data, "description", "No description added for this book!");

            if (desc.value) {
                desc = desc.value;
            }

            let description = document.createElement("p");
            description.innerText = desc;
            description.classList.add("book-desc");

            item.appendChild(description);

            let btn = item.querySelector(".book-description-btn");
            btn.innerText = "Close";
        }
        else {
            item.removeChild(item.querySelector(".book-description-btn"));
            item.removeChild(item.querySelector(".book-desc"));
            let btn = document.createElement("button");
            btn.innerText = "More details";
            btn.classList.add("book-description-btn");
            item.appendChild(btn);
            btn.addEventListener("click", () => getBookDescription(key));
        }
    }
    catch (e) {
        console.log(e);
    }
} 
