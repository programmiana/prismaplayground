const knownEmails = [
  "maus@gmail.com",
  "elephant@gmail.com",
  "sendungmitdermaus@gmail.com",
];

const animalArray = ["dog", "cat", "tiger", "elephant", "other"];

let state = {
  declareAnimals: false,
  showEmailError: false,
  alreadyRegistered: false,
  passwordsMatch: true,
  underage: false,
};

window.addEventListener("load", () => dispatch(state));

function renderHTML(state) {
  console.log(state);
  return (app.innerHTML = `<div class="flexbox">
  <h1>Hello</h1>
  <form id="form">
    <div>
      <label for="email">Email:</label>
      <input name="email">
      ${
        state.email === ""
          ? `<span style="color: red">
      Required field</span>`
          : ""
      }
      ${
        !state.showEmailError && state.alreadyRegistered
          ? `<span style="color: red">E-mail ${state.email} already exists</span>`
          : ""
      }
    </div>
    <div>
      <label for="password">Password:</label>
      <input name="password">
      ${
        state.password === ""
          ? `<span style="color: red">
      Required field</span>`
          : ""
      }
      ${state.showInvalidError ? "error" : ""}

    </div>
    <div>
      <label for="confirm-password">Confirm Password:</label>
      <input name="confirm-password">
      ${
        state.confirmPassword === ""
          ? `<span style="color: red">
      Required field</span>`
          : ""
      }
      ${!state.passwordsMatch ? "Passwords don't match." : ""}

    </div>
    <div>
      <label for="birthday">Birthday:</label>
      <input name="birthday" type="date">
      ${state.underage ? "error" : ""}
      ${
        state.birthday === ""
          ? `<span style="color: red">
      Required field</span>`
          : ""
      }

    </div>
    <div>
      <label for="animal">Declare favourite animals:</label>
      <input name="animal" type="checkbox" id="select-animals" ${
        state.declareAnimals ? "checked" : ""
      }>
      ${state.declareAnimals ? animals : ""}
    </div>
    <button type="submit">Login</button>
  </form>
  </div>
</div>`);
}

function dispatch(state) {
  return renderHTML(state);
}

app.addEventListener("click", (e) => handleClick(e));
app.addEventListener("submit", (e) => handleSubmit(e));
function handleClick(e) {
  state.declareAnimals = !state.declareAnimals;

  return dispatch(state);
  // if (state.declareAnimals === false) {
  //   state.declareAnimals = true;
  //   return dispatch(state);
  // } else if (
  //   e.target.id === "select-animals" &&
  //   state.declareAnimals === true
  // ) {
  //   state.declareAnimals = false;
  //   return dispatch(state);
  // }
}

function setIsEmptyField(values) {
  const isEmpty = Object.fromEntries(
    Object.entries(values).filter(([key, value]) => value === "")
  );
  Object.assign(state, isEmpty);

  return dispatch(state);
}

function handleSubmit(e) {
  e.preventDefault();
  const email = form["email"].value;
  const password = form["password"].value;
  const confirmPassword = form["confirm-password"].value;
  const birthday = form["birthday"].value;

  const alreadyRegistered = knownEmails.find(
    (knownEmail) => knownEmail === email
  );
  const now = new Date().toJSON().substring(0, 10);

  const values = {
    email: email,
    password: password,
    confirmPassword: confirmPassword,
    birthday: birthday,
  };

  setIsEmptyField(values);

  if (birthday && parseFloat(now) - parseFloat(birthday) < 18) {
    state.underage = true;
    return dispatch(state);
  }

  if ((password || confirmPassword) && password !== confirmPassword) {
    state.passwordsMatch = false;
    return dispatch(state);
  }
  if ((email && email === "") || !email.includes("@")) {
    state.email = email;
    state.showEmailError = true;
    return dispatch(state);
  }
  if (email && alreadyRegistered) {
    state.email = email;
    state.showEmailError = false;
    state.alreadyRegistered = true;
    return dispatch(state);
  }
}

const animals = animalArray
  .map((animal) => {
    return `
      <label for=${animal}>${animal}</label>
      <input type="checkbox" value="${animal}">
      `;
  })
  .join("");

const other = `
  <label for="other-animal">Other</label>
  <input >`;
