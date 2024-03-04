import axios from "axios";
import { useEffect, useState } from "react";
import { URL } from "../App";
import Task from "./Task";
import { TaskForm } from "./TaskForm";

// http://localhost:5000/api/tasks

export const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", completed: false });
  const { name } = formData;
  const [isEditing, setIsEditing] = useState(false)
  const [taskId, setTaskId] = useState("")
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      return console.log('Error');
    }
    try {
      await axios.post(`${URL}/api/tasks`, formData);
      setFormData({ ...formData, name: "" });
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const getTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${URL}/api/tasks`);
      setTasks(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/api/tasks/${id}`);
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    const cTask = tasks.filter((task) => {
      return task.completed === true
    })
    setCompletedTasks(cTask)
  }, [tasks])

  const getSingleTask = async (task) => {
    setFormData({ name: task.name, completed: false });
    setTaskId(task._id)
    setIsEditing(true)
   };

   const updateTask = async (e) => {
      e.preventDefault()
      if(name === "") {
         return toast.error("Input field cannot be empty.")
      }
      try {
         await axios.put(`${URL}/api/tasks/${taskId}`, formData)
         setFormData({...formData, name: ''})
         setIsEditing(false)
         getTasks()
      } catch (error) {
        console.log(error);
      }
   }

   const setToComplete = async (task) => {
      const newFormData = {
         name: task.name,
         completed: true
      }
      try {
         await axios.put(`${URL}/api/tasks/${task._id}`, newFormData)
         getTasks()
      } catch (error) { 
       console.log(error);
      }
   }



  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm
        name={name}
        handleInputChange={handleInputChange}
        createTask={createTask}
        isEditing={isEditing}
        updateTask={updateTask}
      />
      {tasks.length > 0 && (
      <div className="flex-between --pb">
        <p>
          <b>Total Tasks: </b>{tasks.length}
        </p>
        <p>
          <b>Completed Tasks: </b>
          {completedTasks.length}
        </p>
      </div>
      )}

      <hr />
      {isLoading && (
        <div className="flex-center">
          <p>Loading...</p>
        </div>
      )}
      {!isLoading && tasks.length === 0 ? (
        <p>NO tasks added. Pleace add a task</p>
      ) : (
        <>
          {tasks.map((task, index) => {
            return (
              <Task
                key={task._id}
                task={task}
                index={index}
                deleteTask={deleteTask}
                getSingleTask={getSingleTask}
                setToComplete={setToComplete}
              />
            );
          })}
        </>
      )}
    </div>
  );
};
