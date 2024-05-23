import { useState, useRef } from 'react'

import './App.css'

let starterTodos = [
  {
    text: "finish frontend",
    complete: false,
    user: 'bob'
  },
  {
    text: "sleep",
    complete: false,
    user: 'bob'
  }
]

function App() {

  const [todos, setTodos] = useState(starterTodos)

  const textRef = useRef()
  const completeRef = useRef()

  async function handleSubmit(e) {
    e.preventDefault()
    console.log(textRef.current.value)
    console.log(completeRef.current.checked)
  }

  return (
    <>
      <h1>Todos</h1>
      <form onSubmit={handleSubmit}>
        <label>
          I want to:
          <br />
          <input type="text" ref={textRef} />
        </label>
        <label>
          <input type="checkbox" ref={completeRef} />
        </label>
        <br/><br/>
        <button>Add Todo</button>
      </form>
      <br/><br/>
      {todos.map((todo) => 
        <p key={todo.text}>{todo.text}</p>
      )}
    </>
  )
}

export default App
