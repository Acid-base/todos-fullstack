import { useState, useRef, useEffect } from 'react'

import './App.css'

const BASE_URL = 'http://localhost:8080/api/todos'

function App() {

  const [isLoading, setIsLoading] = useState(false)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    async function getTodos() {
      try {
        setIsLoading(true)
        const response = await fetch(BASE_URL)
        const data = await response.json()
        console.log(data)
        setTodos(data)  
      } catch(err) {
        console.log(err)
      } finally {
        setIsLoading(false)
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
        {
          isLoading ?
            <p>Loading...</p>
            :
          todos.map((todo) => 
              <p 
                style={{ textDecoration: todo.complete ? 'line-through' : '' }} 
                key={todo._id}>
                  {todo.text}
              </p>
          )
        }
    </>
  )
}

export default App
