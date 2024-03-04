import { TaskList } from "./components/TaskList";

export const URL = process.env.REACT_APP_URL

function App() {
  return (
    <div className="app" >
      <div className="task-container">
        <TaskList/>
      </div>
    </div>
  );
}

export default App;
