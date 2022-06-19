// Import React functionality.
import { useState, useEffect, useRef } from 'react';

// Import styles.
import styles from './Task.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

/**
 *  Functional component that displays a element that can be used to show a
 *  single task.
 * 
 *  @param    {Object}  props   React props passed by the parent element.
 *  @returns  {JSX.Element}
 */
export default function Task({ id, title, done, remove, update }) {

  // A task can be in a state in which the user can edit the current title, or
  // in a state in which the current title is only shown.
  const [editing, setEditing] = useState(false)

  // Use the original title as the default value for the edit input.
  const [inputValue, setInputValue] = useState(title)
  const inputRef = useRef()

  // Make sure that the input field keeps in sync with the input state.
  const inputChangeHandler = event => void setInputValue(event.target.value)
  useEffect(() => { inputRef.current.value = inputValue }, [inputValue])

  /**
   *  Handler function for handling click events on the edit button. This will
   *  toggle editing mode on and off, and submit any pending title changes when
   *  the editing mode is toggled off.
   */
  const editClickHandler = () => {

    // If we're not currently editing the task, we should simply go into editing
    // mode.
    if (!editing) return setEditing(true)

    // Update the current title with the current input.
    update(id, { title: inputValue })

    // Now go out of editing mode.
    setEditing(false)
  }

  /**
   *  Handler function for handling change events for the checked input.
   */
  const checkHandler = event => update(id, { checked: event.target.checked })

  return (
    <div className={`${styles.task} ${editing ? styles.editing : ''}`}>
      <input
        type="checkbox"
        checked={done}
        onChange={checkHandler}
      />
      <span>
        { editing ? '' : title }
        <input
          ref={inputRef}
          className={editing ? '' : styles.hidden}
          onChange={inputChangeHandler}
        />
      </span>
      <button onClick={editClickHandler}>
        <FontAwesomeIcon icon={faPen} />
      </button>
      <button onClick={() => void remove(id)}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  )
}
