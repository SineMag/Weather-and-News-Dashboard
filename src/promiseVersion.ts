const API_URLS = {
  weather:
    "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true",
  news: "https://dummyjson.com/posts",
};

// Promise-based function to fetch data
function fetchData(url: string): Promise<any> {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  });
}

// Chain Promises: fetch weather → then fetch news → return both
function fetchWeatherAndNewsPromiseChain(): Promise<{
  weather: any;
  news: any;
}> {
  return fetchData(API_URLS.weather)
    .then((weatherData) => {
      console.log("Weather data fetched (Promise Chain):", weatherData);
      return fetchData(API_URLS.news).then((newsData) => {
        console.log("News data fetched (Promise Chain):", newsData);
        return { weather: weatherData, news: newsData };
      });
    })
    .catch((error) => {
      console.error("Error in Promise Chain:", error);
      throw error;
    });
}

// Promise.all(): Run both requests simultaneously and wait for all to complete
function fetchWeatherAndNewsPromiseAll(): Promise<{ weather: any; news: any }> {
  console.log(
    "Starting Promise.all() - fetching weather and news simultaneously..."
  );

  return Promise.all([fetchData(API_URLS.weather), fetchData(API_URLS.news)])
    .then(([weatherData, newsData]) => {
      console.log("All data fetched with Promise.all()");
      console.log("Weather:", weatherData);
      console.log("News:", newsData);
      return { weather: weatherData, news: newsData };
    })
    .catch((error) => {
      console.error("Error in Promise.all():", error);
      throw error;
    });
}

// Promise.race(): Get the fastest response between weather and news
function fetchWeatherAndNewsPromiseRace(): Promise<any> {
  console.log("Starting Promise.race() - getting fastest response...");

  return Promise.race([
    fetchData(API_URLS.weather).then((data) => ({ type: "weather", data })),
    fetchData(API_URLS.news).then((data) => ({ type: "news", data })),
  ])
    .then((result) => {
      console.log("First response received (Promise.race()):", result.type);
      console.log("Data:", result.data);
      return result;
    })
    .catch((error) => {
      console.error("Error in Promise.race():", error);
      throw error;
    });
}

// Combined function that demonstrates all promise techniques
function fetchWeatherAndNewsPromises(): Promise<{ weather: any; news: any }> {
  // Using Promise.all() as the default for the UI (most practical)
  return fetchWeatherAndNewsPromiseAll();
}
