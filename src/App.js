import Header from "./components/Header"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"
import Footer from "./components/Footer"
import About from "./components/About"

import { BrowserRouter as Router, Route } from "react-router-dom"

import { useState, useEffect } from "react"

function App() {
  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks")

    const data = res.json()

    return data
  }
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)

    const data = res.json()

    return data
  }

  useEffect(() => {
    const getTasksFromServer = async() => {
      const serverTasks = await fetchTasks()

      setTasks(serverTasks)
    }
    getTasksFromServer()
  }, [])

  // Add task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(task)
    })

    const newTask = await res.json()

    setTasks([...tasks, newTask])
  }

  // Callback function basically says that
  // if task.id matches the id of the clicked one, remove it
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method: "DELETE",})

    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  // I implemented by switching logic here
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(tasks.map(task => {
      task = task.id === id ? {...task, reminder: data.reminder} : task
      return task
    }))
  }

  return (
    <Router>
      <div className="container">
        <Header title="Task Tracker" onAdd={() => setShowAddTask(!showAddTask)} showAddTask={showAddTask}/>
        
        <Route path="/" exact render={props => {
          return <>
            {showAddTask && (<AddTask onAdd={addTask}/>)}
            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> 
              : "No Tasks to Show"}
          </>
        }}
        />
        <Route path="/about" component={About}/>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
