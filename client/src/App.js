
// Import components.
import NewTask from './components/NewTask'
import TaskList from './components/TaskList'

// Import functions.
import useLocalState from './functions/useLocalState'
import createTask from './functions/createTask'
import updateTask from './functions/updateTask'
import removeTask from './functions/removeTask'

// Import styles.
import styles from './App.module.scss'

/**
 *  Functional component that houses the entire tasks app. It show an element to
 *  add new tasks and lists the tasks that were added before.
 * 
 *  @returns  {JSX.Element}
 */
export default function App() {

  // We keep track of all tasks in a single array.
  const [tasks, setTasks] = useLocalState('tasks', [])

  return (
    <div className={styles.app}>
      <main className={styles.content}>
        <h1>Tasks</h1>
        <NewTask createTask={title => void createTask(setTasks, title)} />
        <TaskList
          tasks={tasks}
          update={(id, update) => void updateTask(setTasks, id, update)}
          remove={(id) => void removeTask(setTasks, id)}
        />
      </main>
    </div>
  )
}
