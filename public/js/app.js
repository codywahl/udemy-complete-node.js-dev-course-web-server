const weatherForm = document.querySelector('#weather_form');
const searchElement = document.querySelector('#weather_form input');
const weatherForecastText = document.querySelector('#weather_forecast');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = searchElement.value;
    weatherForecastText.innerHTML = 'Loading forecast...';

    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                weatherForecastText.innerHTML = (data.error);
                console.log(error);
            }
            else {
                const forecastText = 'It is ' + data.localtime + ' in ' + data.location + '.' + '<br><br>'
                    + 'Temperature: ' + data.temp + '<br>'
                    + 'Precipitation: ' + data.precipitation + '%';

                weatherForecastText.innerHTML = forecastText;
                console.log(forecastText);
            }
        })
    });
});