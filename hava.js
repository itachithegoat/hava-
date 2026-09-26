```javascript
async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const weatherBox = document.getElementById("weather");

    if (city === "") {
        weatherBox.innerHTML = "<p>Zəhmət olmasa şəhər adı daxil edin.</p>";
        return;
    }

    weatherBox.innerHTML = "<p>Hava məlumatı yüklənir...</p>";

    try {
        // Şəhərin koordinatlarını tapır
        const searchUrl =
            "https://geocoding-api.open-meteo.com/v1/search?" +
            "name=" + encodeURIComponent(city) +
            "&count=1" +
            "&language=az" +
            "&format=json";

        const locationResponse = await fetch(searchUrl);
        const locationData = await locationResponse.json();

        if (!locationData.results || locationData.results.length === 0) {
            weatherBox.innerHTML = "<p>Şəhər tapılmadı.</p>";
            return;
        }

        const location = locationData.results[0];

        const name = location.name;
        const latitude = location.latitude;
        const longitude = location.longitude;

        // Hava məlumatlarını alır
        const weatherUrl =
            "https://api.open-meteo.com/v1/forecast?" +
            "latitude=" + latitude +
            "&longitude=" + longitude +
            "&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m" +
            "&timezone=auto";

        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        const weather = weatherData.current;

        // Nəticəni səhifədə göstərir
        weatherBox.innerHTML = `
            <h2>${name}</h2>
            <p>🌡️ Temperatur: ${weather.temperature_2m} °C</p>
            <p>🌡️ Hiss olunan: ${weather.apparent_temperature} °C</p>
            <p>💧 Rütubət: ${weather.relative_humidity_2m} %</p>
            <p>💨 Külək: ${weather.wind_speed_10m} km/saat</p>
        `;

    } catch (error) {
        weatherBox.innerHTML =
            "<p>Hava məlumatını əldə etmək mümkün olmadı.</p>";
    }
}
```
