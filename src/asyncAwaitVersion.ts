import * as https from 'https';
import type { IncomingMessage } from 'http';

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
    weather: "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&timezone=auto",
    news: "https://dummyjson.com/posts"
};

// Helper function to fetch data using async/await
async function fetchData<T>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
        https.get(url, (res: IncomingMessage) => {
            const { statusCode } = res;
            let rawData = '';

            if (!statusCode || statusCode < 200 || statusCode >= 300) {
                res.resume(); // Consume response data to free up memory
                reject(new Error(`Request failed with status code: ${statusCode}`));
                return;
            }

            res.setEncoding('utf8');
            res.on('data', (chunk: string) => rawData += chunk);
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    resolve(parsedData);
                } catch (e) {
                    reject(new Error(`Error parsing JSON: ${e instanceof Error ? e.message : 'Unknown error'}`));
                }
            });
        }).on('error', (error: Error) => {
            reject(new Error(`Request failed: ${error.message}`));
        });
    });
}

// Sequential approach: fetch weather first, then news
async function fetchWeatherAndNewsSequential(): Promise<{
    weather: WeatherResponse;
    news: NewsResponse;
}> {
    try {
        // First, fetch weather data
        const weatherData = await fetchData<WeatherResponse>(API_URLS.weather);
        
        // Then fetch news data
        const newsData = await fetchData<NewsResponse>(API_URLS.news);
        
        return { weather: weatherData, news: newsData };
    } catch (error) {
        throw new Error(`Failed to fetch data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

// Parallel approach: fetch both simultaneously using Promise.all with async/await
async function fetchWeatherAndNewsParallel(): Promise<{
    weather: WeatherResponse;
    news: NewsResponse;
}> {
    try {
        // Fetch both in parallel
        const [weatherData, newsData] = await Promise.all([
            fetchData<WeatherResponse>(API_URLS.weather),
            fetchData<NewsResponse>(API_URLS.news)
        ]);

        return { weather: weatherData, news: newsData };
    } catch (error) {
        throw new Error(`Failed to fetch data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

// Helper function to display the fetched data
function displayData(data: { weather: WeatherResponse; news: NewsResponse }): void {
    console.log('\nWeather Information:');
    console.log(`Temperature: ${data.weather.current_weather.temperature}°C`);
    console.log(`Wind Speed: ${data.weather.current_weather.windspeed} km/h`);
    console.log(`Wind Direction: ${data.weather.current_weather.winddirection}°`);
    console.log(`Weather Code: ${data.weather.current_weather.weathercode}`);
    console.log(`Last Updated: ${data.weather.current_weather.time}`);

    console.log('\nLatest News:');
    data.news.posts.slice(0, 3).forEach((post, index) => {
        console.log(`\n${index + 1}. ${post.title}`);
        console.log(`   ${post.body.slice(0, 100)}...`);
    });
}

// Main function using async/await (parallel for best performance)
async function fetchWithAdvancedErrorHandling(): Promise<{
    weather: WeatherResponse;
    news: NewsResponse;
} | null> {
    const startTime = Date.now();

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

export {
    fetchWeatherAndNewsSequential,
    fetchWeatherAndNewsParallel,
    fetchWithAdvancedErrorHandling,
    displayData
};
