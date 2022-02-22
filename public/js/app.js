const weatherForm = document.querySelector('#weather_form');
const searchElement = document.querySelector('#weather_form input');
const weather_location = document.querySelector('#weather_location');
const weather_temp = document.querySelector('#weather_temp');
const weather_feelslike = document.querySelector('#weather_feelslike');
const weather_desc = document.querySelector('#weather_desc');
const weather_precipitation = document.querySelector('#weather_precipitation');
const weather_windspeed = document.querySelector('#weather_windspeed');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = searchElement.value;
    weather_location.innerHTML = 'Loading forecast...';
    weather_temp.textContent = '';
    weather_feelslike.textContent = '';
    weather_desc.textContent = '';
    weather_precipitation.textContent = '';

    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                weatherForecastText.innerHTML = (data.error);
                console.log(error);
            }
            else {
                console.log(data);

                const weather_locationText = 'It is ' + data.localtime + ' in ' + data.location + '.';
                const weather_tempText = 'Temperature: ' + data.temp;
                const weather_feelslikeText = 'Feels like: ' + data.feelslike;
                const weather_descText = data.weather_descriptions.join(', ');
                const weather_precipitationText = 'Precipitation: ' + data.precipitation + '%';

                weather_location.textContent = weather_locationText;
                weather_temp.textContent = weather_tempText;
                weather_feelslike.textContent = weather_feelslikeText;
                weather_desc.textContent = weather_descText;
                weather_precipitation.textContent = weather_precipitationText;
            }
        })
    });
});