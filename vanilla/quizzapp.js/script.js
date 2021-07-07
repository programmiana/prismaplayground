import create from "zustand/vanilla";
// import { persist } from "zustand/middleware";
import paramStore from "./store";
import "regenerator-runtime/runtime";
import axios from "axios";
const app = document.getElementById("app");

const { amount, category, difficulty, type } = paramStore.getState();

const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;

const buttonContainer = document.createElement("div");
const moreQuestions = document.createElement("button");
const keepQuestions = document.createElement("button");

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
  gameOver: false
}));

app.addEventListener("click", (e) => {
  e.preventDefault();
  const { keepQuestion, questions, round, points } = questionsStore.getState();

  if (e.target.innerText === "I like these questions") {
    questionsStore.setState({ keepQuestion: true });
    fetchThings();
  }

  if (e.target.innerText === "Give me more questions") {
    sessionStorage.removeItem("questions-storage");
    console.log("cleared");
    console.log(JSON.parse(sessionStorage.getItem("questions-storage")));
    fetchThings();
  }

  if (e.target.innerText === "Restart") {
    questionsStore.setState({ keepQuestion: false });
    fetchThings();
  }

  if (e.target.classList.contains("correct")) {
    questionsStore.setState({ hasCorrectAnswer: true });
    questionsStore.setState({ points: points + 1  });
    questionsStore.setState({ round: round + 1  });
    console.log(questionsStore.getState())

  }
});

async function fetchThings() {
  const { keepQuestion } = questionsStore.getState();

  !keepQuestion && (await questionsStore.getState().fetch());
  const questions = await questionsStore.getState().questions;

  generateQuestionsHtml(questions, questionsStore);
}

fetchThings();

function generateQuestionsHtml(arr, store) {
  const { keepQuestion, questions, round } = questionsStore.getState();

  const findQuestion = arr.find((question, index) => index === round);

  const answers = [
    findQuestion.correct_answer,
    ...findQuestion.incorrect_answers,
  ];

  const shuffleAnswers = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  };

  shuffleAnswers(answers);

  const correct = document.querySelector("correct");

  console.log(correct);

  const html = `
  <h1>QUIZAPP</h1>

  <button>I like these questions</button>
  <button>${keepQuestion ? "Restart" : "Give me more questions"}</button>
  
  <div>
  ${
    keepQuestion
      ? "<div>" +
        round +
        1 +
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
  ${arr
    .map(
      (question, index) =>
        "<li>" + (index + 1) + ") " + question.question + "</li>"
    )
    .join(" ")}
  </ul>
  
  </div>`
  }
  
  `;
  app.innerHTML = html;
}
