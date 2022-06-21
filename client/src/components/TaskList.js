// Import components.
import Task from './TaskList/Task'

// Import styles.
import styles from './TaskList.module.scss'

/**
 *  Functional component that displays a element that can be used to list all
 *  tasks.
 * 
 *  @param    {Object}  props   React props passed by the parent element.
 *  @returns  {JSX.Element}
 */
export default function TaskList({ tasks = [], update, remove }) {
  
  // Create a list of tasks.
  const elements = tasks.map(task => {
    return (
      <Task
        key={task.id}
        title={task.title}
        id={task.id}
        done={task.done}
        update={update}
        remove={remove}
      />
    )
  })

  return (
    <>
      <hr/>
      <div className={styles['task-list']}>
        { elements }
      </div>
    </>
  )
}
