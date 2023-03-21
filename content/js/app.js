let $ = document;




let searchBox = $.querySelector(".search-box");
let main = $.querySelector("main");
let DataApi = {
  api: "https://api.openweathermap.org/data/2.5/weather?q=",
  key: "82c318b75575d10ab6eaf2eea1b589fe",
};


searchBox.addEventListener("keydown", (event) => {
  // console.log(event);
  if (event.key === "Enter") {
    let inputValue = searchBox.value.toLowerCase();

    if (inputValue) {
      main.innerHTML = "";
      fetch(`${DataApi.api}${inputValue}&appid=${DataApi.key}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          showData(data);

          searchBox.value = "";
        });
    }
  }
});

function showData(data) {
  main.insertAdjacentHTML(
    "beforeend",
    ` <section class="location">
  <div class="city">${data.name}, ${data.sys.country}</div>
  <div class="date">${showDate()}</div> 
</section>
<div class="current">
  <div class="temp">${Math.floor(data.main.temp - 273.15)}<span>°c</span></div>
  <div class="weather">${data.weather[0].main}</div>
  <div class="hi-low">${Math.floor(data.main.temp_min - 273.15)}°c / ${Math.floor(data.main.temp_max - 273.15)}°c</div>
</div>`
  );
}

function showDate(){
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  
  let Day = new Date().getDay();
  let date = new Date().getDate();
  let Month = new Date().getMonth();
  let Year = new Date().getFullYear();

  return `${days[Day]} ${date} ${months[Month]} ${Year}`
  
}