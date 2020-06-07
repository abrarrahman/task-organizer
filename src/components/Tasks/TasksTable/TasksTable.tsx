import React from "react";

import './TasksTable.css';
import Task from '../../../models/Task';

export interface TasksTableProps {
  tasks: Task[],
  onEdit: (id:number)=>void,
  onDelete: (id:number)=>void,
}
interface TaskActionProps {
  onClickEdit: React.MouseEventHandler,
  onClickDelete: React.MouseEventHandler
}
const TaskAction = (props: TaskActionProps) => {
  return (
    <td>
      <button className='taskButton' onClick={props.onClickEdit}>Edit</button>
      <button className='taskButton' onClick={props.onClickDelete}>Delete</button>
    </td>
  )
}
interface TaskEntryProps {
  task: Task,
  onEdit: (id: number)=>void,
  onDelete: (id: number)=>void,
}
const TaskEntry = (props: TaskEntryProps) => {
  return (
    <tr>
      <td>{props.task.name}</td>
      <td>{props.task.duration} seconds</td>
      <TaskAction
        onClickEdit={()=> props.onEdit(props.task.id)}
        onClickDelete={() => props.onDelete(props.task.id)}
      />
    </tr>
  )
}
const TasksTable = (props: TasksTableProps) => (
  <div id="tasksTableContainer">
    <table>
      <thead>
        <tr style={{ textAlign: 'left' }}>
          <th style={{width: '40%'}}>Task Name</th>
          <th style={{width: '30%'}}>Task Duration</th>
          <th style={{width: '30%'}}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          props.tasks.map(task => {
            return (
              <TaskEntry key={task.id} task={task} onEdit={props.onEdit} onDelete={props.onDelete}/>
            )
          })
        }
      </tbody>
    </table>
  </div>
)

export default TasksTable;