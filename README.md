# Weather and News Dashboard

This project demonstrates different approaches to handling asynchronous operations in TypeScript/Node.js by fetching weather data and news articles. It implements the same functionality using three different patterns: callbacks, promises, and async/await.

## Features

- Fetches real-time weather data from Open Meteo API
- Retrieves news articles from a dummy news API
- Implements three different asynchronous programming patterns
- Uses TypeScript for type safety
- Demonstrates error handling techniques
- Shows performance comparisons

## Installation

1. Clone the repository:

```bash
git clone https://github.com/SineMag/Weather-and-News-Dashboard.git
cd Weather-and-News-Dashboard
```

2. Install dependencies:

```bash
npm install
```

## Usage

The project includes three different implementations that you can run:

### 1. Callback Version

```bash
npm run callback
```

Demonstrates traditional callback-based programming, showing "callback hell" with nested HTTP requests.

### 2. Promise Version

```bash
npm run promise
```

Shows how Promises improve code readability and error handling, featuring:

- Promise chaining
- Parallel execution with Promise.all
- Proper error propagation

### 3. Async/Await Version

```bash
npm run async
```

Demonstrates modern async/await syntax with:

- Sequential vs parallel fetching
- Performance timing comparison
- Clean error handling
- TypeScript integration

## Learning Outcomes

### Callback Pattern (`callbackVersion.ts`)

- Understanding callback-based asynchronous programming
- Experiencing "callback hell" first-hand
- Learning about error handling with callbacks
- Dealing with nested asynchronous operations

### Promise Pattern (`promiseVersion.ts`)

- Understanding Promise-based programming
- Learning Promise chaining
- Using Promise.all for parallel operations
- Implementing proper error handling with .catch()
- Understanding Promise states (pending, fulfilled, rejected)

### Async/Await Pattern (`asyncAwaitVersion.ts`)

- Using modern async/await syntax
- Implementing sequential vs parallel operations
- Understanding error handling with try/catch
- Performance optimization with parallel fetching
- TypeScript integration with async operations

## Technical Details

### APIs Used

- Weather: Open Meteo API (https://api.open-meteo.com)
  - No API key required
  - Provides current weather data
- News: Dummy JSON API (https://dummyjson.com/posts)
  - Mock news data for demonstration

### TypeScript Features

- Interface definitions for API responses
- Type-safe HTTP requests
- Error handling types
- Module exports/imports

### Error Handling

Each version implements comprehensive error handling:

- Network errors
- Invalid responses
- JSON parsing errors
- Type validation

## Performance Comparison

The async/await implementation includes timing comparisons between:

- Sequential fetching (one after another)
- Parallel fetching (concurrent requests)

This demonstrates the performance benefits of parallel execution in real-world scenarios.

## Development Notes

Dependencies:

- `typescript`: For type safety and modern JavaScript features
- `@types/node`: TypeScript definitions for Node.js
- Node.js built-in `https` module for HTTP requests

## Future Improvements

Potential enhancements:

1. Add user interface for data display
2. Implement caching for API responses
3. Add more error recovery strategies
4. Include more weather data points
5. Add real news API integration
