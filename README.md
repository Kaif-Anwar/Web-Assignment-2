# Weather Dashboard with Chatbot Integration

## Project Overview
This project is a **Weather Dashboard** that provides current weather information and a 5-day forecast using the **OpenWeather API**. Additionally, the application includes a chatbot powered by the **Gemini API** for handling both weather-related queries and general conversations. The dashboard features data visualizations with **Chart.js** for an interactive display of weather metrics.

## Features
- **Current Weather Details**: Displays the current weather based on user-selected city.
- **5-Day Weather Forecast**: Provides a 5-day forecast with temperature and weather conditions.
- **Weather Widget**: Automatically updates the background based on the current weather conditions (e.g., cloudy, sunny).
- **Charts**: 
  - Vertical bar chart for 5-day temperature forecast.
  - Doughnut chart for weather condition percentages.
  - Line chart for temperature changes over the next 5 days.
- **Table View**: Shows a paginated table of temperature forecasts for the next 5 days.
- **Chatbot Integration**: 
  - Responds to general queries using the Gemini API.
  - Provides weather-related answers by integrating OpenWeather API data.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Tools & Technologies
- **Frontend**: HTML, CSS, JavaScript
- **APIs**:
  - [OpenWeather API](https://openweathermap.org/api): Provides weather data.
  - [Gemini API](https://ai.google.dev/aistudio): Handles chatbot functionalities.
- **Data Visualization**: [Chart.js](https://www.chartjs.org/) for creating interactive charts.
  
## Instructions for Setup:

## Prerequisites:
- An API key from OpenWeather API. You can get it by signing up at [OpenWeather API](https://openweathermap.org/api).
- An API key from Gemini AI API. Sign up at [Gemini API](https://ai.google.dev/aistudio) to obtain it.

## Steps to Run Locally:

1. Clone the Repository
   ```bash
   git clone https://unique-cassata-60a391.netlify.app
2. Navigate to the project directory:
   cd Web-Assignment-2-main

3. Open Index.html in your web browser.
   
## Usage:
Select a city from the dropdown menu to view current weather and 5-day forecasts.
Use the chatbot interface to ask weather-related questions the syntax is given below:
1. Current Weather Queries:
If you want to know the current weather in a specific city, you can ask:
What's the current weather in "your specific city name"?
Tell me the weather now in "your specific city name".
How is the weather today in "your specific city name"?

2. Weather Forecast for the Next Few Days
If you want to know the weather forecast for the next several days, you can phrase it like this:
What is the weather for the next 5 days in "your specific city name"?
Show me the weather forecast for the next 3 days in "your specific city name".
Can I get the weather for the upcoming 7 days in "your specific city name"?

3. General Weather Forecast Queries
If you just want a forecast without specifying the number of days they will fetch weather for 5 days by default, you can ask:
What's the weather in "your specific city name"?
Tell me the weather forecast for "your specific city name".
Can you show me the weather in "your specific city name"?

View the various charts for visual representations of weather data.

## Live Demo:
You can access the live version of the project at: https://unique-cassata-60a391.netlify.app

## Contributing:
If you would like to contribute to this project, please fork the repository and submit a pull request with your changes.

## License:
This project is not licensed so it is free to use for anyone in need. 

## Acknowledgments:
Thanks to the developers of OpenWeather API and Gemini API for providing excellent resources.
Special thanks to the Chart.js library for making data visualization simple and effective.
