// Import styles.
import styles from './Task.module.scss'

/**
 *  Functional component that displays a element that can be used to show a
 *  single task.
 * 
 *  @param    {Object}  props   React props passed by the parent element.
 *  @returns  {JSX.Element}
 */
export default function Task(props) {

  return (
    <div className={styles.task}>
      <input type="checkbox" />
      <span>Task title</span>
      <button>Edit</button>
    </div>
  )
}
