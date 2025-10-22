var API_URLS = {
    weather: 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true',
    news: 'https://dummyjson.com/posts'
};
// Callback-based function to fetch data using fetch API
function fetchData(url, callback) {
    fetch(url)
        .then(function (response) {
        if (!response.ok) {
            throw new Error("HTTP error! status: ".concat(response.status));
        }
        return response.json();
    })
        .then(function (data) { return callback(null, data); })
        .catch(function (error) { return callback(error, null); });
}
// Function to fetch weather and news using callbacks, demonstrating "callback hell"
function fetchWeatherAndNewsCallbacks(callback) {
    fetchData(API_URLS.weather, function (error, weatherData) {
        if (error) {
            return callback(error, null);
        }
        fetchData(API_URLS.news, function (error, newsData) {
            if (error) {
                return callback(error, null);
            }
            callback(null, { weather: weatherData, news: newsData });
        });
    });
}
module.exports = { fetchWeatherAndNewsCallbacks: fetchWeatherAndNewsCallbacks };
