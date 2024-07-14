// Function to display the APi

//This the Card for the first API

document.addEventListener("DOMContentLoaded", function () {
  const myKey = config.MY_KEY;
  const requestUrl1 =
    "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=" + myKey;
  fetch(requestUrl1)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const articles = data.articles.slice(0, 6); // Get the first 6 articles

      articles.forEach((article, index) => {
        // Create HTML elements dynamically
        const card = document.createElement("div");
        card.classList.add("card");
        card.style.width = "25rem";
        card.style.margin = "18px";
        card.style.padding = "3px";
        card.style.border = "1px solid black";
        card.style.borderRadius = "5px";
        card.style.boxShadow = "5px 5px 5px #888888";

        const image = document.createElement("img");
        image.src = article.urlToImage || "https://via.placeholder.com/150"; // Placeholder image if urlToImage is missing
        image.classList.add("card-img-top");
        image.alt = article.title;

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const title = document.createElement("h5");
        title.classList.add("card-title");
        title.textContent = article.title;

        const description = document.createElement("p");
        description.classList.add("card-text");
        description.textContent = article.description;

        const readMoreLink = document.createElement("a");
        readMoreLink.href = article.url;
        readMoreLink.target = "_blank";
        readMoreLink.classList.add("btn", "btn-primary");
        readMoreLink.textContent = "Read More";

        // Append elements to card
        card.appendChild(image);
        card.appendChild(cardBody);
        cardBody.appendChild(title);
        cardBody.appendChild(description);
        cardBody.appendChild(readMoreLink);

        // Append card to container in HTML (assuming you have a container with id="news-cards")
        const container = document.getElementById("news-cards");
        container.appendChild(card);
      });
    })
    .catch((error) => {
      console.log(`Fetch error: ${error}`);
    });
});

// This is the second API -Top Business Headlines

document.addEventListener("DOMContentLoaded", function () {
  const myKey = config.MY_KEY;
  const requestUrl2 =
    "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=" +
    myKey;

    fetch(requestUrl2)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const articles = data.articles.slice(1, 6); // Get the first 6 articles

      articles.forEach((article, index) => {
        // Create HTML elements dynamically
        const card = document.createElement("div");
        card.classList.add("card", "mb-3");
        card.style.maxWidth = "540px";
        card.style.margin ="10px";
        card.style.width = "30rem";
        card.style.padding = "5px";
        card.style.border = "1px solid black";
        card.style.borderRadius = "5px";

        const row = document.createElement("div");
        row.classList.add("row", "g-0");
        card.appendChild(row);

        const colImg = document.createElement("div");
        colImg.classList.add("col-md-4");
        row.appendChild(colImg);

        const img = document.createElement("img");
        img.src = article.urlToImage || "https://via.placeholder.com/150"; // Placeholder image if urlToImage is missing
        img.classList.add("img-fluid", "rounded-start");
        colImg.appendChild(img);

        const colBody = document.createElement("div");
        colBody.classList.add("col-md-8");
        row.appendChild(colBody);

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        colBody.appendChild(cardBody);

        const title = document.createElement("h5");
        title.classList.add("card-title");
        title.textContent = article.title;
        cardBody.appendChild(title);

        const description = document.createElement("p");
        description.classList.add("card-text");
        description.textContent = article.description;
        cardBody.appendChild(description);

        const readMoreLink = document.createElement("a");
        readMoreLink.href = article.url;
        readMoreLink.target = "_blank";
        readMoreLink.classList.add("btn-primary");
        readMoreLink.textContent = "Read More";
        cardBody.appendChild(readMoreLink);

        // Append card to container in HTML (assuming you have a container with id="business-cards")
        const container = document.getElementById("business-cards");
        container.appendChild(card);
      });
    
    })
});
