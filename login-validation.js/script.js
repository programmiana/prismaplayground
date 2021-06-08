const form = document.getElementsByTagName("form")[0];

const selectAnimals = form["animal"];
console.log(selectAnimals);

const animalArray = ["dog", "cat", "tiger", "elephant", "other"];

let state = {
  declareAnimals: false,
};

selectAnimals.addEventListener("click", (e) => handleClick(e));

function handleClick(e) {
  if(e.currentTarget.name === 'animal') {
    if (selectAnimals.checked) {
      state.declareAnimals = true;
      dispatch(state);
    }
    if(selectAnimals.checked === false) {
      state.declareAnimals = false;
      dispatch(state);
    }
  }
  const email = form["email"].value;
  const password = form["password"].value;

}

form.addEventListener("submit", (e) => handleSubmit(e));

function handleSubmit(e) {
  const email = form["email"].value;
  const email = form["email"].value;
  e.preventDefault()
  if(email) {
    return email === '' || !email.includes('@') ? console.log('invalid') : console.log('valid')  

  }

}

function dispatch(state) {
    render(state) 
}
const div = document.createElement("div");
selectAnimals.insertAdjacentElement("afterend", div);
function render(state) {
  const animalOptions = animalArray.map((animal, index) => {
    return `
    <label for=${animal}>${animal}</label>
     <input type="checkbox" value="${animal}"> ${animal}
     `;
  });
  div.innerHTML = state.declareAnimals ? animalOptions.join("") : '';
}
