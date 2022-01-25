// Import api key
import myValue from "./config.js";

// Create html contents
const createContainer = document.createElement("div");
createContainer.setAttribute("class", "container");
document.body.appendChild(createContainer);
const createSearchDiv = document.createElement("div");
createSearchDiv.setAttribute("class", "search");
createContainer.appendChild(createSearchDiv);
const CreateInput = document.createElement("input");
CreateInput.setAttribute("class", "myInput");
CreateInput.type = "text";
const CreateButton = document.createElement("button");
CreateButton.setAttribute("class", "btn");
const CreateSearchIcon = document.createElement("img");
CreateButton.appendChild(CreateSearchIcon);
CreateSearchIcon.setAttribute("class", "icon");
CreateSearchIcon.src = "./images/magnifying-glass.png";
createSearchDiv.appendChild(CreateInput);
createSearchDiv.appendChild(CreateButton);
const createWeatherDiv = document.createElement("div");
createWeatherDiv.setAttribute("class", "weather");
createContainer.appendChild(createWeatherDiv);
const createName = document.createElement("h4");
createName.setAttribute("class", "name");
const createTemp = document.createElement("h4");
createTemp.setAttribute("class", "temperature");
const createImg = document.createElement("img");
createImg.setAttribute("class", "image");
const createDesc = document.createElement("p");
createDesc.setAttribute("class", "description");
const createHumid = document.createElement("p");
createHumid.setAttribute("class", "humidity");
const createWind = document.createElement("p");
createWind.setAttribute("class", "wind");
createWeatherDiv.appendChild(createName);
createWeatherDiv.appendChild(createTemp);
createWeatherDiv.appendChild(createImg);
createWeatherDiv.appendChild(createDesc);
createWeatherDiv.appendChild(createHumid);
createWeatherDiv.appendChild(createWind);

// Fetch data from open api
CreateButton.addEventListener("click", () => {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      CreateInput.value +
      "&units=metric&appid=" + myValue
  )
    .then((Response) => Response.json())
    .then((data) => {
      createName.innerText = `Weather in ${data.name}`;
      createTemp.innerText = `${data.main.temp}°C`;
      createImg.src =
        "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
      createDesc.innerText = data.weather[0].description;
      createHumid.innerText = `Humidity ${data.main.humidity}%`;
      createWind.innerText = `Wind-speed ${data.wind.speed}km/h`;
    });
});
