import dataKey from "./config.js";
const key = dataKey.apiKey;

// Function to create div
function createDiv(className) {
  const newDiv = document.createElement("div");
  newDiv.classList = className;
  return newDiv;
}

// Function to create paragraph
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
createSearchDiv.append(CreateInput);

// Create container for html elements
const createContainer = createDiv("container");
document.body.appendChild(createContainer);

const createWeatherCont = createDiv("weatherCont");
createContainer.append(createWeatherCont);

const createElements = (daily, city, day) => {
  // Create card
  const createWeatherDiv = createDiv("weatherDiv");
  createWeatherCont.appendChild(createWeatherDiv);

  const createDayTemDiv = createDiv("createDayTemDiv");

  const createDay = document.createElement("h4");
  createDay.setAttribute("class", "day");
  createDay.innerText = day;

  const createTemp = document.createElement("h1");
  createTemp.setAttribute("class", "temperature");
  createTemp.innerText = `${Math.round(daily.temp.day)}°C`;

  createDayTemDiv.append(createDay, createTemp);

  // const createDateDiv = createDiv("dateTime");
  // const createTime = document.createElement("h4");
  // createTime.setAttribute("class", "time");
  // createDateDiv.append(createTime);

  const createImg = document.createElement("img");
  createImg.setAttribute("class", "image");
  createImg.src =
    "http://openweathermap.org/img/wn/" + daily.weather[0].icon + ".png";

  const createMinMaxDiv = createDiv("minMax");
  const minParaContent = `Low ${Math.round(daily.temp.min)}°C`;
  const createMin = createP("minTem", minParaContent);
  const maxParaContent = `High ${Math.round(daily.temp.max)}°C`;
  const createMax = createP("maxTem", maxParaContent);
  createMinMaxDiv.append(createMin, createMax);

  const descParContent = daily.weather[0].description;
  const createDesc = createP("description", descParContent);

  const createHumidPar = `Humidity: ${daily.humidity}%`;
  const createHumid = createP("humidity", createHumidPar);

  const createWindPar = `Wind-speed: ${daily.wind_speed}km/h`;
  const createWind = createP("wind", createWindPar);

  createWeatherDiv.append(
    // createName,
    createDayTemDiv,
    createDesc,
    createImg,
    createMinMaxDiv,
    createHumid,
    createWind
  );
};

// Get data from open weather api
let cityName;
const getData = () => {
  cityName = document.querySelector(".myInput").value;
  const url =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&units=metric&appid=" +
    key;
  console.log(url);
  fetch(url)
    .then((Response) => Response.json())
    .then((data) => {
      console.log(data);
      const city = data.city.name;
      const time = data.city.timezone;
      console.log(time);
      const lat = data.city.coord.lat;
      const lon = data.city.coord.lon;
      fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          lon +
          "&exclude=current,minutely,hourly&units=metric&appid=" +
          key
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
          for (let i = 0; i < 5; i++) {
            const date = new Date();
            let day = weekday[(date.getDay() + i) % 7];
            createElements(result.daily[i], city, day);
          }
          //
          const cards = document.querySelectorAll(".weatherDiv");
          const firstWeatherCard = cards[0];
          const firstCardDiv = createDiv("firstCardCont");
          const head1 = document.createElement("h3");
          head1.setAttribute("class", "head1");
          head1.textContent = `Today ${city}`;
          firstWeatherCard.prepend(head1);
          firstWeatherCard.style.background = "none";
          firstWeatherCard.style.boxShadow = "none";
          firstWeatherCard.style.color = "white";
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
  const url =
    "https://api.unsplash.com/search/photos?query=" +
    cityName +
    "&client_id=" +
    dataKey.photoKey;
  const bodyStyle = document.body.style;
  const getImage = await fetch(url).then((response) => response.json());
  bodyStyle.backgroundImage = `url(${getImage.results[0].urls.regular})`;
  bodyStyle.backgroundRepeat = "no-repeat";
  bodyStyle.backgroundSize = "cover";
}

// Add events to the search
CreateInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    createWeatherCont.innerHTML = "";
    getData();
    getCityImage();
  }
  return;
});
