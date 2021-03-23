import Header from "./components/Header"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"

import { useState} from "react"

function App() {
  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([
    {
        id: 1,  
        text: "first task",
        day: "Feb 5",
        reminder: true
    },
    {
        id: 2,
        text: "second task",
        day: "Feb 6",
        reminder: true
    },
    {
        id: 3,
        text: "third task",
        day: "Feb 7",
        reminder: false
    },
  ])

  // Add task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    console.log(id)

    const newTask = { id, ...task}
    setTasks([...tasks, newTask])
  }

  // Callback function basically says that
  // if task.id matches the id of the clicked one, remove it
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  // I implemented by switching logic here
  const toggleReminder = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        task.reminder = !(task.reminder)
      }
      return task
    }))
  }

  return (
    <div className="container">
      <Header title="Task Tracker" onAdd={() => setShowAddTask(!showAddTask)} showAddTask={showAddTask}/>
      {showAddTask && (<AddTask onAdd={addTask}/>)}
      {tasks.length > 0 ? 
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 
        "No Tasks to Show"}
    </div>
  );
}

export default App;
