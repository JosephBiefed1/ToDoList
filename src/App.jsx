import './App.css';
import React, { useState, useEffect } from 'react';
import { TbPencilPlus } from 'react-icons/tb';
import { RiDeleteBin6Line, RiCheckboxBlankFill, RiCheckboxFill } from 'react-icons/ri';
import PopUp from './PopUp';
import { DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

const App = () => {
  const [todoList, setTodoList] = useState(() => {
    const localData = localStorage.getItem('TodoList');
    return localData ? JSON.parse(localData) : [];
  });
  const [popup, setPopup] = useState(false);
  const [task, setTask] = useState('');
  const [nextId, setNextId] = useState(1); // State to manage the next available ID

  useEffect(() => {
    localStorage.setItem('TodoList', JSON.stringify(todoList));
  }, [todoList]);

  function handlePopUp(action ) {
    if (action === 'add') {
      setPopup(true);
    } else {
      setPopup(false);
    }
  }

  function handleAddTask() {
    if (task.trim() !== '') {
      const newTask = {
        id: nextId,
        text: task,
        complete: false,
      };
      setTodoList((current) => [...current, newTask]);
      setTask('');
      setPopup(false);
      setNextId(nextId + 1); // Increment the nextId for the next task
    }
  }

  function handleComplete(id) {
    setTodoList((current) =>
      current.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            complete: !item.complete,
          };
        }
        return item;
      })
    );
  }

  function handleDelete(id) {
    setTodoList((current) => current.filter((item) => item.id !== id));
  }

  // Function to handle drag and drop reordering
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(todoList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodoList(items);
  };

  return (
    <>
      <PopUp popup={popup} setpopup={setPopup} task={task} setTask={setTask} handlePopUp={handlePopUp} handleAddTask={handleAddTask} />

      <div className='header-container'>
        <div className='header'>
          <p className='header-title'>My Task</p>
          <div className='header-add-task' onClick={() => handlePopUp('add')}>
            <p className='header-add-task-text'>
              <TbPencilPlus />
            </p>
          </div>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todo-list">
  {(provided) => (
    <div
      className='to-do-list'
      {...provided.droppableProps}
      ref={provided.innerRef}
    >
      {todoList.map((item, index) => (
        <Draggable key={item.id.toString()} draggableId={item.id.toString()} index={index}>
          {(provided) => (
            <div
              className='to-do-container'
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div className='to-do-checkbox' onClick={() => handleComplete(item.id)}>
                {item.complete ? <RiCheckboxFill /> : <RiCheckboxBlankFill />}
              </div>
              <div className='to-do-text'>
                <p className='to-do-text-text'>{item.text}</p>
              </div>
              <div className='to-do-delete' onClick={() => handleDelete(item.id)}>
                <RiDeleteBin6Line />
              </div>
            </div>
          )}
        </Draggable>
      ))}
      {provided.placeholder}
    </div>
  )}
</Droppable>
      </DragDropContext>
    </>
  );
};

export default App;
