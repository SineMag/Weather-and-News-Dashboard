import * as https from "https";
import type { IncomingMessage } from "http";

interface WeatherResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    time: string;
  };
}

interface NewsResponse {
  posts: Array<{
    id: number;
    title: string;
    body: string;
  }>;
  total: number;
  skip: number;
  limit: number;
}

const API_URLS = {
  weather:
    "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&timezone=auto",
  news: "https://dummyjson.com/posts",
};

// Promise-based function to fetch data
function fetchData<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res: IncomingMessage) => {
        const { statusCode } = res;
        let rawData = "";

        if (!statusCode || statusCode < 200 || statusCode >= 300) {
          res.resume(); // Consume response data to free up memory
          reject(new Error(`Request failed with status code: ${statusCode}`));
          return;
        }

        res.setEncoding("utf8");
        res.on("data", (chunk: string) => (rawData += chunk));
        res.on("end", () => {
          try {
            const parsedData = JSON.parse(rawData);
            resolve(parsedData);
          } catch (e) {
            reject(
              new Error(
                `Error parsing JSON: ${
                  e instanceof Error ? e.message : "Unknown error"
                }`
              )
            );
          }
        });
      })
      .on("error", (error: Error) => {
        reject(new Error(`Request failed: ${error.message}`));
      });
  });
}

// Chain Promises: fetch weather → then fetch news → return both
function fetchWeatherAndNewsPromiseChain(): Promise<{
  weather: WeatherResponse;
  news: NewsResponse;
}> {
  return fetchData<WeatherResponse>(API_URLS.weather).then((weatherData) => {
    return fetchData<NewsResponse>(API_URLS.news).then((newsData) => {
      return { weather: weatherData, news: newsData };
    });
  });
}

// Promise.all(): Run both requests simultaneously and wait for all to complete
function fetchWeatherAndNewsPromiseAll(): Promise<{
  weather: WeatherResponse;
  news: NewsResponse;
}> {
  return Promise.all([
    fetchData<WeatherResponse>(API_URLS.weather),
    fetchData<NewsResponse>(API_URLS.news),
  ]).then(([weatherData, newsData]) => {
    return { weather: weatherData, news: newsData };
  });
}

// Helper function to display the fetched data
function displayData(data: {
  weather: WeatherResponse;
  news: NewsResponse;
}): void {
  console.log("\nWeather Information:");
  console.log(`Temperature: ${data.weather.current_weather.temperature}°C`);
  console.log(`Wind Speed: ${data.weather.current_weather.windspeed} km/h`);
  console.log(`Wind Direction: ${data.weather.current_weather.winddirection}°`);
  console.log(`Weather Code: ${data.weather.current_weather.weathercode}`);
  console.log(`Last Updated: ${data.weather.current_weather.time}`);

  console.log("\nLatest News:");
  data.news.posts.slice(0, 3).forEach((post, index) => {
    console.log(`\n${index + 1}. ${post.title}`);
    console.log(`   ${post.body.slice(0, 100)}...`);
  });
}

// Default function that uses Promise.all() (most practical approach)
function fetchWeatherAndNewsPromises(): Promise<{
  weather: WeatherResponse;
  news: NewsResponse;
}> {
  return fetchWeatherAndNewsPromiseAll();
}

export {
  fetchWeatherAndNewsPromises,
  fetchWeatherAndNewsPromiseChain,
  fetchWeatherAndNewsPromiseAll,
  displayData,
};
