// Import React functionality.
import { useState, useEffect, useRef } from 'react';

// Import styles.
import styles from './NewTask.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

/**
 *  Functional component that displays a element that can be used to create a
 *  new task.
 * 
 *  @param    {Object}  props   React props passed by the parent element.
 *  @returns  {JSX.Element}
 */
export default function NewTask({ createTask }) {
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef()

  /**
   *  Handler for input change events.
   */
  const inputChangeHandler = event => void setInputValue(event.target.value)

  // Make sure to keep the actual input in sync with the input's state.
  useEffect(() => { inputRef.current.value = inputValue }, [inputValue])

  /**
   *  Function to add a new task.
   */
  const addTask = () => {

    // Make sure that we do have some input value.
    if (!inputValue) return

    // First create the new task using the current input as the title.
    createTask(inputValue)

    // Next, reset the input field and refocus it so that the user can
    // immediately create a new task.
    setInputValue('')
    inputRef.current.focus()
  }

  return (
    <div className={styles['new-task']}>
      <input
        ref={inputRef}
        type="text"
        placeholder={"New task title..."}
        onChange={inputChangeHandler}
        onKeyDown={event => { if (event.key === 'Enter') addTask() }}
      />
      <button
        onClick={addTask}
        className={'icon'}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  )
}
