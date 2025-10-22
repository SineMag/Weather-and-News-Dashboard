import { fetchWeatherAndNewsCallbacks } from "./callbackVersion.js";

interface WeatherAndNewsData {
  weather: {
    current_weather: {
      temperature: number;
      windspeed: number;
      winddirection: number;
      weathercode: number;
      time: string;
    };
  };
  news: {
    posts: Array<{
      title: string;
      body: string;
    }>;
  };
}

// Execute the callback version
fetchWeatherAndNewsCallbacks(
  (error: Error | null, data: WeatherAndNewsData | null) => {
    if (error) {
      console.error("Error:", error.message);
      return;
    }
    // The logging is already handled in the callback implementation
  }
);
