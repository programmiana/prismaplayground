import create from 'zustand';

const useStore = create(set => ({
  questions: [],
  fetchBears: async () => {
    const response = await fetch("https://opentdb.com/api.php?amount=10")
    set({ questions: await response.json() })
  }
}))

export default function App() {
  const bears = useStore(state => state.bears)

  return <h1>{bears.length} bears around here ...</h1>
}


