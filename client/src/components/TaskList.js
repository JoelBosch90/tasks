// Import React dependencies.
import { createRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// Import functions.
import immutableSort from '../scripts/functions/immutableSort'
import sortByCompleted from '../scripts/functions/tasks/sortByCompleted'

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
