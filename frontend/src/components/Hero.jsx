import React, { useState, useEffect } from 'react';
import "../css/Hero.css";
import "../css/Tasks.css";
import Button from '../design/Button';
import Star from '../design/Star';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Hero = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newStep, setNewStep] = useState('');
  const [newTask, setNewTask] = useState('');
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [notes, setNotes] = useState('');
  
  // State to manage step input visibility
  const [showStepInput, setShowStepInput] = useState(false);
  
  // State to manage calendar (due date) input visibility
  const [showCalendarInput, setShowCalendarInput] = useState(false);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleToggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleSelectTask = (index) => {
    const task = tasks[index];
    setSelectedTaskIndex(index);
    setEditedText(task.text);
    setDueDate(task.dueDate);
    setNotes(task.notes || '');
  };

  const handleSaveTask = () => {
    const updatedTasks = tasks.map((task, index) =>
      index === selectedTaskIndex ? { ...task, text: editedText } : task
    );
    setTasks(updatedTasks);
    setSelectedTaskIndex(null);
    setEditedText('');
  };

  const handleBlur = () => {
    if (selectedTaskIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === selectedTaskIndex ? { ...task, text: editedText } : task
      );
      setTasks(updatedTasks);
      setSelectedTaskIndex(null);
    }
  };

  const handleDateChange = (date) => {
    if (selectedTaskIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === selectedTaskIndex ? { ...task, dueDate: date } : task
      );
      setTasks(updatedTasks);
      setDueDate(date);
    }
  };

  const handleAddStep = () => {
    if (selectedTaskIndex !== null) {
      const updatedTasks = tasks.map((task, index) => {
        if (index === selectedTaskIndex) {
          return {
            ...task,
            steps: [...(task.steps || []), task.newStep || ''], 
            newStep: '', 
          };
        }
        return task;
      });
      setTasks(updatedTasks);
    }
  };

  const handleToggleStepInput = () => {
    setShowStepInput((prev) => !prev); 
  };

  const handleStepInputChange = (value) => {
    if (selectedTaskIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === selectedTaskIndex ? { ...task, newStep: value } : task
      );
      setTasks(updatedTasks);
    }
  };

  const handleAddNotes = (note) => {
    if (selectedTaskIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === selectedTaskIndex ? { ...task, notes: note } : task
      );
      setTasks(updatedTasks);
      setNotes(note);
    }
  };

  const handleDeleteTask = (indexToDelete) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(updatedTasks);
    setSelectedTaskIndex(null); // Deselect any selected task if deleted
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      const newTaskObject = {
        text: newTask,
        completed: false,
        dueDate: null,
        steps: [],
        notes: '',
        newStep: '',
        createdAt: new Date(), // Add the creation date here
      };

      setTasks([...tasks, newTaskObject]);
      setNewTask('');
    }
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Filter tasks into completed and incomplete
  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <>
      <div className='layout'>
        <div className='top'>
          To Do
          <span className='down'>
          <img src="/assets/caret-down.svg" alt="caret-down" />
          </span>
          <hr className='horizontal-line' />
          <div className='hero'>
            <div className="add-task-container">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add A Task"
                className="task-input"
              />
            </div>
            <div className='insider_icons'>
              <img src="src/assets/bell.svg" alt="bell" />
              <img src="src/assets/calender.svg" alt="calendar" />
              <img src="src/assets/repeat.svg" alt="repeat" />
              <Button onClick={handleAddTask} />
            </div>
          </div>
          <hr className='horizontal-line2' />
          {/* Render Incomplete Tasks */}
          <div className='tasks_section'>
            {incompleteTasks.map((task, index) => (
              <div key={index} className="task-item">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(index)}
                  className="task-checkbox"
                />
                <span
                  onClick={() => handleSelectTask(index)}
                  className={`task-text ${task.completed ? "completed" : ""}`}
                >
                  {task.text}
                </span>
                <span className='star'>
                  <Star />
                </span>
              </div>
            ))}
          </div>
          {/* Render Completed Tasks */}
          <div className='tasks_section'>
            <h2>Completed Tasks</h2>
          <hr className='horizontal-line2' />
          
            {completedTasks.map((task, index) => (
              <div key={index} className="task-item">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(index)}
                  className="task-checkbox"
                />
                <span
                  onClick={() => handleSelectTask(index)}
                  className={`task-text ${task.completed ? "completed" : ""}`}
                >
                  {task.text}
                </span>
                <span className='star'>
                  <Star />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------------------------- */}

      <div className='mainbar'>
      <hr className='horizontal-line3' />

        {/* Editing container and other task details */}
        {selectedTaskIndex !== null && (
          <div className="editing-container">
            <input
              type="checkbox"
              checked={tasks[selectedTaskIndex]?.completed}
              onChange={() => handleToggleTask(selectedTaskIndex)}
              className="task-checkbox"
            />
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onBlur={handleSaveTask}
              className="editable-text"
            />
            <Star />
          </div>
        )}
        <hr className='horizontal-line3' />
        <div className='steps-section'>
          <img
            className='side-icons'
            src="src/assets/add.svg"
            alt="add"
            onClick={handleToggleStepInput} // Toggle visibility of "Add Step" input
          />
          <span className='icon-text'> Add Step</span>
          <div className="steps-container">
            {tasks[selectedTaskIndex]?.steps?.map((step, index) => (
              <div key={index} className="step-item">
                <input type="checkbox" />
                <span>{step}</span>
              </div>
            ))}
            {showStepInput && (
              <input
                type="text"
                value={tasks[selectedTaskIndex]?.newStep || ''} // Use newStep specific to the task
                onChange={(e) => handleStepInputChange(e.target.value)}
                placeholder="Add a step"
                className="step-input"
              />
            )}
          </div>
        </div>

        <hr className='horizontal-line3' />
        <img className='side-icons' src="src/assets/bell.svg" alt="bell" />
        <span className='icon-text'> Set Reminder</span>
        <hr className='horizontal-line3' />
        <img className='side-icons' src="src/assets/calender.svg" alt="calendar" 
          onClick={() => setShowCalendarInput((prev) => !prev)} // Toggle visibility of calendar input
        />
        <span className='icon-text'> Add Due Date</span>
        {showCalendarInput && (
          <div className='calendar'>
            {selectedTaskIndex !== null && (
              <DatePicker
                selected={dueDate}
                onChange={handleDateChange}
                dateFormat="MMMM dd, yyyy"
                className="datepicker"
                placeholderText="Select date"
              />
            )}
          </div>
        )}
        <hr className='horizontal-line3' />
        <img className='side-icons' src="src/assets/repeat.svg" alt="repeat" />
        <span className='icon-text'> Repeat</span>
        <hr className='horizontal-line3' />
        <span className='notes-text'>
          <textarea
            className='add-notes'
            value={notes}
            onChange={(e) => handleAddNotes(e.target.value)}
            placeholder="Add notes"
          />
        </span>
        <hr className='horizontal-line4' />
        
        <div className='below-line4'>
          <img
            src="src/assets/cross.svg"
            alt="close"
            onClick={() => setSelectedTaskIndex(null)} 
          />
          {tasks[selectedTaskIndex]?.createdAt
            ? `Created ${new Date(tasks[selectedTaskIndex].createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}`
            : "Created Today"}
          <img
            src="src/assets/bin.svg"
            alt="delete"
            onClick={() => handleDeleteTask(selectedTaskIndex)} 
          />
        </div>

      </div>
    </>
  );
};

export default Hero;
