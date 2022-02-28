window.addEventListener('load', ()=> {
  let long;
  let lat;
  const temperatureDegree = document.querySelector('.temperature-degree');
  const temperatureDescription = document.querySelector('.temperature-description');
  const locationTimezone = document.querySelector('.location-timezone');
  const locationIcon = document.querySelector('.weather-icon');
  const temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span');


  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `http://api.openweathermap.org/data/2.5/weather?q=Toronto&APPID=91a96af90083c29b40ba502603cfc7e1`;

      fetch(api)
        .then(response =>{
          return response.json();
        })
        .then(data => {
        console.log(data);
          //relating HTML divs with API data
          const { temp } = data.main;
          const { description } = data.weather[0].description;

          //Setting DOM elements from the API

          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = description;
          locationTimezone.textContent = data.name;

          //Celsuis conversion

          const celsius = (temp - 273.15);

          //Fahrenheit conversion

          const farhenheit = (temp * (9 / 5)) - 459.67


          //Changing Display Temp between C/F
          temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F"
              temperatureDegree.textContent = Math.floor(farhenheit);
            }
          });
        });
    });
  }
});
