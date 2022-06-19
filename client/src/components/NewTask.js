// Import styles.
import styles from './NewTask.module.scss'

/**
 *  Functional component that displays a element that can be used to create a
 *  new task.
 * 
 *  @param    {Object}  props   React props passed by the parent element.
 *  @returns  {JSX.Element}
 */
export default function NewTask(props) {

  return (
    <div className={styles['new-task']}>
      <input placeholder={"New task title..."} />
      <button>Add</button>
    </div>
  )
}
