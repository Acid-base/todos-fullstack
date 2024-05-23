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
    const body = {
      text: textRef.current.value,
      completed: completeRef.current.checked,
      user: 'bob'
    }
    console.log(body, JSON.stringify(body))
    try {
      setIsLoading(true)
      const response = await fetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const newTodo = await response.json()
      setTodos([...todos, newTodo])
    } catch(err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete(id) {
    try {
      setIsLoading(true)
      await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
      })
      setTodos(todos.filter(todo => todo._id !== id))
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
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
                style={{ textDecoration: todo.completed ? 'line-through' : '' }} 
                key={todo._id}>
                  {todo.text} 
                  <span 
                    onClick={() => handleDelete(todo._id)} 
                    style={{ marginLeft: '15px', fontWeight: '500', cursor: 'pointer' }}>
                      X
                  </span>
              </p>
          )
        }
    </>
  )
}

export default App
