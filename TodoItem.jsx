import React from 'react'
import { useState } from 'react'

const TodoItem = ({task, deleteTask, toggleComplete}) => {
    function handleComplete(task) {
        toggleComplete(task)
    }
  return (
    <>
    <div className='todo-item'>
        <input type="checkbox" checked={task.completed} onChange={() => handleComplete(task)}/>
        <p>{task.text}</p>
        <button onClick={() => deleteTask(task.id)}>X</button>

    </div>
    </>
  )
}

export default TodoItem