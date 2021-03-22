import Task from "./Task"

export const Tasks = ({ tasks }) => {
    

    return (
        <>
            {tasks.map(task => {
                return (
                    <Task key={task.id} task={task}/>
                )
            })}   
        </>
    )
}

export default Tasks
