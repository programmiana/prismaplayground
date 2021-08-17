import create from "zustand/vanilla";
import selectOptions from "./select-options.js";
// import { persist } from "zustand/middleware";
import paramStore from "./params-store";
import "regenerator-runtime/runtime";
import axios from "axios";
const app = document.getElementById("app");

const gameStore = create((set) => ({
  // questions: {},
  // fetch: async () => {
  //   const response = await axios.get(endpoint);
  //   set({ questions: response.data.results });
  // },
  // keepQuestion: false,
  // hasCorrectAnswer: false,
  // round: 0,
  // points: 0,
  gameOver: false,
  gameStart: true,
}));

generateQuestionsHtml(gameStore);

app.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.innerText === "I like these questions") {
    questionsStore.setState({ keepQuestion: true });
    fetchThings();
  }

  if (e.target.innerText === "Give me more questions") {
    fetchThings();
  }

  if (e.target.innerText === "Restart") {
    questionsStore.setState({ keepQuestion: false });
    fetchThings();
  }

  if (e.target.classList.contains("correct")) {
    questionsStore.setState({ hasCorrectAnswer: true });
    questionsStore.setState({ points: points + 1 });
    questionsStore.setState({ round: round + 1 });
    fetchThings();
  }

  if (e.target.type === "submit") {
    const form = document.querySelector("form");

    paramStore.setState({
      amount: form.elements["number"].value
        ? form.elements["number"].value
        : 10,
    });
    paramStore.setState({
      category:
        form.elements["category"].value === "0"
          ? Math.floor(Math.random() * 30)
          : form.elements["category"].value,
    });
    paramStore.setState({ difficulty: form.elements["difficulty"].value });

    generateStore(paramStore);
  }
});

function generateStore(paramStore) {
  const { amount, category, difficulty, type } = paramStore.getState();
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;

  console.log(endpoint);
  const questionsStore = create((set) => ({
    questions: {},
    fetch: async () => {
      const response = await axios.get(endpoint);
      set({ questions: response.data.results });
    },
    keepQuestion: false,
    hasCorrectAnswer: false,
    round: 0,
    points: 0,
    gameOver: false,
    gameStart: true,
  }));



  fetchThings(questionsStore);
}

async function fetchThings(store) {
  if (!store) return;

  if (store) {
    // const { keepQuestion, questions, round, points } = store.getState();
    await store.getState().fetch()
    const theseQuestions = await store.getState().questions;
    store.getState();

    console.log(theseQuestions)

    generateQuestionsHtml(theseQuestions, store);
  }
}



function generateQuestionsHtml(arr, store) {
  const { gameStart, gameOver } = gameStore.getState();

  // const {
  //   keepQuestion,
  //   questions,
  //   round,
  //   hasCorrectAnswer,
  //   points,
  //   gameStart,
  // } = questionsStore.getState();

  // const findQuestion = arr.find((question, index) => index === round);

  // const answers = [
  //   findQuestion.correct_answer,
  //   ...findQuestion.incorrect_answers,
  // ];

  // const shuffleAnswers = (arr) => {
  //   for (let i = arr.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * i);
  //     const temp = arr[i];
  //     arr[i] = arr[j];
  //     arr[j] = temp;
  //   }
  //   return arr;
  // };

  // shuffleAnswers(answers);

  const keepQuestion = false;
  const hasCorrectAnswer = false;

  const startHTML = `<h1>QUIZAPP</h1>
    <form id="param-form"> 
  <label for="number"> Number of questions </label>
  <input type="text" id="number" name="number" required>
  <label for="select"> Select Category </label>
  <select name="category" id="category">
  ${selectOptions.map(
    (option) => `<option value=${option.value}>${option.name}</option>`
  )}
  </select>
  
  <select name="difficulty" id="difficulty">
  <option value="easy">Easy</option>
  <option value="medium">Medium</option>
  <option value="hard">Hard</option>
  </select>
  </form>
<div>
  <button type="submit" form="param-form">Start Quizzzzz</button>
</div>`;

  const html = `
  <h1>QUIZAPP</h1>
  ${!keepQuestion ? `<button>I like these questions</button>` : ""}
  <button>${keepQuestion ? "Restart" : "Give me more questions"}</button>
  
  <div>
  ${hasCorrectAnswer ? `${points}` + " CORRECT" : ""}
  ${
    keepQuestion
      ? "<div>" +
        (round + 1) +
        ") " +
        findQuestion.question +
        answers
          .map(
            (answer, index) =>
              "<div>" +
              `<button class=${
                answer === findQuestion.correct_answer ? "correct" : "incorrect"
              }>` +
              answer +
              "</button>" +
              "</div>"
          )
          .join(" ") +
        "</div>"
      : `<ul>
  ${
    arr.length
      ? arr
          .map(
            (question, index) =>
              "<li>" + (index + 1) + ") " + question.question + "</li>"
          )
          .join(" ")
      : ""
  }
  </ul>
  
  </div>`
  }
  }`;
  app.innerHTML = gameStart ? startHTML : html;
}
