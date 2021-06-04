// const { default: axios } = require("axios");

const toggleColorButton = document.querySelector(".toggle-color");
const body = document.getElementsByTagName("BODY")[0];

toggleColorButton.addEventListener("click", (e) => toggle(e));

const time = new Date();

const options = {
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  if (!pos) return;

  const coordinates = pos.coords;
  const latitude = coordinates.latitude;
  const longitude = coordinates.longitude;
  const sunriseSunset = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`;

  axios
    .get(sunriseSunset)
    .then((res) => {
      const data = res.data.results;

      const { sunrise, sunset } = data;

    //   function formatTime(time) {
    //    return time < 10 ? "0" + time : time;
    //   }
    //   const utcTime = [
    //     formatTime(time.getUTCHours()),
    //     formatTime(time.getUTCMinutes()),
    //     formatTime(time.getUTCSeconds()),
    //   ].join(":");

      time.toJSON() > sunset
        ? body.classList.add("nightMode")
        : body.classList.remove("nightMode");
    })
    .catch((err) => console.log(err));
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

function toggle(e) {
  body.classList.toggle("nightMode");

  const button = e.currentTarget;
  const str = e.currentTarget.innerText;

  return str.includes("Night")
    ? (button.innerText = "Day Mode")
    : (button.innerText = "Night Mode");
}
