// Import components.
import NewTask from './components/NewTask'
import TaskList from './components/TaskList'

// Import styles.
import styles from './App.module.scss'

/**
 *  Functional component that houses the entire tasks app. It show an element to
 *  add new tasks and lists the tasks that were added before.
 * 
 *  @returns  {JSX.Element}
 */
export default function App() {

  return (
    <div className={styles.app}>
      <main className={styles.content}>
        <h1>Tasks</h1>
        <NewTask />
        <TaskList />
      </main>
    </div>
  )
}
