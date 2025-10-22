
const API_URLS = {
    weather: 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true',
    news: 'https://dummyjson.com/posts'
};

// Callback-based function to fetch data using fetch API
function fetchData(url: string, callback: (error: Error | null, data: any) => void) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => callback(null, data))
        .catch(error => callback(error, null));
}

// Function to fetch weather and news using callbacks, demonstrating "callback hell"
function fetchWeatherAndNewsCallbacks(callback: (error: Error | null, data: { weather: any, news: any } | null) => void) {
    fetchData(API_URLS.weather, (error, weatherData) => {
        if (error) {
            return callback(error, null);
        }
        fetchData(API_URLS.news, (error, newsData) => {
            if (error) {
                return callback(error, null);
            }
            callback(null, { weather: weatherData, news: newsData });
        });
    });
}

module.exports = { fetchWeatherAndNewsCallbacks };
