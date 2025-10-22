import { fetchWeatherAndNewsSequential, fetchWeatherAndNewsParallel, displayData } from './asyncAwaitVersion.js';

// Execute both sequential and parallel versions to demonstrate the difference
async function main() {
    try {
        // Sequential fetching
        console.log('\n=== Sequential Fetching ===');
        console.time('Sequential');
        const sequentialResult = await fetchWeatherAndNewsSequential();
        console.timeEnd('Sequential');
        displayData(sequentialResult);
        
        // Parallel fetching
        console.log('\n=== Parallel Fetching ===');
        console.time('Parallel');
        const parallelResult = await fetchWeatherAndNewsParallel();
        console.timeEnd('Parallel');
        displayData(parallelResult);
        
        // Compare the timing to show the advantage of parallel fetching
        
    } catch (error) {
        console.error('Error:', error instanceof Error ? error.message : 'Unknown error');
    }
}

main();