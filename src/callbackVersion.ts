import * as https from "https";
import * as http from "http";

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

function fetchJSON<T>(
  url: string,
  callback: (error: Error | null, data: T | null) => void
) {
  https
    .get(url, (res: http.IncomingMessage) => {
      const { statusCode } = res;
      const contentType = String(res.headers["content-type"] || "");

      if (!statusCode || statusCode < 200 || statusCode >= 300) {
        res.resume();
        callback(new Error(`HTTP error! status: ${statusCode}`), null);
        return;
      }

      let raw = "";
      res.setEncoding("utf8");
      res.on("data", (chunk: string) => (raw += chunk));
      res.on("end", () => {
        try {
          const json = JSON.parse(raw);
          callback(null, json);
        } catch (e) {
          callback(e as Error, null);
        }
      });
    })
    .on("error", (e: Error) => callback(e, null));
}

function fetchWeatherAndNewsCallbacks(
  callback: (
    error: Error | null,
    data: { weather: WeatherResponse; news: NewsResponse } | null
  ) => void
): void {
  // First level: Weather request
  fetchJSON<WeatherResponse>(API_URLS.weather, (err, weatherData) => {
    if (err) {
      console.error("Weather fetch error:", err.message);
      return callback(err, null);
    }

    // Second level: News request (demonstrating callback hell)
    fetchJSON<NewsResponse>(API_URLS.news, (err2, newsData) => {
      if (err2) {
        console.error("News fetch error:", err2.message);
        return callback(err2, null);
      }

      if (!weatherData || !newsData) {
        return callback(new Error("Failed to fetch data"), null);
      }

      // Process and return both weather and news data
      callback(null, {
        weather: weatherData,
        news: newsData,
      });

      // Log the results
      console.log("\nWeather Information:");
      console.log(`Temperature: ${weatherData.current_weather.temperature}°C`);
      console.log(`Wind Speed: ${weatherData.current_weather.windspeed} km/h`);
      console.log(
        `Wind Direction: ${weatherData.current_weather.winddirection}°`
      );
      console.log(`Weather Code: ${weatherData.current_weather.weathercode}`);
      console.log(`Last Updated: ${weatherData.current_weather.time}`);

      console.log("\nLatest News:");
      newsData.posts.slice(0, 3).forEach((post, index) => {
        console.log(`\n${index + 1}. ${post.title}`);
        console.log(`   ${post.body.slice(0, 100)}...`);
      });
    });
  });
}

// Export using ES modules
export { fetchWeatherAndNewsCallbacks };
