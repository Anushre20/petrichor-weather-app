async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "YOUR_API_KEY"; // Replace with your actual OpenWeatherMap API key
  const weatherResult = document.getElementById("weatherResult");
  const weatherBox = document.getElementById("weatherBox");
  const weatherIcon = document.getElementById("weatherIcon");

  if (city === "") {
    weatherResult.innerHTML = "⚠️ Please enter a city name.";
    weatherIcon.src = "";
    weatherBox.style.background = "rgba(255, 0, 0, 0.2)";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    const temp = data.main.temp;
    const condition = data.weather[0].main;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;

    weatherResult.innerHTML = `
      🌡️ Temperature: ${temp}°C <br>
      ☁️ Condition: ${condition} (${description}) <br>
      💧 Humidity: ${humidity}%
    `;

    changeColorByWeather(condition.toLowerCase());
    setWeatherIcon(condition.toLowerCase());

  } catch (error) {
    weatherResult.innerHTML = "❌ Could not find the city.";
    weatherIcon.src = "";
    weatherBox.style.background = "rgba(255, 0, 0, 0.3)";
    console.error("API Error:", error.message);
  }
}

// 🎨 Change background color based on weather
function changeColorByWeather(condition) {
  const weatherBox = document.getElementById("weatherBox");
  let color;

  if (condition.includes("cloud")) {
    color = "rgba(169, 169, 169, 0.3)";
  } else if (condition.includes("rain") || condition.includes("drizzle")) {
    color = "rgba(100, 149, 237, 0.3)";
  } else if (condition.includes("clear")) {
    color = "rgba(255, 255, 102, 0.3)";
  } else if (condition.includes("snow")) {
    color = "rgba(240, 248, 255, 0.3)";
  } else if (condition.includes("thunderstorm")) {
    color = "rgba(128, 0, 128, 0.3)";
  } else {
    color = "rgba(255, 255, 255, 0.3)";
  }

  weatherBox.style.background = color;
}

// 🌈 Show icon based on condition
function setWeatherIcon(condition) {
  const iconMap = {
    clear: "clear.png",
    clouds: "clouds.png",
    rain: "rain.png",
    snow: "snow.png",
    drizzle: "drizzle.png",
    thunderstorm: "thunderstorm.png",
    mist: "mist.png",
    haze: "mist.png",
    fog: "mist.png"
  };

  const weatherIcon = document.getElementById("weatherIcon");
  const fileName = iconMap[condition] || "default.png";
  weatherIcon.src = `images/${fileName}`;
}



