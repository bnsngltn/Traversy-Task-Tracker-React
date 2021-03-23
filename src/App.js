import Header from "./components/Header"
import Tasks from "./components/Tasks"

import { useState} from "react"

function App() {
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
      <Header title="Task Tracker"/>
      {tasks.length > 0 ? 
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 
        "No Tasks to Show"}
    </div>
  );
}

export default App;
