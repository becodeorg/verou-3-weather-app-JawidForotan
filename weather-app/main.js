const apiKey = "a7838a7fd0899014d0bd24874d68c9ec";
const photoKey = "ITOCDNJoj5saUcLxJkUZ2wIc0UXLZMGUTXup2yf6VO8";

// Create input contents
const createSearchDiv = document.createElement("div");
createSearchDiv.setAttribute("class", "search");
const createHeader = document.createElement("h1");
createHeader.setAttribute("class", "header");
createSearchDiv.appendChild(createHeader);
createHeader.innerHTML = "The daily weather";
document.body.appendChild(createSearchDiv);
const CreateInput = document.createElement("input");
CreateInput.setAttribute("class", "myInput");
CreateInput.type = "text";
CreateInput.placeholder = "City name";
const CreateButton = document.createElement("button");
CreateButton.setAttribute("class", "btn");
CreateButton.innerHTML = "Search";
createSearchDiv.append(CreateInput, CreateButton);

// Create container for html elements
const createContainer = document.createElement("div");
createContainer.setAttribute("class", "container");

const createImageCont = document.createElement("div");
createImageCont.setAttribute("class", "imagCont");

const createWeatherCont = document.createElement("div");
createWeatherCont.setAttribute("class", "weatherCont");

createContainer.append(createImageCont, createWeatherCont);

const createImgDiv = document.createElement("div");
createImgDiv.setAttribute("class", "imageDiv");
createImageCont.appendChild(createImgDiv);

const createImg = document.createElement("img");
createImg.setAttribute("class", "cityImage");
createImgDiv.appendChild(createImg);

document.body.appendChild(createContainer);

const createElements = (daily, city, day) => {
  const createWeatherDiv = document.createElement("div");
  createWeatherDiv.setAttribute("class", "weatherDiv");

  createWeatherCont.appendChild(createWeatherDiv);

  const createName = document.createElement("h3");
  createName.setAttribute("class", "name");

  const createDateDiv = document.createElement("div");
  createDateDiv.setAttribute("class", "dateTime");

  const createDate = document.createElement("h4");
  createDate.setAttribute("class", "date");

  const createTime = document.createElement("h4");
  createTime.setAttribute("class", "time");

  createDateDiv.append(createDate, createTime);

  const createTemp = document.createElement("h1");
  createTemp.setAttribute("class", "temperature");

  const createImg = document.createElement("img");
  createImg.setAttribute("class", "image");

  const createMinMaxDiv = document.createElement("div");
  createMinMaxDiv.setAttribute("class", "minMax");

  const createMin = document.createElement("p");
  const createMax = document.createElement("p");

  createMinMaxDiv.append(createMin, createMax);

  const createDesc = document.createElement("p");
  createDesc.setAttribute("class", "description");

  const createHumid = document.createElement("p");
  createHumid.setAttribute("class", "humidity");

  const createWind = document.createElement("p");
  createWind.setAttribute("class", "wind");

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

  createName.innerText = city;
  createTemp.innerText = `${Math.round(daily.temp.day)}°C`;
  createImg.src =
    "http://openweathermap.org/img/wn/" + daily.weather[0].icon + ".png";

  createDate.innerText = day;
  createMin.innerText = `Low ${Math.round(daily.temp.min)}°C`;
  createMax.innerText = `High ${Math.round(daily.temp.max)}°C`;
  createDesc.innerText = daily.weather[0].description;
  createHumid.innerText = `Humidity ${daily.humidity}%`;
  createWind.innerText = `Wind-speed ${daily.wind_speed}km/h`;
};

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
            let d = date.toLocaleString();
            console.log(d);
            createElements(result.daily[i], city, day);
          }
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
  const selectImg = document.querySelector(".cityImage");
  selectImg.src = getImage.results[0].urls.regular;
}

// Add events to the search button
const addEventToBtn = document.querySelector(".btn");
addEventToBtn.addEventListener("click", getData);
addEventToBtn.addEventListener("click", getCityImage);
