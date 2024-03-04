export const TaskForm = ({name, handleInputChange, createTask, isEditing, updateTask}) => {

  return (
      <form onSubmit={isEditing ? updateTask : createTask} className="task-form">
         <input type="text" name="name" value={name} onChange={handleInputChange} id="" placeholder='add a task' />
         <button type='submit' >{isEditing ? "Edit" : "Add"}</button>
      </form>
   )
}
