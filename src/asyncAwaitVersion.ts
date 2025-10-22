const API_URLS = {
  weather:
    "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true",
  news: "https://dummyjson.com/posts",
};

// Helper function to fetch data using async/await
async function fetchData(url: string): Promise<any> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
}

// Sequential approach: fetch weather first, then news
async function fetchWeatherAndNewsSequential(): Promise<{
  weather: any;
  news: any;
}> {
  try {
    console.log("Fetching weather data (Sequential)...");
    const weatherData = await fetchData(API_URLS.weather);
    console.log("Weather data received:", weatherData);

    console.log("Fetching news data (Sequential)...");
    const newsData = await fetchData(API_URLS.news);
    console.log("News data received:", newsData);

    return { weather: weatherData, news: newsData };
  } catch (error) {
    console.error("Error in sequential fetch:", error);
    throw new Error(
      `Failed to fetch data: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

// Parallel approach: fetch both simultaneously using Promise.all with async/await
async function fetchWeatherAndNewsParallel(): Promise<{
  weather: any;
  news: any;
}> {
  try {
    console.log(
      "Fetching weather and news data in parallel (Async/Await + Promise.all)..."
    );

    const [weatherData, newsData] = await Promise.all([
      fetchData(API_URLS.weather),
      fetchData(API_URLS.news),
    ]);

    console.log("All data fetched successfully");
    console.log("Weather:", weatherData);
    console.log("News:", newsData);

    return { weather: weatherData, news: newsData };
  } catch (error) {
    console.error("Error in parallel fetch:", error);
    throw new Error(
      `Failed to fetch data: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

// Using Promise.race with async/await
async function fetchWeatherAndNewsRace(): Promise<any> {
  try {
    console.log("Racing weather vs news (Async/Await + Promise.race)...");

    const result = await Promise.race([
      fetchData(API_URLS.weather).then((data) => ({ type: "weather", data })),
      fetchData(API_URLS.news).then((data) => ({ type: "news", data })),
    ]);

    console.log("First result received:", result.type);
    console.log("Data:", result.data);

    return result;
  } catch (error) {
    console.error("Error in race:", error);
    throw new Error(
      `Failed to fetch data: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

// Main function using async/await (parallel for best performance)
async function fetchWeatherAndNewsAsync(): Promise<{
  weather: any;
  news: any;
}> {
  return fetchWeatherAndNewsParallel();
}

// Error handling example with try-catch-finally
async function fetchWithAdvancedErrorHandling(): Promise<{
  weather: any;
  news: any;
} | null> {
  let startTime = Date.now();

  try {
    console.log("Starting fetch with advanced error handling...");
    const data = await fetchWeatherAndNewsParallel();
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      console.error("Network error - check your internet connection");
    } else if (error instanceof Error) {
      console.error("Error message:", error.message);
    } else {
      console.error("Unknown error occurred");
    }
    return null;
  } finally {
    const duration = Date.now() - startTime;
    console.log(`Fetch attempt completed in ${duration}ms`);
  }
}
