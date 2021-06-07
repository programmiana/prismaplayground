const body = document.getElementsByTagName("BODY")[0];
const flexbox = document.querySelector(".flexbox");

const time = new Date();

const geoLocationOptions = {
  timeout: 5000,
  maximumAge: 0,
};

let state = {
  loading: true,
  data: {},
  mode: {},
};

function success(pos) {
  if (!pos) return;

  const coordinates = pos.coords;
  const latitude = coordinates.latitude;
  const longitude = coordinates.longitude;
  const sunsetEndpoint = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`;

  axios
    .get(sunsetEndpoint)
    .then((res) => {
      if (res.data.results) {
        console.log("not loading");
        state.loading = false;
        state.data = res.data.results;

        const { sunset } = state.data;

        time.toJSON() > sunset ? (state.mode = "dark") : (state.mode = "day");

        dispatch(state.mode);
      }
    })
    .catch((err) => console.log(err));
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, geoLocationOptions);

function dispatch(oneMode) {
  if (oneMode === "dark") {
    state.mode = "dark";
    return generateButton(state.mode);
  }
  if (oneMode === "day") {
    state.mode = "day";
    return generateButton(state.mode);
  }
}

function generateButton(mode) {
  flexbox.innerHTML = '';
  mode === "dark"
    ? (flexbox.innerHTML = `<button class="nightMode"> Night Mode </button>`)
    : (flexbox.innerHTML = `<button>Day Mode</button>`);
}

flexbox.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    console.log(state.mode);
    if (state.mode === "day") {
      state.mode = "dark";
      dispatch(state.mode);
    } else {
      state.mode = "day";
      dispatch(state.mode);
    }
  }
});
