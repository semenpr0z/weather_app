const apiKey = "586c092f9d86c7b5413a3412bb19e319";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

// 1. Получать текущее время и показывать в интерфейсе
const days = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота"
];

const now = new Date();
const day = days[now.getDay()];
const hours = now.getHours();
const minutes = now.getMinutes();

let date = document.querySelector("#now");
date.innerHTML = day + ", " + hours + ":" + minutes;

// 2. Получать погоду по API для конкретного города
function changeCity(event) {
    event.preventDefault();

    let currentCity = document.querySelector("#city");
    let cityInput = document.querySelector("#searchInput");

    currentCity.innerHTML = cityInput.value;

    fetch(`${apiUrl}q=${cityInput.value}&appid=${apiKey}&units=metric`)
        .then((response) => response.json())
        .then((response) => {
            console.log(response);

            let tempValue = document.querySelector("#temp");
            tempValue.innerHTML = `${response.main.temp} ºC`;
        })
        .catch((error) => {
            console.error(error);

            let tempValue = document.querySelector("#temp");
            tempValue.innerHTML = `Ошибка, дорогой пользователь, вы ничего не написали!`;
        });
}

let search = document.querySelector("#button");
search.addEventListener("click", changeCity);

// 3. Получать погоду по API по местоположению пользователя
function getCurrentPosition(event) {
    event.preventDefault();

    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        fetch(`${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then((response) => response.json())
        .then((response) => {
            //console.log(response);
            let tempValue = document.querySelector("#temp");
            tempValue.innerHTML = `${response.main.temp} ºC`;

            let city = document.querySelector("#city");
            city.innerHTML = `${response.name}`;
        })
        .catch((error) => {
            console.error(error);

            let tempValue = document.querySelector("#temp");
            tempValue.innerHTML = `Ошибка, дорогой пользователь, проверь свой код!`;
        });
  });

    let currentCity = document.querySelector("#city");
    let cityInput = document.querySelector("#searchInput");

    currentCity.innerHTML = cityInput.value;
}

let current = document.querySelector("#currentLocation");
current.addEventListener("click", getCurrentPosition);