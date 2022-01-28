const apiKey = "a7838a7fd0899014d0bd24874d68c9ec";
const photoKey = "ITOCDNJoj5saUcLxJkUZ2wIc0UXLZMGUTXup2yf6VO8";

// Create div function
function createDiv(className) {
  const newDiv = document.createElement("div");
  newDiv.classList = className;
  return newDiv;
}

// Create paragraph function
function createP(className, content) {
  const newP = document.createElement("p");
  newP.classList = className;
  newP.textContent = content;
  return newP;
}

// Create search container
const createSearchDiv = createDiv("search");
document.body.appendChild(createSearchDiv);

const createHeader = document.createElement("h1");
createHeader.setAttribute("class", "header");
createSearchDiv.appendChild(createHeader);
createHeader.innerHTML = "The daily weather";
const CreateInput = document.createElement("input");
CreateInput.setAttribute("class", "myInput");
CreateInput.type = "text";
CreateInput.placeholder = "Enter city name";
const CreateButton = document.createElement("button");
CreateButton.setAttribute("class", "btn");
CreateButton.innerHTML = "Search";
createSearchDiv.append(CreateInput, CreateButton);

// Create container for html elements
const createContainer = createDiv("container");
document.body.appendChild(createContainer);

const createWeatherCont = createDiv("weatherCont");
createContainer.append(createWeatherCont);

const createElements = (daily, city, day) => {
  // Create card
  const createWeatherDiv = createDiv("weatherDiv");
  createWeatherCont.appendChild(createWeatherDiv);

  const createName = document.createElement("h3");
  createName.setAttribute("class", "name");
  createName.innerText = city;

  const createTemp = document.createElement("h1");
  createTemp.setAttribute("class", "temperature");
  createTemp.innerText = `${Math.round(daily.temp.day)}°C`;

  const createDateDiv = createDiv("dateTime");

  const createDate = document.createElement("h4");
  createDate.setAttribute("class", "date");
  createDate.innerText = day;

  const createTime = document.createElement("h4");
  createTime.setAttribute("class", "time");

  createDateDiv.append(createDate, createTime);

  const createImg = document.createElement("img");
  createImg.setAttribute("class", "image");
  createImg.src =
    "http://openweathermap.org/img/wn/" + daily.weather[0].icon + ".png";

  const createMinMaxDiv = createDiv("minMax");

  const createMin = document.createElement("p");
  createMin.innerText = `Low ${Math.round(daily.temp.min)}°C`;

  const createMax = document.createElement("p");
  createMax.innerText = `High ${Math.round(daily.temp.max)}°C`;

  createMinMaxDiv.append(createMin, createMax);

  const createDesc = document.createElement("p");
  createDesc.setAttribute("class", "description");
  createDesc.innerText = daily.weather[0].description;

  const createHumid = document.createElement("p");
  createHumid.setAttribute("class", "humidity");
  createHumid.innerText = `Humidity: ${daily.humidity}%`;

  const createWind = document.createElement("p");
  createWind.setAttribute("class", "wind");
  createWind.innerText = `Wind-speed: ${daily.wind_speed}km/h`;

  createWeatherDiv.append(
    createName,
    createTemp,
    createDateDiv,
    createImg,
    createMinMaxDiv,
    createDesc,
    createHumid,
    createWind
  );
};

// Get data from open weather api
const getData = () => {
  const cityName = document.querySelector(".myInput").value;
  const url =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&units=metric&appid=" +
    apiKey;
  fetch(url)
    .then((Response) => Response.json())
    .then((data) => {
      const city = data.city.name;
      const lat = data.city.coord.lat;
      const lon = data.city.coord.lon;
      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          lon +
          "&exclude=current,minutely,hourly&units=metric&appid=" +
          apiKey
      )
        .then((Response) => Response.json())
        .then((result) => {
          console.log(result);
          const weekday = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];

          for (i = 0; i < 5; i++) {
            const date = new Date();
            let day = weekday[(date.getDay() + i) % 7];
            createElements(result.daily[i], city, day);
          }
          //
          const cards = document.querySelectorAll(".weatherDiv");
          const firstWeatherCard = cards[0];
          const firstCardDiv = createDiv("firstCardCont");
          const head1 = document.createElement("h1");
          head1.setAttribute("class", "head1");
          head1.textContent = "Today";
          firstWeatherCard.prepend(head1);
          firstWeatherCard.style.background = "#ADD8E6";
          firstWeatherCard.style.boxShadow = "none";
          firstWeatherCard.style.width = "300px";
          firstCardDiv.appendChild(firstWeatherCard);
          createWeatherCont.prepend(firstCardDiv);

          const secondWeatherCard = cards[1];
          const thirdWeatherCard = cards[2];
          const fourthWeatherCard = cards[3];
          const fifthWeatherCard = cards[4];
          const lastCardsDiv = createDiv("lastCardsCont");
          lastCardsDiv.append(
            secondWeatherCard,
            thirdWeatherCard,
            fourthWeatherCard,
            fifthWeatherCard
          );
          createWeatherCont.append(lastCardsDiv);
        });
    });
};

// Display city image
async function getCityImage() {
  const city_name = document.querySelector(".myInput").value;
  const url =
    "https://api.unsplash.com/search/photos?query=" +
    city_name +
    "&client_id=" +
    photoKey;
  const getImage = await fetch(url).then((response) => response.json());
  document.body.style.backgroundImage = `url(${getImage.results[0].urls.regular})`;
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
}

// Add events to the search button
const addEventToBtn = document.querySelector(".btn");
addEventToBtn.addEventListener("click", getData);
addEventToBtn.addEventListener("click", getCityImage);
