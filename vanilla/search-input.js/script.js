const animalArray = ["dog", "cat", "tiger", "elephant", "other"];

let state = {
  searchString: "",
  wordFound: "",
  somethingFound: false
};

window.addEventListener("load", () => dispatch(state));

function renderHTML(state) {
  return (app.innerHTML = `<div class="flexbox">
  <h1>Hello</h1>
  <form id="form">
    <div>
      <label >Search something:</label>
      <input placeholder="search" name="search">
      ${state.searchString !== "" ? "<p>Your search term was:" : ""}
      ${state.searchString !== "" ? state.searchString : ""}
      ${
        state.somethingFound 
          ? `<p>We found</p>${state.wordFound}` :  state.searchString === '' ? '' : " <p>We found no results.</p>"
      }
    </form>
</div>`);
}

function dispatch(state) {
  return renderHTML(state);
}

app.addEventListener("change", (e) => searchValue(e));

function searchValue(e) {
  e.preventDefault();
  searchValue = e.target.value;
  state.searchString = searchValue;

  const found = animalArray
    .map((item) => (item.includes(searchValue) ? item : undefined))
    .filter((value) => value !== undefined);

  state.wordFound = found;
  
  if (found) state.somethingFound = true;

  return dispatch(state);
}
