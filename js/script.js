const weatherContainer = document.getElementsByClassName('weather-container')
const weatherInput = document.getElementsByClassName('city')
const cityWeather = document.getElementsByClassName('city-weather')
const main = document.getElementById('main')
const moreBtn = document.getElementById('more')
const lessBtn = document.getElementById('less')
const btnContainer = document.querySelector('.btn-container')
const weatherIcon = document.getElementById('icon')
const currentData = document.getElementsByClassName("data-now")

moreBtn.style.display = 'block'
lessBtn.style.display = 'none'
const d = new Date();

const formatter = new Intl.DateTimeFormat('en-GB', {
    hour: 'numeric',
    hour12: true,
    minute: 'numeric',
    weekday: 'short',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timeZone: 'Europe/London',
  });;

function showWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d4513adb5209db77de8aafab791f39ec`)
        .then(response => response.json())
        .then(obj => {

            
            if(obj.weather[0].description == "broken clouds"){
                main.style.backgroundImage = 'url(./img/broken-clouds2.jpg)'
                weatherIcon.src = '/img/broken-clouds-icon.png'
            } else if(obj.weather[0].description == "overcast clouds") {
                main.style.backgroundImage = 'url(img/overcast-clouds.jpg)'
                weatherIcon.src = '/img/weather-overcast.png'
            } else if (obj.weather[0].description == "clear sky") {
                main.style.backgroundImage = 'url(./img/clear-sky.jpg)'
                weatherIcon.src = '/img/clear-sky-icon.png'
            } else if(obj.weather[0].description == "scattered clouds") {
                main.style.backgroundImage = 'url(./img/scattered-clouds.jpg)'
                weatherIcon.src = '/img/scattered-clouds.png'
            }else if(obj.weather[0].description == "light rain") {
                main.style.backgroundImage = 'url(./img/light-rain.jpg)'
                weatherIcon.src = '/img/light-rain-icon.png'
            }else if(obj.weather[0].description == "few clouds") {
                main.style.backgroundImage = 'url(./img/few-clouds.jpg)'
                weatherIcon.src = '/img/few-clouds-icon.png'
            }else if(obj.weather[0].description == "moderate rain") {
                main.style.backgroundImage = 'url(./img/moderate-rain.jpg)'
                weatherIcon.src = '/img/cloud-rain-icon-2.png'
            }else if(obj.weather[0].description == "snow") {
                main.style.backgroundImage = 'url(./img/snow.jpg)'
                weatherIcon.src = '/img/snow-icon.png'
            }else if(obj.weather[0].description == "heavy shower snow") {
                main.style.backgroundImage = 'url(./img/heavy-snow.jpg)'
                weatherIcon.src = '/img/heavy-snow-icon.png'
            }else if(obj.weather[0].description == "light snow") {
                main.style.backgroundImage = 'url(./img/light-snow.jpg)'
                weatherIcon.src = '/img/light-snow.png'
            }else if(obj.weather[0].description == "thunderstorm with light rain") {
                main.style.backgroundImage = 'url(./img/thunderstorm.jpg)'
                weatherIcon.src = '/img/thunderstorm-icon.png'
            }else if(obj.weather[0].description == "mist") {
                main.style.backgroundImage = 'url(./img/mist.jpg)'
                weatherIcon.src = '/img/mist-icon.png'
            }else if(obj.weather[0].description == "thunderstorm"){
                main.style.backgroundImage = 'url(./img/thunderstorm2.jpeg)'
                weatherIcon.src = '/img/tunderstorm-2.png'
            }

            cityWeather[0].innerHTML = `
            <div class="number">
                <div class="temp">
                    <h1>${Math.round(obj.main.temp - 273.15)}°C</h1>
                    <div class="date">
                        <p>${obj.name}</p>
                        <p class="data-now">${formatter.format(d)}</p>
                    </div>
                </div>
                <div class="descript">
                    <img src="${weatherIcon.src}" id="icon">
                    <p>${obj.weather[0].description}</p>
                </div>
            </div>
            <div class="details">
                <div class="detail">
                    <p>Clouds</p>
                    <p>${obj.clouds.all}%</p>
                </div>
                <div class="detail">
                    <p>Humidity</p>
                    <p>${Math.round(obj.main.humidity)}%</p>
                </div>
                <div class="detail">
                    <p>Wind</p>
                    <p>${Math.round(obj.wind.speed)} km/h</p>
                </div>
                <div class="detail">
                    <p>Pressure</p>
                    <p>${Math.round(obj.main.pressure)} mm/Hg</p>
                </div>
            </div>
            `
            btnContainer.style.height = '100px'
            const details = document.querySelector('.details')

            moreBtn.addEventListener('click', () => {
                moreBtn.style.display = 'none'
                lessBtn.style.display = 'block'
                btnContainer.style.height = '0px'
                
                  details.innerHTML += `
                  <div class="detail">
                    <p>Visibility</p>
                    <p>${Math.round(obj.visibility)} km</p>
                  </div>
                  <div class="detail">
                    <p>Timezone</p>
                    <p>${obj.timezone}</p>
                  </div>
                  <div class="detail">
                    <p>Longitude</p>
                    <p>${obj.coord.lon}</p>
                  </div>
                  <div class="detail">
                    <p>Latitude</p>
                    <p>${obj.coord.lat}</p>
                  </div>
                  <div class="detail">
                    <p>Country</p>
                    <p>${obj.sys.country}</p>
                  </div>
                  `      
            
            })

            lessBtn.addEventListener('click', () => {
                btnContainer.style.height = '100px'
                lessBtn.style.display = 'none'
                moreBtn.style.display = 'block'
                details.innerHTML = `
                <div class="detail">
                <p>Clouds</p>
                <p>${obj.clouds.all}%</p>
            </div>
            <div class="detail">
                <p>Humidity</p>
                <p>${Math.round(obj.main.humidity)}%</p>
            </div>
            <div class="detail">
                <p>Wind</p>
                <p>${Math.round(obj.wind.speed)} km/h</p>
            </div>
            <div class="detail">
                <p>Pressure</p>
                <p>${Math.round(obj.main.pressure)} mm/Hg</p>
            </div>
                `
            })
    })
}

showWeather('London')

const searchIcon = document.getElementById('search-icon')

searchIcon.addEventListener("click", () => {
    showWeather(weatherInput[0].value)
    moreBtn.style.display = 'block'
    lessBtn.style.display = 'none'
})




// function dayOfTheWeek(day, month, year) {
//     const weekDay = [
//         "Sunday",
//         "Monday",
//         "Tuesday",
//         "Wednesday",
//         "Thursday",
//         "Friday",
//         "Saturday"
//     ]
//     return weekDay[new Date(`${day}/${month}/${year}`)]
// }
