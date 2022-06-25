// Import React dependencies.
import { createRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// Import functions.
import immutableSort from '../functions/immutableSort'

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

  /**
   *  Function to sort the tasks by their completed status.
   * 
   *  @param  {Object}  taskA
   *    @property {Boolean}   done  Whether the task is done or not.
   *  @param  {Object}  taskB
   *    @property {Boolean}   done  Whether the task is done or not.
   *  @return {Number}
   */
  const sortByCompleted = (taskA, taskB) => {
    if (taskA.done && !taskB.done) return -1
    if (!taskA.done && taskB.done) return 1
    return 0
  }

  // Create a list of tasks.
  const taskElements = immutableSort(tasks, sortByCompleted).map(task => {
    const taskRef = createRef(null);
    return (
      <CSSTransition
        nodeRef={taskRef}
        key={task.id}
        timeout={1000}
        classNames={{
          enter: styles['animation-enter'],
          enterActive: styles['animation-enter-active'],
          exit: styles['animation-exit'],
          exitActive: styles['animation-exit-active'],
        }}
      >
        <div
          ref={taskRef}
          className={styles.wrapper}
        >
          <Task
            title={task.title}
            id={task.id}
            done={task.done}
            update={update}
            remove={remove}
          />
        </div>
      </CSSTransition>
    )
  })

  return (
    <>
      <hr/>
      <TransitionGroup
        component="ul"
        className={styles.list}
      >
        { taskElements }
      </TransitionGroup>
    </>
  )
}
