const apiKey = "0d7515117a87598aaa5a9e9da1693703"; // Replace with your OpenWeather API key

document.getElementById('getWeatherBtn').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value;
    if (city) {
        try {
            // Fetch weather data from the OpenWeather API
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
            const data = await response.json();

            if (response.ok) {
                updateWeatherData(data);
            } else {
                alert('City not found! Please enter a valid city.');
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again later.');
        }
    } else {
        alert('Please enter a city name!');
    }
});

// Function to update the charts and weather data based on the fetched API data
function updateWeatherData(data) {
    const weatherData = data.list; // Array of weather forecasts for the next 5 days (3-hour intervals)

    // Extracting temperature data for the next 5 days (first 5 entries)
    const temperatures = weatherData.slice(0, 5).map(entry => entry.main.temp);
    const days = weatherData.slice(0, 5).map(entry => new Date(entry.dt_txt).toLocaleDateString());

    // Extracting weather conditions (e.g., cloudy, sunny, etc.)
    const conditions = weatherData.slice(0, 5).map(entry => entry.weather[0].main);

    // Update the Bar Chart (Temperature)
    updateBarChart(temperatures, days);

    // Update the Doughnut Chart (Weather Conditions)
    updateDoughnutChart(conditions);

    // Update the Line Chart (Temperature Variation)
    updateLineChart(temperatures, days);

    // Display the weather data in the weather data section (optional)
    displayWeatherInfo(data.city.name, temperatures[0], conditions[0]);
}

// Update the Bar Chart
function updateBarChart(temperatureData, labels) {
    const barCtx = document.getElementById('barChart').getContext('2d');
    new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: temperatureData,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Update the Doughnut Chart (Weather Conditions)
function updateDoughnutChart(conditionsData) {
    const doughnutCtx = document.getElementById('doughnutChart').getContext('2d');
    const conditionCounts = conditionsData.reduce((acc, condition) => {
        acc[condition] = (acc[condition] || 0) + 1;
        return acc;
    }, {});

    new Chart(doughnutCtx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(conditionCounts),
            datasets: [{
                data: Object.values(conditionCounts),
                backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                borderWidth: 1
            }]
        }
    });
}

// Update the Line Chart (Temperature Variation)
function updateLineChart(temperatureData, labels) {
    const lineCtx = document.getElementById('lineChart').getContext('2d');
    new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: temperatureData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to display weather info in the weather data section
function displayWeatherInfo(cityName, temperature, condition) {
    const weatherInfoDiv = document.getElementById('weatherData');
    weatherInfoDiv.innerHTML = `
        <h3>Weather in ${cityName}</h3>
        <p>Temperature: ${temperature} °C</p>
        <p>Condition: ${condition}</p>
    `;
}
