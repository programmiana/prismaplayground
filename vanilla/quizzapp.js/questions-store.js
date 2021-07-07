import create from "zustand/vanilla";
import paramStore from "./store";

const {amount, category, difficulty, type } = paramStore.getState();

const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;


function fetchStoreData() {
  return axios.get(endpoint);
}

export default fetchStoreData;
