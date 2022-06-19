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
export default function TaskList(props) {

  return (
    <div className={styles['task-list']}>
      <Task />
    </div>
  )
}
