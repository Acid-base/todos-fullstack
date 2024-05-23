import { useState, useRef, useEffect } from 'react'

import './App.css'

function App() {

  const [todos, setTodos] = useState([])

  useEffect(() => {
    async function getTodos() {
      try {
        const response = await fetch('http://localhost:8080/api/todos')
        const data = await response.json()
        console.log(data)
        setTodos(data)
      } catch(err) {
        console.log(err)
      }
    }
    getTodos()
  }, [])

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
        <p 
          style={{ textDecoration: todo.complete ? 'line-through' : '' }} 
          key={todo.text}>
            {todo.text}
        </p>
      )}
    </>
  )
}

export default App
