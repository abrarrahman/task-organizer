import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import './Tasks.css';

import TasksTable from './TasksTable/TasksTable';
import Modal from '../UI/Modal/Modal';
import Task from '../../models/Task';
import { RootState } from '../../redux/store';

export interface TasksProps {

}

const Tasks = (props: TasksProps) => {
  const [taskModalIsOpen, setTaskModalIsOpen] = useState(false);
  const [editTaskModalIsOpen, setEditTaskModalIsOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState<number>();
  const [formNameField, setFormNameField] = useState('');
  const [formDurationField, setFormDurationField] = useState<number>(0);

  const tasks = useSelector<RootState,Task[]>(state => state.tasks);

  const dispatch = useDispatch();
  const addNewTask = (task: Task) => {
    dispatch({
      type: 'ADD_TASK',
      payload: task,
    });
  }
  const editTask = (task: Task) => {
    dispatch({
      type: 'EDIT_TASK',
      payload: task,
    });
  }
  const deleteTask = (id: number) => {
    dispatch({
      type: 'DELETE_TASK',
      id: id,
    });
  }

  const toggleTaskModal = () => {
    setTaskModalIsOpen(prev => !prev);
  }
  const cancelTaskModal = () => {
    setFormDurationField(0);
    setFormNameField('');
    setEditTaskModalIsOpen(false);
    setTaskModalIsOpen(false);
  }
  const openEditTaskModal = (id: number) => {
    const taskToEdit = tasks.filter(task => task.id === id)[0];
    setEditTaskId(id);
    setFormNameField(taskToEdit.name);
    setFormDurationField(taskToEdit.duration);
    setEditTaskModalIsOpen(true);
  }
  const saveEditHandler = () => {
    if (typeof editTaskId === 'number' && typeof formDurationField === 'number')
      editTask({
        name: formNameField,
        duration: formDurationField,
        id: editTaskId,
      })
    cancelTaskModal();
  }
  const editTaskForm = <div className='taskForm'>
    <div className='formElement'>
      <label>Name: </label>
      <input
        type='text'
        placeholder='Task Name'
        value={formNameField}
        onChange={(event) => inputChangedHandler(event, 'taskName')}
      />
    </div>
    <div className='formElement'>
      <label>Duration: </label>
      <input
        type='number'
        step='0.01'
        placeholder='Duration'
        value={formDurationField}
        onChange={(event) => inputChangedHandler(event, 'duration')}
      />
    </div>
    <div className='formElement'>
      <button onClick={cancelTaskModal}>Cancel</button>
      <button onClick={saveEditHandler}>Save Changes</button>
    </div>
  </div>
  const inputChangedHandler = (event: React.ChangeEvent<HTMLInputElement>, formItem: string) => {
    switch (formItem) {
      case 'taskName':
        setFormNameField(event.target.value)
        break;
      case 'duration':
        setFormDurationField(parseFloat(event.target.value))
        break;
      default: return
    }
    return;
  }
  const addTaskHandler = () => {
    if (typeof formDurationField === 'number' && formNameField.length) {
      addNewTask({
        name: formNameField,
        duration: formDurationField,
        id: Math.random(),
      });
      setFormNameField('');
      setFormDurationField(0);
      toggleTaskModal();
    }
  }
  const addTaskForm = <div className='taskForm'>
    <div className='formElement'>
      <label>Name: </label>
      <input
        type='text'
        placeholder='Task Name'
        value={formNameField}
        onChange={(event) => inputChangedHandler(event, 'taskName')}
      />
    </div>
    <div className='formElement'>
      <label>Duration: </label>
      <input
        type='number'
        placeholder='Duration'
        step='0.01'
        value={formDurationField}
        onChange={(event) => inputChangedHandler(event, 'duration')}
      />
    </div>
    <div className='formElement'>
      <button onClick={cancelTaskModal}>Cancel</button>
      <button onClick={addTaskHandler}>+ Add Task</button>
    </div>
  </div>
  return (
    <>
      <Modal
        show={taskModalIsOpen}
        dismissModal={toggleTaskModal}
      >
        {addTaskForm}
      </Modal>
      <Modal
        show={editTaskModalIsOpen}
        dismissModal={cancelTaskModal}
      >
        {editTaskForm}
      </Modal>
      <div id='tasksContainer'>
        <div id='taskHeader'>
          <h1>Tasks Table</h1>
          <button onClick={toggleTaskModal}>+ Add Task</button>
        </div>
        <TasksTable tasks={tasks} onEdit={openEditTaskModal} onDelete={deleteTask} />
      </div>
    </>
  )
}

export default Tasks;