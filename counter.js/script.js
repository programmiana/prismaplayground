const container = document.querySelector(".flexbox");

const increase = document.createElement("button");
const decrease = document.createElement("button");
const reset = document.createElement("button");

const countNumber = document.createElement("div");

container.insertAdjacentElement("beforebegin", countNumber);

container.appendChild(increase);

increase.insertAdjacentElement("afterend", reset);
reset.insertAdjacentElement("afterend", decrease);

increase.innerText = "increase".toUpperCase();
decrease.innerText = "decrease".toUpperCase();
reset.innerText = "reset".toUpperCase();

let state = {
  count: 0,
};

increase.addEventListener("click", (e) => handleClick(e));
decrease.addEventListener("click", (e) => handleClick(e));
reset.addEventListener("click", (e) => handleClick(e));

function handleClick(e) {
  const counting =
    e.target.innerText === "RESET"
      ? 0
      : e.target.innerText === "INCREASE"
      ? +1
      : -1;

  state.count = counting === 0 ? 0 : state.count + counting;

  render(state.count);
}

function render(number) {
  return (countNumber.innerHTML = `<p>${number}</p>`);
}
