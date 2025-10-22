import { fetchWeatherAndNewsPromises, displayData } from "./promiseVersion.js";

// Execute the promise version
fetchWeatherAndNewsPromises()
  .then((data) => {
    displayData(data);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
