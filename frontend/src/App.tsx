import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  let btn: HTMLElement | null = document.getElementById("btn");
  btn?.addEventListener("click", ()=>{
  btn?.blur(); // removes the focus
  
})
let btn2: HTMLElement | null = document.getElementById("btn2");
  btn2?.addEventListener("click", ()=>{
  btn2?.blur(); // removes the focus
  })


  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>{count}</p>
        <button id="btn" onClick={() => setCount((count) => count + 1)}>
          +
        </button>
        <button id="btn2" onClick={() => setCount((count) => count - 1)}>
          -
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
