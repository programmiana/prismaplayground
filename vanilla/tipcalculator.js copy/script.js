const containerDiv = document.querySelector(".flexbox");
const form = document.getElementsByTagName("form")[0];

const BASE_PERCENTAGE = 0.1;

let state = {
  amount: 0,
  service: 0,
  feeling: 0,
  tip: 0,
}


form.addEventListener("submit", (e) => handleSubmit(e))

function handleSubmit(e) {

  e.preventDefault();

  const amount = form['total'].value
  const service = form['service'].value
  const feeling = form['feeling'].value

  const feelingExtra = feeling === 'rich' && 2;
  const serviceExtra = service === 'premium' ? BASE_PERCENTAGE * 2 : state.service === 'good' ?  BASE_PERCENTAGE : BASE_PERCENTAGE * 0.5

  state.amount = amount;
  state.service = serviceExtra;
  state.feeling = feelingExtra;
  state.tip = parseFloat(amount) + amount * state.service + state.feeling;

  return render(state)
}

const container = document.createElement('div')

form.insertAdjacentElement('afterend', container)


function render(state) {
 container.innerHTML = `<p>${state.tip}</p>`
}
