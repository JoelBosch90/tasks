// Import React functionality.
import { useState, useEffect, useRef } from 'react';

// Import styles.
import styles from './Task.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

/**
 *  Functional component that displays a element that can be used to show a
 *  single task.
 *  @param    {Object}  props   React props passed by the parent element.
 *  @returns  {JSX.Element}
 */
export default function Task({ id, title, done, remove, update }) {

  // Get references for the input elements.
  const checkRef = useRef()
  const inputRef = useRef()

  // Use the original title as the default value for the edit input.
  const [inputValue, setInputValue] = useState(title)

  // A task can be in a state in which the user can edit the current title, or
  // in a state in which the current title is only shown.
  const [editing, setEditing] = useState(false)

  // Make sure that the input field keeps in sync with the input state.
  const inputChangeHandler = event => void setInputValue(event.target.value)
  useEffect(() => { inputRef.current.value = inputValue }, [inputValue])

  /**
   *  Handler function for handling edit events. This will toggle editing mode
   *  on and off, and submit any pending title changes when the editing mode is
   *  toggled off.
   */
  const editHandler = () => {

    // If we're not currently editing the task, we should simply go into editing
    // mode.
    if (!editing) {

      // Enable editing mode.
      setEditing(true)

      // Set focus on the title input. To do this we need to make sure that it
      // is visible first.
      inputRef.current.classList.remove(styles.hidden)
      inputRef.current.focus()

      // Skip out.
      return
    }

    // Update the current title with the current input.
    update(id, { title: inputValue })

    // Now go out of editing mode.
    setEditing(false)
  }

  /**
   *  Handler function for handling change events for the checked input.
   */
  const checkHandler = event => update(id, { done: event.target.checked })

  return (
    <div className={`${styles.task} ${editing ? styles.editing : ''} ${ done ? styles.done : ''}`}>
      <input
        ref={checkRef}
        type="checkbox"
        checked={done}
        onChange={checkHandler}
        aria-label={'Task completed'}
      />
      <span className={styles.title}>
        <span>
          { editing ? '' : title }
        </span>
        <input
          ref={inputRef}
          type="text"
          className={editing ? '' : styles.hidden}
          onChange={inputChangeHandler}
          aria-label={'Edit title'}
          onKeyDown={event => { if (event.key === 'Enter') editHandler() }}
        />
      </span>
      <button
        onClick={editHandler}
        className={'icon'}
        aria-label={editing ? 'Save' : 'Edit'}
      >
        <FontAwesomeIcon icon={faPen} />
      </button>
      <button
        onClick={() => void remove(id)}
        className={'icon'}
        aria-label={'Remove'}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  )
}
