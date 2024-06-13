import React from 'react'

const PopUp = ({popup, setpopup, task, setTask, handlePopUp, handleAddTask}) => {
  return (
    <>
     {popup && (
        <div className='pop-up-container'>
          <div className='pop-up'>
            <p className='pop-up-text'>Let's add a task</p>
            <input
              type='text'
              className='pop-up-input'
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <div className='pop-up-button-container'>
              <div className='pop-up-button' onClick={() => handlePopUp('cancel')}>
                <button className='pop-up-button-text'>Cancel</button>
              </div>
              <div className='pop-up-button' onClick={() => handleAddTask()}>
                <button className='pop-up-button-text'>Add</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PopUp