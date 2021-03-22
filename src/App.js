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

  return (
    <div className="container">
      <Header title="Task Tracker"/>
      <Tasks tasks={tasks}/>
    </div>
  );
}

export default App;
