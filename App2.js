document.getElementById('getWeatherBtn').addEventListener('click', fetchWeatherData);

let weatherData = [];
let currentPage = 1;
const itemsPerPage = 10;

function fetchWeatherData() {
    const city = document.getElementById('cityInput').value;
    const apiKey = "0d7515117a87598aaa5a9e9da1693703";  // Use your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            weatherData = data.list;
            displayTableData(currentPage);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayTableData(page) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, weatherData.length);

    for (let i = startIndex; i < endIndex; i++) {
        const weather = weatherData[i];
        const row = `
            <tr>
                <td>${new Date(weather.dt_txt).toLocaleDateString()}</td>
                <td>${weather.main.temp}</td>
                <td>${weather.weather[0].description}</td>
                <td>${weather.main.humidity}</td>
                <td>${weather.wind.speed}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    }

    document.getElementById('prevPage').disabled = page === 1;
    document.getElementById('nextPage').disabled = endIndex >= weatherData.length;
}

document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayTableData(currentPage);
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    if (currentPage * itemsPerPage < weatherData.length) {
        currentPage++;
        displayTableData(currentPage);
    }
});

// Sorting functionality
document.getElementById('sortAscBtn').addEventListener('click', () => {
    weatherData.sort((a, b) => a.main.temp - b.main.temp);
    displayTableData(currentPage);
});

document.getElementById('sortDescBtn').addEventListener('click', () => {
    weatherData.sort((a, b) => b.main.temp - a.main.temp);
    displayTableData(currentPage);
});

document.getElementById('filterRainBtn').addEventListener('click', () => {
    weatherData = weatherData.filter(item => item.weather[0].main === 'Rain');
    currentPage = 1;
    displayTableData(currentPage);
});

document.getElementById('highestTempBtn').addEventListener('click', () => {
    const highestTemp = Math.max(...weatherData.map(item => item.main.temp));
    weatherData = weatherData.filter(item => item.main.temp === highestTemp);
    displayTableData(currentPage);
});

// Enhanced Chatbot functionality
document.getElementById('sendBtn').addEventListener('click', handleChat);

function handleChat() {
    const chatInput = document.getElementById('chatInput').value;
    const chatBotResponseDiv = document.getElementById('chatBotResponse');
    const geminiApiKey = "AIzaSyBnXJokVQxQbqYN740xMQaA5Jn-uskWFJQ";  // Replace with your actual Gemini API key

    if (chatInput.toLowerCase().includes('weather')) {
        if (chatInput.toLowerCase().includes('next') && chatInput.toLowerCase().includes('days')) {
            // Handle queries like "What's the weather for the next 5 days in [city]?"
            const numberOfDays = parseInt(chatInput.match(/\d+/)) || 5; // Default to 5 if no number is specified
            const city = chatInput.split('in ')[1].split(' ')[0]; // Extract city name
            fetchForecastForDays(city, numberOfDays);
        } else if (chatInput.toLowerCase().includes('current')) {
            // Handle current weather queries
            const city = chatInput.split('in ')[1].trim();
            fetchCurrentWeather(city);
        } else {
            // Handle general weather forecast
            const city = chatInput.split('weather in ')[1].trim();
            fetchWeatherDataFromChat(city);
        }
    } else {
        // Handle non-weather queries via Gemini API
        fetch(`https://api.gemini.com/v1/query?apiKey=${geminiApiKey}&query=${chatInput}`)
            .then(response => response.json())
            .then(data => {
                chatBotResponseDiv.innerHTML = `<p>${data.response}</p>`;
            })
            .catch(error => {
                console.error('Error fetching Gemini response:', error);
                chatBotResponseDiv.innerHTML = `<p>Error: Unable to fetch response</p>`;
            });
    }
}

function fetchCurrentWeather(city) {
    const apiKey = "0d7515117a87598aaa5a9e9da1693703";  // Use your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherDescription = `Current weather in ${city}: ${data.weather[0].description}, Temp: ${data.main.temp}°C, Humidity: ${data.main.humidity}%`;
            document.getElementById('chatBotResponse').innerHTML = `<p>${weatherDescription}</p>`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('chatBotResponse').innerHTML = `<p>Error: Unable to fetch weather data for ${city}</p>`;
        });
}

function fetchForecastForDays(city, numberOfDays) {
    const apiKey = "0d7515117a87598aaa5a9e9da1693703";  // Use your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let forecastMessage = `Weather forecast for the next ${numberOfDays} days in ${city}:`;
            const forecastData = data.list.slice(0, numberOfDays * 8); // 8 entries per day (3-hour intervals)

            forecastData.forEach(entry => {
                const date = new Date(entry.dt_txt).toLocaleDateString();
                const temp = entry.main.temp;
                const description = entry.weather[0].description;
                forecastMessage += `<br>${date}: ${temp}°C, ${description}`;
            });

            document.getElementById('chatBotResponse').innerHTML = `<p>${forecastMessage}</p>`;
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
            document.getElementById('chatBotResponse').innerHTML = `<p>Error: Unable to fetch weather data for ${city}</p>`;
        });
}

function fetchWeatherDataFromChat(city) {
    const apiKey = "0d7515117a87598aaa5a9e9da1693703";  // Use your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let forecastMessage = `5-day weather forecast for ${city}:`;
            data.list.slice(0, 5 * 8).forEach(entry => {
                const date = new Date(entry.dt_txt).toLocaleDateString();
                const temp = entry.main.temp;
                const description = entry.weather[0].description;
                forecastMessage += `<br>${date}: ${temp}°C, ${description}`;
            });

            document.getElementById('chatBotResponse').innerHTML = `<p>${forecastMessage}</p>`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('chatBotResponse').innerHTML = `<p>Error: Unable to fetch weather data for ${city}</p>`;
        });
}
