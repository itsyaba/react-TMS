import React from 'react'
import NavBar from '../../components/NavBar/NavBar';
import Tasks from '../../components/Task/Tasks';

function TaskPage() {
  return (
    <div className='TaskContainer'>
      <NavBar />
      <Tasks />
    </div>
  );
}

export default TaskPage