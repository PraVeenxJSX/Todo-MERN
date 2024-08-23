import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

const App = () => {
  const [item, setItem] = useState([])
  const [newTask, setNewTask] = useState('')
  const [loading, setLoading] = useState(true) // Loading state

  useEffect(() => {
    axios.get('http://localhost:8000/tasklist').then((arr) => {
      setItem(arr.data)
      setLoading(false) // Stop loading once data is fetched
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true) // Start loading when a new task is being added
    axios.post('http://localhost:8000/addtask', { todo: newTask }).then(
      (arr) => {
        setItem(arr.data)
        setLoading(false) // Stop loading once task is added
      }
    )
    setNewTask('')
  }

  const deletehandle = (id) => {
    setLoading(true) // Start loading when a task is being deleted
    axios.delete(`http://localhost:8000/delete/${id}`).then((arr) => {
      setItem(arr.data)
      setLoading(false) // Stop loading once task is deleted
    })
  }

  return (
    <div className="app-container">
      <div className="task-input-container">
        <input
          type="text"
          placeholder="Enter task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="task-input"
        />
        <button onClick={handleSubmit} className="add-button">
          Add
        </button>
      </div>
      <hr className="divider" />
      {loading ? (
        <div className="loading">Loading...</div> // Loading message or spinner
      ) : (
        <div className="task-list">
          {item.map((task) => {
            return (
              <div key={task._id} className="task-item">
                <h3 className="task-text">{task.todo}</h3>
                <button
                  onClick={() => deletehandle(task._id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default App
