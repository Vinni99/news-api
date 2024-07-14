// Function to display the APi
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

//This the Card for the first API

document.addEventListener("DOMContentLoaded", function () {
  const myKey = config.MY_KEY;
  const weatherApiKey = config.WEATHER_KEY;

  // Fetch news articles from WSJ
  const fetchNewsArticles = () => {
    const requestUrl1 = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${myKey}`;

    fetch(requestUrl1)
      .then((response) => response.json())
      .then((data) => {
        const articles = data.articles.slice(0, 6); // Get the first 6 articles

        articles.forEach((article) => {
          const card = createNewsCard(article);
          const container = document.getElementById("news-cards");
          container.appendChild(card);
        });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  // Fetch top business headlines from US
  const fetchBusinessHeadlines = () => {
    const requestUrl2 = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${myKey}`;

    fetch(requestUrl2)
      .then((response) => response.json())
      .then((data) => {
        const articles = data.articles.slice(1, 6); // Get articles from index 1 to 5

        articles.forEach((article) => {
          const card = createBusinessCard(article);
          const container = document.getElementById("business-cards");
          container.appendChild(card);
        });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  // Function to create a news card
  const createNewsCard = (article) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.width = "25rem";
    card.style.margin = "18px";
    card.style.padding = "3px";
    card.style.border = "1px solid black";
    card.style.borderRadius = "5px";
    card.style.boxShadow = "5px 5px 5px #888888";

    const image = document.createElement("img");
    image.src = article.urlToImage || "https://via.placeholder.com/150";
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

    card.appendChild(image);
    card.appendChild(cardBody);
    cardBody.appendChild(title);
    cardBody.appendChild(description);
    cardBody.appendChild(readMoreLink);

    return card;
  };

  // Function to create a business card
  const createBusinessCard = (article) => {
    const card = document.createElement("div");
    card.classList.add("card", "mb-3");
    card.style.maxWidth = "540px";
    card.style.margin = "10px";
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
    img.src = article.urlToImage || "https://via.placeholder.com/150";
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

    return card;
  };

  // Fetch initial data on page load
  fetchNewsArticles();
  fetchBusinessHeadlines();

  // Weather API functionality
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const weatherIcon = document.getElementById("weather-icon");
  const weatherDescription = document.getElementById("weather-description");
  const temperature = document.getElementById("temperature");
  const forecastContainer = document.getElementById("forecast-container");

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const cityName = searchInput.value.trim();

    if (cityName) {
      fetchWeatherData(cityName);
    } else {
      console.error("Please enter a city name.");
    }
  });

  const fetchWeatherData = (cityName) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${weatherApiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        weatherIcon.alt = data.weather[0].description;
        weatherDescription.textContent = data.weather[0].description;
        temperature.textContent = `${data.main.temp} °C`;

        fetchForecast(cityName);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  const fetchForecast = (cityName) => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${weatherApiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        forecastContainer.innerHTML = ""; // Clear previous forecast data

        const forecasts = data.list.filter(
          (forecast, index) => index % 8 === 0
        ); // Filter to get forecasts for every 24 hours

        forecasts.forEach((forecast) => {
          const forecastDate = new Date(forecast.dt * 1000);
          const forecastDay = forecastDate.toLocaleDateString("en-US", {
            weekday: "short",
          });
          const forecastTemperature = forecast.main.temp.toFixed(1);
          const forecastDescription = forecast.weather[0].description;
          const forecastIcon = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;

          const forecastCard = `
            <div class="forecast-card">
              <p class="forecast-date">${forecastDay}</p>
              <img class="forecast-icon" src="${forecastIcon}" alt="${forecastDescription}">
              <p class="forecast-temp">${forecastTemperature} °C</p>
              <p class="forecast-desc">${forecastDescription}</p>
            </div>
          `;

          forecastContainer.innerHTML += forecastCard;
        });
      })
      .catch((error) => {
        console.error("Error fetching forecast data:", error);
      });
  };
});
