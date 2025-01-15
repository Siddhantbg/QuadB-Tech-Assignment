import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';import "../css/Sidebar.css";
import TaskChart from './Chart';
const Sidebar = ({ isVisible, toggleSidebar }) => {
 
  const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
      setLoggedInUser(localStorage.getItem('loggedInUser'))
  }, [])


  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Loggedout');
    setTimeout(() => {
        navigate('/login');
    }, 1000)
}

  const doneTasks = 5; 
  const pendingTasks = 6; 
  return (
    <div className='user'>

    <div className={`sidebar ${isVisible ? 'visible' : ''}`}>
      <button className="" onClick={toggleSidebar}>
        ✖
      </button>
      
      <div className="menu">
          <img src="src\assets\A generic user avatar with a simple design.png" alt="" />
          <div className='user'>
Hi {loggedInUser}
          </div>
        </div>
        <div className='icons'>
          <div className='inincons'>
        <img src="src\assets\alltasks.svg" alt="alltasks" />
        All Tasks
        </div>
        <div className='inincons'>
        <img src="src\assets\calender.svg" alt="calendar" />
        Today
        </div>
        <div className='inincons'>
        <img src="src\assets\important.svg" alt="imp" />
        Important
        </div>
        <div className='inincons'> 
        <img src="src\assets\plan.svg" alt="plan" />
        Planned
        </div>
        <div className='inincons'>
        <img src="src\assets\map.svg" alt="map" />
        Assigned to me
        </div>
        </div>
        <br />
        <div className='add-list'>
        <img src="src\assets\add.svg" alt="add" />
          Add List
        </div>
        <br />
      <div className='chart'>
      <TaskChart doneTasks={doneTasks} pendingTasks={pendingTasks} />
      </div>
      <button onClick={handleLogout}>Logout</button>

      </div>
      <ToastContainer />

      <div>

      </div>

    </div>
  );
};

export default Sidebar;
