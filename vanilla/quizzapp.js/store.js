import create from 'zustand/vanilla'

const paramStore = create(() => ({ category: 9, amount: 10, difficulty: 'medium', type: 'multiple'
 }))
const { getState, setState, subscribe, destroy } = paramStore


export default paramStore;
